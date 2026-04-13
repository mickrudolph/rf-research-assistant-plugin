---
name: plan
description: Guide the user through building a complete research plan before they start any study.
---

# Plan Research Study

Guide the user through building a complete research plan before they start any study.

---

## 📚 Knowledge Directory

**If you need deeper context while building a plan:**
- RainFocus research principles & design philosophy → `../../context/rainfocus-overview.md`
- CS role definitions (for co-design planning) → `../../context/cs-roles.md`
- Method selection guidance → `../../context/methodology-quick-reference.md`
- Detailed method documentation → `../../context/research-methods/[category].md`

---

## What this command does

Walk the user through each component of a solid research plan, one step at a time. Don't dump everything at once — ask, listen, build together.

## Step 0: Establish what kind of research this is

Use the `AskUserQuestion` tool to present this as an interactive prompt, not plain text:

**What type of research is this?**
Options:
- Discovery — learning about user needs, problems, or behaviors
- Validation / Usability Testing — testing a prototype or design
- Not sure yet

If they select "Not sure yet," ask a follow-up (as plain text): "Do you have something to show users, or are you still trying to understand the problem space?" Then guide them to the right type.

This determines which template to use and who owns it:
- **Discovery**: PMs own it. UX drives, encourages, and supports. If a designer is initiating discovery without a PM looped in, flag this.
- **Validation / Usability Testing**: UX owns. PMs should be informed.

## Discovery Research Plan

Walk through these sections in order:

### 1. Target Persona
- Who can speak to your objectives?
- How long should each interview be? (Default: 45 minutes)

### 2. Objectives
Help write 2-3 clear learning objectives. These are the outcomes of the research — what you'll understand by the end.

Push back on vague ones. Good: "Understand why exhibitors abandon lead retrieval setup before completing it." Bad: "Understand the user experience." Don't move forward until these are solid.

### 3. Hypothesis
Ask: "What do you currently believe the answer will be?"
Then: "What would it look like if you were wrong?"

Remind them: research should try to *disprove* the hypothesis, not prove it. If they can't articulate a hypothesis, the plan needs more thought.

### 4. Interview Questions
Help them draft questions organized by objective — these are jumping-off points for natural conversation, not a rigid script. Each question should, if answered, move one of the objectives forward.

Remind them: ask about past behavior, not hypotheticals. "Walk me through the last time you…" beats "Would you ever…"

### 5. Participants
- Which persona(s)?
- How will they recruit? (Client Research Panel: https://coda.io/d/RainFocus-Product_ddE93PC6Wet/Research-Panel_suBD2z94#_luZ0ABJy)
- Have these participants been contacted recently? Check the panel.
- Coordinate outreach with Mick.

### 6. Scope check
Is this the right size study for the decision being made? Flag if over- or under-engineered.

---

## Usability Testing / Validation Plan

Walk through these sections in order:

### 1. Objectives
What are you trying to determine? (e.g., "Can users intuitively add rows and columns in Page Builder?")

### 2. Target Persona
Who should participate? How long per session? (Default: 45 minutes)

### 3. Hypothesis
What do you expect users to be able to do? (Aim to disprove it.)

### 4. Context/Intro (Scenario Setup)
Help them write the scenario that puts the user in the right headspace before touching the prototype. It should describe a realistic situation and a clear user goal — without naming specific UI actions.

Example: "You are an event organizer who has been asked to create the attendee portal page including a session list and branded header."

Remind them: the context drives user actions. If the context is weak, the test will be weak.

### 5. Prototype
- Is it lo/mid-fi (validation — checking problem-solution fit) or hi-fi (usability — ready for dev)?
- Link to the prototype goes here.

### 6. Participants
Same as discovery — check the Client Research Panel, coordinate outreach with Mick.

---

## Output

Summarize the completed plan in the structure of whichever template was used, ready for the designer to copy into the Coda template. Offer to help refine any section that feels thin.

After presenting the completed plan, proactively offer:

"Want me to recommend specific people to talk to for this study? I can search the Research Panel and CS assignments to suggest participants. Just say the word, or run `/rf-research:find-participants`."
