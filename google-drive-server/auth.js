#!/usr/bin/env node

import { OAuth2Client } from "google-auth-library";
import * as fs from "fs/promises";
import * as path from "path";
import * as os from "os";
import * as http from "http";
import * as readline from "readline/promises";
import { exec } from "child_process";

const CONFIG_DIR = path.join(os.homedir(), ".config", "rf-google-drive-mcp");
const CREDENTIALS_PATH = path.join(CONFIG_DIR, "credentials.json");
const TOKEN_PATH = path.join(CONFIG_DIR, "tokens.json");
const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];
const PORTS = [3000, 3001, 3002, 3003, 3004];

// --- Load or prompt for credentials ---

let CLIENT_ID;
let CLIENT_SECRET;

try {
  const creds = JSON.parse(await fs.readFile(CREDENTIALS_PATH, "utf-8"));
  CLIENT_ID = creds.client_id;
  CLIENT_SECRET = creds.client_secret;
  console.log("Found existing credentials.\n");
} catch {
  // No credentials file — prompt the user
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("Google Drive setup for RF Research Assistant\n");
  console.log("You'll need a Client ID and Client Secret from Mick Rudolph.\n");

  CLIENT_ID = (await rl.question("Client ID: ")).trim();
  CLIENT_SECRET = (await rl.question("Client Secret: ")).trim();
  rl.close();

  if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error("\nBoth Client ID and Client Secret are required.");
    process.exit(1);
  }

  // Save credentials
  await fs.mkdir(CONFIG_DIR, { recursive: true });
  await fs.writeFile(
    CREDENTIALS_PATH,
    JSON.stringify({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET }),
    { mode: 0o600 }
  );
  console.log(`\nCredentials saved to ${CREDENTIALS_PATH}`);
}

// --- Start auth flow ---

async function startAuth() {
  for (const port of PORTS) {
    const redirectUri = `http://localhost:${port}/oauth2callback`;

    const oauth2 = new OAuth2Client({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      redirectUri,
    });

    const server = http.createServer(async (req, res) => {
      if (!req.url?.startsWith("/oauth2callback")) return;

      const url = new URL(req.url, `http://localhost:${port}`);
      const code = url.searchParams.get("code");
      const error = url.searchParams.get("error");

      if (error) {
        res.writeHead(400, { "Content-Type": "text/html" });
        res.end(
          `<h2>Authentication failed</h2><p>${error}</p><p>Make sure you are signing in with your @rainfocus.com Google account.</p>`
        );
        server.close();
        process.exit(1);
      }

      if (!code) {
        res.writeHead(400, { "Content-Type": "text/html" });
        res.end("<h2>No authorization code received</h2>");
        server.close();
        process.exit(1);
      }

      try {
        const { tokens } = await oauth2.getToken(code);
        await fs.mkdir(path.dirname(TOKEN_PATH), { recursive: true });
        await fs.writeFile(TOKEN_PATH, JSON.stringify(tokens, null, 2), {
          mode: 0o600,
        });

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(
          "<h2>Authenticated successfully!</h2><p>You can close this tab and restart Claude Code.</p>"
        );
        console.log(`\nTokens saved to ${TOKEN_PATH}`);
        console.log("Restart Claude Code to start using Google Drive.");
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end(`<h2>Token exchange failed</h2><p>${err.message}</p>`);
        console.error("Token exchange failed:", err.message);
      }

      server.close();
      process.exit(0);
    });

    try {
      await new Promise((resolve, reject) => {
        server.on("error", reject);
        server.listen(port, () => resolve());
      });

      const authUrl = oauth2.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
        prompt: "consent",
      });

      console.log(`\nAuthentication server listening on http://localhost:${port}`);
      console.log(`\nOpening browser for Google sign-in...\n`);
      console.log(`If the browser doesn't open, visit:\n${authUrl}\n`);
      exec(`open "${authUrl}"`);
      return;
    } catch (err) {
      if (err.code === "EADDRINUSE") {
        server.removeAllListeners("error");
        continue;
      }
      throw err;
    }
  }

  console.error(
    `No available ports (tried ${PORTS.join(", ")}). Close other servers and try again.`
  );
  process.exit(1);
}

startAuth();
