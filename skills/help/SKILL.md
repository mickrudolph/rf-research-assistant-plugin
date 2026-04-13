---
name: help
description: Show all available slash commands and plugin capabilities.
---

# RainFocus Research Assistant — Cheat Sheet

Print this cheat sheet exactly as written below. Do not summarize or modify it.

---

## Slash Commands — `rf-research` Plugin

| Command | What it does |
|---------|-------------|
| `/rf-research:research-advisor` | Chat with Claude + RainFocus context (conversational catch-all). |
| `/rf-research:plan` | Build a research plan from scratch — discovery or validation. |
| `/rf-research:critique` | Get honest feedback on a plan you've already written. |
| `/rf-research:method` | Get a method recommendation for your specific situation. |
| `/rf-research:find-participants` | Get specific participant recommendations from the Research Panel and CS team. |
| `/rf-research:synthesize` | Turn raw notes into structured findings after a study. |
| `/rf-research:report` | Turn a synthesis document into an executive-ready stakeholder report. |
| `/rf-research:feedback-agent` | Search customer feedback data for themes, pain points, and product signals. |
| `/rf-research:help` | Show this cheat sheet. |

---

## Slash Commands — `rf-writing-guide` Plugin

| Command | What it does |
|---------|-------------|
| `/rf-writing-guide` | Write or review content using the RainFocus Written Style Guide. |

> Install separately: `/plugin install rf-writing-guide@rf-research-assistant`

---

## Connected Tools

| Tool | What it gives you |
|------|-------------------|
| **Amplitude** | Behavioral data and usage patterns across the RainFocus product. |
| **Confluence / Jira** | RainFocus help docs and platform tickets (read/search only). |
| **Google Drive** | Search and read RainFocus files — transcripts, notes, and research docs. |
| **Coda** | Read and write to RainFocus Coda docs, research tables, and the Client Research Panel. |
| **Customer Feedback (n8n)** | Interview summaries and raw transcripts powering the feedback-agent skill. |

You don't need to do anything special — Claude draws on these automatically when relevant. You can also ask directly, e.g. "What do we already know about [feature] from Amplitude?"

---

## What Else It Knows

- **Our methodology library** — interviews, usability testing, card sorts, heuristic evaluations, contextual inquiry, and when to use each.
- **CS org roles** — CSMs, SCs, SAs, PMs, EDCs, Implementation Engineers — and who to pull into co-design workshops.
- **The Client Research Panel** — will remind you to check it before recruiting.
- **Craft.io** — will prompt you to check for existing feedback signals before spinning up new research.
- **Discovery vs. validation** — knows the difference and will flag if you're running discovery without PM involvement.

---

## Quick Tips

- **Check the Client Research Panel before recruiting.** We have real client relationships to protect — loop Mick in on outreach.
- **Discovery is PM-owned.** If you're doing early discovery, your PM should be involved.
- **Mick is still a resource.** The assistant is a tool, not a replacement — reach out anytime.
