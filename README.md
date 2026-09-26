# LangStride

> **Languages**: English | [Tiếng Việt](README.vi.md)

> A community-first, non-commercial developer learning and practice platform.

LangStride Community Edition is the public repository of LangStride. It is built for personal learning, developer education, research, community contributions, and non-commercial self-hosting.

This repository is designed to be independently useful. A developer should be able to clone it, run it locally, follow structured roadmaps, practice deterministic coding challenges, and contribute improvements without depending on any hosted commercial LangStride service.

- **Status**: P0 Foundation & P1 PHP First Vertical Slice Completed (Proof Slice; P1 Expansion in progress)
- **Scope**: Public MVP (P0–P5)
- **License**: PolyForm Noncommercial License 1.0.0 ([LICENSE.md](LICENSE.md))
- **Documentation**: [Documentation Hub](docs/README.md) | [English Docs](docs/en/README.md) | [Tài liệu Tiếng Việt](docs/vi/README.md)

---

## 1. What LangStride Solves

Developer learning is currently fragmented across isolated channels:

- Roadmaps tell you what to learn, but not how to practice;
- Static documentation explains features in isolation;
- Coding challenge platforms focus heavily on abstract algorithm memorization;
- Version upgrade notes detail changelogs rather than transferable mental models.

LangStride connects these into a single cohesive developer feedback loop:

```text
Concept Learning (Short, structured lessons)
          ↓
Deliberate Practice (Deterministic challenges)
          ↓
Debugging & Code Review (Finding bugs, analyzing stack traces)
          ↓
Local Progress & Mastery (Transparent review queue)
```

See [Product Vision & Scope Boundary](docs/en/product/mvp-scope.md).

---

## 2. Core Learning Principles

- **Guided Learning**: Learners always know what to learn next via structured prerequisite trees, not loose lists of web links.
- **Learn by Doing**: Every short concept immediately connects to an interactive quick check and deterministic practice challenge.
- **Short, Focused Lessons**: Lessons are structured to be completed in one single focused sitting (5–10 minutes):
  ```text
  Concept Title → Why It Matters → Mental Model → Code Example → Common Mistakes → Quick Check → Practice
  ```
- **Reusable Knowledge Model**: Concepts are modeled as language-independent abstractions, allowing knowledge to transfer across programming languages ([ADR-0005](docs/en/adr/ADR-0005-concept-model-independent-of-language.md)).
- **Deterministic & AI-Free Core**: Practice challenges and debugging exercises evaluate reproducibly without requiring external AI APIs ([ADR-0006](docs/en/adr/ADR-0006-deterministic-validation-before-ai.md)).

---

## 3. Public MVP Scope (P0 — P5)

The Public Repository MVP focuses strictly on proving the core standalone learning loop for **PHP**:

| Phase | Milestone | Scope Summary | Key Specification |
|---|---|---|---|
| **P0** | **Repository Foundation** | Git conventions, seed workflow, CI checks, contributor guidelines | [repository-foundation.md](docs/en/fr/repository-foundation.md) |
| **P1** | **PHP Knowledge & Roadmap** | 20–30 concepts, 10–15 complete lessons, prerequisite graph | [php-roadmap.md](docs/en/fr/php-roadmap.md), [lessons.md](docs/en/fr/lessons.md) |
| **P2** | **Local Learning Progress** | Persistent resume position, Continue Learning primary CTA | [learning-progress.md](docs/en/fr/learning-progress.md), [home-continue-learning.md](docs/en/fr/home-continue-learning.md) |
| **P3** | **Programming Practice** | Multiple choice, predict output, fix the code challenges | [practice-engine.md](docs/en/fr/practice-engine.md) |
| **P4** | **Debugging & AI Code Review** | Static stack traces, error diagnosis, root cause evaluation | [debugging-practice.md](docs/en/fr/debugging-practice.md), [ai-generated-code-review.md](docs/en/fr/ai-generated-code-review.md) |
| **P5** | **Mastery & Public Release** | Transparent review queue, PostgreSQL full-text search, release | [mastery-and-review.md](docs/en/fr/mastery-and-review.md), [search.md](docs/en/fr/search.md) |

Detailed planning and functional requirements:
- 🇬🇧 **[MVP Roadmap (English)](docs/en/roadmap.md)** | 🇻🇳 **[Lộ trình MVP (Tiếng Việt)](docs/vi/roadmap.md)**
- 🇬🇧 **[Functional Requirements Map](docs/en/fr-map.md)** | 🇻🇳 **[Bản đồ FR (Tiếng Việt)](docs/vi/fr-map.md)**

---

## 4. Post-MVP Direction (Not Part of Public MVP)

