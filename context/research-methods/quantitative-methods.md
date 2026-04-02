# Quantitative Methods

Methods for collecting numerical data at scale. Quantitative research answers "how many" and "how much" — it shows breadth but trades depth for volume.

---

## Surveys & Questionnaires

**Category:** Quantitative / Attitudinal | **Effort:** Low | **Cost:** Very Low

Structured sets of questions distributed to larger groups of participants to collect attitudinal data at scale. Surveys are fast and cheap but trade depth for breadth — they tell you *what* people think, not *why*.

### When it fits
- When you need a broad signal from a large population (attendees, exhibitors)
- Post-event: measuring satisfaction, NPS, or specific experience quality
- When you want to quantify patterns already identified qualitatively ("We heard in interviews that exhibitors struggle with setup — let's see how widespread that is")
- Screening participants for follow-on research

### At RainFocus
- Best suited for the attendee persona — large, accessible population with lower relationship cost
- Use with caution for admin and exhibitor personas — over-surveying high-value client contacts erodes goodwill and competes with CS relationships. **Coordinate with CSMs before surveying client admins.**
- Post-event surveys embedded in the attendee app are a natural, low-friction channel

### Sample size
30+ responses for basic patterns; 100+ for reliable segmentation

### How to conduct well
- Start with a clear learning objective — don't build a survey until you know what decision it will inform
- Keep it short: 5–10 questions max; drop any question you can't tie to a learning objective
- Use a mix: rating scales for quantification, open-text fields for unexpected signal
- Pilot with 2–3 people before sending
- Tools: Typeform, Google Forms, or in-platform survey tools

### Guiding principles
- *Do*: Use surveys to quantify, not to discover. Let qualitative research lead; surveys follow.
- *Avoid*: Leading questions. Asking about behavior hypothetically ("Would you use this?"). Treating survey data as behavioral data — it isn't.
- *Mindset*: Surveys tell you what people say. Interviews tell you what people mean.

### Outputs
Quantitative summary, key patterns, open-text themes, screening shortlist for follow-on research

### Pitfalls
- Designing a survey before defining learning objectives — you'll end up with data you can't act on
- Surveying the same admin contacts repeatedly — check the Client Research Panel
- Conflating high response rates with high validity
- Treating Likert scale averages as insights — they're a starting point, not a conclusion

### Related methods
→ User Interviews (follow up on survey patterns with depth)
→ Analytics / Behavioral Analysis (complement attitudinal data)
→ Always-On Intercept Surveys (continuous lightweight version)

---

## Analytics / Behavioral Analysis

**Category:** Quantitative / Behavioral | **Effort:** Low | **Cost:** Very Low

Using product analytics data — at RainFocus, primarily Amplitude — to understand how users actually behave in the product. This is behavioral data, not self-reported, which makes it uniquely valuable: users do things they wouldn't describe in an interview.

### When it fits
- Before starting discovery: understanding what the data already shows about where users drop off, struggle, or disengage
- When you want to size a problem before investing in qualitative research
- After usability testing or interviews, to check whether observed issues show up at scale
- When a PM or stakeholder says "we think users are struggling with X" — check the data before planning research

### At RainFocus
- Amplitude is the primary tool — check with PM or the analytics team for access and relevant dashboards
- Key analyses: funnel drop-off, feature adoption, session frequency, error rates
- Complement with Craft.io, which aggregates client feedback signals — both are passive data sources that can surface research questions before you recruit anyone
- **Analytics tells you *where* problems exist; qualitative research tells you *why***

### How to conduct well
- Start with a hypothesis: "We think users are abandoning the lead retrieval setup at step 3 — let's look at the funnel"
- Look for anomalies: unexpected drop-offs, low adoption of key features, high error rates
- Segment when possible: admin behavior vs. exhibitor behavior will look different
- Bring findings to a research planning conversation — analytics should inform your interview guide, not replace interviews

### Guiding principles
- *Do*: Use behavioral data to sharpen your questions before going to users. Trust it over self-reported attitudes when they conflict. (**Reality Over Reports** principle)
- *Avoid*: Over-interpreting without qualitative context. A 40% drop-off is a signal, not an explanation.
- *Mindset*: Reality Over Reports. Behavioral data is ground truth about what people do.

### Outputs
Funnel visualizations, adoption metrics, usage patterns, prioritized research questions

### Pitfalls
- Treating analytics as a substitute for talking to users — it tells you what, never why
- Not having a hypothesis going in — open-ended data exploration rarely produces actionable insight
- Ignoring data because it conflicts with a design decision already made

### Related methods
→ User Interviews (understand why patterns exist)
→ Observation / Screen Recording (see behavior in detail)
→ Support Ticket / CS Call Mining (triangulate with qualitative feedback)

---

## Benchmarking Studies

**Category:** Evaluative / Quantitative | **Effort:** Moderate | **Cost:** Low

Measuring the usability or experience quality of the current product against a baseline — a previous version, a competitor, or an industry standard — using standardized metrics.

