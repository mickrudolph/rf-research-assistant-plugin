---
name: method
description: Recommend the right research method(s) for a given situation.
---

# Recommend Research Methods

Recommend the right research method(s) for a given situation.

## What this command does

Help the user figure out which research method fits their specific question, constraints, and stage in the design process. Don't just name a method — explain why it fits, what it will and won't tell them, and what the alternatives are.

## How to run it

Use the `AskUserQuestion` tool to gather structured intake before recommending. Present these as interactive prompts, not plain text:

**Question 1: Where are you in the design process?**
Options:
- Early discovery — no designs yet, still defining the problem
- Mid-design — exploring solutions, need directional input
- Pre-launch validation — high confidence needed before handing off to dev
- Post-launch — product is live, evaluating or iterating

**Question 2: Who are the primary users involved?**
Options:
- Attendees
- Exhibitors
- Admins / event organizers (clients)
- Internal RainFocus staff (CSMs, SCs, SAs, etc.)
- Mixed / multiple user types

After gathering those answers via the tool, continue as plain text to understand:
- What they're trying to learn or decide
- What constraints exist (time, budget, participant access, team appetite)
- What they already know (prior research, Amplitude data, client feedback)

## How to recommend

Based on their answers, recommend 1-3 methods. For each:
- **What it is** (one sentence)
- **Why it fits their situation**
- **What it will tell them**
- **What it won't tell them** (important — be honest about limitations)
- **Effort/cost** (low / moderate / high)
- **Sample size needed**
- **When to use it in sequence** (e.g., "run this before usability testing")

If multiple methods fit, recommend a sequence, not just a list.

## Common situations at RainFocus

Use these to inform recommendations:

- **"We don't know what users need"** → User Interviews, Contextual Inquiry
- **"A client requested a specific feature"** → User Interviews to uncover the underlying need
- **"We have a design and want to know if it works"** → Cognitive Walkthrough first, then Usability Testing
- **"We need to validate a prototype with real users"** → Usability Testing (Moderated or Unmoderated)
- **"We need to fix navigation"** → Card Sorting → Tree Testing
- **"We have a lot of research data to make sense of"** → Affinity Mapping → Journey Mapping
- **"We need team alignment before building"** → Participatory / Co-Design Workshop
- **"We need a quick gut-check before usability testing"** → Heuristic Evaluation or Cognitive Walkthrough
- **"We're going to a live event"** → Contextual Inquiry (Onsite)
- **"We want to know if users can find things"** → First Click Testing, Tree Testing
- **"We don't know how users are actually using the product"** → Analytics / Behavioral Analysis, Observation (Screen Recording)
- **"We have behavioral data but need to understand why"** → Analytics / Behavioral Analysis → User Interviews
- **"We want ongoing lightweight user contact"** → Continuous Discovery / Rolling Research Cadence
- **"We need to mine existing feedback before starting research"** → Support Ticket / CS Call Mining, Craft.io review
- **"We want to know if the design feels right for enterprise users"** → Desirability Studies
- **"We need to compare our product to a baseline or competitor"** → Benchmarking Studies
- **"We want to understand a complex admin workflow that spans weeks"** → Diary Studies
- **"We need to understand the full service delivery system"** → Service Blueprinting
- **"A client gave us strategic feedback — does it reflect real user needs?"** → Feedback Sessions / CABs → User Interviews
- **"We need a shared model of who we're designing for"** → Personas / Archetypes

## Output

Give a clear recommendation with rationale. If the user's situation doesn't have enough information, ask for what's missing before recommending.
