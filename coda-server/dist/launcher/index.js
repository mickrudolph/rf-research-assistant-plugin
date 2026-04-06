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
;// CONCATENATED MODULE: external "child_process"
const external_child_process_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("child_process");
;// CONCATENATED MODULE: external "url"
const external_url_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("url");
;// CONCATENATED MODULE: ./launcher.js







const launcher_filename = (0,external_url_namespaceObject.fileURLToPath)(import.meta.url);
const launcher_dirname = external_path_namespaceObject.dirname(launcher_filename);

const CONFIG_DIR = external_path_namespaceObject.join(external_os_namespaceObject.homedir(), ".config", "rf-coda-mcp");
const TOKEN_PATH = external_path_namespaceObject.join(CONFIG_DIR, "token.json");
const CODA_MCP_URL = "https://coda.io/apis/mcp";

async function loadToken() {
  try {
    const data = JSON.parse(await promises_namespaceObject.readFile(TOKEN_PATH, "utf-8"));
    return data.token;
  } catch (error) {
    console.error(
      `Error: No Coda API token found. Run auth setup first:\n  node ${external_path_namespaceObject.join(
        launcher_dirname,
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

  const child = (0,external_child_process_namespaceObject.spawn)("npx", args, {
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

