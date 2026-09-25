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

## Lesson Content Rules

1. **Explain WHY and WHERE**: Code shows WHAT; lessons explain WHY a pattern is used and WHERE common traps occur.
2. **Reliable Sources**: Cite official documentation (e.g., PHP.net RFCs, language specs).
3. **Self-Contained Code**: Code examples must be syntactically valid and runnable mentally.
4. **No Artificial AI Slop**: Write clear, conversational, human developer prose. Avoid generic fluff.

## Step-by-Step Contribution

1. Locate the topic in `content/programming/php/`.
2. Edit or create the Markdown file with standard frontmatter:
   ```yaml
   id: php-functions
   title: Functions and Scope in PHP
   concept_id: concept-functions
   language: php
   difficulty: beginner
   status: draft
   ```
3. Write your content following the structure above.
4. Submit a Pull Request titled `content(php): add/update <topic>`.
