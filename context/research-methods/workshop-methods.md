# Workshop & Collaborative Methods

Methods involving group collaboration, facilitated sessions, or mining existing organizational knowledge without formal participant recruitment.

---

## Participatory / Co-Design Workshops

**Category:** Discovery | **Effort:** Moderate | **Cost:** Low

Collaborative workshops where designers, PMs, and subject-matter experts work together to explore problems and generate early concepts. Designing *with* stakeholders, not *for* them.

### When it fits
- Early in discovery or concept development, before committing to a direction
- When you need to align multiple teams around a shared problem definition
- When making sense of complex workflows that span multiple product areas
- At RainFocus: especially valuable with internal SMEs who have deep client and domain knowledge

### Workshop composition by problem type
- **Configuration/workflow problems**: Solution Consultant + Solution Architect
- **Strategic or account-level problems**: CSM + SA + PM
- **Onsite/live event problems**: EDC + Implementation Engineer + SC
- **Broad platform problems**: PM + UX + SC + SA is a strong baseline combination

### Why this matters at RainFocus
The product spans attendee, exhibitor, admin, reporting, and onsite workflows. No single team sees the full picture. Co-design surfaces cross-functional perspective early, preventing solutions that break downstream workflows.

### How to conduct well
- Select the right mix for the problem area (don't default to the same people every time)
- Prepare lightweight materials: sticky notes, sketch templates, activity boards
- Define timeboxes and a clear workshop goal ("generate 3 approaches to X")
- Activities: problem framing → idea generation → concept building → dot voting → discussion
- The goal is shared understanding and early exploration — not polished design

### Outputs
Rough sketches, conceptual flows, themed idea groups, proposed directions, identified risks, shared alignment

### Pitfalls
- One stakeholder dominating the conversation
- Jumping to solutions without framing the problem first
- Not anchoring ideas in real user needs or personas
- Treating workshop output as final instead of a starting point
- Failing to capture materials during the session (photos, notes)

### Related methods
→ User Interviews (ground workshop discussions in real user data)
→ Journey Mapping (visualize outputs from workshop)
→ Usability Testing (validate workshop directions)

---

## Feedback Sessions / Client Advisory Boards (CABs)

**Category:** Discovery / Strategic | **Effort:** Moderate | **Cost:** Low

Structured sessions with a curated group of clients — typically power users or decision-makers — to gather strategic input on product direction, new concepts, and roadmap priorities. Client Advisory Boards (CABs) are a regular cadence of these sessions with a consistent participant group.

### Relationship to User Interviews
CABs involve clients speaking as *buyers and strategic partners*, not purely as end users. The input is valuable but filtered through business interests, relationship dynamics, and what clients want to be seen saying. **Treat it as a complement to, not a substitute for, direct user research.**

### When it fits
- When you need strategic signal about product direction from high-value clients
- When you want to pressure-test a concept or roadmap item with the people who will champion (or block) its adoption
- As a relationship investment — clients who feel heard are more likely to participate in follow-on research
- When PM needs client buy-in before investing in a major feature direction

### At RainFocus
- CSMs are the gatekeepers and relationship owners for CABs — always involve them in planning and facilitation
- The signal is strategic, not behavioral — clients will tell you what they want, not necessarily what their users need. Use it to identify investigation areas, then go talk to the actual end users.
- UX should attend and listen actively, but CABs are typically PM/CS-led

### How to conduct well
- Prepare specific questions — open-ended CABs produce pleasant conversation but weak insight
- Mix concept reactions with underlying-need questions: "What outcome are you trying to achieve?" before "What do you think of this direction?"
- Synthesize separately from individual feedback — what patterns emerge across participants?
- Loop findings back to Craft.io and the research repository

### Outputs
Strategic priorities, concept reactions, relationship intelligence, follow-on research candidates

### Pitfalls
- Taking feature requests at face value — clients ask for solutions; your job is to uncover the underlying need
- Letting the most vocal client dominate the direction
- Treating CAB output as validated user needs — it's a starting point, not a conclusion
- Forgetting that what clients say in a strategic session may not reflect what their users actually experience

### Related methods
→ User Interviews (follow up with actual end users)
→ Participatory / Co-Design Workshops (similar collaboration, different framing)
→ Support Ticket / CS Call Mining (ground feedback in patterns)

---

## Support Ticket / CS Call Mining

**Category:** Discovery (Passive) | **Effort:** Low | **Cost:** Very Low

Systematically reviewing existing support tickets, CS call notes, and client feedback to identify recurring pain points, unmet needs, and confusion patterns — without recruiting a single participant. The data already exists; it just needs to be analyzed.

### When it fits
- Before starting a discovery study — mining existing data can sharpen your questions and prevent you from "discovering" things that are already known
- When you want to identify the highest-frequency pain points across a broad user base
- When participant access is limited and you need signal fast
- When scoping what to research next

### At RainFocus
- **Craft.io** is the primary tool — it aggregates client feedback, feature requests, and complaints from across accounts. Always check Craft.io before planning a new study.
- CS call notes from CSMs and SCs are a rich qualitative source — request access or schedule a synthesis session with a CSM
- Support tickets surface the failure states users actually encounter, not the ones they predict in interviews

### How to conduct well
- Define a scope before mining: which product area, which time period, which persona?
- Code tickets by theme: navigation, error states, missing features, confusion, etc.
- Count frequency — how often does each theme appear?
- Escalate recurring patterns to the research backlog as candidates for deeper study
- Share findings with the CS team — they often haven't seen the data aggregated this way

### Outputs
Frequency-ranked pain point list, themes for interview guides, research backlog candidates

### Pitfalls
- Treating ticket frequency as severity — the loudest feedback isn't always the most important
- Not distinguishing between support tickets (failure states) and feature requests (aspirational) — different signal types
- Stopping at the data without follow-on qualitative work to understand root causes
- Not involving CSMs in the synthesis — they have context about tickets that the data alone won't show

### Related methods
→ User Interviews (follow up to understand why)
→ Analytics / Behavioral Analysis (triangulate with quantitative data)
→ Craft.io review (automated feedback aggregation)

---

## Observation (Screen Recording / Session Replay)

**Category:** Behavioral / Evaluative | **Effort:** Low | **Cost:** Low

Watching recordings of real user sessions in the product — using tools like FullStory or LogRocket — to observe actual behavior without facilitating a session. Users navigate naturally, without being observed in real time.

### When it fits
- When you want behavioral data at scale without recruiting participants
- When you suspect a specific friction point and want to see how users actually encounter it
- As a complement to analytics: Amplitude shows you *where* users drop off; session recordings show you *what happens right before they do*
- When you want to identify rage clicks, confusion patterns, or unexpected navigation paths

### At RainFocus
- Check with engineering on tooling availability — FullStory or equivalent may already be deployed
- Most applicable in the admin experience, where workflows are complex enough to generate interesting behavioral data
- Privacy and client data considerations apply — ensure recordings are anonymized and compliant before reviewing

### How to conduct well
- Don't watch recordings randomly — start with a hypothesis and filter accordingly
- Watch in batches of 5–10 sessions; note recurring patterns
- Use the rage click and error filters in most tools to jump straight to friction moments
- Clip and annotate key moments for sharing with the team

### Outputs
Friction hotspots, unexpected navigation patterns, evidence for or against hypotheses, shareable clips for stakeholder communication

### Pitfalls
- Watching without a hypothesis — you'll drown in footage and find everything and nothing
- Over-indexing on outlier sessions that confirm what you wanted to see
- Forgetting that absence of visible struggle doesn't mean the design is good — users who can't figure it out often just leave
- Privacy concerns — ensure consent and data handling comply with policy

### Related methods
→ Analytics / Behavioral Analysis (identify where to look in session replays)
→ Usability Testing (moderated alternative for deeper insight)
→ Heuristic Evaluation (expert review before session review)
