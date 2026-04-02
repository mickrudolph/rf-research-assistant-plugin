# Research Method Quick Reference

Use this to find the right method for your situation.

## Situation-to-Method Mapping

| Situation | Consider |
|---|---|
| "We don't know what our users actually need" | User Interviews, Contextual Inquiry |
| "We have a design and want to know if it works" | Usability Testing, Cognitive Walkthrough, Heuristic Evaluation |
| "We need to clean up our navigation" | Card Sorting → Tree Testing |
| "We have lots of research data and need to make sense of it" | Affinity Mapping, Journey Mapping |
| "We need to align the team before we start building" | Participatory / Co-Design Workshop |
| "We need a quick gut-check before usability testing" | Cognitive Walkthrough, Heuristic Evaluation, First Click Testing |
| "A client requested a specific feature" | User Interviews (to uncover the underlying need) |
| "We're going to a live event" | Contextual Inquiry (Onsite) |
| "We want to know if users can find things in the product" | First Click Testing, Tree Testing |
| "We have a design and need to validate it with real users" | Usability Testing (Moderated) |
| "We need fast prototype feedback at scale" | Usability Testing (Unmoderated), First Click Testing |
| "We don't know how users are actually using the product" | Analytics / Behavioral Analysis, Observation (Screen Recording) |
| "We have behavioral data but need to understand why" | Analytics / Behavioral Analysis → User Interviews |
| "We want ongoing lightweight user contact without discrete studies" | Continuous Discovery / Rolling Research Cadence |
| "We need to mine existing feedback before starting research" | Support Ticket / CS Call Mining, Craft.io review |
| "We want to know if the design feels right for enterprise users" | Desirability Studies |
| "We need to compare our product to a baseline or competitor" | Benchmarking Studies |
| "We want to understand a complex workflow that spans weeks" | Diary Studies |
| "We need to understand the full service delivery system, not just the user experience" | Service Blueprinting |
| "A client gave us strategic feedback and we need to know if it reflects real user needs" | Feedback Sessions / CABs → User Interviews |
| "We need a shared model of who we're designing for" | Personas / Archetypes |

---

## Method Sequencing

Some methods are commonly run together. Know these relationships:

- **Card Sorting → Tree Testing**: Card Sorting creates IA from mental models; Tree Testing validates it works
- **User Interviews → Affinity Mapping**: Interviews generate raw data; Affinity Mapping makes sense of it
- **Affinity Mapping → Journey Mapping**: Themes from affinity mapping can inform journey map structure
- **Cognitive Walkthrough / Heuristic Evaluation → Usability Testing**: Expert reviews clean up obvious issues first; usability testing surfaces what only real users can find
- **Co-Design Workshop → Prototype → Usability Testing**: Workshops generate directions; prototypes make them testable; usability tests validate them
- **First Click Testing → Usability Testing**: First click catches navigation issues early; usability testing goes deeper
- **Support Ticket / CS Call Mining → User Interviews**: Tickets surface the *what*; interviews uncover the *why*
- **Analytics / Behavioral Analysis → User Interviews**: Behavioral data flags where problems exist; qualitative research explains them
- **Observation (Screen Recording) → Usability Testing**: Session replay identifies friction patterns at scale; moderated testing explains root causes
- **User Interviews / Affinity Mapping → Personas / Archetypes**: Discovery research generates the raw material; personas synthesize it into a shared team model
- **Journey Mapping → Service Blueprinting**: Journey maps capture the user experience; service blueprinting adds the backstage system that produces it
- **Usability Testing → Benchmarking (SUS)**: Administer a SUS survey at the close of usability sessions to build quantitative baseline data over time
- **Concept Testing → Usability Testing (lo/mid-fi) → Usability Testing (hi-fi)**: Test the idea before you build it; validate the rough form before committing to the final form

---

## Discovery vs. Validation

**Discovery** is about *understanding the problem space*. You're figuring out what users need and why. 
- **PM-owned**. UX drives and supports.
- Use qualitative methods: interviews, observations, contextual inquiry
- 3–5 participants per persona is enough to see patterns

**Validation** is about *confirming a solution works*. You've built something and want to know if it solves the problem.
- **UX-owned**. PM should be looped in.
- Use both qualitative (usability testing) and quantitative (surveys, analytics, first click testing)
- Depends on confidence needed — 5 users for moderated testing; 10–20 for unmoderated

**Key distinction**: You can't validate a solution that doesn't exist yet. If you're testing early concepts, that's still discovery (or concept testing). Save validation for when the design is coherent.

---

## Core Coaching Principles

### Require learning objectives before recommending methods

If someone doesn't have clear learning objectives, help them articulate them first. A research plan without learning objectives is just activity.

**Good learning objectives:**
- "Understand why exhibitors abandon lead retrieval setup before completing it"
- "Validate whether admins can locate session scheduling in navigation without guidance"

**Bad learning objectives:**
- "Understand the user experience"
- "Get feedback on the design"

### Recommend methods with rationale, not just names

Don't just say "you should do user interviews." Explain:
- Why that method fits their situation
- What it will and won't tell them
- What alternatives exist
- Honest trade-offs (cost, time, participant burden, depth of insight)

### Discovery is PM-owned

If designers are doing early discovery research (defining the problem space), their PM should be looped in. Flag this if it seems like they're running solo discovery.

Validation/usability testing is UX-owned. Discovery is collaborative.

---

## Questions to Always Ask

When evaluating research quality, make sure you can answer:

1. **What is the learning objective?** What specific question does this research answer?
2. **What is the hypothesis?** What does the team currently believe, and what would it look like if they're wrong?
3. **Who are the participants?** Which persona, and how will you recruit them?
4. **What method fits the question?** Is this attitudinal or behavioral? Discovery or validation?
5. **What will you do with the findings?** Who needs to see them, and what decisions will they inform?
6. **Is the scope right for the appetite?** Are you running a week-long study for a decision that could be made with a 2-hour cognitive walkthrough?

If any of these are unclear, the plan needs more work before research starts.

---

## Attitudinal vs. Behavioral Data

**Attitudinal**: What people say
- User interviews, surveys, focus groups, feedback sessions
- Rich context, but filtered through self-report
- Good for understanding motivations and reasoning

**Behavioral**: What people do
- Analytics, session replays, observation, contextual inquiry
- Ground truth about actual usage
- Can reveal workarounds and behaviors users won't describe

**The tension**: What people say doesn't always match what they do. When they conflict, trust the behavioral data.

---

## Research Velocity

Match the depth of your coaching to the stakes of the decision.

- **Small UI change** → First Click Testing (30 min study)
- **New workflow section** → Usability Testing (3–5 hours of sessions)
- **Major feature direction** → Discovery interviews (10–15 hours total, 3–5 participants)
- **Platform redesign** → Ethnographic study (weeks to months)

**Think Big, Start Small**: favor lightweight methods that generate learning quickly.

---

## Detailed Method Documentation

For comprehensive method guides, see:
- **discovery-methods.md** — User interviews, contextual inquiry, diary studies, ethnography, continuous discovery
- **validation-methods.md** — Usability testing, cognitive walkthrough, heuristic evaluation, card sorting, tree testing, first click testing
- **synthesis-methods.md** — Affinity mapping, journey mapping, personas, service blueprinting
- **quantitative-methods.md** — Surveys, analytics, benchmarking, desirability studies
- **workshop-methods.md** — Co-design, feedback sessions / CABs, support ticket mining, observation / screen recording
