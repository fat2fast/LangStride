# ADR-0003 — PostgreSQL / Supabase as Primary Data Layer

> **Languages**: English | [Tiếng Việt](../../vi/adr/ADR-0003-postgresql-supabase-data-layer.md)

- **Status**: Accepted
- **Last Updated**: 2026-09-25
- **Scope**: Public MVP Architecture
- **Authority**: Architecture Decision Record (Canonical)

## Context

LangStride requires persistent relational storage for learner progress, attempt records, bookmarks, and fast text search over lessons and concepts.

## Decision

We choose PostgreSQL as the foundational database, utilizing Supabase for local containerized development, migrations, and PostgreSQL Full Text Search.

## Alternatives Considered

1. SQLite: Lacks robust full-text search capabilities and concurrency for multi-user self-hosted deployments.
2. Elasticsearch / Dedicated Vector DB: Massive memory and infrastructure overhead, violating MVP simplicity constraints.

## Consequences

- Single database engine handles relations, progress tracking, and search.
- Fully reproducible via Docker Compose or Supabase CLI locally.
- Zero cloud database dependency for self-hosters.
