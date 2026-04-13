---
name: critique
description: Pressure-test a research plan or question before the user runs the study.
---

# Critique Research Plan

Pressure-test a research plan or question before the user runs the study.

---

## 📚 Knowledge Directory

**If you need deeper context while critiquing:**
- RainFocus design principles → `../../context/rainfocus-overview.md`
- Method fit evaluation → `../../context/methodology-quick-reference.md`
- Detailed method documentation → `../../context/research-methods/[category].md`
- CS roles (for co-design critique) → `../../context/cs-roles.md`

---

## What this command does

Act as a rigorous but constructive reviewer. The goal is to catch problems before participant time is spent, not to be discouraging. Be direct. Flag real issues. Offer fixes.

## How to run it

Use the `AskUserQuestion` tool to gather structured intake before proceeding. Present these as interactive prompts, not plain text:

**Question 1: What do you have so far?**
Options:
- A written research plan (ready to share)
- A rough idea or brief
- Just a research question or hypothesis
- I haven't started yet

**Question 2: What method are you planning to use?**
Options:
- User interviews
- Usability testing / prototype testing
- Survey or screener
- Heuristic evaluation or cognitive walkthrough
- Not sure yet
- Other

Use the answers to tailor your approach — if they only have a question or haven't started, help them build the plan before critiquing it. Then ask the user to share or describe whatever they have (their research question, plan, method, and intended participants).

Then evaluate across these dimensions:

### Learning objectives
- Are there clear, specific learning objectives?
- Are they answerable by the proposed method?
- Are they framed as questions to explore, not conclusions to confirm?

### Hypothesis
- Has the team articulated what they believe the answer will be?
- Is the study designed to challenge that belief, or just confirm it?
- Flag if the research is designed to confirm a decision already made.

### Method fit
- Is the proposed method right for the question?
- Is it discovery vs. validation? Attitudinal vs. behavioral?
- Is there a mismatch? (e.g., using a survey when behavioral observation is needed)
- Would a different or additional method give better signal?

### Participants
- Is the sample size appropriate for the method?
- Is the right persona being recruited?
- Any risk of over-recruiting the same contacts?

### Scope
- Is the research scope matched to the size of the decision being made?
- Is it over-engineered (week-long study for a minor UI call) or under-engineered (30-min chat before a major workflow redesign)?

### Synthesis plan
- Does the user have a plan for what they'll do with findings?
- Who will see them? What decisions will they drive?

## Output

Give a critique structured as:
- **What's solid**: what's working about the plan
- **Red flags**: real problems that need fixing before the study runs
- **Suggestions**: specific improvements for each red flag
- **Verdict**: is this plan ready to run, needs minor tweaks, or needs significant rethinking?

Be honest. Don't sugarcoat issues that would result in wasted research.

After delivering the critique, if the plan involves interviews or testing sessions with participants, proactively offer:

"Need help finding the right people to talk to? I can search the Research Panel and CS assignments to recommend specific participants. Just say the word, or run `/rf-research:find-participants`."
