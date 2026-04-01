#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import * as fs from "fs/promises";
import * as path from "path";
import * as os from "os";
import * as http from "http";

// --- Config ---

const CONFIG_DIR = path.join(os.homedir(), ".config", "rf-google-drive-mcp");
const TOKEN_PATH = path.join(CONFIG_DIR, "tokens.json");
const CREDENTIALS_PATH = path.join(CONFIG_DIR, "credentials.json");
const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];
const PORTS = [3000, 3001, 3002, 3003, 3004];

// --- Credential management ---

async function loadCredentials() {
  try {
    const creds = JSON.parse(await fs.readFile(CREDENTIALS_PATH, "utf-8"));
    if (creds.client_id && creds.client_secret) return creds;
  } catch {}
  return null;
}

async function saveCredentials(clientId, clientSecret) {
  await fs.mkdir(CONFIG_DIR, { recursive: true });
  await fs.writeFile(
    CREDENTIALS_PATH,
    JSON.stringify({ client_id: clientId, client_secret: clientSecret }),
    { mode: 0o600 }
  );
}

async function hasTokens() {
  try {
    await fs.access(TOKEN_PATH);
    return true;
  } catch {
    return false;
  }
}

async function loadTokens() {
  return JSON.parse(await fs.readFile(TOKEN_PATH, "utf-8"));
}

async function saveTokens(tokens) {
  await fs.mkdir(CONFIG_DIR, { recursive: true });
  await fs.writeFile(TOKEN_PATH, JSON.stringify(tokens, null, 2), {
    mode: 0o600,
  });
}

// --- Auth ---

async function getAuthenticatedClient() {
  const creds = await loadCredentials();
  const oauth2 = new OAuth2Client({
    clientId: creds.client_id,
    clientSecret: creds.client_secret,
    redirectUri: `http://localhost:${PORTS[0]}/oauth2callback`,
  });
  const tokens = await loadTokens();
  oauth2.setCredentials(tokens);

  if (tokens.expiry_date && Date.now() >= tokens.expiry_date) {
    const { credentials } = await oauth2.refreshAccessToken();
    await saveTokens(credentials);
    oauth2.setCredentials(credentials);
  }

  return oauth2;
}

// --- Google Drive helpers ---

async function getDrive() {
  const auth = await getAuthenticatedClient();
  return google.drive({ version: "v3", auth });
}

async function getDocContent(fileId) {
  const auth = await getAuthenticatedClient();
  const docs = google.docs({ version: "v1", auth });
  const doc = await docs.documents.get({ documentId: fileId });

  let text = "";
  for (const element of doc.data.body?.content || []) {
    if (element.paragraph) {
      for (const el of element.paragraph.elements || []) {
        if (el.textRun) text += el.textRun.content;
      }
    }
    if (element.table) {
      for (const row of element.table.tableRows || []) {
        const cells = [];
        for (const cell of row.tableCells || []) {
          let cellText = "";
          for (const content of cell.content || []) {
            if (content.paragraph) {
              for (const el of content.paragraph.elements || []) {
                if (el.textRun) cellText += el.textRun.content;
              }
            }
          }
          cells.push(cellText.trim());
        }
        text += "| " + cells.join(" | ") + " |\n";
      }
    }
  }
  return text;
}

async function getSheetContent(fileId) {
  const auth = await getAuthenticatedClient();
  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId: fileId,
    includeGridData: false,
  });

  const results = [];
  for (const sheet of spreadsheet.data.sheets || []) {
    const title = sheet.properties?.title || "Sheet";
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: fileId,
      range: title,
    });
    const rows = res.data.values || [];
    let csv = `## ${title}\n`;
    for (const row of rows) {
      csv += row.join(",") + "\n";
    }
    results.push(csv);
  }
  return results.join("\n");
}

