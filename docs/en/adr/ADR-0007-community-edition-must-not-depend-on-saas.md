# ADR-0007 — Community Edition Must Not Depend on LangStride SaaS

> **Languages**: English | [Tiếng Việt](../../vi/adr/ADR-0007-community-edition-must-not-depend-on-saas.md)

- **Status**: Accepted
- **Last Updated**: 2026-09-25
- **Scope**: Public MVP Architecture
- **Authority**: Architecture Decision Record (Canonical)

## Context

LangStride is released as a community-first repository under PolyForm Noncommercial License. For the repository to be genuinely valuable to developers and educators, it must run independently.

## Decision

No core MVP feature (PHP roadmap, lessons, practice, debugging, local progress, search, self-hosting) shall require a hosted LangStride account, phone-home telemetry, or proprietary cloud backend.

## Alternatives Considered

1. Open-core with mandatory cloud sync for progress: Destroys user trust and makes local education instances fragile.

## Consequences

- True offline and private self-hosting for classrooms, study groups, and personal learning.
- Clear architectural boundary between public Community Edition and future commercial offerings.
