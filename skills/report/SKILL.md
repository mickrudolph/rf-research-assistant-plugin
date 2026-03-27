---
name: report
description: Transform comprehensive research synthesis documents into executive-ready stakeholder reports. Use this skill when the user wants to create a stakeholder report, executive summary, or decision-maker brief from interview analyses, affinity maps, or usability test reports. Triggers when user mentions "report", "stakeholder report", "executive summary", "synthesis report", or asks to convert research findings into a format for executives/product managers/decision-makers.
---

# Research Reporting Skill

Transform comprehensive synthesis documents (10-12 pages) into executive-ready stakeholder reports (2-3 pages). Where `/synthesize` produces researcher artifacts (deep, evidence-rich, comprehensive), `/report` produces decision-maker artifacts (recommendation-led, confidence-weighted, progressively disclosed).

**Key Focus:** Reports must be highly design-centric. Every finding should explicitly guide what to do in design. The big output is: **"What design principle can I take into the next phase?"** Whether moving from discovery to early concept, or from testing to iterative designs, stakeholders need clear design implications in the format: "users felt X about Y, therefore in our designs we should... Z."

## Core Principles

Your output must follow these research-backed principles:

### 0. Never Make Up Data (CRITICAL)

**IMPORTANT:** Only surface information that exists in the synthesis document. If business impact metrics, timelines, next steps, or other data are missing:
- Generate the report with what exists
- Complete all mandated assets (markdown, HTML if selected)
- Then use AskUserQuestion in Step 12 to ask the user for missing information
- **Never invent, estimate, or fabricate:** metrics, timelines, costs, participant quotes, or business impact data

**Exception:** You may use basic arithmetic with synthesis data (e.g., "5 participants × 30 min = 2.5 hours total") but never extrapolate beyond what's given. Flag missing quantification in Step 12.

### 1. Inverted Structure (Minto Pyramid Principle)
Lead with the answer, not the research journey.
- **Recommendations first** ("what should we do?")
- **Insights second** ("what did we learn?")
- **Evidence third** ("how do we know?")

Stakeholders scan, decide if it's worth their time, and drill in selectively. Never bury recommendations at the end.

### 2. Three-Layer Compression
Create progressive disclosure:

**Layer 1: The Glance (~0.5 page, 60 seconds)**
- Verdict (one-sentence summary)
- 2-4 actionable recommendations with confidence levels
- Stakeholder can walk into a meeting informed

**Layer 2: The Scan (~1.5 pages)**
- 3-5 key findings as structured cards
- Each card: finding title + confidence badge + killer quote + participant count + business impact
- Scannable validation matrix

**Layer 3: The Deep Dive**
- Link back to full synthesis document
- NOT reproduced in the report
- Available for those who need full evidence

**Target compression:** 10-12 page synthesis → 2-3 page report (4:1 ratio)

