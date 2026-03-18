---
name: synthesize
description: Transform raw research data into structured, actionable findings with powerful insights and comprehensive analysis documents.
---

# Synthesize Research Findings

Transform raw research data into structured, actionable findings. This skill reads your transcripts, extracts observations, generates powerful insights that explain user behavior, and produces comprehensive analysis documents ready to share with stakeholders.

## What this command does

Transform raw research data into structured, actionable findings. This skill:
- Ingests your transcripts, notes, or recordings
- Applies method-appropriate synthesis techniques (affinity mapping, severity rating, etc.)
- Transforms observations into powerful insights that explain user behavior
- Maps findings back to your learning objectives
- Generates comprehensive analysis documents ready to share with stakeholders
- Provides guidance and quality checks throughout the process

## How to run it

Use the `AskUserQuestion` tool to gather structured intake before proceeding. Present these as interactive prompts, not plain text:

**Question 1: What research method did you use?**
Options:
- User interviews
- Usability testing / prototype testing
- Heuristic evaluation or cognitive walkthrough
- Card sorting or tree testing
- Affinity mapping / co-design workshop
- Other

**Question 2: What's your raw data situation?**
Options:
- Notes or transcripts (organized and ready)
- Recordings only (not yet transcribed or reviewed)
- Sticky notes or FigJam clusters
- It's mostly in my head — I need help structuring it

