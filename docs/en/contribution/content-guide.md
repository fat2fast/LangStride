# Content Contribution Guide

> **Languages**: English | [Tiếng Việt](../../vi/contribution/content-guide.md)

- **Status**: Active
- **Last Updated**: 2026-09-25
- **Scope**: Educational Content
- **Authority**: Contributor Guide (Canonical)

This guide explains how to write, improve, and propose educational content for LangStride without needing to modify application source code.

## Lesson Philosophy

A LangStride lesson is short, focused, and finishes in one single session (5–10 minutes reading time). It follows this mandatory structure:

```text
Concept Title
↓
Why It Matters (Practical engineering relevance)
↓
Mental Model / Visual Explanation
↓
Formatted Code Example
↓
Common Mistakes
↓
Quick Check (Self-test question)
↓
Related Practice Links
```

## Mandatory Lesson Headings

Every lesson file must provide these required sections in markdown:

```markdown
## Why it matters
Practical relevance, engineering tradeoffs, and why senior engineers care.

## Mental model
Visual analogy or engine-level abstraction explaining how it works.

## Code example
```php
<?php
// Fully syntactically valid, self-contained example
```

## Common mistakes
1. Trap 1 and how to avoid it.
2. Trap 2 and how to avoid it.
```

## Lesson Content Rules

1. **Explain WHY and WHERE**: Code shows WHAT; lessons explain WHY a pattern is used and WHERE common traps occur.
2. **Reliable Sources**: Cite authoritative primary sources in frontmatter (e.g. PHP.net documentation and RFCs).
3. **Self-Contained Code**: Code examples must be syntactically valid and runnable mentally.
4. **No Artificial AI Slop**: Write clear, conversational, human developer prose. Avoid generic fluff.

## Step-by-Step Contribution

1. Ensure the generic concept exists in `content/knowledge/concepts.json` (or propose one).
2. Locate or add the roadmap node in `roadmaps/php.json`.
3. Create the lesson file in `content/programming/php/lessons/<lesson-slug>.md` with frontmatter:
   ```yaml
   ---
   id: php-functions
   slug: functions
   title: Functions, Signatures and Closures in PHP
   conceptId: concept-functions
   language: php
   status: published
   sources:
     - title: "PHP Manual: Functions"
       url: https://www.php.net/manual/en/language.functions.php
   ---
   ```
4. Write your content following the mandatory headings above.
5. Validate your content locally:
   ```bash
   pnpm content:validate
   ```
6. Submit a Pull Request titled `content(php): add/update <topic>`.
