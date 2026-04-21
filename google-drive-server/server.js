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
import { fileURLToPath } from "url";

// Define __dirname for ES modules (needed for ncc bundling)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Config ---
// (trivial edit to test pre-commit hook)

const CONFIG_DIR = path.join(os.homedir(), ".config", "rf-google-drive-mcp");
const TOKEN_PATH = path.join(CONFIG_DIR, "tokens.json");
const CREDENTIALS_PATH = path.join(CONFIG_DIR, "credentials.json");
const SCOPES = [
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/calendar",
];
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

// Format mappings for Google Workspace file exports
const FORMAT_MAPPINGS = {
  // Google Docs
  "application/vnd.google-apps.document": {
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    pdf: "application/pdf",
    odt: "application/vnd.oasis.opendocument.text",
    txt: "text/plain",
    rtf: "application/rtf",
    html: "text/html",
    epub: "application/epub+zip",
  },
  // Google Sheets
  "application/vnd.google-apps.spreadsheet": {
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    pdf: "application/pdf",
    ods: "application/vnd.oasis.opendocument.spreadsheet",
    csv: "text/csv",
    tsv: "text/tab-separated-values",
  },
  // Google Slides
  "application/vnd.google-apps.presentation": {
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    pdf: "application/pdf",
    odp: "application/vnd.oasis.opendocument.presentation",
    txt: "text/plain",
  },
};

async function getDrive() {
  const auth = await getAuthenticatedClient();
  return google.drive({ version: "v3", auth });
}

