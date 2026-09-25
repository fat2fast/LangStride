# LangStride

> **Languages**: English | [Tiếng Việt](README.vi.md)

> A community-first developer learning and practice platform.

LangStride Community Edition is the public repository of LangStride. It is intended for personal learning, education, research, community contribution, and non-commercial self-hosting.

The repository should remain useful on its own. A developer should eventually be able to clone it, run it locally, learn from structured roadmaps, practice, and contribute improvements without depending on any commercial LangStride service.

> Status: Early development / Community Edition  
> Detailed Documentation: [Documentation Hub](docs/README.md) | [English Docs](docs/en/README.md) | [Tài liệu Tiếng Việt](docs/vi/README.md)

## What LangStride is trying to solve

Developer learning is often fragmented:

- roadmaps tell you what to learn;
- documentation explains isolated topics;
- coding platforms provide exercises;
- interview resources focus on memorization;
- migration guides focus on versions rather than transferable knowledge.

LangStride connects these into one learning loop:

```text
Programming
    ↓
Practice Challenges
    ↓
Debugging
    ↓
Version Diff
    ↓
Lang Diff
```

Parallel tracks will include:

- DevOps
- Interactive System Design
- Debugging
- Developer fundamentals

See detailed specification in [Knowledge and Content Model](docs/en/fr/knowledge-model.md).

---

## Core principles

### Guided learning

Learners should always know what to learn next.

The roadmap is a learning path, not just a list of links.

### Learn by doing

```text
Learn
  ↓
Quick Check
  ↓
Challenge
  ↓
Review
  ↓
Retry
  ↓
Master
```

### Short, focused lessons

A typical lesson should be small enough to finish in one focused session:

```text
Concept
↓
Why it matters
↓
Visual explanation
↓
Code example
↓
Common mistakes
↓
Quick check
↓
Practice
```

See specification: [Lessons (FR-LESSON)](docs/en/fr/lessons.md).

### Reusable knowledge

Concepts should not be locked to a single programming language.

```text
                 Interface
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
   PHP Interface          Go Interface
```

This allows the same knowledge model to support learning, practice, Version Diff, and Lang Diff.

See specification: [Knowledge Model (FR-KNOW)](docs/en/fr/knowledge-model.md).

### Community-maintained technical knowledge

Technical content should be version-controlled, reviewable, and attributable to reliable sources where appropriate.

AI may assist future workflows, but deterministic learning and validation should not depend on AI correctness.

---

# Product direction

The main public product progression is:

```text
Programming
    ↓
Practice Challenges
    ↓
Version Diff
    ↓
Lang Diff
```

Debugging, DevOps, and System Design reuse the same learning and practice model.

## Programming

Initial language tracks:

- PHP
- Go

The first implementation milestone focuses on PHP.

Example PHP path:

```text
Fundamentals
→ Types
→ Control Flow
→ Functions
→ Arrays
→ OOP
→ Interfaces / Traits
→ Error Handling
→ Composer
→ Testing
→ HTTP
→ Database
→ Runtime
```

Example Go path:

```text
Fundamentals
→ Types
→ Functions
→ Structs
→ Methods
→ Interfaces
→ Errors
→ Pointers
→ Slices / Maps
→ Goroutines
→ Channels
→ Context
→ Testing
→ Modules
→ HTTP
```

Related specifications:
- [PHP Roadmap (FR-PHP)](docs/en/fr/php-roadmap.md)
- [Lessons Specification (FR-LESSON)](docs/en/fr/lessons.md)

## Practice Challenges

Planned challenge formats include:

- multiple choice;
- predict the output;
- fill in the code;
- bug fixing;
- small implementation tasks;
- refactoring;
- interview-style questions.

A failed challenge should point the learner back to the concept they need to review.

Related specifications:
- [Shared Practice Engine (FR-PRAC)](docs/en/fr/practice-engine.md)
- [Multiple-Choice Practice (FR-MCQ)](docs/en/fr/practice-multiple-choice.md)
- [Predict-Output Practice (FR-OUTPUT)](docs/en/fr/practice-predict-output.md)
- [Fix-the-Code Practice (FR-FIX)](docs/en/fr/practice-fix-the-code.md)

## Debugging

Debugging is treated as a core developer skill.

```text
Error Messages
→ Stack Traces
→ Logs
→ Reproducing Bugs
→ Hypothesis Building
→ Root Cause Analysis
→ Performance Debugging
→ Production Debugging
```