async function getSlidesContent(fileId) {
  const auth = await getAuthenticatedClient();
  const slides = google.slides({ version: "v1", auth });
  const presentation = await slides.presentations.get({
    presentationId: fileId,
  });

  let text = `# ${presentation.data.title || "Presentation"}\n\n`;
  for (const slide of presentation.data.slides || []) {
    for (const element of slide.pageElements || []) {
      if (element.shape?.text?.textElements) {
        for (const te of element.shape.text.textElements) {
          if (te.textRun) text += te.textRun.content;
        }
      }
    }
    text += "\n---\n\n";
  }
  return text;
}

// --- Tool definitions ---

const AUTH_SCRIPT = path.resolve(import.meta.dirname, "auth.js");

const TOOLS = [
  {
    name: "authenticate",
    description:
      "Start the Google Drive sign-in flow. Opens the user's browser to authenticate with their @rainfocus.com Google account. Call this when tokens are missing or expired and credentials already exist.",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "search",
    description:
      "Search for files in Google Drive. Returns file names, types, and IDs.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Search query (searches file names and content)",
        },
        pageSize: {
          type: "number",
          description: "Number of results (default 20, max 100)",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "list_folder",
    description:
      "List contents of a Google Drive folder. Defaults to root if no folder ID is provided.",
    inputSchema: {
      type: "object",
      properties: {
        folderId: {
          type: "string",
          description: "Folder ID (default: root)",
        },
        pageSize: {
          type: "number",
          description: "Number of results (default 50, max 100)",
        },
      },
    },
  },
  {
    name: "read_file",
    description:
      "Read a file from Google Drive. Automatically converts Google Docs to markdown, Sheets to CSV, and Slides to text.",
    inputSchema: {
      type: "object",
      properties: {
        fileId: {
          type: "string",
          description: "The Google Drive file ID",
        },
      },
      required: ["fileId"],
    },
  },
];

// --- Tool handlers ---

async function handleAuthenticate() {
  const creds = await loadCredentials();
  if (!creds) {
    return "No credentials found. Call `setup_credentials` first with your Client ID and Client Secret. Contact Mick Rudolph on Slack if you don't have them.";
  }

  // Find an available port and start the callback server
  for (const port of PORTS) {
    const redirectUri = `http://localhost:${port}/oauth2callback`;
    const oauth2 = new OAuth2Client({
      clientId: creds.client_id,
      clientSecret: creds.client_secret,
      redirectUri,
    });

    const srv = http.createServer(async (req, res) => {
      if (!req.url?.startsWith("/oauth2callback")) return;
      const url = new URL(req.url, `http://localhost:${port}`);
      const code = url.searchParams.get("code");
      const error = url.searchParams.get("error");

      if (error) {
        res.writeHead(400, { "Content-Type": "text/html" });
        res.end(`<h2>Authentication failed</h2><p>${error}</p><p>Make sure you are signing in with your @rainfocus.com Google account.</p>`);
        srv.close();
        return;
      }

      try {
        const { tokens } = await oauth2.getToken(code);
        await saveTokens(tokens);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h2>Authenticated successfully!</h2><p>You can close this tab and restart Claude Code.</p>");
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end(`<h2>Token exchange failed</h2><p>${err.message}</p>`);
      }
      srv.close();
    });

    try {
      await new Promise((resolve, reject) => {
        srv.on("error", reject);
        srv.listen(port, () => resolve());
      });

      const authUrl = oauth2.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
        prompt: "consent",
      });

      // Return the URL for Claude to open via Bash, since MCP servers can't open browsers directly
      return `Authentication server started on port ${port}. Open this URL in the user's browser by running: open "${authUrl}"`;
    } catch (err) {
      if (err.code === "EADDRINUSE") {
        srv.removeAllListeners("error");
        continue;
      }
      return `Failed to start auth server: ${err.message}`;
    }
  }

  return "No available ports for authentication (tried 3000-3004). Close other servers and try again.";
}

