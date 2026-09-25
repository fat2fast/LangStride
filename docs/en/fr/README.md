# Functional Requirements

> **Languages**: English | [Tiếng Việt](../../vi/fr/README.md)

This directory is the canonical, executable specification for the Community MVP. Each `FR-*` and `NFR-*` identifier has one owner here. A requirement is complete only when its own acceptance criteria are demonstrably met.

## Document roles

- [`../fr-map.md`](../fr-map.md) is the overview: catalog, status, phase, and links.
- [`../roadmap.md`](../roadmap.md) is product direction, future intent, and phase-level status. It does not define detailed behaviour.
- Files in this directory define behaviour, boundaries, dependencies, and acceptance criteria.

## Rules

- Keep identifiers stable; never reuse or renumber an identifier.
- A requirement belongs to one file only. Other files link to it rather than restating it.
- `Must`, `Should`, `Could`, and `Later` express delivery priority. `Status` expresses implementation state.
- `Introduced` is the earliest delivery phase; `Release gate` is the phase by which it must be complete.
- “Done when” bullets are observable acceptance criteria, not implementation suggestions.
- Shared constraints live in [quality-attributes.md](quality-attributes.md).

## Capability catalog

| Capability | Owner |
|---|---|
| Repository foundation | [repository-foundation.md](repository-foundation.md) |
| Knowledge and content model | [knowledge-model.md](knowledge-model.md) |
| PHP roadmap | [php-roadmap.md](php-roadmap.md) |
| Lessons | [lessons.md](lessons.md) |
| Learning progress | [learning-progress.md](learning-progress.md) |
| Home / continue learning | [home-continue-learning.md](home-continue-learning.md) |
| Shared practice engine | [practice-engine.md](practice-engine.md) |
| MCQ practice | [practice-multiple-choice.md](practice-multiple-choice.md) |
| Predict-output practice | [practice-predict-output.md](practice-predict-output.md) |
| Fix-the-code practice | [practice-fix-the-code.md](practice-fix-the-code.md) |
| Debug practice | [debugging-practice.md](debugging-practice.md) |
| Generated-code review | [ai-generated-code-review.md](ai-generated-code-review.md) |
| Mastery and review | [mastery-and-review.md](mastery-and-review.md) |
| Search | [search.md](search.md) |
| Content contribution | [content-contribution.md](content-contribution.md) |
| Self-hosting | [self-hosting.md](self-hosting.md) |
| Content operations | [content-operations.md](content-operations.md) |
| Shared quality attributes | [quality-attributes.md](quality-attributes.md) |

