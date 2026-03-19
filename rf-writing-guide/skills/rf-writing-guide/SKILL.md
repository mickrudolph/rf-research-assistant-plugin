---
name: rf-writing-guide
description: |
  Write and review content adhering to the RainFocus Written Style Guide. Use this skill when the user wants to write new content, review existing content for style compliance, or get guidance on RainFocus writing conventions. Triggers when user mentions writing guide, writing review, or runs /rf-writing-guide.
---

# RainFocus Writing Guide Skill

This skill helps you write and review content according to the RainFocus Written Style Guide. It ensures voice, tone, grammar, capitalization, punctuation, and brand consistency across all written materials.

## Workflow

### Step 1: Understand the Request
Determine what the user needs:
1. **Review existing content** - Check for style guide compliance
2. **Write new content** - Create content from scratch following the guide
3. **Get guidance** - Answer specific style questions

Ask if unclear: *"Would you like me to (1) review existing content, (2) write new content, or (3) answer a style question?"*

### Step 2: Load the Style Guide
Read the Written Style Guide from the plugin's resources directory to reference current standards. The file is located at `../../resources/Written Style Guide.md` relative to this skill.

**Key sections to check:**
- Voice and tone (confident, helpful, credible, relevant, forward-thinking)
- RainFocus brand terms (RainFocus™, Essential, INSIGHT, RF Academy)
- Capitalization rules (title case for headlines, sentence case for in-product)
- Number formatting (spell out under 10, use numerals for 10+)
- Date/time formatting
- Punctuation rules
- Avoiding redundancy and wordiness
- Product-specific terminology

### Step 3A: For Content Review

**Get the content:**
Ask the user: *"Please paste the content you'd like me to review, or provide a file path."*

**Review against style guide:**
Check for:
1. **Voice/Tone Issues:**
   - Is it confident, helpful, credible, and relevant?
   - Does it avoid humor, puns, pop culture references?
   - Is it professional but approachable?

2. **RainFocus Brand Terms:**
   - Correct trademark usage (RainFocus™ first mention)
   - Proper capitalization (RainFocus, Essential, INSIGHT all caps)
   - Correct product names (Speaker Portal not SRC, Page Builder capitalized)
   - "We" not "it" when referring to RainFocus

3. **Capitalization:**
   - Title case for headlines/subheads
   - Sentence case for in-product labels
   - Job titles lowercase
   - No mid-sentence emphasis capitalization

4. **Numbers and Dates:**
   - Spell out numbers under 10
   - Use numerals for 10+
   - Spell out months, use commas correctly
   - Time format: 7:00 a.m. (with space)

5. **Grammar and Mechanics:**
   - Subject/verb agreement
   - Parallelism in lists
   - Proper comma usage
   - Avoiding passive voice where possible

6. **Wordiness/Redundancy:**
   - Check for common wordy phrases
   - Suggest concise alternatives

**Provide feedback:**
Format your review as:
```markdown
## Style Guide Review

### ✓ What's Working Well
- [Positive observations]

### ⚠️ Areas for Improvement

#### Voice & Tone
- **Issue:** [Specific problem]
  **Suggestion:** [How to fix it]

#### Brand Terms
- **Issue:** [Specific problem]
  **Current:** [What they wrote]
  **Correct:** [How it should be]

#### Capitalization
- **Issue:** [Specific problem]
  **Current:** [What they wrote]
  **Correct:** [How it should be]

[Continue for each category with issues]

### ✏️ Revised Version
[Provide a fully corrected version of the content]
```

### Step 3B: For New Content

**Gather requirements:**
Ask the user:
```
What type of content are you creating?
1. Blog post
2. Email
3. Social media post
4. In-product copy/labels
5. Press release
6. Landing page
7. Presentation slide
8. Other

What's the topic/purpose?
Who's the target audience?
Any key points or requirements?
```

**Draft the content:**
Write following these guidelines:

**Voice/Tone:**
- Confident, helpful, credible, relevant, forward-thinking
- Professional but approachable
- Lead with main point/most important content
- Be concise and specific
- Avoid marketing jargon, humor, puns

**Structure:**
- Lead with the main point
- Group related ideas with headers/subheaders
- Use short sentences and paragraphs
- Bullet points for clarity

**RainFocus Specifics:**
- Use RainFocus™ with first mention (superscript)
- "We" not "it" for the company
- Capitalize product names (Essential, Page Builder)
- INSIGHT always all caps
- Focus on differentiators: flexibility, all-in-one, personalization, unified events

**Formatting:**
- Title case for headlines
- Sentence case for body copy and in-product
- Spell out numbers under 10
- Use % symbol not "percent"
- Time: 7:00 a.m. (with spaces)

**Present the draft:**
Show the user the draft and ask: *"Would you like me to revise anything, or is this ready to use?"*

### Step 3C: For Style Questions

**Answer directly** using the style guide:
- Reference specific sections
- Provide examples of correct/incorrect usage
- Explain the reasoning behind the rule
- Offer alternatives if applicable

Format answers like:
```markdown
## Style Guide Answer

**Your Question:** [Restate their question]

**Answer:** [Clear, direct answer]

**Rule:** [Reference from style guide]

**Examples:**
✓ Correct: [Example]
✗ Incorrect: [Example]

**Why this matters:** [Brief explanation if needed]
```

### Step 4: Iterate if Needed

If the user requests changes:
- Make revisions following their feedback
- Ensure all edits still comply with style guide
- Explain any style guide conflicts if they arise

### Step 5: Save for Reference (Optional)

If the user wants to save the reviewed/written content:
```
Would you like me to save this content locally?
If yes, where should I save it?
```

