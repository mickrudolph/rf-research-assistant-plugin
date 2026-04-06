#!/usr/bin/env node

import * as fs from "fs/promises";
import * as path from "path";
import * as os from "os";
import * as readline from "readline/promises";

const CONFIG_DIR = path.join(os.homedir(), ".config", "rf-coda-mcp");
const TOKEN_PATH = path.join(CONFIG_DIR, "token.json");

async function setupAuth() {
  console.log("Coda MCP Setup for RF Research Assistant\n");
  console.log("You'll need a Personal Access Token from your Coda account.\n");
  console.log("To generate one:");
  console.log("1. Visit https://coda.io/account");
  console.log("2. Scroll to 'API settings' section");
  console.log("3. Click 'Generate API token'");
  console.log("4. Set restriction type to 'MCP'");
  console.log("5. Choose access type (Read and write, or Read only)");
  console.log("6. Copy the token\n");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const token = (await rl.question("Paste your Coda API token here: ")).trim();
  rl.close();

  if (!token) {
    console.error("\nError: Token is required.");
    process.exit(1);
  }

  // Validate token format (basic check)
  if (!token.startsWith("coda_") && token.length < 20) {
    console.error("\nWarning: Token doesn't look like a valid Coda API token.");
    console.error("Expected format: starts with 'coda_' or similar.\n");

    const rlConfirm = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    const confirm = await rlConfirm.question("Continue anyway? (y/n): ");
    rlConfirm.close();

    if (confirm.toLowerCase() !== 'y') {
      console.log("Setup cancelled.");
      process.exit(0);
    }
  }

  // Save token
  await fs.mkdir(CONFIG_DIR, { recursive: true });
  await fs.writeFile(
    TOKEN_PATH,
    JSON.stringify({ token }, null, 2),
    { mode: 0o600 }
  );

  console.log(`\n✅ Token saved to ${TOKEN_PATH}`);
  console.log("\nNext steps:");
  console.log("1. Restart Claude Code (if it's running)");
  console.log("2. The Coda MCP tools will now be available!\n");
}

setupAuth().catch((err) => {
  console.error("Setup failed:", err.message);
  process.exit(1);
});
