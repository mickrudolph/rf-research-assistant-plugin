# Synthesis Methods

Methods for organizing, analyzing, and communicating research findings. Synthesis happens *after* you've collected data, transforming raw observations into actionable insights.

---

## Affinity Mapping

**Category:** Synthesis | **Effort:** Moderate | **Cost:** Low

A synthesis technique where you cluster research notes, observations, or quotes into groups to reveal patterns and themes across data.

### When it fits
- After discovery or validation research, when you're sitting on lots of raw notes
- When you need to identify recurring themes, pain points, or opportunities
- When you want to build shared team understanding after research

### How to conduct well
- Break raw data into discrete notes (one observation per sticky)
- Cluster as a team — the discussion is part of the value
- Name each cluster with a theme or insight, not just a label
- Synthesize into 3–5 overarching themes, mapped back to your learning objectives

### At RainFocus
- Use the `/rf-research:synthesize` skill to guide the process
- Do this collaboratively — you lose the team alignment benefit if done solo
- Reference learning objectives as you cluster — themes should map back to what you were trying to learn
- Timebox it — affinity mapping can expand forever if you're not disciplined

### Outputs
Themed clusters, named categories, research summary

### Pitfalls
- Jumping to themes too quickly before clustering properly
- Labeling clusters with assumptions instead of what participants actually said
- Doing it solo — you lose the team alignment benefit
- Creating too many clusters (more than 5–7) — forces prioritization

### Related methods
→ User Interviews (source material)
→ Journey Mapping (visualize themes across the user experience)
→ Personas / Archetypes (synthesize patterns into user types)

---

## Journey Mapping

**Category:** Synthesis / Framework | **Effort:** Moderate | **Cost:** Low

Visualizing the steps a user takes to achieve a goal, highlighting actions, emotions, touchpoints, and pain points across the experience.

### When it fits
- After discovery research — you need real data to build from, not guesses
- When you want to identify gaps and opportunities across multiple touchpoints
- When you need to align cross-functional teams around the user's perspective

### How to conduct well
- Define scope first: which persona, which scenario, which journey?
- Ground it in research data (interviews, observations, survey insights)
- Capture actions, emotions, and touchpoints for each step
- Highlight pain points, moments of delight, and opportunities
- Share with stakeholders to drive empathy and prioritization

### At RainFocus
- Particularly valuable for admin workflows that span weeks (event setup, execution, wrap-up)
- Include touchpoints with internal teams (SC support, reporting dashboards, etc.) — this isn't just product
- Reference backstage RainFocus systems where relevant — service blueprinting may help if processes are complex
- Tie back to learning objectives — "We learned that admins struggle at phase X" → "Here's X in the journey"

### Outputs
Visual journey map (timeline), pain points and opportunities, stakeholder alignment artifact

### Pitfalls
- Building without research data — guesswork maps are misleading
- Overcomplicating — too much detail obscures key insights
- Treating it as a static artifact instead of updating as new data comes in
- Creating a beautiful map that no one acts on (**Outcomes Over Outputs** principle)

### Related methods
→ Affinity Mapping (source the themes)
→ Service Blueprinting (add the backstage processes)
→ User Interviews (raw material)

---

## Personas / Archetypes

**Category:** Synthesis / Framework | **Effort:** Moderate | **Cost:** Low

Composite representations of key user types, synthesized from research data — interviews, observations, analytics — to give the team a shared, memorable model of who they're designing for.

### Personas vs. Archetypes
- *Personas*: Research-grounded, specific, tied to real behavioral patterns. Named, with goals, frustrations, and context.
- *Archetypes*: More abstract — pattern types that transcend a specific company or role. Useful when the user base is too diverse for tightly defined personas.

### When it fits
- After a significant body of discovery research, when patterns have emerged across multiple participants
- When the team is misaligned about who they're designing for — a shared persona creates a shared reference
- When onboarding new designers or PMs to an unfamiliar product area
- When existing personas feel stale or disconnected from current user reality

### At RainFocus
- Core personas exist for Admin, Attendee, and Exhibitor — before creating a new persona, assess whether updating an existing one is more appropriate
- Personas should cite the research they're built from — a persona without a research foundation is just a character sketch. It can mislead more than it helps.
- Use personas to anchor co-design workshops, usability testing planning, and cognitive walkthroughs

### How to conduct well
- Build from affinity-mapped research data, not team assumptions
- Include: goals, frustrations, key behaviors, context (tools, environment, technical sophistication), and a representative quote
- Keep it to 1 page — personas that require a deep read don't get used
- Validate against the research data: can you point to specific participants who map to this pattern?

### Outputs
1-page persona artifacts, updated design system reference, team alignment on user types

### Pitfalls
- Building personas from assumptions rather than research — "assumptive personas" are worse than no personas at all
- Creating too many — 3–5 distinct personas is the right range. More than that and the distinctions stop being actionable.
- Treating personas as permanent — they need to be updated as new research accumulates
- Using personas to justify design decisions rather than grounding them in actual user research

### Related methods
→ Affinity Mapping (source the patterns)
→ User Interviews (raw material)
→ Journey Mapping (contextual complement)

---

## Service Blueprinting

**Category:** Synthesis / Framework | **Effort:** High | **Cost:** Low

An extension of journey mapping that captures not just what users experience (frontstage) but what happens behind the scenes to make that experience possible (backstage). Service blueprints map the full system: user actions, touchpoints, frontstage staff actions, backstage processes, and support systems — all in one view.

### When it fits
- When a user problem can't be solved without also understanding internal processes and handoffs
- When a journey map exists but doesn't explain *why* certain pain points persist — the answer is usually backstage
- When designing experiences that involve multiple internal teams (e.g., a new exhibitor onboarding flow that touches CS, SC, EDC, and the product)
- When major workflow redesigns risk breaking downstream processes — a blueprint surfaces those dependencies

### At RainFocus
- The RainFocus delivery model is unusually complex — SCs, SAs, EDCs, CSMs, and IEs all play roles in delivering the client experience. A service blueprint is one of the few tools that can hold that complexity at once.
- Especially valuable for onsite operational experiences, where the line between product and people is blurry
- Run as a facilitated workshop with the right mix of internal SMEs — don't attempt to build a blueprint without people who know the backstage

### How to conduct well
- Start with a defined scenario: which persona, which journey, start to finish
- Structure the blueprint in horizontal swim lanes: User actions → Frontstage touchpoints → Line of visibility → Backstage actions → Support systems/tools
- Facilitate collaboratively — no single person knows all the backstage processes. Build it with SCs, EDCs, CSMs, and PMs in the room.
- Identify failure points: where do backstage breakdowns surface as frontstage friction?
- Link to journey map data where it exists

### Outputs
Service blueprint artifact, identified system failure points, cross-team alignment on process, prioritized backstage improvement areas

### Pitfalls
- Building it without the right SMEs in the room — you'll get an incomplete picture of backstage reality
- Conflating service blueprinting with journey mapping — they're related but answer different questions
- Creating a beautiful artifact that sits in a file and never drives a process change (**Outcomes Over Outputs** principle)
- Over-complexity — keep it readable and actionable

### Related methods
→ Journey Mapping (the user-facing part)
→ Participatory / Co-Design Workshop (involves similar SME participation)
→ User Interviews (understand frontstage experience)
