---
name: find-participants
description: Recommend specific research participants (internal CS users and external clients) by querying the Research Panel, Client Accounts, and CS Assignments in Coda. TRIGGER when user asks who to talk to, needs participants for a study, or after building a research plan.
---

# Find Research Participants

Search the team's Coda research databases to recommend specific people to talk to for a research study — internal CS users, external clients, or both.

---

## Data Sources

All data lives in the RainFocus Product Coda doc. Use the `rf-coda` MCP tools to access these tables. Start by using `url_convert` with `action: "decode"` on each URL to get the `uri` and `docUri` needed for queries.

### Research Panel (external participants)
**URL:** `https://coda.io/d/RainFocus-Product_ddE93PC6Wet/Research-Panel_suBD2z94#_luZ0ABJy`

Database of all external research participants. Columns:
- Name, Company, Title, Email
- Source (where we met them)
- Notes
- Research participation (which studies they've been in — ties back to the Research Repository)
- Latest contact (dynamically updated based on last appearance in the Repository)
- Type (client, agency/freelancer, exhibitor, other)

### Client Accounts (company-level data from Salesforce)
**URL:** `https://coda.io/d/RainFocus-Product_ddE93PC6Wet/Clients-Events-CS-Assignments_su6vh8F3#_luTpSU9c`

Companies currently using RainFocus. Columns:
- Account name, Details (overview, industry)
- CSM (assigned Customer Success Manager(s))
- Last contacted for research (date)
- Number of research studies participated in
- Number of tier 1, 2, and 3 event programs
- Whether they are a "key" account (CARR > $1M)
- Vertical, Industry

### Events
Same page as Client Accounts. Event programs per client. Columns:
- Event name, Account name
- Event start/end date, Event type (tier 1/2/3)
- Delivery type (onsite, virtual, hybrid)
- Using AIM?, Agency, Badge type, Meetings platform

### Projects & Assignments (internal CS users)
Same page as Client Accounts. CS team members assigned to client projects. Columns:
- Person name, CS role
- Assignment start/end date, Forecasted hours
- Account name, Project name
- Project start/end date, Project forecasted hours, Project actual hours

For CS role definitions, reference: `../../context/cs-roles.md`

### Research Repository (past studies)
**URL:** `https://coda.io/d/RainFocus-Product_ddE93PC6Wet/Product-Research-Repository_sugyYf-0#View-of-Research-Findings_tuTrzjOB/r308`

Past research initiatives. Useful for cross-referencing who has already participated in what. Columns:
- Team name, Team initiative, Date
- Researchers/stakeholders
- Research type (discovery, validation, user testing)
- Key findings, Resource links
- Internal participants, External participants
- Companies involved

---

## How to Run This Skill

### If invoked explicitly (`/rf-research:find-participants`)

Use `AskUserQuestion` for structured intake:

**Question 1: What kind of research are you doing?**
Options:
- Discovery — exploring a problem space
- Validation / Usability testing — testing a solution
- Not sure yet

**Question 2: Who do you need to talk to?**
Options:
- External clients (end users of RainFocus)
- Internal CS team (Solution Consultants, Solution Architects, etc.)
- Both internal and external
- Not sure — help me figure it out

**Then ask in plain text:**
- What's the topic or feature area? (e.g., "workflows," "exhibitor management," "page builder," "registration")
- Any specific constraints? (e.g., "needs to have tier 1 events," "agency users only," "not someone we talked to recently")
- How many participants are you targeting?

### If invoked from conversation context (after plan, critique, or advisor)

Skip the intake questions — pull context from the conversation. You already know the research type, objectives, target persona, and topic area. Go straight to querying.

---

## Query Strategy

### Default: suggest internal first, then external

Internal CS users (Solution Consultants, Solution Architects, etc.) are a huge part of the RainFocus user base and are dramatically easier to schedule. Unless the user specifically needs external clients, **lead with internal recommendations** and then offer external as a complement.

A good default recommendation is a mix: internal users for fast early signal, external clients for validation depth.

### Step 1: Understand what you're looking for

From the intake (or conversation context), identify:
- Feature area / topic
- Whether internal, external, or both are needed
- Any constraints (recency, company type, event tier, etc.)

### Step 2: Query for internal participants (Projects & Assignments)

Search the Projects & Assignments table for CS team members who:
- Are actively assigned to relevant projects
- Have roles that match the persona needed (use `../../context/cs-roles.md` for role definitions)
- Prioritize Solution Consultants and Solution Architects — they are the primary "builders" in the platform

Surface: name, CS role, which client/project they're assigned to, and their forecasted hours (as a proxy for depth of involvement).

### Step 3: Query for external participants (Research Panel + Client Accounts)

1. **Research Panel** — search for people whose company, title, type, or notes are relevant to the study topic. Check their `latest contact` date and `research participation` history.

2. **Client Accounts** — if the study needs specific company characteristics (key accounts, specific event tiers, delivery types), filter here first to identify target companies, then find contacts at those companies in the Research Panel.

3. **Cross-reference with Research Repository** — check which studies these people/companies have already participated in. This is context for the recommendation, not a disqualifier.

### Step 4: Check for over-contact risk

For each recommended participant, surface their `latest contact` date and what study it was for. Don't auto-exclude anyone — just flag it and let the user decide.

---

## Output Format

Structure recommendations like this:

### Internal Participants (CS Team)

For each person:
- **Name** — CS Role
- Currently assigned to: [Client] / [Project]
- Why they're a fit: [brief rationale tied to research objectives]

### External Participants (Clients)

For each person:
- **Name** — Title, Company
- Email: [email]
- CSM: [their assigned CSM name(s)] — reach out through them
- Last contacted: [date] for [study name], or "No prior research contact"
- Why they're a fit: [brief rationale]

### Recommended Mix

Suggest a balanced participant mix based on the study needs. Call out:
- How many internal vs. external
- Any gaps (e.g., "no agency users in this list — worth recruiting if you want that perspective")
- Anyone who's been contacted recently (flag, don't exclude)

---

## Important Notes

- **CSM outreach for external clients:** Good practice is to reach out to a client through their assigned CSM rather than cold-emailing. Always surface the CSM name alongside external participant recommendations.
- **Don't over-filter:** Don't exclude people based on vertical or industry alone. Use those as context, not gatekeepers.
- **Salesforce data caveat:** Client Account data comes from Salesforce via a Coda pack. It's generally trustworthy but may not be perfectly current.
- **Coordinate with Mick:** For external outreach, the user should coordinate with Mick Rudolph (Research Lead) on recruitment logistics.

---

## Tone

Be practical and specific. The whole point of this skill is to save people the 20 minutes of manually cross-referencing spreadsheets. Give them names, context, and a clear rationale — not a generic list.
