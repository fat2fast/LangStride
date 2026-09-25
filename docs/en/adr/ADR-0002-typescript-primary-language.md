# ADR-0002 — TypeScript as Primary Implementation Language

> **Languages**: English | [Tiếng Việt](../../vi/adr/ADR-0002-typescript-primary-language.md)

- **Status**: Accepted
- **Last Updated**: 2026-09-25
- **Scope**: Public MVP Architecture
- **Authority**: Architecture Decision Record (Canonical)

## Context

The project requires end-to-end type safety across domain models, UI components, content validation schemas, and local tooling.

## Decision

We adopt TypeScript as the primary language for both web frontend and backend services, as well as data parsing and validation tooling.

## Alternatives Considered

1. Go/Python backend + TypeScript frontend: Increases context-switching for community contributors and complicates local monorepo setup for MVP.
2. Plain JavaScript: Lacks compile-time safety across complex domain models.

## Consequences

- Single ecosystem and toolchain (Node.js/TypeScript).
- Types shared directly between backend logic and UI.
- Easy contribution workflow for frontend and full-stack developers.
