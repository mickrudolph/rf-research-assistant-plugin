# RainFocus Research Assistant
### A shared AI plugin for the UX team

---

## What is this?

The RainFocus Research Assistant is a custom Claude plugin built specifically for our team. It isn't generic Claude — it's been trained on our research process, our methodology library, our role definitions across the CS org, how our clients work, and the way we think about building product at RainFocus. This plugin also has access to Confluence, Google Drive, Coda, and Amplitude data, so it can quickly get context for whatever you're working on, pull meeting notes and transcripts, and help answer research questions with behavioral data.

The RainFocus research assistant can help any designer on the team do better research, faster. Whether you've never run a user interview before or you just need a second set of eyes on a study plan before you put it in front of participants, this plugin is for you.

---

## What can it actually do?

**Help you build a research plan from scratch.** Give it a problem you're trying to understand and it'll walk you through defining objectives, forming a testable hypothesis, choosing the right method, scoping participants, and knowing what output you're working toward. It knows the difference between discovery and validation, and it knows who owns each (spoiler: discovery is PM-owned and you should loop them in).

**Pressure-test a plan you've already written.** Hand it your draft plan and it'll critique it honestly — flagging weak objectives, leading questions, scope issues, or a hypothesis that can't actually be disproven. Better to hear it from Claude before you're in a session.

**Recommend the right method for your situation.** Describe where you are in the design process and what you're trying to learn, and it'll recommend a method — or a sequence of methods — with a rationale and honest trade-offs. The methodology library covers 25 methods across the full research spectrum: passive behavioral analysis, quantitative attitudinal methods, longitudinal discovery, synthesis frameworks, and more. And if your situation calls for something outside the library entirely, it'll tell you that too.

**Help you synthesize after a study.** Paste in raw notes or observations and it'll help you structure findings, identify patterns, surface the so-what, and frame things in a way that's useful for PMs and stakeholders.

**Be your institutional memory.** It knows our CS role structure (CSMs, SCs, SAs, PMs, EDCs, Implementation Engineers) and can suggest the right internal SMEs for co-design workshops based on the type of problem you're solving. It knows about the Client Research Panel and can point you to it before you go recruit. It knows that Craft.io is our incoming feedback engine and will prompt you to check it for existing signals before spinning up new research.

**Discover new insights.** It can help you connect research data to Amplitude data, creating powerful insights.

---

## Installation

Use one of these install paths depending on how you use Claude.
Works in Claude Code CLI, Claude Desktop (Cowork tab), and Claude Desktop (Code tab).

### Method #1 — Claude Code CLI

**Install**

1. Add the marketplace:
```
/plugin marketplace add https://github.com/mickrudolph/rf-research-assistant-plugin.git
```

2. Install the plugin:
```
/plugin install rf-research@rf-research-assistant
```

**Verify installation**

```bash
/plugin
```

**Update**

```
/plugin marketplace update rf-research-assistant
```

Run this anytime to pull the latest version.

**Uninstall (in the terminal)**

```bash
claude plugin uninstall rf-research
```

Clean uninstall, no residue. Reinstall any time with the same commands from above.

---

### Method #2 – Claude Desktop App (Currently not in use)
**Requirements:** Claude Pro, Max, Team, or Enterprise plan.
Works with Claude Cowork & Claude Code

In Claude, go to Customize → Personal plugins → Add plugin → Add marketplace

Enter: 
```
mickrudolph/rf-research-assistant-plugin
```
Once the marketplace is added, find rf-research in the plugin list and click install

To update the plugin later (after you push changes to GitHub):
Go to Customize → Personal plugins, find the marketplace, and hit update — no reinstall needed.

First-time authentication: After installing, the first time you use the plugin Claude will prompt you to authenticate Amplitude and Atlassian (Confluence/Jira). That's a one-time step per tool.

---

### Authenticating the connected tools

The first time you use the plugin, Claude will prompt you to authenticate each connected tool. You'll need to log in to:

- **Amplitude** — your RF Amplitude account
- **Atlassian** — your RF credentials for Confluence and Jira (OAuth flow)
- **Google Drive** — your RF Google account (OAuth flow)
- **Coda** — your personal Coda API token (one-time setup)

This only happens once per tool. After that, Claude pulls context from them automatically.

### Connected tools

| Tool | What it gives Claude |
|------|----------------------|
| **Amplitude** | Behavioral data and usage patterns |
| **Confluence / Jira** | RainFocus help docs and platform tickets in read/search-only mode |
| **Google Drive** | Access to meeting notes, transcripts, and research artifacts |
| **Coda** | Read and write access to Coda documents, pages, and tables |
| **n8n** | Customer interview transcripts and feedback search |

You don't have to do anything special — Claude draws on these when relevant.

