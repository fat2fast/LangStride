# LangStride Community MVP — FR Map

Status: Planning baseline. No capability is implemented unless its detailed FR document is explicitly updated to an implemented status with evidence.

## Document ownership

- [`roadmap.md`](roadmap.md) owns the large product direction, future possibilities, phase intent, and feature-level status.
- This file owns the overview of Community MVP functional requirements: their catalog, phase, and current document status.
- [`fr/`](fr/) owns the detailed, independently executable requirements and their acceptance criteria.

`fr/` is the normative requirement source. This map deliberately does not repeat detailed behaviour.

## MVP boundary

Included: self-hostable PHP learning roadmap, lessons, local progress, deterministic practice, static debugging/review practice, basic mastery, search, and repository-based community contribution.

Excluded from this MVP: SaaS billing, cloud sync, teams/organizations, enterprise administration, live code sandbox, remote terminal, MCP, migration agents, Go roadmap, Version Diff, Lang Diff, DevOps labs, and System Design.

## FR catalog and status

| Phase | Capability | Detailed specification | IDs | Status |
|---|---|---|---|---|
| P0 | Repository foundation | [repository-foundation.md](fr/repository-foundation.md) | FR-REPO-001…011 | Planned |
| P0–P5 | Self-hosting | [self-hosting.md](fr/self-hosting.md) | FR-HOST-001…006; FR-REPO-012 | Planned |
| P0–P5 | Content operations | [content-operations.md](fr/content-operations.md) | FR-ADMIN-001…005 | Planned |
| P1 | Knowledge and content model | [knowledge-model.md](fr/knowledge-model.md) | FR-KNOW-001…009 | Planned |
| P1 | PHP roadmap | [php-roadmap.md](fr/php-roadmap.md) | FR-PHP-001…008 | Planned |
| P1–P3 | Lessons | [lessons.md](fr/lessons.md) | FR-LESSON-001…008 | Planned |
| P1–P5 | Content contribution | [content-contribution.md](fr/content-contribution.md) | FR-CONT-001…008 | Planned |
| P2 | Learning progress | [learning-progress.md](fr/learning-progress.md) | FR-PROGRESS-001…008 | Planned |
| P2 | Home / Continue Learning | [home-continue-learning.md](fr/home-continue-learning.md) | FR-HOME-001…004 | Planned |
| P3 | Shared practice engine | [practice-engine.md](fr/practice-engine.md) | FR-PRAC-001…010 | Planned |
| P3 | Multiple choice | [practice-multiple-choice.md](fr/practice-multiple-choice.md) | FR-MCQ-001…003 | Planned |
| P3 | Predict output | [practice-predict-output.md](fr/practice-predict-output.md) | FR-OUTPUT-001…004 | Planned |
| P3 | Fix the code | [practice-fix-the-code.md](fr/practice-fix-the-code.md) | FR-FIX-001…005 | Planned |
| P4 | Debug practice | [debugging-practice.md](fr/debugging-practice.md) | FR-DEBUG-001…011 | Planned |
| P4 | Generated-code review | [ai-generated-code-review.md](fr/ai-generated-code-review.md) | FR-AIREVIEW-001…006 | Planned |
| P5 | Mastery and review | [mastery-and-review.md](fr/mastery-and-review.md) | FR-MAST-001…009 | Planned |
| P5 | Search | [search.md](fr/search.md) | FR-SEARCH-001…006 | Planned |
| All | Quality attributes | [quality-attributes.md](fr/quality-attributes.md) | NFR-SIMPLE-001…005; NFR-PORT-001…004; NFR-CONTRIB-001…003; NFR-AI-001…003 | Planned |

## Dependency overview

```text
Repository foundation
        ↓
Knowledge model → PHP roadmap → Lessons
        ↓                 ↓
Learning progress      Practice engine → Debug / code review
        ↓                 ↓
Continue Learning      Mastery and review
                          ↓
                        Search
```

Content contribution, self-hosting, content operations, and quality attributes are cross-cutting requirements.

## Status vocabulary

- **Planned** — specified but not evidenced as implemented.
- **In progress** — active implementation work exists; detailed FR records its evidence.
- **Implemented** — all acceptance criteria have evidence.
- **Deferred** — intentionally outside the current delivery window.
- **Superseded** — retained for history; replaced by a linked requirement.