Debug scenarios may include source files, logs, stack traces, HTTP traces, database logs, metrics, and traces.

Related specifications:
- [Debugging Practice (FR-DEBUG)](docs/en/fr/debugging-practice.md)
- [AI-Generated Code Review (FR-AIREVIEW)](docs/en/fr/ai-generated-code-review.md)

## DevOps

The DevOps track is intended for application developers who want to understand how software is built, deployed, operated, and debugged.

```text
Linux / Shell / Git
        ↓
Networking / HTTP / DNS
        ↓
Docker / Docker Compose
        ↓
Reverse Proxy / TLS
        ↓
CI/CD
        ↓
Logging / Metrics / Tracing
        ↓
Cloud Fundamentals
        ↓
Infrastructure
        ↓
Kubernetes / IaC
```

## Interactive System Design

System Design should be practiced visually:

```text
Learn
→ Build
→ Validate
→ Break
→ Improve
```

Initial challenge ideas include:

- URL Shortener
- Rate Limiter
- Notification System

Architecture diagrams should eventually be stored as semantic graphs rather than screenshots only.

## Version Diff

Version Diff explains important changes between versions of the same language.

```text
PHP 7.4
   ↓
PHP 8.0
   ↓
PHP 8.1
```

Change categories may include:

- new feature;
- breaking change;
- deprecated;
- removed;
- syntax;
- runtime;
- standard library;
- performance;
- security;
- tooling.

Atomic transitions should be stored independently and combined when needed.

## Lang Diff

The first planned transition is:

```text
PHP → Go
```

Lang Diff is not intended to be a syntax converter.

It should explain:

1. Concept Diff
2. Syntax Diff
3. Idiom Diff
4. Runtime / Architecture Diff

Example:

```text
PHP Developer
      │
      ▼
Transferable knowledge
✓ HTTP
✓ SQL
✓ APIs
✓ Functions

Learn differently
→ Interfaces
→ Error handling
→ Package design

New mental models
→ Pointers
→ Goroutines
→ Channels
→ Context
```

The goal is to help developers learn the target language idiomatically instead of mechanically translating source code.

---

# Community Edition

This repository is the LangStride Community Edition.

The intended workflow is:

```text
git clone
   ↓
run locally
   ↓
learn
   ↓
practice
   ↓
track progress
   ↓
contribute
```

As development progresses, the public repository may include:

- learning roadmaps;
- lessons;
- programming challenges;
- debugging challenges;
- DevOps learning content and labs;
- System Design fundamentals;
- Version Diff data;
- Lang Diff data;
- basic progress tracking;
- basic search;
- contribution tooling.

Features of any separate commercial or hosted LangStride products are outside the scope of this repository.

Related specifications:
- [Learning Progress (FR-PROGRESS)](docs/en/fr/learning-progress.md)
- [Home & Continue Learning (FR-HOME)](docs/en/fr/home-continue-learning.md)
- [Mastery and Review (FR-MAST)](docs/en/fr/mastery-and-review.md)
- [Search (FR-SEARCH)](docs/en/fr/search.md)

---

# Community contributions

LangStride is intended to accept more than code contributions.

Contributor roles may include:

```text
Code Contributor
Content Contributor
Roadmap Maintainer
Challenge Author
Technical Reviewer
Translator
```

Useful contributions include:

- correcting technical explanations;
- adding code examples;
- proposing roadmap changes;
- adding concepts;
- writing challenges;
- creating debugging scenarios;
- documenting version changes;
- reviewing PHP → Go mappings;
- improving accessibility and UI;
- adding translations;
- improving tests and tooling.

Related specifications:
- [Content Contribution (FR-CONT)](docs/en/fr/content-contribution.md)
- [Content Operations (FR-ADMIN)](docs/en/fr/content-operations.md)
- Detailed rules will live in `CONTRIBUTING.md`.

---

# Planned repository structure

```text
langstride/
│
├── apps/
│   └── web/
│
├── packages/
│   ├── learning/
│   ├── practice/
│   ├── diff/
│   └── ui/
│
├── content/
│   ├── programming/
│   │   ├── php/
│   │   └── go/
│   ├── debugging/
│   ├── devops/
│   └── system-design/
│
├── challenges/
├── roadmaps/
├── supabase/
├── docs/
│   ├── README.md               # Multilingual documentation hub
│   ├── en/                     # English documentation
│   │   ├── roadmap.md
│   │   ├── fr-map.md
│   │   └── fr/
│   └── vi/                     # Vietnamese documentation
│       ├── roadmap.md
│       ├── fr-map.md
│       └── fr/
├── README.md                   # English root README
└── README.vi.md                # Vietnamese root README
```

