# Validation Methods

Methods for confirming that a solution works, navigation is intuitive, and designs meet user needs. Validation focuses on *whether* and *how well*.

---

## Usability Testing

**Category:** Validation | **Effort:** Moderate–High | **Cost:** Moderate

The core validation method — observing real users attempt tasks on a prototype or live product to identify where designs succeed or fail. At RainFocus, usability testing is UX-owned and runs in two forms: moderated (live sessions, facilitated by a researcher or designer) and unmoderated (self-directed, async).

### Moderated vs. Unmoderated
- *Moderated*: Researcher facilitates live via Zoom. Richer insight — you can probe, redirect, and capture nuance. Best for complex workflows, early-stage prototypes, or when you need to understand the *why* behind behavior.
- *Unmoderated*: Participants complete tasks on their own via a tool like Maze. Faster, higher volume, lower cost. Best for simple validation questions, navigation tasks, or when you need breadth over depth.

### Lo/Mid-Fi vs. Hi-Fi
- *Validation (lo/mid-fi)*: Checking problem-solution fit. Are we solving the right problem in roughly the right way? Use the Usability Testing/Validation Plan template.
- *Usability Testing (hi-fi)*: High confidence needed before handing to dev. The design is largely settled — you're testing execution, not concept.

### When it fits
- After a co-design workshop or concept phase, when you have something testable
- Before committing design direction to development
- When you want to confirm that real users can complete critical workflows without guidance
- After heuristic evaluation or cognitive walkthrough has removed obvious issues