After gathering those answers via the tool, continue the conversation to understand:
- What their original learning objectives were (What questions were you trying to answer?)
- Do you have decision criteria or hypotheses you're validating?
- Who needs to see the findings and what decisions they'll inform?
- Where are your notes/transcripts located? (Or should we structure them together if they're in your head?)

Once context is gathered, the skill will:
1. Read and ingest your research data
2. Extract observations and cluster them by theme (for qualitative) or by task/severity (for evaluative)
3. Transform observations into powerful insights that explain WHY behaviors occur
4. Map findings to learning objectives and assess confidence levels
5. Generate structured analysis document using appropriate template
6. For discovery research: Generate problem statement with scale, impact, and business consequences
7. Review and refine with you
8. Save final deliverable

## How synthesis works (method-specific approach)

### For User Interviews
I will perform synthesis by:
1. **Reading through all transcripts/notes** systematically to extract discrete observations, quotes, behaviors, and pain points
2. **Clustering similar observations** (affinity mapping) — grouping related findings to identify patterns across participants
3. **Naming themes with insight statements** — converting clusters into actionable insights (not just labels) that explain WHY behaviors occur
4. **Mapping themes to learning objectives** — checking if each objective was answered and identifying gaps or ambiguous zones
5. **Generating user-need statements** — formatting as "I need to [do X] so that [Y]" based on evidence
6. **Assessing confidence levels** for each finding:
   - High: Multiple participants, specific examples, consistent patterns
   - Medium: Some participants, examples provided, some variation
   - Low: Single mention, hypothetical, or conflicting data
7. **Creating problem statements** (for discovery research) — documenting scale, impact, and business consequences

### For Usability Testing or Cognitive Walkthrough
I will perform synthesis by:
1. **Organizing issues by task or screen** (not by participant) — grouping failures by what broke, not who experienced it
2. **Severity-rating each issue** using standard scale:
   - Severe: Blocks task completion
   - Moderate: Causes confusion, slows down user
   - Minor: Cosmetic, doesn't block completion
3. **Separating observations from interpretations:**
   - Observation: "3/5 users clicked the wrong button"
   - Interpretation/Insight: "The label may be confusing because users expect X but the system does Y"
4. **Generating prioritized issue log** — what needs fixing before ship vs. future improvements

### For Heuristic Evaluation
I will perform synthesis by:
1. **Consolidating across evaluators** — looking for patterns, not just individual opinions
2. **Mapping each issue to specific heuristic** violated
3. **Severity-rating** before presenting — not all issues are equal
4. **Identifying systemic patterns** — where do multiple heuristics break in the same area?

### For Card Sorting
I will perform synthesis by:
1. **Analyzing clustering patterns** across participants
2. **Identifying consistently grouped items** vs. scattered items
3. **Creating agreement matrix** showing consensus
4. **Treating findings as input** to inform IA, not as prescription

### For Affinity Mapping (workshop-based)
I will perform synthesis by:
1. **Naming each cluster as a theme or insight** — actionable statements, not just labels
2. **Aiming for 3-5 overarching themes** across all clusters
3. **Ensuring themes are actionable** — "Users struggle with X when Y" not just "Navigation"
4. **Connecting themes to learning objectives**

## Observations vs Insights: The critical distinction

Good synthesis transforms observations into insights. Here's the difference:

### Observations = Raw data points
What you saw or heard directly:
- "5/8 participants mentioned wanting to test before publishing"
- "User clicked the wrong button 3 times"
- "Participant said 'I have to do the work twice'"

### Insights = Actionable interpretation
Explains WHY and provides design guidance. Strong insights must be:
- **Actionable** — A designer could use this as a guiding principle
- **Specific** — Not generic or obvious
- **Explanatory** — Reveals user behavior, beliefs, or mental models
- **Insightful** — Non-obvious, reveals something new about how users think

### Examples of weak vs strong insights:

❌ **Weak (just reworded observation):**
"Users want to test workflows before publishing"

✅ **Strong (actionable insight):**
"Users avoid building in test environments specifically because manual rebuild creates opportunities for configuration errors—they'd rather risk breaking live than guarantee inconsistency between environments"
*→ Design implication: Promotion mechanism more valuable than separate environments*

---

❌ **Weak:**
"Participants mentioned versioning multiple times"

✅ **Strong:**
"Versioning serves two distinct jobs: forward-looking preview (testing) prevents problems, while backward-looking comparison (history) diagnoses problems. Users need both but for different moments in their workflow."
*→ Design implication: Testing and versioning may need separate UIs optimized for different tasks*

---

❌ **Weak:**
"Users are frustrated with the current workflow"

✅ **Strong:**
"The 1% of post-go-live urgent fixes carry disproportionate visibility and pressure—users will tolerate complexity in pre-launch workflows but demand zero-friction tools for live crisis management"
*→ Design implication: Prioritize speed/simplicity for post-launch changes over pre-launch flexibility*

### How I generate insights:
1. **Look for patterns across participants** — What did multiple people say/do?
2. **Ask "why" repeatedly** — What belief or mental model drives this behavior?
3. **Connect to user goals** — What job are they trying to accomplish?
4. **Identify tensions** — Where do users compromise or make tradeoffs?
5. **Find the non-obvious** — What surprised you? What contradicts assumptions?
6. **Make it actionable** — Can a designer/PM make decisions based on this?

## Connecting back to learning objectives

Before producing final output, I will explicitly check:
- Did we answer each learning objective? (Map findings to each objective)
- Where did we hit saturation vs. where do we still have gaps?
- What would we need to do to answer the unanswered questions?
- Are there conflicting findings that need reconciliation?
- What's our confidence level for each major finding?

This quality check ensures synthesis is grounded in the original research goals, not wandering into interesting but irrelevant territory.

## Output formats I will generate

Based on your study type and audience, I will generate the appropriate structured document:

### 1. Interview Analysis Document (Discovery Research)
**When to use:** Individual discovery interviews with learning objectives and decision criteria

**Structure:**
```markdown
# [Participant Name] Interview Analysis
**Date, Participant, Interview Type, Analyzed**

## Executive Summary
- Key Finding (1-2 sentence insight)
- Confidence Level (High/Medium/Low with justification)
- Segmentation Note (who this represents)

## [Objective 1]: [Research Question]
### Decision Criteria Mapping
- ✅ CONFIRMED → Evidence
- ❌ REJECTED → Evidence
- ❓ AMBIGUOUS ZONE → Explanation

### Detailed Findings
#### [Theme/Finding Name]
**What [Participant] said:**
> "Direct quote"

**The job this does/problem this creates:**
- Interpretation bullets

**Key insight:** [Why this matters, what it means for design]

## Additional Insights
[Patterns, unexpected findings, technical observations]

## Problem Statement (Discovery Only)
**"[Quote summarizing problem]"**
* Problem Scale: [Quantification]
* Who's Impacted: [Roles/personas]
* Problem: [Core issue, solution-neutral]
* Where: [Context in workflow]
* Business Impact: [Consequences]

## Recommendations for Next Steps
## Participant Profile
## Appendix: Key Quotes by Theme
```

**Example Problem Statement:**
**"100% of implementers rely on unsafe workarounds to validate live workflow changes, resulting in data pollution, costly integration triggers, or 50% of their time spent on manual duplication."**

* Problem Scale: 100% of implementers (internal and partner teams managing live workflows)
* Who's Impacted: RainFocus implementation specialists configuring pages, forms, widgets, and connections
* Problem: No safe validation path without data pollution, unintended actions, or manual re-creation
* Where: During the change validation and deployment phase of live workflow management
* Business Impact: Implementation team absorbing massive rework costs; customers lacking confidence in production changes

---

### 2. Usability Test Report (Evaluative Research)
**When to use:** Task-based testing, prototype validation, cognitive walkthroughs

**Structure:**
```markdown
# Usability Test Results: [Feature/Product Name]

## Executive Summary
- Participants: [N users, brief profiles]
- Tasks tested: [List]
- Overall success rate: [X%]
- Critical issues: [Number]

## Issues by Severity

### Severe (Blocks task completion)
1. **[Issue title]**
   - Affected: X/Y users
   - Task: [Which task]
   - Observation: [What happened]
   - Insight: [Why it matters, what user mental model reveals]
   - Recommendation: [Fix suggestion]

### Moderate (Causes confusion/slowdown)
[Same structure]

### Minor (Cosmetic/nice-to-have)
[Same structure]

## Task-by-Task Analysis
[Success rate, time, path analysis, quotes]

## Recommendations
[Prioritized: Fix before launch vs. Future improvements]
```

---

### 3. Affinity Map Summary (Multi-Interview Synthesis)
**When to use:** Synthesizing patterns across multiple interviews or workshop sessions

**Structure:**
```markdown
# Research Synthesis: [Study Name]

## Overarching Themes (3-5 max)

### Theme 1: [Actionable insight statement]
**What we learned:** [Explanation]
**Supporting evidence:** [Key observations, participant quotes]
**Implications:** [What this means for design/product]

[Repeat for each theme]

## Mapping to Learning Objectives
- Objective 1: [✅ Answered / ❓ Partially answered / ❌ Gap]

## User Needs Identified
1. **"I need to [do X] so that [Y]"** - [Context/frequency]

## Gaps & Next Steps
[What we still don't know, what research is needed]
```

---

### 4. Problem Statement (Discovery Research Only)
**When to use:** When discovery research identifies a validated problem requiring product attention

**Critical components:**
- **Quote**: Impactful summary in user's words
- **Problem Scale**: Quantify how many affected
- **Who's Impacted**: Specific roles/personas
- **Problem**: Core issue (solution-neutral)
- **Where**: Context within workflow/platform
- **Business Impact**: Time/cost/quality/competitive consequences

**I will generate this format automatically for discovery research synthesis.**

---

I will select and generate the appropriate format based on your research method and objectives, grounded in what you actually learned.
