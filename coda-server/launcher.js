#!/usr/bin/env node

import * as fs from "fs/promises";
import * as path from "path";
import * as os from "os";
import { spawn } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG_DIR = path.join(os.homedir(), ".config", "rf-coda-mcp");
const TOKEN_PATH = path.join(CONFIG_DIR, "token.json");
const CODA_MCP_URL = "https://coda.io/apis/mcp";

async function loadToken() {
  try {
    const data = JSON.parse(await fs.readFile(TOKEN_PATH, "utf-8"));
    return data.token;
  } catch (error) {
    console.error(
      `Error: No Coda API token found. Run auth setup first:\n  node ${path.join(
        __dirname,
        "dist",
        "auth",
        "index.js"
      )}\n`
    );
    process.exit(1);
  }
}

async function main() {
  const token = await loadToken();

  // Launch mcp-remote with the token
  const args = [
    "-y",
    "mcp-remote@latest",
    CODA_MCP_URL,
    "--header",
    `Authorization: Bearer ${token}`,
  ];

  const child = spawn("npx", args, {
    stdio: "inherit",
    shell: false,
  });

  child.on("error", (err) => {
    console.error("Failed to start mcp-remote:", err);
    process.exit(1);
  });

  child.on("exit", (code) => {
    process.exit(code || 0);
  });
}

main();
