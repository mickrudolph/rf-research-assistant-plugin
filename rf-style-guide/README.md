# RainFocus Style Guide Plugin

A lightweight Claude plugin that helps you write and review content according to the RainFocus Written Style Guide.

## What does it do?

This plugin provides a `/style-guide` skill that helps with:

- **Reviewing existing content** for style guide compliance
- **Writing new content** following RainFocus voice, tone, and formatting standards
- **Answering style questions** with specific guidance from the official guide

## Installation

If you already have the `rf-research-assistant` marketplace installed, simply install this plugin:

```bash
/plugin install rf-style-guide@rf-research-assistant
```

If you don't have the marketplace yet, add it first:

```bash
/plugin marketplace add https://github.com/mickrudolph/rf-research-assistant-plugin.git
/plugin install rf-style-guide@rf-research-assistant
```

## Usage

Simply invoke the skill:

```bash
/style-guide
```

Claude will ask whether you want to:
1. Review existing content
2. Write new content from scratch
3. Answer a specific style question

The plugin includes the complete RainFocus Written Style Guide and will reference it automatically to ensure accuracy.

## What it checks

- **Voice & Tone**: Confident, helpful, credible, relevant, forward-thinking
- **Brand Terms**: RainFocus™, Essential, INSIGHT, RF Academy
- **Capitalization**: Title case for headlines, sentence case for in-product
- **Numbers**: Spell out under 10, numerals for 10+
- **Dates & Time**: Proper formatting (e.g., "7:00 a.m.", "January 4, 2023")
- **Punctuation**: Oxford commas, em dashes, en dashes
- **Word Choice**: Avoiding redundancy, jargon, and wordiness

## Content Types Supported

- Blog posts
- Emails
- Social media (LinkedIn, Twitter, etc.)
- In-product copy and labels
- Press releases
- Landing pages
- Presentation slides

## Notes

- The plugin includes a bundled copy of the Written Style Guide, so it works offline
- All style guidance is based on the official RainFocus standards
- The skill explains *why* rules exist, not just what they are
- Suggestions are helpful, not prescriptive

---

*Questions? Find Mick on Slack.*
