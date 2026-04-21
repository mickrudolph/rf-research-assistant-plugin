---
name: ingest-research
description: "Send a single Google Drive link (doc, audio file, video file, or folder) to the n8n ingestion pipeline so it lands in the Feedback Agent database. Use when the user wants to ingest, upload, add, feed, or push raw qualitative research data into the feedback system. TRIGGERS: 'ingest-research', '/ingest-research', 'ingest this', 'add to feedback agent', 'feed this to the agent', 'upload research', 'send this interview to the pipeline', 'add this transcript to feedback'."
---

# Ingest Research

Sends a single Google Drive link to the n8n "Ingest Research to Feedback Agent" workflow, which processes the raw qualitative research data (transcripts, audio, video, or folders containing any combination of those) into the feedback database.

---

## Handling Args

The skill is called as: `/ingest-research [url]`

- `$0` — a single Google Drive URL

### If no URL was provided

Ask the user for one before doing anything else:

> "I need a single Google Drive link to ingest. That can be:
> - A Google Doc (e.g. a transcript)
> - An audio file
> - A video file
> - A folder containing any combination of the above
>
> Paste one link and I'll send it off."

### If more than one URL was provided

Refuse and remind them of the constraint. Do **not** pick one arbitrarily, and do **not** call the tool.

> "The pipeline only accepts a single link at a time. If you have multiple files, put them in a Google Drive folder and send me the folder link instead."

---

## URL Validation

Only Google Drive links are accepted. Valid hosts include:

- `drive.google.com` (files, folders, shared drives)
- `docs.google.com` (Docs, Sheets, Slides — Docs is the common case here)

If the URL doesn't match one of those hosts, refuse:

> "That doesn't look like a Google Drive link. For now the ingestion pipeline only accepts Google Drive URLs (drive.google.com or docs.google.com). Try again with a Drive link."

Do **not** try to "fix" the URL, resolve redirects, or fetch it. Just validate the host and pass it through as-is.

---

## Calling the Tool

Once you have exactly one valid Google Drive URL, call:

**`mcp__plugin_rf-research_n8n-mcp__Call_Ingest_Research_to_Feedback_Agent_`** with `{ "link": "<the url>" }`

Before calling, give the user a one-line status:

> "Sending it off to the ingestion pipeline..."

---

## Response Handling

The tool call kicks off an n8n workflow. Treat it as fire-and-forget — a successful tool return means the workflow was triggered, not that ingestion is fully complete.

### On success

Confirm it was sent with a playful one-liner. Pick one at random from this list (or improvise a similar food/eating-themed response in the same spirit):

- "Yum. 🍽️"
- "Gobbled. One Drive link, down the hatch."
- "Feeling nice and fed."
- "Nom nom. Sent off for digestion."
- "Chef's kiss — sent to the pipeline."
- "Mmm, tasty research. Off it goes."
- "Swallowed whole. The agent will sort it out from here."
- "Delivered to the feedback pantry."
- "Crunch crunch. On its way."
- "Sent. The agent is chewing on it now."

Keep it short — one line. Do not recap the URL back to the user.

### On failure

If the tool returns an error, surface it plainly so the user can act on it. Don't be cute about failures.

> "The pipeline rejected that link. Here's what came back: [error]. Want me to try again?"

---

## Quality Standards

- **Exactly one link per call.** Never batch. Never loop.
- **Google Drive hosts only.** No Dropbox, Zoom, Loom, Otter, YouTube, etc.
- **Don't fetch or inspect the link.** The n8n workflow handles all resolution and processing.
- **Don't editorialize.** The user already knows what they're ingesting — just confirm it went out.
- **Don't offer to do follow-up analysis** unless asked. This skill's job ends when the ingestion is kicked off.
