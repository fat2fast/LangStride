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
```

> **Note on Future Milestones**: Interactive Quick Checks (P2) and Deterministic Practice Challenges (P3) are planned for subsequent phases and are intentionally deferred in this P1 proof slice. Contributors in this phase need only provide the 4 required sections below.

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

## Supported Markdown Formatting (MarkdownProse)

To ensure rendering safety and zero raw HTML injection, lesson prose is rendered using a secure, constrained Markdown subset (`MarkdownProse`):

| Element | Supported Syntax | Notes |
|---|---|---|
| **Paragraphs** | Standard text blocks separated by blank lines | Normalized and safely escaped |
| **Ordered Lists** | `1. First item`<br>`2. Second item` | Rendered as semantic `<ol>` |
| **Unordered Lists** | `- First item` or `* First item` | Rendered as semantic `<ul>` |
| **Blockquotes** | `> Callout quote or key takeaway` | Rendered with visual styling |
| **Subheadings** | `### Section Subheading`<br>`#### Minor Heading` | `###` (h3) and `####` (h4) supported inside sections |
| **Bold** | `**bold**` or `__bold__` | Inline bold formatting |
| **Italic** | `*italic*` or `_italic_` | Inline italic formatting |
| **Inline Code** | `` `code` `` | Formatted monospaced text |
| **Safe Links** | `[Title](https://...)` or `[Internal](/php)` | Restricted to `https://`, `http://`, `/`, or `mailto:` |

> **Security Notice**: Raw HTML tags (`<script>`, `<iframe>`, `<div>`, etc.) and unsafe link schemes (`javascript:`, `data:`) are intentionally not supported and will not be executed. All code blocks must use fenced markdown syntax with the language specifier (e.g. ` ```php `).

## Lesson Content Rules

1. **Explain WHY and WHERE**: Code shows WHAT; lessons explain WHY a pattern is used and WHERE common traps occur.
2. **Reliable Sources**: Cite authoritative primary sources in frontmatter (e.g. PHP.net documentation and RFCs).
3. **Self-Contained Code**: Code examples must be syntactically valid and runnable mentally.
4. **No Artificial AI Slop**: Write clear, conversational, human developer prose. Avoid generic fluff.

## Localization & Bilingual Parity Rules

LangStride supports canonical English (`en`) and reference Vietnamese (`vi`). To ensure quality and consistency across languages:

### 1. Invariant Identifiers Across Locales
When authoring or translating content, the following properties MUST remain strictly identical between `en` and `vi`:
- `conceptId`: The generic concept identifier (e.g. `concept-functions`).
- Roadmap Node `id` and Section `id`: Structural graph identities.
- Lesson `id` and `slug`: URL routing keys (e.g. `functions`).
- `status`: Node and lesson publication status (`published` or `planned`).
- `order` and `prerequisites`: Sequence and dependency relationships.
- `codeExample`: The code snippet, syntax language, and code content.
- `sources[].url`: Authoritative reference URLs.

Translations may localize:
- Lesson `title`, section headings, prose descriptions, and metadata.
- Roadmap section `title`, section `description`, and node `title`.
- Concept `title` and `description`.
- Source reference display `title`.

### 2. Strict Coverage Requirement (No Silent Fallback)
Every published lesson in English must have a corresponding published lesson in Vietnamese. A missing lesson on `/vi` is a **validation failure** during `pnpm content:validate`, NOT a fallback to English content.

### 3. Translation Quality Review Checklist
Before submitting a translated lesson or roadmap update, verify:
- [ ] **Terminology**: Retain standard programming keywords, RFC titles, and PHP function names untranslated; use clear Vietnamese engineering terminology for prose.
- [ ] **Code Integrity**: Ensure code fences, indentation, and snippet outputs match the canonical English lesson verbatim.
- [ ] **Links & Sources**: Verify all internal links use relative paths without hardcoded locale prefixes, and primary source URLs match.
- [ ] **Accessibility**: Section headings match standard headings (`Why it matters`, `Mental model`, `Code example`, `Common mistakes` or their approved Vietnamese equivalents).
- [ ] **Validation**: `pnpm content:validate` passes with zero errors across all locales.

## Step-by-Step Contribution

1. Ensure the generic concept exists in `content/locales/en/knowledge/concepts.json` and its Vietnamese equivalent in `content/locales/vi/knowledge/concepts.json`.
2. Locate or add the roadmap node in `content/locales/en/roadmaps/php.json` and `content/locales/vi/roadmaps/php.json`.
3. Create the canonical lesson in `content/locales/en/programming/php/lessons/<lesson-slug>.md` and its counterpart in `content/locales/vi/programming/php/lessons/<lesson-slug>.md` with matching frontmatter:
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

