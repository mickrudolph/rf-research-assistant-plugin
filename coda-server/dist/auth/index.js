#!/usr/bin/env node
import { createRequire as __WEBPACK_EXTERNAL_createRequire } from "module";
/******/ /* webpack/runtime/compat */
/******/ 
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = new URL('.', import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: external "fs/promises"
const promises_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("fs/promises");
;// CONCATENATED MODULE: external "path"
const external_path_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("path");
;// CONCATENATED MODULE: external "os"
const external_os_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("os");
;// CONCATENATED MODULE: external "readline/promises"
const external_readline_promises_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("readline/promises");
;// CONCATENATED MODULE: ./auth.js






const CONFIG_DIR = external_path_namespaceObject.join(external_os_namespaceObject.homedir(), ".config", "rf-coda-mcp");
const TOKEN_PATH = external_path_namespaceObject.join(CONFIG_DIR, "token.json");

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

  const rl = external_readline_promises_namespaceObject.createInterface({
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

    const rlConfirm = external_readline_promises_namespaceObject.createInterface({
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
  await promises_namespaceObject.mkdir(CONFIG_DIR, { recursive: true });
  await promises_namespaceObject.writeFile(
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