async function handleSearch({ query, pageSize = 20 }) {
  const drive = await getDrive();
  const res = await drive.files.list({
    q: `fullText contains '${query.replace(/'/g, "\\'")}'`,
    pageSize: Math.min(pageSize, 100),
    fields: "files(id, name, mimeType, modifiedTime, parents)",
    orderBy: "modifiedTime desc",
  });

  const files = res.data.files || [];
  if (files.length === 0) return `No files found for "${query}".`;

  return files
    .map(
      (f) =>
        `${f.name} (${f.mimeType}) [id: ${f.id}] [modified: ${f.modifiedTime}]`
    )
    .join("\n");
}

async function handleListFolder({ folderId = "root", pageSize = 50 }) {
  const drive = await getDrive();
  const res = await drive.files.list({
    q: `'${folderId}' in parents and trashed = false`,
    pageSize: Math.min(pageSize, 100),
    fields: "files(id, name, mimeType, modifiedTime)",
    orderBy: "name",
  });

  const files = res.data.files || [];
  if (files.length === 0) return "Folder is empty.";

  return files
    .map(
      (f) =>
        `${f.name} (${f.mimeType}) [id: ${f.id}] [modified: ${f.modifiedTime}]`
    )
    .join("\n");
}

async function handleReadFile({ fileId }) {
  const drive = await getDrive();
  const meta = await drive.files.get({
    fileId,
    fields: "id, name, mimeType",
  });

  const mimeType = meta.data.mimeType;
  const name = meta.data.name;

  if (mimeType === "application/vnd.google-apps.document") {
    const content = await getDocContent(fileId);
    return `# ${name}\n\n${content}`;
  }

  if (mimeType === "application/vnd.google-apps.spreadsheet") {
    const content = await getSheetContent(fileId);
    return `# ${name}\n\n${content}`;
  }

  if (mimeType === "application/vnd.google-apps.presentation") {
    return await getSlidesContent(fileId);
  }

  const res = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "text" }
  );
  return `# ${name}\n\n${res.data}`;
}

// --- MCP Server ---

const server = new Server(
  { name: "rf-google-drive", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: TOOLS,
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  // Auth tool is always available
  if (name === "authenticate") {
    const result = await handleAuthenticate();
    return { content: [{ type: "text", text: result }] };
  }

  // For all other tools, check credentials and tokens
  const creds = await loadCredentials();
  if (!creds) {
    return {
      content: [
        {
          type: "text",
          text: `Google Drive is not set up yet. Tell the user to run this command in their terminal:\n\nnode ${AUTH_SCRIPT}\n\nIt will ask for a Client ID and Client Secret (get these from Mick Rudolph on Slack), then open the browser to sign in. After that, restart Claude Code.`,
        },
      ],
    };
  }

  if (!(await hasTokens())) {
    return {
      content: [
        {
          type: "text",
          text: `Credentials are saved but the user hasn't signed in yet. Tell the user to run this command in their terminal:\n\nnode ${AUTH_SCRIPT}\n\nIt will open their browser for Google sign-in. After that, restart Claude Code.`,
        },
      ],
    };
  }

  try {
    let result;
    switch (name) {
      case "search":
        result = await handleSearch(args);
        break;
      case "list_folder":
        result = await handleListFolder(args);
        break;
      case "read_file":
        result = await handleReadFile(args);
        break;
      default:
        return {
          content: [{ type: "text", text: `Unknown tool: ${name}` }],
          isError: true,
        };
    }
    return { content: [{ type: "text", text: result }] };
  } catch (error) {
    const msg = error.message || String(error);

    if (
      msg.includes("invalid_grant") ||
      msg.includes("Token has been expired")
    ) {
      return {
        content: [
          {
            type: "text",
            text: `Google Drive session has expired. Tell the user to run this command in their terminal to re-authenticate:\n\nnode ${AUTH_SCRIPT}\n\nAfter signing in, restart Claude Code.`,
          },
        ],
      };
    }

    return {
      content: [{ type: "text", text: `Google Drive error: ${msg}` }],
      isError: true,
    };
  }
});

// Start
const transport = new StdioServerTransport();
await server.connect(transport);