The structure may evolve as the implementation matures.

Related specification:
- [Repository Foundation (FR-REPO)](docs/en/fr/repository-foundation.md)

---

# Technical direction

| Area | Technology |
|---|---|
| Primary language | TypeScript |
| Web | Next.js / React |
| Styling | Tailwind CSS |
| Database | PostgreSQL / Supabase |
| Authentication | Supabase Auth |
| Search | PostgreSQL Full Text Search |
| CI | GitHub Actions |
| Architecture | Modular monolith |
| System Design canvas | tldraw (planned) |

Early development should avoid unnecessary infrastructure such as Kubernetes, Kafka, Elasticsearch, a dedicated vector database, or microservices.

Related specification:
- [Quality Attributes & Non-Functional Requirements (NFR)](docs/en/fr/quality-attributes.md)

---

# Development roadmap

| Phase | Scope |
|---|---|
| P0 | Foundation |
| P1 | PHP Programming Roadmap |
| P2 | Programming Practice Challenges |
| P3 | Learning Loop & Mastery |
| P4 | Debugging Fundamentals & Challenges |
| P5 | DevOps Fundamentals & Labs |
| P6 | Interactive System Design |
| P7 | Version Diff |
| P8 | PHP → Go Lang Diff |
| P9 | Cross-Language Practice |
| P10 | Interactive Sandbox |
| P11 | MCP / Agent / Migration Tooling |

Detailed planning and functional requirements:

- 🇬🇧 **[MVP Roadmap (English)](docs/en/roadmap.md)** | 🇻🇳 **[Lộ trình MVP (Tiếng Việt)](docs/vi/roadmap.md)**
- 🇬🇧 **[Functional Requirements Map (English)](docs/en/fr-map.md)** | 🇻🇳 **[Bản đồ FR (Tiếng Việt)](docs/vi/fr-map.md)**
- 📚 **[Documentation Hub](docs/README.md)**

---

# Getting started

The repository is still being initialized, so commands may change.

Expected workflow:

```bash
git clone <LANGSTRIDE_REPOSITORY_URL>
cd langstride
pnpm install
cp .env.example .env.local
pnpm dev
```

A Docker-based self-hosting workflow may be added as Community Edition matures.

Related specifications:
- [Local Installation (FR-REPO-007)](docs/en/fr/repository-foundation.md)
- [Self-Hosting (FR-HOST)](docs/en/fr/self-hosting.md)

---

# Self-hosting

Non-commercial self-hosting is an intended use of LangStride Community Edition.

Examples include:

- personal learning;
- free study groups;
- classrooms;
- research;
- hobby projects;
- free community learning instances.

All use remains subject to the repository license.

Related specification:
- [Self-Hosting Specification (FR-HOST)](docs/en/fr/self-hosting.md)

---

# License

Unless a file or directory explicitly states otherwise, this repository is licensed under the **PolyForm Noncommercial License 1.0.0**.

In practical terms, non-commercial use may include:

```text
✓ viewing the source
✓ cloning the repository
✓ studying the implementation
✓ modifying the project
✓ creating forks
✓ personal learning
✓ research and education
✓ permitted redistribution
✓ genuinely non-commercial self-hosting
```

Commercial use is not granted by this license.

The legal text in [`LICENSE.md`](LICENSE.md) controls if this summary differs from the license itself.

LangStride Community Edition is therefore **source-available for non-commercial use** and should not be described as OSI-approved open source.

---

# Current priority

The immediate product milestone is intentionally narrow:

```text
PHP Roadmap
     ↓
Short Lessons
     ↓
Practice Challenges
     ↓
Progress / Mastery
```

The project should prove this learning loop before expanding into every planned domain.

---

# Project philosophy

LangStride should help developers answer:

```text
What should I learn next?
        ↓
Do I understand it?
        ↓
Can I apply it?
        ↓
Can I debug it?
        ↓
What changed between versions?
        ↓
How does this knowledge transfer to another language?
```

The public repository exists to make that knowledge useful, reviewable, reusable, and improvable by the developer community.
