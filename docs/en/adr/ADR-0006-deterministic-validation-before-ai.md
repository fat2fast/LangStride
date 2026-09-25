# ADR-0006 — Deterministic Validation Before AI

> **Languages**: English | [Tiếng Việt](../../vi/adr/ADR-0006-deterministic-validation-before-ai.md)

- **Status**: Accepted
- **Last Updated**: 2026-09-25
- **Scope**: Public MVP Architecture
- **Authority**: Architecture Decision Record (Canonical)

## Context

Educational platforms must provide consistent, trustworthy, and reproducible feedback. AI evaluators can introduce hallucinations, non-deterministic grading, latency, and expensive API costs.

## Decision

Core practice challenges (Multiple Choice, Predict Output, Fix the Code) and Debugging exercises must be graded deterministically using expected outputs, normalized string matchers, and static verification fixtures without requiring an AI API.

## Alternatives Considered

1. AI-graded open prompts: High cost per attempt, non-deterministic pass/fail outcomes, unusable offline or without third-party API keys.

## Consequences

- 100% reproducible results for learners.
- Zero external API dependency or operational costs for running practice.
- AI may still be explored as an authoring assistant in future phases, but never as an execution gate for core learning.