### 3. SCQA as Narrative Scaffolding
Structure the entire report around SCQA framework:
- **Situation**: What's the current state? (from research context)
- **Complication**: Why is it a problem now? (validated pain points with business impact)
- **Question**: What decision needs to be made? (embed in verdict, don't create separate section)
- **Answer**: Your recommendations (derived from findings)

The question should be implicit or woven into the verdict—don't create a separate "The Question" heading that disrupts the answer-first flow.

### 4. Confidence Over Severity
For discovery research, use confidence levels, not severity ratings:
- **HIGH**: Multiple participants, specific examples, consistent patterns (justify with participant count)
- **MODERATE**: Some participants, examples provided, some variation
- **EMERGING**: Single mention, needs more data, or exploratory pattern

Only use severity ratings (Critical/Major/Minor) for usability test reports.

### 5. The "So What" Bridge
Every finding MUST explicitly translate from research insight to business decision.

**Not this:** "Users want to test before publishing"

**But this:** "100% of participants avoid test environments because manual rebuild creates configuration errors—they'd rather risk breaking live than guarantee inconsistency. **Investment implication:** Promotion mechanism more valuable than separate environments."

### 6. Participant Voice as Persuasion
One killer quote per finding does more persuasion work than three paragraphs of analysis. Quotes should:
- Capture emotional impact and user perspective
- Be specific and relatable
- Be formatted as blockquotes for visual emphasis
- Prioritize showing over telling

## Process Flow

Follow these steps systematically.

**IMPORTANT:** Throughout this workflow, use the **AskUserQuestion** tool whenever you need to gather user input, make decisions, or ask questions. Never use plain text prompts that wait for text responses—always structure questions using AskUserQuestion with proper options. The tool automatically provides an "Other" option for custom text input, so users can always provide alternative responses.

**UI Note:** Always output the question as text BEFORE calling AskUserQuestion, since the tool's `question` parameter may not be visible in the UI. This ensures users see the question in the conversation even if the tool UI doesn't render it.

**Header Note:** The `header` field appears as a blue chip in the UI — it's the most visible part. Always use a short, descriptive label that tells the user what the question is about (e.g., "Source file", "Output Format", "Missing data"). Never use generic labels like "Question" or "Input".

**Critical UX Note:** The `question` text flashes briefly then disappears — users may never see it. The only persistent elements are the `header` chip and the option `label` + `description`. **Always write option descriptions so they make sense on their own without the question.** The user should be able to understand what's being asked purely from the header and options.

### Step 1: Understand Input Requirements

**Required from user:**
- Path to synthesis document (Interview Analysis, Affinity Map Summary, or Usability Test Report)

**Optional:**
- Output filename (default: `report-[synthesis-name].md`)
- Save location (default: same directory as synthesis)

**If synthesis document path is not provided by the user**, ask the question as text output first, then use AskUserQuestion to gather it:

**Output this text first:**
"What is the path to your synthesis document?"

**Then use AskUserQuestion:**
```
Use AskUserQuestion with:
- question: "What is the path to your synthesis document?"
- header: "Source file"
- options:
  1. label: "I'll provide the path", description: "I'll paste the full path to my synthesis document (Interview Analysis, Affinity Map, or Usability Test Report)"
  2. label: "Find it for me", description: "Search my current directory for recent synthesis documents and show me what you find"
- multiSelect: false
```

If user selects "Find it for me", use Glob to search for likely synthesis files (pattern: `**/*synthesis*.md`, `**/*interview-analysis*.md`, `**/*affinity*.md`) and present results.

### Step 1.5: Determine Output Format

**Output this text first:**
"What format would you like your report delivered in?"

**Then use AskUserQuestion to gather format preference:**

```
Use AskUserQuestion with:
- question: "What format would you like your report delivered in?"
- header: "Output Format"
- options:
  1. label: "HTML (Recommended)", description: "Interactive RF-branded HTML file (report-[topic]-[MM-DD-YYYY].html). Opens in any browser with collapsible sections, clean design, and RainFocus branding. Also saves .md file for reference."
  2. label: "Markdown only", description: "Text-based markdown report (report-[topic]-[MM-DD-YYYY].md). Best for version control and quick sharing."
- multiSelect: false
```

After selection, proceed to Step 1.5.1 to route to the appropriate workflow.

### Step 1.5.1: Route to Format-Specific Workflow

**Format 1 (Markdown only):** Steps 2-10, then Step 12.

**Format 2 (HTML - Recommended):** Steps 2-10, then Step 11 (run Python script to generate HTML), then Step 12.

### Step 2: Read and Parse Synthesis Document

Read the full synthesis document and identify:
- Synthesis type (Interview Analysis vs Affinity Map vs Usability Test)
- **Research context and objectives** - Extract:
  - Original problem statement (what was being researched and why)
  - Learning objectives (what questions the research aimed to answer)
  - Decision criteria (if present - what would validate/invalidate hypotheses)
- **Initial hypotheses or assumptions** (if present - check for "hypothesis," "we expected," "assumptions," decision criteria sections)
- Participant information and profiles
- Key findings with supporting evidence
- Problem statements and validated patterns
- Areas needing more data
- **Business impact data** - Extract ONLY what exists in synthesis:
  - Time costs (minutes/hours wasted per action)
  - Frequency (how often the problem occurs)
  - Scope (how many people affected)
  - **NEVER estimate or fabricate** - if data is missing, note it for Step 12 follow-up

**Note:** If initial hypotheses exist, you'll include a "Hypothesis Comparison" section later to show what was confirmed vs. challenged.

### Step 3: Extract Research Context and SCQA Elements

**First, build the Research Context section:**
- **Original problem statement:** Extract 1-2 sentences from synthesis introduction describing what problem the research aimed to solve
- **Learning objectives:** Extract 2-4 objectives from synthesis (often labeled "Research Objectives," "Learning Objectives," or "Decision Criteria")
- **Validation/refinement statement:** Prepare to synthesize (in Step 5) how findings confirm, expand, or redirect the original problem framing

**Then build the narrative foundation (SCQA):**

**Situation:**
- What was being researched?
- What's the current state/workflow?
- Extract from synthesis introduction or executive summary

**Complication:**
- What validated problems emerged?
- What business impact do they have? (ONLY from synthesis data - never estimate)
- Extract from key findings, problem statements, or high-severity issues

**Question (implicit):**
- What decision needs to be made?
- Derive from research objectives or decision criteria
- DO NOT create a separate "The Question" section—embed it in the verdict

**Answer:**
- Will be the recommendations you derive in Step 5

### Step 4: Identify Top Validated Findings

Select 3-5 findings using these prioritization criteria:
1. **Confidence level** (prioritize HIGH confidence findings)
2. **Participant validation count** (how many confirmed it?)
3. **Business impact** (time cost, quality impact, competitive risk)
4. **Actionability** (can decisions be made from this?)

For each finding, extract:
- Finding title (short and punchy, 5-7 words max - e.g., "No Safe Testing Environment Exists" not "Publish-to-Live Model Exposes Attendees to Broken Workflows")
- Confidence level and justification (participant count, pattern consistency)
- Key supporting evidence (observations, quotes, behaviors)
- Participant count validating it (X/Y format)
- Business impact statement ("so what" for product/roadmap/investment) - **ONLY use data from synthesis, never estimate or fabricate**
- **Design implications** - Concrete design principles structured as:
  - **Must have:** 2-4 specific feature requirements or design constraints
  - **Must avoid:** 1-2 anti-patterns or approaches that failed
  - Use actionable language: "Preview mode visible only to specified users/roles" not "support preview capability"
- One killer quote that captures the user perspective

### Step 5: Derive Recommendations

**CRITICAL:** Recommendations are synthesized FROM findings, not extracted separately.

For each validated finding:
1. Articulate the business implication ("so what for roadmap/investment?")
2. Identify design/product decision points
3. Note tradeoffs or constraints

Then synthesize 2-4 actionable recommendations that:
- Are specific, not generic ("Build atomic promotion mechanism" not "Improve testing")
- Have clear ownership potential (who would execute?)
- Are tied to validated findings (traceable via confidence level)
- Are prioritized by impact and confidence

Each recommendation should reference its source finding and include confidence level.

### Step 6: Build Supporting Elements

**Confidence Badges:**
Format as: `**Confidence:** HIGH | **Validated by:** 5/5 participants`

Include brief justification:
- HIGH: "All 5 participants confirmed with specific examples"
- MODERATE: "3/5 participants validated; some variation in context"
- EMERGING: "Single mention from 1 participant; needs more data"

**Killer Quotes:**
- Select 1 quote per finding
- Prioritize emotional impact and specificity
- Format as blockquote: `> "Quote text" — Participant Name`
- Avoid generic quotes ("this is frustrating")
- Choose quotes that make stakeholders internalize the user's perspective

**Validation Matrix:**
Create a table showing consensus across findings with validation mechanisms:
- Participants as columns, findings/problems as rows
- **Show HOW each participant validated** - Use brief mechanism labels instead of just ✅/⚠️/—
  - Example: "✅ Branding trial-and-error in live" instead of just "✅"
  - Example: "✅ Test workflows in prod" instead of just "✅"
  - Example: "⚠️ Context-dependent" for partial validation
  - Example: "—" for not discussed
- This transparency shows the validation mechanism, not just the conclusion
- Include a "Status" column showing overall validation strength (STRONGLY VALIDATED / VALIDATED / NEEDS MORE DATA)
- **REQUIRED:** Add an "Interpretation" paragraph after the matrix (2-3 sentences) that explains the patterns: which findings have strongest consensus, which are secondary patterns, which come from specific participant contexts

**What We Don't Know Yet:**
- Extract from "Areas Needing More Data" in synthesis
- **Structure by priority:** BLOCKER (must know before investment decision), CRITICAL FOR DESIGN (must know before building), NICE TO HAVE (can be resolved during design)
- Frame as "open questions for next round"
- Signals rigor and prevents over-indexing on emerging patterns
- Identifies gaps honestly with clear implications for timeline/risk

### Step 7: Generate Report Structure

Read the report template: `find ~/.claude -name "report-template.md" -path "*/report/*" 2>/dev/null`

**CRITICAL: Copy the template's structure EXACTLY. Do not rename, reorder, or restructure sections.** Specifically:

1. **Use `## Executive Summary` with `### Verdict` and `### Recommendations` nested inside** — do NOT create standalone `## Verdict` or `## Recommendations` sections
2. **Recommendations must be a numbered list** (e.g., `1. **Recommendation** — rationale. (HIGH confidence)`) — do NOT create `### subsections` for each recommendation
3. **Finding sub-sections must use these EXACT labels in this EXACT order:**
   - `**Confidence:** HIGH | **Validated by:** X/Y participants`
   - `> "Killer quote"` (immediately after confidence line)
   - `**What this means for investment/roadmap:**` (NOT "Business Impact")
   - `**Design implications:**` → `**Must have:**` (numbered) + `**Must avoid:**` (bulleted)
   - `**Supporting evidence:**` (NOT "Evidence")
4. **Use `Finding 1:` not `Finding #1:`**
5. **Use `## What We Don't Know Yet`** (NOT "Open Questions" or "Gaps")

The HTML converter depends on these exact labels. If you deviate, the report will render without styling.

### Step 8: Apply Method-Specific Adaptations

**For Interview Analysis (Discovery Research):**
- Focus on problem statements with business impact
- Prioritize insights that explain user behavior/mental models
- Include validated problem scale (quantification from multiple participants)
- Recommendations should address workflow/system gaps

**For Affinity Map Summary (Multi-Interview Synthesis):**
- Focus on themes across participants
- Show consistency of patterns in validation matrix
- Recommendations should address systemic issues
- Validation matrix is particularly important here

**For Usability Test Reports (Evaluative Research):**
- Shift to severity language (Severe/Moderate/Minor) rather than confidence
- Focus on task completion rates and blockers
- Recommendations should be fix priorities (ship-blockers vs future improvements)
- Include success rate metrics in executive summary

### Step 9: Quality Checks Before Saving

Verify all of these before generating final output:

- [ ] **Research Context section included** with original problem statement, learning objectives, and validation/refinement statement
- [ ] Recommendations lead (not buried at the end)
- [ ] Each recommendation ties to a specific validated finding
- [ ] Each finding has a confidence level with justification (participant count)
- [ ] Each finding has the "so what" business implication (ONLY from synthesis data - no fabrication)
- [ ] **Design implications use "Must have" and "Must avoid" format** with concrete, actionable requirements
- [ ] Quotes are impactful and support the finding (not filler)
- [ ] **Validation matrix shows HOW participants validated** (mechanisms, not just checkmarks)
- [ ] Validation matrix includes "Interpretation" paragraph explaining patterns
- [ ] "What We Don't Know" section is present, honest, and structured by priority (BLOCKER/CRITICAL/NICE TO HAVE)
- [ ] Methodology note is brief but sufficient for trust
- [ ] Link to full synthesis is included (relative path)
- [ ] Report compresses to 2-3 page equivalent
- [ ] SCQA narrative arc is clear throughout
- [ ] Question is embedded in verdict, not a separate section
- [ ] **No data was fabricated or estimated** - all metrics/timelines from synthesis or flagged as missing

### Step 10: Save Report

**IMPORTANT:** Create an organized folder structure for the report output.

1. **Create output folder:**
   - Folder name: `report-[research-topic]-[MM-DD-YYYY]/`
   - Location: Same directory as synthesis document
   - Example: `/path/to/synthesis/report-testing-versioning-03-26-2026/`
   - **Date format: MM-DD-YYYY** (NOT YYYY-MM-DD)

2. **Save markdown report inside folder:**
   - Filename: `report-[research-topic]-[MM-DD-YYYY].md`
   - Full path: `[synthesis-dir]/report-[research-topic]-[MM-DD-YYYY]/report-[research-topic]-[MM-DD-YYYY].md`

3. **Store the folder path** for Step 11 (HTML generation will save inside the same folder)

---

## Phase 2: HTML Generation

### Step 11: Generate RF-Branded HTML (Format 2 Only)

**Execute only if:** User selected Format 2 (HTML)

**IMPORTANT: Do NOT use the Agent tool, subagents, or delegation. First find the script, then run it:**

1. Find `generate_html.py` by running: `find ~/.claude -name "generate_html.py" -path "*/report/*" 2>/dev/null`
2. Run it: `python3 /path/to/generate_html.py FULL_PATH_TO_MARKDOWN_FILE`

Replace `FULL_PATH_TO_MARKDOWN_FILE` with the actual path from Step 10. The script handles everything (branding, styling, opening in browser). No other action needed.

**After Step 11:** Continue to Step 12.

---

### Step 12: Post-Generation Follow-Up (REQUIRED)

After generating the report, review the synthesis and identify what information was genuinely missing. Only ask about missing pieces — don't ask about things already present in the report.

**Check for these elements (only flag if actually missing):**
- Business impact quantification (aggregate costs, hours/year)
- Timeline and next steps (decision deadline, ownership)
- Hypothesis comparison (if synthesis had hypotheses)
- Design implications (if any finding lacks them)

**Output the question text first, then use AskUserQuestion** with only relevant options plus "Additional context" and "No edits needed" (always include these two).

**If user selects options to add:** gather data via AskUserQuestion, update markdown, re-run the HTML script if Format 2, confirm file locations.

**If "No edits needed":** confirm completion with folder location.

---

## Visual Hierarchy Reminders

- Consistent heading levels: `#` title, `##` sections, `###` findings
- `---` between major sections
- Short paragraphs (2-4 sentences max)
- **Bold** key takeaways and lead-in sentences
- Blockquote syntax (`>`) for participant quotes
- Confidence levels visually prominent
