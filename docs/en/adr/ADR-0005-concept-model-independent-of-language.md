# ADR-0005 — Knowledge Concept Model Independent of Programming Language

> **Languages**: English | [Tiếng Việt](../../vi/adr/ADR-0005-concept-model-independent-of-language.md)

- **Status**: Accepted
- **Last Updated**: 2026-09-25
- **Scope**: Public MVP Architecture
- **Authority**: Architecture Decision Record (Canonical)

## Context

The long-term vision of LangStride includes multi-language learning and language comparison (Version Diff, PHP -> Go Lang Diff). Locking concepts to PHP would cause massive rework later.

## Decision

Knowledge Concepts (Concept, ConceptRelation) exist as generic, language-independent entities. Language-specific roadmap nodes and lessons link to these generic concepts rather than defining isolated concept silos.

## Alternatives Considered

1. Language-locked models (e.g. php_lessons table with hardcoded topic strings): Simple initially, but completely prevents cross-language transfer and mapping.

## Consequences

- Clean abstraction: Interface is a concept; PHP Interface and Go Interface are language-specific lessons.
- Ready for future Go tracks and Lang Diff without breaking database schema.