async function getCalendar() {
  const auth = await getAuthenticatedClient();
  return google.calendar({ version: "v3", auth });
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

const AUTH_SCRIPT = path.join(__dirname, "auth.js");

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
  {
    name: "list_calendars",
    description: "List all calendars the user has access to.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "list_events",
    description:
      "List events from a Google Calendar. Defaults to the primary calendar and the next 7 days.",
    inputSchema: {
      type: "object",
      properties: {
        calendarId: {
          type: "string",
          description: "Calendar ID (default: 'primary')",
        },
        timeMin: {
          type: "string",
          description: "Start time in ISO 8601 format (default: now)",
        },
        timeMax: {
          type: "string",
          description: "End time in ISO 8601 format (default: 7 days from now)",
        },
        maxResults: {
          type: "number",
          description: "Max number of events to return (default 20, max 250)",
        },
        query: {
          type: "string",
          description: "Free-text search filter on event title/description",
        },
      },
    },
  },
  {
    name: "create_event",
    description: "Create a new event on a Google Calendar. Pass addMeet: true to automatically generate a Google Meet conferencing link on the event.",
    inputSchema: {
      type: "object",
      properties: {
        calendarId: {
          type: "string",
          description: "Calendar ID (default: 'primary')",
        },
        summary: { type: "string", description: "Event title" },
        description: { type: "string", description: "Event description" },
        location: { type: "string", description: "Event location" },
        start: {
          type: "string",
          description: "Start time in ISO 8601 format",
        },
        end: {
          type: "string",
          description: "End time in ISO 8601 format",
        },
        attendees: {
          type: "array",
          items: { type: "string" },
          description: "List of attendee email addresses",
        },
        timeZone: {
          type: "string",
          description: "IANA time zone (e.g. 'America/Denver'). Defaults to calendar's time zone.",
        },
        addMeet: {
          type: "boolean",
          description: "When true, attach a Google Meet conferencing link to the event.",
        },
      },
      required: ["summary", "start", "end"],
    },
  },
  {
    name: "update_event",
    description: "Update an existing Google Calendar event.",
    inputSchema: {
      type: "object",
      properties: {
        calendarId: {
          type: "string",
          description: "Calendar ID (default: 'primary')",
        },
        eventId: { type: "string", description: "Event ID to update" },
        summary: { type: "string", description: "New event title" },
        description: { type: "string", description: "New event description" },
        location: { type: "string", description: "New event location" },
        start: { type: "string", description: "New start time in ISO 8601 format" },
        end: { type: "string", description: "New end time in ISO 8601 format" },
        attendees: {
          type: "array",
          items: { type: "string" },
          description: "Updated list of attendee email addresses",
        },
        timeZone: { type: "string", description: "IANA time zone" },
      },
      required: ["eventId"],
    },
  },
  {
    name: "delete_event",
    description: "Delete a Google Calendar event.",
    inputSchema: {
      type: "object",
      properties: {
        calendarId: {
          type: "string",
          description: "Calendar ID (default: 'primary')",
        },
        eventId: { type: "string", description: "Event ID to delete" },
      },
      required: ["eventId"],
    },
  },
  {
    name: "check_availability",
    description:
      "Check availability across multiple people in the organization using Google Calendar's Freebusy API. Pass email addresses to see when everyone is free. Returns busy blocks per person and shared free windows. Works with any @rainfocus.com account visible in the org directory.",
    inputSchema: {
      type: "object",
      properties: {
        emails: {
          type: "array",
          items: { type: "string" },
          description:
            "List of email addresses to check availability for. Use 'primary' or omit to include the authenticated user.",
        },
        timeMin: {
          type: "string",
          description: "Start of the window in ISO 8601 format (default: now)",
        },
        timeMax: {
          type: "string",
          description:
            "End of the window in ISO 8601 format (default: 5 business days from now)",
        },
        duration: {
          type: "number",
          description:
            "Minimum meeting duration in minutes to filter free windows (default: 30)",
        },
      },
      required: ["emails"],
    },
  },
  {
    name: "download_file",
    description:
      "Download a file from Google Drive to the local filesystem. Supports format conversion for Google Workspace files (Docs, Sheets, Slides). For Google Docs: docx, pdf, odt, txt, rtf, html, epub. For Google Sheets: xlsx, pdf, ods, csv, tsv. For Google Slides: pptx, pdf, odp, txt. Regular files download in their original format.",
    inputSchema: {
      type: "object",
      properties: {
        fileId: {
          type: "string",
          description: "The Google Drive file ID",
        },
        format: {
          type: "string",
          description: "Export format (e.g., 'pdf', 'docx', 'xlsx'). Optional for regular files, required for Google Workspace files if you want a specific format. Defaults to native format.",
        },
        outputPath: {
          type: "string",
          description: "Full path where the file should be saved (e.g., '/Users/username/Desktop/myfile.pdf'). If not provided, saves to user's Desktop.",
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

async function handleDownloadFile({ fileId, format, outputPath }) {
  const drive = await getDrive();
  const meta = await drive.files.get({
    fileId,
    fields: "id, name, mimeType",
  });

  const mimeType = meta.data.mimeType;
  const name = meta.data.name;
  const isGoogleWorkspaceFile = FORMAT_MAPPINGS[mimeType];

  // Determine output path
  let finalPath = outputPath;
  if (!finalPath) {
    const desktop = path.join(os.homedir(), "Desktop");
    // Generate filename with extension
    let extension = "";
    if (format) {
      extension = `.${format}`;
    } else if (!isGoogleWorkspaceFile) {
      // Extract extension from original filename
      const ext = path.extname(name);
      extension = ext || "";
    } else {
      // Default format for Google Workspace files
      if (mimeType === "application/vnd.google-apps.document") extension = ".docx";
      else if (mimeType === "application/vnd.google-apps.spreadsheet") extension = ".xlsx";
      else if (mimeType === "application/vnd.google-apps.presentation") extension = ".pptx";
    }
    const baseName = path.basename(name, path.extname(name));
    finalPath = path.join(desktop, `${baseName}${extension}`);
  }

  let fileData;

  if (isGoogleWorkspaceFile) {
    // Export Google Workspace file with format conversion
    if (!format) {
      // Default formats
      if (mimeType === "application/vnd.google-apps.document") format = "docx";
      else if (mimeType === "application/vnd.google-apps.spreadsheet") format = "xlsx";
      else if (mimeType === "application/vnd.google-apps.presentation") format = "pptx";
    }

    const exportMimeType = FORMAT_MAPPINGS[mimeType][format];
    if (!exportMimeType) {
      const availableFormats = Object.keys(FORMAT_MAPPINGS[mimeType]).join(", ");
      return `Invalid format '${format}' for this file type. Available formats: ${availableFormats}`;
    }

    const res = await drive.files.export(
      { fileId, mimeType: exportMimeType },
      { responseType: "arraybuffer" }
    );
    fileData = Buffer.from(res.data);
  } else {
    // Download regular file
    const res = await drive.files.get(
      { fileId, alt: "media" },
      { responseType: "arraybuffer" }
    );
    fileData = Buffer.from(res.data);
  }

  // Save to disk
  await fs.writeFile(finalPath, fileData);

  return `File downloaded successfully to: ${finalPath}`;
}

// --- Calendar helpers ---

async function handleListCalendars() {
  const cal = await getCalendar();
  const res = await cal.calendarList.list();
  const items = res.data.items || [];
  if (items.length === 0) return "No calendars found.";
  return items
    .map((c) => `${c.summary} [id: ${c.id}]${c.primary ? " (primary)" : ""}`)
    .join("\n");
}

async function handleListEvents({ calendarId = "primary", timeMin, timeMax, maxResults = 20, query } = {}) {
  const cal = await getCalendar();
  const now = new Date();
  const params = {
    calendarId,
    timeMin: timeMin || now.toISOString(),
    timeMax: timeMax || new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    maxResults: Math.min(maxResults, 250),
    singleEvents: true,
    orderBy: "startTime",
  };
  if (query) params.q = query;

  const res = await cal.events.list(params);
  const events = res.data.items || [];
  if (events.length === 0) return "No events found in that time range.";

  return events
    .map((e) => {
      const start = e.start?.dateTime || e.start?.date || "?";
      const end = e.end?.dateTime || e.end?.date || "?";
      const attendees = (e.attendees || []).map((a) => a.email).join(", ");
      const location = e.location ? `\n  Location: ${e.location}` : "";
      const desc = e.description ? `\n  Description: ${e.description}` : "";
      const att = attendees ? `\n  Attendees: ${attendees}` : "";
      return `${e.summary || "(no title)"} [id: ${e.id}]\n  Start: ${start}\n  End: ${end}${location}${desc}${att}`;
    })
    .join("\n\n");
}

async function handleCreateEvent({ calendarId = "primary", summary, description, location, start, end, attendees = [], timeZone, addMeet = false }) {
  const cal = await getCalendar();
  const tz = timeZone || "UTC";
  const event = {
    summary,
    ...(description && { description }),
    ...(location && { location }),
    start: { dateTime: start, timeZone: tz },
    end: { dateTime: end, timeZone: tz },
    ...(attendees.length > 0 && { attendees: attendees.map((email) => ({ email })) }),
    ...(addMeet && {
      conferenceData: {
        createRequest: {
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    }),
  };
  const res = await cal.events.insert({
    calendarId,
    requestBody: event,
    ...(addMeet && { conferenceDataVersion: 1 }),
  });
  const meetLink = res.data.conferenceData?.entryPoints?.find((ep) => ep.entryPointType === "video")?.uri;
  return `Event created: ${res.data.summary} [id: ${res.data.id}]\nLink: ${res.data.htmlLink}${meetLink ? `\nMeet: ${meetLink}` : ""}`;
}

async function handleUpdateEvent({ calendarId = "primary", eventId, summary, description, location, start, end, attendees, timeZone }) {
  const cal = await getCalendar();
  const existing = await cal.events.get({ calendarId, eventId });
  const tz = timeZone || existing.data.start?.timeZone || "UTC";

  const patch = {
    ...(summary !== undefined && { summary }),
    ...(description !== undefined && { description }),
    ...(location !== undefined && { location }),
    ...(start !== undefined && { start: { dateTime: start, timeZone: tz } }),
    ...(end !== undefined && { end: { dateTime: end, timeZone: tz } }),
    ...(attendees !== undefined && { attendees: attendees.map((email) => ({ email })) }),
  };

  const res = await cal.events.patch({ calendarId, eventId, requestBody: patch });
  return `Event updated: ${res.data.summary} [id: ${res.data.id}]\nLink: ${res.data.htmlLink}`;
}

async function handleDeleteEvent({ calendarId = "primary", eventId }) {
  const cal = await getCalendar();
  await cal.events.delete({ calendarId, eventId });
  return `Event ${eventId} deleted successfully.`;
}

async function handleCheckAvailability({ emails, timeMin, timeMax, duration = 30 }) {
  const cal = await getCalendar();
  const now = new Date();

  const start = timeMin ? new Date(timeMin) : now;

  let end;
  if (timeMax) {
    end = new Date(timeMax);
  } else {
    end = new Date(start);
    let daysAdded = 0;
    while (daysAdded < 5) {
      end.setDate(end.getDate() + 1);
      if (end.getDay() !== 0 && end.getDay() !== 6) daysAdded++;
    }
    end.setHours(18, 0, 0, 0);
  }

  const res = await cal.freebusy.query({
    requestBody: {
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
      items: emails.map((email) => ({ id: email })),
    },
  });

  const calendars = res.data.calendars || {};
  const lines = [];

  for (const email of emails) {
    const info = calendars[email];
    if (!info) {
      lines.push(`${email}: no data returned (may not exist or no access)`);
      continue;
    }
    if (info.errors?.length) {
      lines.push(`${email}: error — ${info.errors.map((e) => e.reason).join(", ")}`);
      continue;
    }
    const busy = info.busy || [];
    if (busy.length === 0) {
      lines.push(`${email}: entirely free in this window`);
    } else {
      const blocks = busy
        .map((b) => `  ${b.start} → ${b.end}`)
        .join("\n");
      lines.push(`${email}: ${busy.length} busy block(s)\n${blocks}`);
    }
  }

  const allBusy = emails
    .flatMap((email) => (calendars[email]?.busy || []).map((b) => ({ ...b, email })));
  allBusy.sort((a, b) => new Date(a.start) - new Date(b.start));

  const mergedBusy = [];
  for (const block of allBusy) {
    const blockStart = new Date(block.start).getTime();
    const blockEnd = new Date(block.end).getTime();
    if (mergedBusy.length === 0 || blockStart >= mergedBusy[mergedBusy.length - 1].end) {
      mergedBusy.push({ start: blockStart, end: blockEnd });
    } else {
      mergedBusy[mergedBusy.length - 1].end = Math.max(mergedBusy[mergedBusy.length - 1].end, blockEnd);
    }
  }

  const minMs = duration * 60 * 1000;
  const windowStart = start.getTime();
  const windowEnd = end.getTime();
  const freeSlots = [];

  let cursor = windowStart;
  for (const block of mergedBusy) {
    if (block.start - cursor >= minMs) {
      freeSlots.push({ start: new Date(cursor).toISOString(), end: new Date(block.start).toISOString() });
    }
    cursor = Math.max(cursor, block.end);
  }
  if (windowEnd - cursor >= minMs) {
    freeSlots.push({ start: new Date(cursor).toISOString(), end: new Date(windowEnd).toISOString() });
  }

  lines.push("");
  if (freeSlots.length === 0) {
    lines.push(`No shared free windows of ${duration}+ minutes found in this range.`);
  } else {
    lines.push(`Shared free windows (${duration}+ min):`);
    for (const slot of freeSlots) {
      lines.push(`  ${slot.start} → ${slot.end}`);
    }
  }

  return lines.join("\n");
}

// --- MCP Server ---

const server = new Server(
  { name: "rf-google-drive", version: "1.4.0" },
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
      case "download_file":
        result = await handleDownloadFile(args);
        break;
      case "list_calendars":
        result = await handleListCalendars();
        break;
      case "list_events":
        result = await handleListEvents(args);
        break;
      case "create_event":
        result = await handleCreateEvent(args);
        break;
      case "update_event":
        result = await handleUpdateEvent(args);
        break;
      case "delete_event":
        result = await handleDeleteEvent(args);
        break;
      case "check_availability":
        result = await handleCheckAvailability(args);
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
