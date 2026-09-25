# LangStride Technical Architecture Overview

> **Languages**: English | [Tiếng Việt](../../vi/architecture/overview.md)

- **Status**: In Specification
- **Last Updated**: 2026-09-25
- **Scope**: Public MVP Technical Architecture
- **Authority**: Architecture Specification (Canonical)

This document describes **HOW** LangStride Community Edition is structured technically.

## 1. Architectural Style: Modular Monolith

LangStride uses a modular monolith architecture ([ADR-0001](../adr/ADR-0001-modular-monolith.md)). All application packages live in a single repository and compile into a single deployable web application.

```text
langstride/
├── apps/
│   └── web/                # Next.js web application (pages, routing, layout)
├── packages/
│   ├── learning/           # Core domain: concepts, roadmaps, lessons
│   ├── practice/           # Core domain: challenge grading & validators
│   ├── content/            # Content file parsers & seed/sync loaders
│   └── ui/                 # Shared UI components & design system
├── content/                # Version-controlled Markdown lessons
├── challenges/             # Version-controlled challenge definitions
├── roadmaps/               # Version-controlled roadmap JSON definitions
└── supabase/               # PostgreSQL migrations and seed scripts
```

## 2. Technology Choices

- **Primary Language**: TypeScript ([ADR-0002](../adr/ADR-0002-typescript-primary-language.md)).
- **Web Layer**: Next.js / React with Tailwind CSS.
- **Data Layer**: PostgreSQL via Supabase ([ADR-0003](../adr/ADR-0003-postgresql-supabase-data-layer.md)).
- **Search**: PostgreSQL Full-Text Search (tsvector / tsquery).
- **Execution Engine**: In-process deterministic grading ([ADR-0006](../adr/ADR-0006-deterministic-validation-before-ai.md)).

## 3. Educational Content Lifecycle

Educational content is authored as Git files ([ADR-0004](../adr/ADR-0004-content-stored-as-structured-repository-data.md)):

```text
Markdown / JSON in Git
          ↓
CI Structure Validation
          ↓
Seed / Sync Loader (packages/content)
          ↓
PostgreSQL Relational Tables
          ↓
UI Rendering & Search Indexing
```

## 4. Practice & Grading Engine

The MVP avoids expensive and non-deterministic cloud sandboxes:
- Multiple Choice: Evaluates selected option IDs against declared correct set.
- Predict Output: Normalizes learner string submission against expected output string.
- Fix the Code: Evaluates selected correction or exact replacement syntax.
- Debug Exercises: Evaluates root-cause answer and fix selection independently.

Grading requires **zero external AI API calls** ([ADR-0006](../adr/ADR-0006-deterministic-validation-before-ai.md)).