Create appropriate directory structure and save using the Write tool.

### Step 6: Confirm Completion

Show summary:
```
✓ Content [reviewed/written/question answered]
✓ All style guide requirements met
✓ [Saved to: path] (if applicable)

Need anything else?
```

## Content Type Specific Guidance

### Blog Posts
- Accessible to readers unfamiliar with RainFocus
- Provide education, not obvious self-promotion
- Use SEO-friendly language naturally
- Link to landing pages/internal pages appropriately

### Emails
- Start with essential information
- Support with bullet points, metrics
- Both relatable and informative
- Clear call to action

### Social Media
- LinkedIn: No emojis, professional tone
- Provide value and relevant information
- Link to RainFocus sources
- Max 4 hashtags

### In-Product Copy
- Sentence case (only capitalize first word)
- Link only the resource, not surrounding text
- Buttons/checkboxes: {verb} + {noun} format
- Start with strong action verbs

### Press Releases
- More informative than relatable
- Lead with most essential information
- Use metrics, data, quotes for credibility
- Best time: Weekdays 10 a.m. - 2 p.m.

## Key Style Rules (Quick Reference)

**RainFocus Brand:**
- RainFocus™ (first mention, superscript)
- RainFocus INSIGHT (all caps)
- RF Academy (not RainFocus Academy)
- Essential™
- "We" not "it"

**Capitalization:**
- Title Case for Headlines and Subheads
- Sentence case for body copy
- Job titles lowercase
- website, email, internet lowercase (unless starting sentence)

**Numbers:**
- Spell out: one through nine
- Numerals: 10 and above
- Spell out number starting sentence
- Use commas for 1,000+

**Dates/Time:**
- Friday, January 4, 2023 (spell out, commas)
- 7:00 a.m. (space before a.m.)
- February 7–9 (en dash for ranges)

**Punctuation:**
- Oxford comma: always
- Em dash—no spaces
- En dash for ranges: 7–9

**Avoid:**
- Humor, puns, slang
- Marketing jargon
- Political viewpoints
- Negative competitor mentions
- "Might" and "may" (be definitive)
- Redundancy and wordiness

## Important Notes

- **Always reference the current style guide** - Don't rely on memory, read the file
- **Explain reasoning** - Help users understand why rules exist
- **Be helpful, not prescriptive** - Offer suggestions, not demands
- **Consider context** - Different content types have different tone requirements
- **Preserve meaning** - Style corrections shouldn't change what the user is trying to say
- **Ask when unclear** - If a style question is ambiguous, ask for clarification
- **Update knowledge** - The style guide is regularly updated; always read the latest version

## Example Interactions

### Example 1: Content Review

**User:** `/rf-writing-guide`

**Skill:** Would you like me to (1) review existing content, (2) write new content, or (3) answer a style question?

**User:** 1

**Skill:** Please paste the content you'd like me to review, or provide a file path.

**User:** [pastes content]
"Rainfocus is a great platform for event management. It helps you manage 3 different types of events and has been around since the 2010's."

**Skill:**
## Style Guide Review

### ⚠️ Areas for Improvement

#### Brand Terms
- **Issue:** Company name not capitalized correctly
  **Current:** "Rainfocus"
  **Correct:** "RainFocus" (both R and F capitalized)

#### Numbers
- **Issue:** Number under 10 should be spelled out
  **Current:** "3 different types"
  **Correct:** "three different types"

#### Dates
- **Issue:** Decade formatting incorrect
  **Current:** "2010's"
  **Correct:** "2010s" (no apostrophe, four digits)

#### Voice & Tone
- **Issue:** Generic description doesn't reflect RainFocus thought leadership
  **Suggestion:** Emphasize specific differentiators like flexibility, personalization, or all-in-one functionality

### ✏️ Revised Version
"RainFocus is the next-generation event marketing platform for managing three different types of events. Since the 2010s, we've been helping organizations deliver flexible, personalized event experiences from a single dashboard."

---

### Example 2: Writing New Content

**User:** Write me a social media post about our new Page Builder feature

**Skill:**
What type of content are you creating? [Detected: Social media post]

Which platform?
- LinkedIn
- Twitter/X
- Instagram
- Facebook

**User:** LinkedIn

**Skill:**

Here's your LinkedIn post:

---

Transform your event pages in minutes with Page Builder. Our intuitive drag-and-drop interface makes it easy to create stunning, personalized event experiences—no coding required.

Whether you're launching registration, building an attendee portal, or designing session catalogs, Page Builder gives you complete control with the flexibility you need.

Learn more: [link]

#EventMarketing #EventTech #RainFocus

---

Following RainFocus style guide:
✓ Professional tone (no emojis)
✓ Emphasizes key differentiators (flexibility, personalization)
✓ Max 4 hashtags
✓ Clear call to action
✓ Product name properly capitalized

Would you like me to revise anything?

---

### Example 3: Style Question

**User:** Should I write "10 AM" or "10 a.m."?

**Skill:**

## Style Guide Answer

**Your Question:** Should I write "10 AM" or "10 a.m."?

**Answer:** Use "10:00 a.m." (include :00 for on-the-hour time, lowercase with periods, and include a space before a.m.)

**Rule:** From the Written Style Guide: "Use numerals and 'a.m.' or 'p.m.', with a space in between. Include minutes for on-the-hour time."

**Examples:**
✓ Correct: 10:00 a.m., 7:30 p.m.
✗ Incorrect: 10 AM, 10am, 10 a.m. (missing :00)

**Why this matters:** Consistency in time formatting improves readability and maintains professional polish across all RainFocus materials.
