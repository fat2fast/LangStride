# ADR-0001 — Use Modular Monolith Architecture

> **Languages**: English | [Tiếng Việt](../../vi/adr/ADR-0001-modular-monolith.md)

- **Status**: Accepted
- **Last Updated**: 2026-09-25
- **Scope**: Public MVP Architecture
- **Authority**: Architecture Decision Record (Canonical)

## Context

LangStride Community Edition requires an architecture that is simple to run locally, trivial to self-host without cloud infrastructure expertise, and structured enough to allow modular domain boundaries (learning, practice, search).

## Decision

We choose a Modular Monolith architecture. Core domain logic will reside in modular packages (e.g., packages/learning, packages/practice, packages/ui) within a single repository, deployed as a single application unit.

## Alternatives Considered

1. Microservices: Adds severe networking, deployment, and operational complexity unsuitable for self-hosting.
2. Monolithic without modules: Risk of tight coupling between learning progress, practice engine, and UI.

## Consequences

- Zero requirement for Kubernetes, service discovery, or RPC.
- Single codebase and single build/run command for local and self-hosted environments.
- Clean boundaries enforced at the package/module level.