### When it fits
- When you need objective evidence to justify a redesign or major change
- Before and after a significant design change, to demonstrate improvement
- When comparing RainFocus to competitor platforms on specific workflows
- When stakeholders need quantitative data, not just qualitative insight

### Common frameworks
- *SUS (System Usability Scale)*: 10-question standardized questionnaire, produces a 0–100 score. Industry average is ~68. Quick to administer, widely understood.
- *SUPR-Q*: More comprehensive; measures usability, trust, loyalty, and appearance. Better for web/product experiences.
- *Task-based metrics*: Time on task, error rate, task completion rate — collected during usability testing sessions

### At RainFocus
- Most useful for admin-facing flows where there's a clear industry benchmark to compare against
- Can be run as a 10-minute add-on at the end of usability testing sessions — administer SUS at the close
- Useful for building a business case: "Our admin registration flow scores 52 SUS; the industry benchmark is 68"

### How to conduct well
- Establish a baseline before any changes so you have something to compare against
- Use the same method consistently across rounds — you can only compare apples to apples
- Pair with qualitative sessions to understand what's driving the numbers

### Outputs
SUS or SUPR-Q score, task completion rates, comparison to baseline or competitor, business case data

### Pitfalls
- Running benchmarks without a baseline — a single score in isolation doesn't mean much
- Using benchmarking to justify a decision already made rather than to genuinely measure
- Treating a good SUS score as proof the design is done — scores measure usability, not whether the product solves the right problem

### Related methods
→ Usability Testing (collect benchmark metrics during sessions)
→ Heuristic Evaluation (identify issues before benchmarking)

---

## Desirability Studies

**Category:** Evaluative / Attitudinal | **Effort:** Low | **Cost:** Very Low

A method for measuring whether a design *feels right* — whether the aesthetic, tone, and personality of a design aligns with user expectations. Adapted from Microsoft's Product Reaction Cards method.

### When it fits
- When evaluating a significant visual or conceptual direction change
- When you want to know if a design feels appropriate for enterprise B2B users (professional, trustworthy, efficient) vs. misaligned (playful, overwhelming, confusing)
- As a quick complement to usability testing — after testing function, check for feel
- When stakeholders are debating between design directions and you need signal beyond personal preference

### How to conduct well
- Present participants with a set of descriptive words (e.g., "professional," "confusing," "trustworthy," "overwhelming," "modern," "cluttered") — typically 25–40 cards
- Ask them to select 5 words that best describe their reaction to the design
- Follow up: "You chose 'professional' — can you say more about what gives you that impression?"
- Compare results across participants to identify patterns; flag any negative words that appear repeatedly

### At RainFocus
- Particularly relevant when redesigning client-facing admin experiences — enterprise clients have strong expectations about what "professional software" looks and feels like
- Can be run as a 10-minute add-on at the end of a usability test session
- Useful for comparing design directions: run desirability study across multiple design variants

### Outputs
Word frequency map, key positive/negative impressions, recommendations for visual or tonal adjustments

### Pitfalls
- Using too few participants — you need 5–8 minimum to see patterns
- Skipping the follow-up conversation — the word selections are interesting; the reasons are the insight
- Conflating "I don't like this personally" with "users find this undesirable"

### Related methods
→ Usability Testing (test function alongside)
→ Heuristic Evaluation (evaluate against design principles)

---

## Always-On Intercept Surveys

**Category:** Quantitative / Attitudinal | **Effort:** Low | **Cost:** Very Low

Brief in-product surveys triggered by specific user behaviors or moments — a user completes a task, navigates to a new section, or reaches the end of a flow — to capture real-time attitudinal data at scale.

### When it fits
- When you want continuous attitudinal signal without recruiting participants
- Post-task: "How easy was it to complete this?" immediately after a user finishes a workflow
- When you want to measure sentiment changes after a release
- When you need to identify pain points across a large user base without one-on-one sessions

### At RainFocus
- Most appropriate for the attendee experience — large N, lower relationship stakes
- **Use with significant caution in the admin experience** — intercepting a client admin mid-task is a high relationship-cost move. Loop in CSMs before deploying any intercept in the admin platform.
- Coordinate with product and engineering on implementation — this requires in-product tooling

### How to conduct well
- Keep it to 1–3 questions maximum — any more and users dismiss it
- Trigger on specific behavioral moments, not random time intervals
- Combine a rating scale with one open-text field: "How easy was that? / What, if anything, made it difficult?"
- Review responses regularly and route patterns to the research repository

### Outputs
Satisfaction/effort scores, pain point signals, open-text themes, release impact measurement

### Pitfalls
- Intercepting users too frequently — survey fatigue kills response rates and user trust
- Treating scores without reading the open-text responses
- Deploying in admin flows without CSM buy-in

### Related methods
→ Surveys & Questionnaires (more structured, less context-triggered)
→ Analytics / Behavioral Analysis (complement with behavioral data)
→ User Interviews (follow up on themes)
