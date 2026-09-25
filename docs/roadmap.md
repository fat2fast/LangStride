# LangStride Public Repository MVP Roadmap

> Scope: **Community Edition / Public Repository only**  
> Goal: build a useful, self-hostable, non-commercial developer learning and practice product before any SaaS work begins.

## Document ownership and current status

This roadmap is the product-level view: intended direction, future scope, phase sequencing, and feature status. It does not define detailed functional behaviour.

- [`fr-map.md`](fr-map.md) lists the Community MVP requirement capabilities, their current status, and links to their specifications.
- [`fr/`](fr/) contains the detailed functional requirements and acceptance criteria used to implement a capability.

Current MVP status: **planning baseline**. The requirements are specified as planned; implementation status must be recorded in the relevant detailed FR and reflected in `fr-map.md`.

| MVP capability group | Current status | Requirements |
|---|---|---|
| P0 Foundation | Planned | [FR map](fr-map.md#fr-catalog-and-status) |
| P1 Knowledge, roadmap, and lessons | Planned | [FR map](fr-map.md#fr-catalog-and-status) |
| P2 Progress and Continue Learning | Planned | [FR map](fr-map.md#fr-catalog-and-status) |
| P3 Deterministic practice | Planned | [FR map](fr-map.md#fr-catalog-and-status) |
| P4 Debugging and generated-code review | Planned | [FR map](fr-map.md#fr-catalog-and-status) |
| P5 Mastery, search, and public release | Planned | [FR map](fr-map.md#fr-catalog-and-status) |

---

## 1. MVP Objective

The public MVP must prove one core idea:

> A developer can clone LangStride, run it locally, follow a guided PHP learning path, practice concepts, review mistakes, and improve engineering judgment without depending on a hosted SaaS.

The MVP is not intended to implement every long-term LangStride domain.

The public repository should become a credible standalone community project first.

---

## 2. Core MVP Learning Loop

```text
Choose PHP Roadmap
        ↓
Learn a short concept
        ↓
Quick Check
        ↓
Practice Challenge
        ↓
Review Result
        ↓
Debug / Verify
        ↓
Mark Progress
        ↓
Continue Next Concept
```

The first MVP should optimize for:

- clarity;
- learning flow;
- reproducibility;
- contribution friendliness;
- local/self-hosted use;
- minimal infrastructure.

---

## 3. Public MVP Scope

### Included

```text
✓ PHP guided roadmap
✓ Short structured lessons
✓ Concept model
✓ Practice challenges
✓ Basic debugging challenges
✓ AI-generated-code review exercises
✓ Local/self-hosted progress
✓ Search
✓ Community contribution workflow
✓ Content versioning
✓ Basic admin/content authoring workflow
✓ Docker/local setup
```

### Explicitly excluded from MVP

```text
✕ SaaS billing
✕ Cloud sync
✕ Organizations / Teams
✕ Enterprise RBAC
✕ AI tutor dependency
✕ MCP
✕ Migration Agent
✕ Live cloud sandbox
✕ Full DevOps track
✕ Full System Design simulator
✕ Full Go learning roadmap
✕ Version Diff engine
✕ Lang Diff engine
```

Some excluded domains may have schemas or placeholders prepared for future compatibility, but they should not block the public MVP.

---

# 4. Phase Roadmap

## P0 — Repository & Community Foundation

### Goal

Make the repository understandable, runnable, and contribution-ready.

### Deliverables

- `README.md`
- `LICENSE`
- `CONTRIBUTING.md`
- `CODE_OF_CONDUCT.md`
- issue templates
- pull request template
- local development instructions
- environment example
- base project structure
- CI checks
- formatting/linting
- test command
- seed-data workflow

### Suggested repository structure

```text
langstride/
│
├── apps/
│   └── web/
│
├── packages/
│   ├── learning/
│   ├── practice/
│   ├── content/
│   └── ui/
│
├── content/
│   └── programming/
│       └── php/
│
├── challenges/
│   └── php/
│
├── roadmaps/
│
├── supabase/
│
├── docs/
│   ├── roadmap.md
│   └── fr-map.md
│
└── docker/
```

### Technical baseline

- TypeScript
- Next.js / React
- Tailwind CSS
- PostgreSQL / Supabase
- Supabase Auth where authentication is enabled
- PostgreSQL Full Text Search
- GitHub Actions
- modular monolith

### Exit criteria

```text
[ ] Fresh clone can be installed from documentation.
[ ] CI runs lint/tests/build.
[ ] Seed content can be loaded.
[ ] Repository contribution rules are documented.
[ ] No SaaS-only dependency is required.
```

---

## P1 — Knowledge Model & PHP Roadmap

### Goal

Build the minimum structured knowledge model required by future learning, practice, Version Diff, and Lang Diff.

### Core entities

```text
Concept
ConceptRelation
Language
LearningPath
LearningSection
LearningNode
Lesson
KnowledgeSource
```

### Important design rule

Do not model everything as `php_lessons`.

Generic concepts should be reusable:

```text
                  Interface
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
   PHP Interface           Future Go Interface
```

### Initial PHP roadmap

Target approximately **20–30 concepts**.

Suggested path:

```text
PHP Fundamentals
    ↓
Variables & Types
    ↓
Operators
    ↓
Control Flow
    ↓
Functions
    ↓
Scope
    ↓
Arrays
    ↓
Strings
    ↓
OOP Basics
    ↓
Inheritance
    ↓
Interfaces
    ↓
Traits
    ↓
Exceptions / Errors
    ↓
Namespaces
    ↓
Composer
    ↓
Dependency Management
    ↓
HTTP / Request Lifecycle
    ↓
Database Basics
    ↓
Testing
    ↓
Runtime / PHP-FPM
```

### Lesson format

Each lesson should use a predictable structure:

```text
Concept
↓
Why it matters
↓
Mental model
↓
Code example
↓
Common mistakes
↓
Quick check
↓
Practice links
```

### MVP content target

Do not write the entire roadmap immediately.

Initial release target:

```text
20–30 roadmap concepts
10–15 complete lessons
```

Remaining nodes may be clearly marked as planned/incomplete.

### Exit criteria

```text
[ ] PHP roadmap renders from structured data.
[ ] Prerequisites can be represented.
[ ] User can open a lesson from a roadmap node.
[ ] Lessons are content-driven, not hard-coded in UI.
[ ] Content can be changed through a normal Git contribution.
```

---

## P2 — Local Learning Progress

### Goal

Turn the repository from documentation into a real learning application.

### Features

- mark lesson started;
- mark lesson completed;
- save current position;
- resume learning;
- roadmap node status;
- basic bookmarks;
- basic learning history;
- local/self-hosted user profile.

### Roadmap states

```text
Locked
Not Started
In Progress
Completed
```

`Mastered` should be introduced after practice data exists.

### UX principle

The home screen should answer one question:

> What should I do next?

Primary CTA:

```text
Continue Learning
```

### Deployment modes

MVP should support at least one of:

```text
Single local user
or
Self-hosted multi-user with basic auth
```

Do not block MVP on enterprise-grade identity.

### Exit criteria

```text
[ ] User progress survives restart.
[ ] User can resume the latest lesson.
[ ] Roadmap visibly reflects progress.
[ ] App remains fully usable without a LangStride cloud account.
```

---

## P3 — Programming Practice MVP

### Goal

Prove that LangStride is a practice platform, not only a roadmap reader.

### Initial challenge types

Only implement three types first:

```text
1. Multiple Choice
2. Predict Output
3. Fix the Code
```

Avoid building a full code-execution sandbox at this stage.

### Challenge model

```text
Challenge
├── id
├── type
├── concepts
├── language
├── difficulty
├── instructions
├── starter_content
├── expected_answer / validator
├── hints
├── explanation
└── related_lessons
```

### Required behavior

A failed challenge should lead back to learning.

Example:

```text
Challenge failed
      ↓
Reason
      ↓
Review:
PHP → Interfaces → Contract Design
```

### Initial content target

```text
20–30 practice challenges
```

distributed across the first complete PHP lessons.

### Exit criteria

```text
[ ] Challenge can be opened from lesson.
[ ] Result is persisted.
[ ] Explanation is shown after submission.
[ ] Failed attempt links to a relevant concept.
[ ] Challenge content is contribution-friendly.
```

---

## P4 — Debugging & AI-Code-Review Practice

### Goal

Adapt LangStride to the AI era by teaching verification and engineering judgment.

This phase is intentionally included in the public MVP because debugging and reviewing generated code are core developer skills.

### Debug challenge types

```text
Find the bug
Read the error
Read the stack trace
Fix failing code
Identify bad error handling
Review suspicious AI-generated code
Explain the root cause
```

### Example

```text
AI generated this PHP code.

Tests:
✓ 12 passed
✕ 2 failed

Task:
1. Identify the bug.
2. Fix it.
3. Explain why the original implementation was unsafe.
```

### Artifacts supported in MVP

Keep this static/deterministic:

- code snippets;
- error messages;
- stack traces;
- test output;
- simple application logs.

Do not require a live terminal yet.

### AI-era learning loop

```text
Read
 ↓
Understand
 ↓
Inspect
 ↓
Verify
 ↓
Fix
 ↓
Explain
```

### Evaluation principle

Prefer deterministic checks.

AI should not be required to determine whether an answer is correct.

### Initial content target

```text
8–12 debugging/review challenges
```

### Exit criteria

```text
[ ] Debug challenge uses the same concept system as lessons/practice.
[ ] Root cause can be recorded separately from final fix.
[ ] User can practice reviewing generated code.
[ ] No external AI service is required.
```

---

## P5 — Mastery, Review & Public MVP Release

### Goal

Close the learning loop and make Community Edition ready for broader public use.

### Mastery MVP

Keep the first model simple.

Possible signals:

```text
Lesson completion
+
Challenge accuracy
+
Retry history
+
Recent review result
```

### Features

- concept mastery state;
- weak-concept list;
- review queue;
- simple daily/weekly progress;
- basic streak optional;
- challenge history;
- search;
- public documentation polish;
- self-host guide;
- sample content-contribution guide.

### Mastery states

```text
Not Started
Learning
Practiced
Needs Review
Mastered
```

Avoid complex scoring before enough usage data exists.

### Search

Search should cover:

- PHP concepts;
- lessons;
- challenges.

Use PostgreSQL Full Text Search initially.

### Community release checklist

```text
[ ] README matches actual setup.
[ ] LICENSE is present.
[ ] CONTRIBUTING.md exists.
[ ] At least one contributor-friendly content example exists.
[ ] Seed/setup command is documented.
[ ] Public roadmap works.
[ ] Lessons work.
[ ] Practice works.
[ ] Debug review works.
[ ] Progress works.
[ ] Search works.
[ ] Self-host/local use is documented.
[ ] No paid service is required.
```

### Exit criteria

This phase ends when the repository is credible as an independent community product.

---

# 5. Public MVP User Journey

```text
Landing / Home
      ↓
Choose PHP
      ↓
See Guided Roadmap
      ↓
Continue Lesson
      ↓
Quick Check
      ↓
Practice Challenge
      ↓
Debug / Review Exercise
      ↓
Update Progress
      ↓
Review Weak Concept
      ↓
Continue
```

The project should optimize this path before adding new domains.

---

# 6. MVP Pages

Minimum useful UI:

```text
/
├── Home / Continue
│
├── /php
│   └── PHP Roadmap
│
├── /php/concepts/:slug
│   └── Lesson
│
├── /practice
│   └── Practice list
│
├── /practice/:id
│   └── Challenge
│
├── /debug
│   └── Debug/review list
│
├── /debug/:id
│   └── Debug challenge
│
├── /progress
│   └── Progress/mastery
│
└── /search
```

Do not build a large dashboard before these flows work.

---

# 7. Public Content Contribution Model

The repository should make non-code contributions first-class.

### Contribution types

```text
Lesson
Concept
Roadmap correction
Practice challenge
Debug challenge
Technical correction
Translation
Source/reference improvement
```

### Recommended content properties

```text
id
title
slug
concept_id
language
difficulty
prerequisites
related_concepts
status
sources
```

### Content lifecycle

```text
Draft
 ↓
Review
 ↓
Published
```

Content included in releases should be reviewable through Git.

---

# 8. Metrics for Public MVP

Do not optimize for vanity metrics.

Useful product signals:

### Learning

```text
Lesson started
Lesson completed
Next lesson started
```

### Practice

```text
Challenge attempted
Challenge solved
Retry performed
Review opened after failure
```

### Retention

```text
Learner returns
Learner continues roadmap
Learner reviews weak concept
```

### Community

```text
Repository stars
Forks
Issues
PRs
Content contributors
Challenge contributors
```

The strongest early signal is:

> Users complete a learning activity and return to continue learning.

---

# 9. Architecture Guardrails

Public MVP should not require:

```text
✕ microservices
✕ Kubernetes
✕ Kafka
✕ Redis unless proven necessary
✕ Elasticsearch
✕ dedicated vector DB
✕ live AI dependency
✕ remote code execution
✕ a private backend
✕ LangStride Cloud
```

Recommended principle:

> Use structured content and deterministic behavior first.

---

# 10. Definition of Public MVP Complete

The public MVP is complete when a new user can:

```text
1. Discover the repository.
2. Clone it.
3. Run it from documented steps.
4. Open the PHP roadmap.
5. Complete lessons.
6. Solve practice challenges.
7. Solve debugging/review challenges.
8. See saved progress.
9. Search learning content.
10. Self-host it for non-commercial use.
```

And a contributor can:

```text
1. Understand the repository structure.
2. Add or improve a lesson.
3. Add a challenge.
4. Run validation/tests.
5. Submit a pull request.
```

---

# 11. What Comes After the Public MVP

These are **not part of the public MVP commitment**.

Possible next public/community milestones:

```text
Go Roadmap
Version Diff
PHP → Go Lang Diff
DevOps Fundamentals
System Design Fundamentals
Interactive Sandbox
```

Possible future hosted/commercial products may build on Community Edition, but they should be planned separately after the public repository reaches a useful level of maturity.

---

# 12. Recommended Implementation Order

```text
P0 Repository Foundation
        ↓
P1 PHP Knowledge + Roadmap
        ↓
P2 Local Progress
        ↓
P3 Practice
        ↓
P4 Debug / AI Code Review
        ↓
P5 Mastery + Search + Public Release
```

Do not start the SaaS build until the public repository has completed this loop to a reasonably stable level.