The following areas represent long-term directions for LangStride. They are **strictly outside the Public MVP scope** and will not be scheduled until P0–P5 are implemented and validated:

```text
Full Go Roadmap
Version Diff Engine (e.g., PHP 7.4 → PHP 8.1)
PHP → Go Lang Diff Engine
DevOps Fundamentals & Labs
Interactive System Design Simulator
Interactive Sandbox (Live Execution)
Remote Terminal Access
Model Context Protocol (MCP) Integrations
Autonomous Migration Agents
Cloud Multi-Device Sync
Hosted SaaS Subscriptions & Teams
Enterprise RBAC
```

See [Explicit Post-MVP Scope](docs/en/product/mvp-scope.md#4-explicit-post-mvp-scope).

---

## 5. Technology Direction Overview

| Area | Technology Selection | Architectural Rationale |
|---|---|---|
| **Architecture** | Modular Monolith | Single deployable unit, simple self-hosting ([ADR-0001](docs/en/adr/ADR-0001-modular-monolith.md)) |
| **Primary Language** | TypeScript | End-to-end type safety across UI, schemas, and tools ([ADR-0002](docs/en/adr/ADR-0002-typescript-primary-language.md)) |
| **Web Framework** | Next.js / React | Server rendering, component ecosystem, Tailwind CSS styling |
| **Data Layer** | PostgreSQL / Supabase | Relational data, local container runner, migration tooling ([ADR-0003](docs/en/adr/ADR-0003-postgresql-supabase-data-layer.md)) |
| **Search** | PostgreSQL Full Text Search | Zero additional search infrastructure overhead |
| **Content Storage** | Version-Controlled Files | Content reviewable and forkable via Git pull requests ([ADR-0004](docs/en/adr/ADR-0004-content-stored-as-structured-repository-data.md)) |

See [Technical Architecture Overview](docs/en/architecture/overview.md).

---

## 6. Getting Started

### Prerequisites

- **Node.js**: `v22.0.0+` (or `v26+`, see `.nvmrc`)
- **pnpm**: `v9.0.0+` (tested with `v12.x`)
- **Docker**: Docker Desktop / Docker Engine (for local containerized Supabase/PostgreSQL)
- **Supabase CLI**: managed automatically via project `devDependencies` (`supabase` v2.118.0) and Docker

### Local Setup & Development

1. **Clone and install dependencies**:
   ```bash
   git clone https://github.com/fat2fast/LangStride.git
   cd langstride
   pnpm install
   ```

2. **Configure environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   *(Safe local defaults are preconfigured in `.env.example`; no external secrets or cloud accounts required.)*

3. **Start local database**:
   ```bash
   pnpm local:setup
   ```

4. **Validate and sync repository content**:
   ```bash
   pnpm content:validate
   pnpm content:sync
   ```

5. **Start development web application**:
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) or navigate directly to the PHP roadmap at [http://localhost:3000/php](/php).

6. **Run tests and checks**:
   ```bash
   pnpm lint
   pnpm test
   pnpm build
   ```

---

## 7. Self-Hosting Philosophy

Non-commercial self-hosting is an intended first-class use case of LangStride Community Edition:
- Personal learning on a local laptop;
- Free study groups and community coding meetups;
- Academic classrooms and educational workshops;
- Non-commercial local network instances.

All self-hosting must remain non-commercial and strictly comply with [LICENSE.md](LICENSE.md) ([ADR-0007](docs/en/adr/ADR-0007-community-edition-must-not-depend-on-saas.md)).

---

## 8. Community Contributions

We warmly welcome technical contributions from developers, writers, and educators:
- **Lessons**: Write clear explanations and mental models ([Content Guide](docs/en/contribution/content-guide.md)).
- **Roadmaps**: Refine prerequisite relationships and topics ([Roadmap Guide](docs/en/contribution/roadmap-guide.md)).
- **Challenges**: Author deterministic practice questions ([Challenge Guide](docs/en/contribution/challenge-guide.md)).
- **Review**: Review pull requests for technical precision ([Review Guide](docs/en/contribution/technical-review-guide.md)).

Read our full [Contribution Guidelines (CONTRIBUTING.md)](CONTRIBUTING.md) to get started.

---

## 9. License

Unless otherwise explicitly noted, this repository is licensed under the **PolyForm Noncommercial License 1.0.0**.

Permitted non-commercial activities include:
- Viewing, cloning, studying, and modifying the source code;
- Personal learning, academic education, and non-commercial research;
- Running self-hosted instances strictly for free, non-commercial use.

Commercial use is not granted by this license. The legal terms in [LICENSE.md](LICENSE.md) govern all use. LangStride Community Edition is **source-available for non-commercial use** and is not OSI-approved open source.