**Setting up Coda:** After installing the plugin, run the Coda auth setup:
```bash
cd /path/to/coda-server
node dist/auth/index.js
```
You'll be prompted to paste your Coda API token. Get one at https://coda.io/account (API settings → Generate API token → set type to "MCP").

If you've previously connected Atlassian, disconnect and reconnect once so the latest plugin connector settings are applied.

---

## Slash commands

Once the plugin is installed, type any of these in a Claude Code session to launch a guided workflow:

---

#### `/rf-research:research-advisor`
**Chat with Claude pre-loaded with RainFocus research context.**

This is your conversational catch-all. Use it when you want to:
- Think out loud about a research problem
- Ask open-ended questions
- Get quick advice without creating a deliverable
- Figure out if you even need research
- Decide what to do next
- Make judgment calls on methodology or approach

It has access to the full RainFocus methodology library (25+ methods), CS role definitions, research principles, and design context. When appropriate, it can route you to structured workflows for building plans, critiques, or reports.

*Good for: Any time you want to talk through something without committing to a specific output. Start here if you're not sure where to start.*

---

#### `/rf-research:plan`
**Build a research plan from scratch.**

Claude will ask whether you're doing discovery or validation/usability testing, then walk you through each section of the appropriate template — persona, objectives, hypothesis, scenario or questions, and participant sourcing. At the end you'll have a complete plan ready to drop into Coda.

*Good for: Any time you're starting a new study and need to think it through before diving in.*

---

#### `/rf-research:critique`
**Get honest feedback on a plan you've already written.**

Paste in your research plan and Claude will review it — checking for vague objectives, leading questions, a hypothesis you could never actually disprove, the wrong method for the question, or scope that doesn't match the decision. It gives you a clear verdict and specific fixes.

*Good for: Before you send a plan to Mick for review, or before you start recruiting.*

---

#### `/rf-research:method`
**Get a method recommendation for your specific situation.**

Describe your design phase, what you're trying to learn, your timeline, and any constraints. Claude will recommend one or two methods from our methodology library with a rationale and honest trade-offs — not a generic textbook answer.

*Good for: When you're not sure if interviews, a survey, usability testing, or something else is right for the moment.*

---

#### `/rf-research:synthesize`
**Turn raw notes into structured findings.**

Paste in notes, observations, or transcripts from a completed study. Claude will help you identify patterns, structure findings by theme, pull out the key insight in each area, and frame things in language that's useful for stakeholders and roadmap conversations.

*Good for: After any study, especially when you've got a lot of raw material and aren't sure where to start.*

---

#### `/rf-research:feedback-agent`
**Query customer feedback data to surface themes, pain points, and product insights.**

Give it a topic, a product area, or a specific customer name and it'll search across customer interviews, notes, and feedback sessions to surface what people are actually saying. It can identify recurring themes, prioritize pain points by impact, and pull direct quotes.

*Good for: Checking existing signals before spinning up new research, or grounding a synthesis in real customer language.*

---

#### `/rf-research:find-participants`
**Get specific participant recommendations for your study.**

Describe who you need to talk to and Claude will query the Research Panel, Client Accounts, and CS Assignments in Coda to recommend real people — internal CS users, external clients, or both. Returns names, roles, and context on why they're a good fit.

*Good for: After you've built a research plan and need to identify who to recruit. Always check here before going through a CSM cold.*

---

#### `/rf-research:report`
**Turn a synthesis document into an executive-ready stakeholder report.**

Paste in your synthesis (or a link to it in Coda) and Claude will produce a concise, decision-maker-focused report — recommendation-led, confidence-weighted, and organized around design implications. Where `/synthesize` produces a deep researcher artifact, `/report` produces the 2–3 page version your PM and stakeholders will actually read.

*Good for: After you've synthesized a study and need to communicate findings up the chain.*

---

#### `/rf-research:help`
**Show a cheat sheet of everything the plugin can do.**

Lists all slash commands, connected tools, and general capabilities in one quick reference.

*Good for: When you forget what's available or want a quick overview.*

---

## A few things worth knowing

**Check the Client Research Panel before recruiting.** It's [here in Coda](https://coda.io/d/RainFocus-Product_ddE93PC6Wet/Research-Panel_suBD2z94#_luZ0ABJy). It tracks who's been contacted, when, and for what. We have real client relationships to protect — loop Mick in on outreach.

**Discovery is PM-owned.** If you're doing early discovery research, your PM should be looped in. Claude knows this and will flag it if you seem to be running discovery solo.

**Mick is still a resource.** The assistant is a resource, not a replacement — feel free to reach out to Mick at any time. The goal is more research, better research, and a team that feels confident doing it.

---

*Questions? Find Mick on Slack.*