### Sample size
5 users will surface most major usability issues (Nielsen's law). For unmoderated, 10–20 participants gives more stable quantitative signal.

### At RainFocus
- UX-owned; loop PM in
- Use the Client Research Panel for participant sourcing (admin persona)
- For attendee research, work through event operations for access
- Prepare a full Usability Testing/Validation Plan before testing — don't skip this step

### How to conduct well
- Write a Usability Testing/Validation Plan — define objectives, hypothesis, persona, and scenario before touching the prototype
- Set the scenario without naming UI elements: "You're an event admin who needs to update session capacity" — not "click the Sessions tab"
- Use the think-aloud protocol: ask participants to narrate their thought process
- Record everything; don't rely on live notes alone
- Run a cognitive walkthrough or heuristic evaluation first — don't waste participant time on issues you can catch internally
- Debrief with the team immediately after each session while it's fresh

### Guiding principles
- *Do*: Stay neutral. Let users struggle. Silence is data.
- *Avoid*: Rescuing users too quickly. Leading questions. Testing a design the team has already decided to ship.
- *Mindset*: You are testing the design, not the user. There are no wrong answers.

### Outputs
Usability issues list with severity ratings, task completion rates, recommended design changes, confidence signal for dev handoff

### Pitfalls
- Running usability testing without first removing obvious issues via expert review — you'll surface things you already knew
- Skipping the scenario setup — users who don't understand the context can't complete tasks naturally
- Testing too early (before the design is coherent) or too late (after dev has already started)
- Conflating moderated insights (deep, small N) with quantitative signal

### Related methods
→ Cognitive Walkthrough (expert review first)
→ Heuristic Evaluation (remove low-hanging fruit)
→ Benchmarking with SUS (add quantitative signal)
→ First Click Testing (precursor for navigation issues)

---

## Cognitive Walkthrough

**Category:** Evaluative | **Effort:** Low | **Cost:** Very Low

An expert review where evaluators step through a design from the perspective of a defined persona, asking four key questions at each step. No users required.

### When it fits
- Early in the lifecycle, when designs are still flexible
- Works with lo-fi prototypes, wireframes, or sketches
- Great for removing low-hanging usability issues before spending participant time
- Also useful for validating that your usability test tasks actually align with your learning objectives

### The four questions (Blackmon, Polson et al., 2002)
1. Will users try to achieve the right result? Do they understand this step matters?
2. Will users notice that the correct action is available? Is it visible and discoverable?
3. Will users associate the correct action with the outcome they want? Does the label/affordance make sense?
4. After acting, will users see that progress was made? Is the feedback clear?

### At RainFocus
- Quick gut-check before investing in participant time
- Use across all personas — admin, attendee, exhibitor experiences
- Valuable for complex workflows that span multiple screens or systems

### How to conduct well
- 3–6 evaluators from UX, PM, and engineering; diversity of perspective improves quality
- One facilitator, rest are evaluators — use AI transcription or a dedicated notetaker
- Define the persona first and present it before starting — evaluators must stay in the persona's mindset
- Evaluators narrate aloud; facilitator captures issues

### Guiding principles
- *Do*: Evaluate independently before discussing; tie issues to specific heuristics; be specific about the problem, not the solution
- *Avoid*: Using your own expert knowledge instead of the persona's; jumping to solutions mid-session; skipping severity ratings

### Outputs
Issue list, recommendations, refined prototype, improved usability test tasks

### Pitfalls
- Evaluators slipping into expert mode instead of beginner mindset
- Treating it as validation — it's exploration
- Over-analyzing trivial issues and missing real problems

### Related methods
→ Heuristic Evaluation (complementary expert review framework)
→ Usability Testing (follow up with real users after expert review)

---

## Heuristic Evaluation

**Category:** Evaluative | **Effort:** Medium | **Cost:** Low

A fast, expert-driven review of a design against established usability principles (Nielsen's 10 Heuristics) to catch issues before testing with real users.

### Recommended framework at RainFocus
Nielsen's 10 Usability Heuristics:
1. Visibility of system status
2. Match between system and the real world
3. User control and freedom
4. Consistency and standards
5. Error prevention
6. Recognition rather than recall
7. Flexibility and efficiency of use
8. Aesthetic and minimalist design
9. Help users recognize and recover from errors
10. Help and documentation

### When it fits
- Before usability testing — removes obvious issues so participant time focuses on real insights
- When evaluating early concepts, wireframes, or feature flows
- When reviewing a live product area for long-standing friction
- When you want to align PM and engineering around current UX debt

### At RainFocus
- Use for all user types — admin flows, attendee experiences, exhibitor workflows
- Valuable before major redesigns or feature rollouts
- Helps prioritize UX debt

### How to conduct well
- 2–5 evaluators; include UX, PM, and engineering for diverse perspectives
- Evaluate independently first — groupthink kills quality
- Each evaluator tags issues to specific heuristics
- Reconvene to discuss, consolidate, and severity-rate (minor / moderate / severe)

### Guiding principles
- *Do*: Be specific about problems, not solutions. Tie each issue to a heuristic. Consider both novice and expert users.
- *Avoid*: Visual nitpicking when the real issue is clarity or flow. Skipping severity ratings.
- *Mindset*: Curiosity — what would make this easier? Empathy — would a new user understand this?

### Outputs
Consolidated issue list with severity ratings, actionable recommendations, cleaner prototype for testing

### Pitfalls
- Heuristic violations aren't absolute — context matters
- Confusing "I don't like this visually" with a real usability issue
- Treating heuristic evaluations as a substitute for user testing

### Related methods
→ Cognitive Walkthrough (complementary expert review)
→ Usability Testing (follow up with real users)

---

## Card Sorting

**Category:** Discovery (IA) | **Effort:** Low | **Cost:** Low

Users group content or concepts into categories that make sense to them, revealing their mental models and informing information architecture decisions.

### When it fits
- When defining or reworking navigation, menus, or content-heavy experiences
- When you're uncertain how users mentally organize product features or content
- Before Tree Testing — Card Sorting creates the IA; Tree Testing validates it

### Open vs. Closed
- *Open sort*: Participants create their own categories — better for discovery
- *Closed sort*: Categories are predefined — better for validating an existing structure

### How to conduct well
- 5–15 participants; 30–60 cards is the sweet spot
- Run online (OptimalSort, Maze) for scale; in-person for richer conversation
- Encourage think-aloud during sorting

### Outputs
Groupings, similarity matrices, dendrograms, IA recommendations

### Pitfalls
- Cards that are too vague or unfamiliar to participants
- Treating results as "the answer" — card sorting informs, it doesn't dictate
- Not following up with Tree Testing to validate

### Related methods
→ Tree Testing (validate the IA card sorting creates)
→ First Click Testing (test if labels are intuitive)

---

## Tree Testing

**Category:** Validation (IA) | **Effort:** Low | **Cost:** Low

Evaluates whether users can find information within a proposed navigation structure using a text-only "tree" — no visual design, just labels and hierarchy.

### When it fits
- After Card Sorting, to validate whether the proposed IA actually works
- When you want to identify confusing labels, categories, or misplaced items
- At RainFocus, applies to platform menus and navigation — not traditional "website" IA

### How to conduct well
- 10–20 participants; 5–10 tasks that reflect real user goals
- Tasks should be realistic: "Where would you go to update your event's registration settings?"
- Text-only tree removes visual design bias — that's the point

### Outputs
Success/failure rates per task, click-path data, IA recommendations

### Pitfalls
- Tasks that are too vague
- Confusing IA issues with visual design issues — Tree Testing only tests structure
- Not connecting results back to Card Sorting data

### Related methods
→ Card Sorting (creates the IA to test)
→ First Click Testing (quick alternative for label validation)

---

## First Click Testing

**Category:** Validation | **Effort:** Moderate | **Cost:** Low

Measures whether users click in the right place first when given a task, revealing whether navigation and layout are intuitive.

### When it fits
- Quick gut-check on whether a layout or label directs users correctly
- Lightweight enough to run throughout design iterations
- Good precursor to full usability testing

### How to conduct well
- 5–15 participants; 5–10 minutes per session
- Tasks should be specific: "Where would you click to schedule a new session?"
- Pair with think-aloud for richer insight

### Success signals
Strong majority click correctly on first try; low hesitation time

### Outputs
Click visualizations, success/error rates, navigation recommendations

### Pitfalls
- First click data alone isn't the whole story — pair with usability testing for depth
- Too few participants leads to misleading patterns
- Not iterating on labels after first failures

### Related methods
→ Tree Testing (deeper IA validation)
→ Usability Testing (full workflow validation)
→ Heuristic Evaluation (identify issues before testing)
