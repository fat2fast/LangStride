# LangStride Community MVP — Functional Requirements Map (FR Map)

> **Languages**: English | [Tiếng Việt](../vi/fr-map.md)

- **Status**: In Specification
- **Last Updated**: 2026-09-25
- **Scope**: Public MVP (P0–P5)
- **Authority**: Functional Requirements Catalog (Canonical)

This document is the master index of all Functional Requirements (FR) and Non-Functional Requirements (NFR) governing the LangStride Community Edition Public MVP.

## Document Ownership Hierarchy

- [`roadmap.md`](roadmap.md) owns **WHEN**: Phasing, milestone intent, and exit criteria.
- **This file (`fr-map.md`)** owns **WHAT**: Requirement catalog, capability ownership, and lifecycle status.
- [`fr/`](fr/) owns the **detailed normative specifications** and observable acceptance criteria.
- [`../architecture/overview.md`](architecture/overview.md) owns **HOW**: Modular monolith design and implementation patterns.
- [`../adr/`](adr/) owns **WHY THIS TECHNICAL DECISION**: Accepted architectural decisions.
- [`../contribution/`](contribution/) owns **HOW TO CONTRIBUTE**: Contributor guides for lessons, challenges, and roadmaps.

## Scope Boundaries

- **Included in MVP (P0–P5)**: Self-hostable PHP guided roadmap, lessons, local persistent progress, deterministic practice challenges, static debugging/review exercises, transparent mastery model, full-text search, and Git-based community contribution.
- **Explicit Post-MVP Exclusions**: Cloud billing, cloud sync, Teams/Organizations, enterprise RBAC, live remote code sandboxes, interactive terminals, Model Context Protocol (MCP), migration agents, full Go roadmap, Version Diff, Lang Diff, DevOps labs, and System Design simulator.

## FR Catalog and Status

| Phase | Capability | Specification Document | Requirement IDs | Status |
|---|---|---|---|---|
| **P0** | Repository Foundation | [repository-foundation.md](fr/repository-foundation.md) | FR-REPO-001…011 | In Specification |
| **P0–P5** | Self-Hosting | [self-hosting.md](fr/self-hosting.md) | FR-HOST-001…006; FR-REPO-012 | In Specification |
| **P0–P5** | Content Operations | [content-operations.md](fr/content-operations.md) | FR-ADMIN-001…005 | In Specification |
| **P1** | Knowledge Model | [knowledge-model.md](fr/knowledge-model.md) | FR-KNOW-001…009 | In Specification |
| **P1** | PHP Roadmap | [php-roadmap.md](fr/php-roadmap.md) | FR-PHP-001…008 | In Specification |
| **P1–P3** | Lessons | [lessons.md](fr/lessons.md) | FR-LESSON-001…008 | In Specification |
| **P1–P5** | Content Contribution | [content-contribution.md](fr/content-contribution.md) | FR-CONT-001…008 | In Specification |
| **P2** | Learning Progress | [learning-progress.md](fr/learning-progress.md) | FR-PROGRESS-001…008 | In Specification |
| **P2** | Home / Continue Learning | [home-continue-learning.md](fr/home-continue-learning.md) | FR-HOME-001…004 | In Specification |
| **P3** | Shared Practice Engine | [practice-engine.md](fr/practice-engine.md) | FR-PRAC-001…010 | In Specification |
| **P3** | Multiple Choice Practice | [practice-multiple-choice.md](fr/practice-multiple-choice.md) | FR-MCQ-001…003 | In Specification |
| **P3** | Predict Output Practice | [practice-predict-output.md](fr/practice-predict-output.md) | FR-OUTPUT-001…004 | In Specification |
| **P3** | Fix the Code Practice | [practice-fix-the-code.md](fr/practice-fix-the-code.md) | FR-FIX-001…005 | In Specification |
| **P4** | Debugging Practice | [debugging-practice.md](fr/debugging-practice.md) | FR-DEBUG-001…011 | In Specification |
| **P4** | AI-Generated Code Review | [ai-generated-code-review.md](fr/ai-generated-code-review.md) | FR-AIREVIEW-001…006 | In Specification |
| **P5** | Mastery & Review Queue | [mastery-and-review.md](fr/mastery-and-review.md) | FR-MAST-001…009 | In Specification |
| **P5** | Search | [search.md](fr/search.md) | FR-SEARCH-001…006 | In Specification |
| **All** | Quality Attributes (NFR) | [quality-attributes.md](fr/quality-attributes.md) | NFR-SIMPLE-001…005; NFR-PORT-001…004; NFR-CONTRIB-001…003; NFR-AI-001…003 | In Specification |

## Capability Dependency Graph

```text
Repository Foundation (P0)
        ↓
Knowledge Model (P1) → PHP Roadmap (P1) → Lessons (P1)
        ↓                     ↓
Learning Progress (P2)     Practice Engine (P3) → Debugging & AI Code Review (P4)
        ↓                     ↓
Continue Learning (P2)     Mastery & Review Queue (P5)
                              ↓
                            Search (P5)
```

## Standard Status Vocabulary

- **Planned**: Specified as a backlog requirement; pending active specification review.
- **In Specification**: Currently undergoing formal definition and acceptance criteria detailing.
- **Ready for Implementation**: Fully specified with observable acceptance criteria; unblocked for coding.
- **In Progress**: Active code or content implementation underway.
- **Implemented**: All acceptance criteria are demonstrably met with automated test evidence.
- **Validated**: Formally verified in end-to-end user workflows.
- **Deferred**: Post-MVP requirement; intentionally outside current release scope.
