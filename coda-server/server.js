#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import * as fs from "fs/promises";
import * as path from "path";
import * as os from "os";
import { fileURLToPath } from "url";

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG_DIR = path.join(os.homedir(), ".config", "rf-coda-mcp");
const TOKEN_PATH = path.join(CONFIG_DIR, "token.json");
const CODA_MCP_URL = "https://coda.io/apis/mcp";

// --- Token management ---

async function loadToken() {
  try {
    const data = JSON.parse(await fs.readFile(TOKEN_PATH, "utf-8"));
    return data.token;
  } catch (error) {
    throw new Error(
      `No Coda API token found. Run auth setup first:\n  node ${path.join(
        __dirname,
        "auth",
        "index.js"
      )}`
    );
  }
}

// --- MCP Proxy ---

/**
 * Forward MCP requests to Coda's remote MCP server
 */
async function forwardMCPRequest(method, params, token) {
  const response = await fetch(CODA_MCP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method,
      params: params || {},
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Coda MCP request failed (${response.status}): ${text}`);
  }

  const result = await response.json();

  if (result.error) {
    throw new Error(`Coda MCP error: ${JSON.stringify(result.error)}`);
  }

  return result.result;
}

// --- Server setup ---

const server = new Server(
  {
    name: "rf-coda-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
      prompts: {},
    },
  }
);

// Cache token for the session
let cachedToken = null;

async function getToken() {
  if (!cachedToken) {
    cachedToken = await loadToken();
  }
  return cachedToken;
}

// List tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  const token = await getToken();
  const result = await forwardMCPRequest("tools/list", {}, token);
  return result;
});

// Call tool
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const token = await getToken();
  const result = await forwardMCPRequest("tools/call", request.params, token);
  return result;
});

// List resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  const token = await getToken();
  try {
    const result = await forwardMCPRequest("resources/list", {}, token);
    return result;
  } catch (error) {
    // Resources might not be supported, return empty list
    return { resources: [] };
  }
});

// Read resource
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const token = await getToken();
  const result = await forwardMCPRequest("resources/read", request.params, token);
  return result;
});

// List prompts
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  const token = await getToken();
  try {
    const result = await forwardMCPRequest("prompts/list", {}, token);
    return result;
  } catch (error) {
    // Prompts might not be supported, return empty list
    return { prompts: [] };
  }
});

// Get prompt
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const token = await getToken();
  const result = await forwardMCPRequest("prompts/get", request.params, token);
  return result;
});

// --- Start server ---

async function main() {
  // Verify token exists before starting
  await getToken();

  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error("RF Coda MCP Server running");
}

main().catch((error) => {
  console.error("Fatal error:", error.message);
  process.exit(1);
});
