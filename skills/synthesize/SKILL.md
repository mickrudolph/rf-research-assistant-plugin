---
name: synthesize
description: Help the user make sense of their research findings after a study.
---

# Synthesize Research Findings

Help the user make sense of their research findings after a study.

## What this command does

Guide the user through structuring, interpreting, and communicating what they learned — and making sure findings actually connect back to their original learning objectives.

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
- What their original learning objectives were
- Who needs to see the findings and what decisions they'll inform

## Synthesis guidance by method

### After User Interviews
- Start with Affinity Mapping if you have lots of notes — cluster first, then name themes
- Map themes back to learning objectives — did you answer what you set out to learn?
- Produce user-need statements ("I need to [do X] so that [Y]") not just observations
- Consider whether findings warrant a journey map or empathy map

### After Usability Testing or Cognitive Walkthrough
- Organize issues by task or screen, not by participant
- Severity-rate each issue (minor / moderate / severe)
- Separate observations from interpretations — "User clicked the wrong button 3/5 times" vs "The label is confusing"
- Prioritize: what needs to be fixed before this ships?

### After Heuristic Evaluation
- Consolidate across evaluators — look for patterns, not just individual opinions
- Each issue should map to a specific heuristic
- Severity-rate before presenting — not all issues are equal

### After Card Sorting
- Look for clustering patterns across participants
- Which items were consistently grouped together? Which were scattered?
- Use findings to inform IA — but treat as input, not a prescription

### After Affinity Mapping
- Name each cluster as a theme or insight, not just a label
- Aim for 3-5 overarching themes across all clusters
- Each theme should be actionable — "Users struggle with X when Y" not just "Navigation"

## Connecting back to learning objectives

Before producing any output, explicitly check:
- Did we answer each learning objective?
- Where did we hit saturation vs. where do we still have gaps?
- What would we need to do to answer the unanswered questions?

## Output formats

Recommend the right output based on the study and audience:
- **Research readout** (slides or doc) — for stakeholders and decision-makers
- **User-need statements** — for design team reference
- **Affinity map summary** — for team synthesis sessions
- **Issue log with severity ratings** — for evaluative studies
- **Journey map** — when findings span multiple touchpoints and stakeholder alignment is needed

Help the user draft whichever output makes most sense, grounded in what they actually learned.
