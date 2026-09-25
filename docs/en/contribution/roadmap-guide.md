# Roadmap Contribution Guide

> **Languages**: English | [Tiếng Việt](../../vi/contribution/roadmap-guide.md)

- **Status**: Active
- **Last Updated**: 2026-09-25
- **Scope**: Roadmaps and Prerequisites
- **Authority**: Contributor Guide (Canonical)

This guide describes how to propose additions, structural re-orderings, or prerequisite adjustments to LangStride learning roadmaps.

## Guiding Principles

1. **A roadmap is a guided learning path**, not a generic bookmark directory.
2. **Every node must have clear prerequisites**: Learners should never feel lost or encounter unexplained foundational knowledge.
3. **Language-Agnostic Concepts**: Roadmap nodes should bind to generic concept IDs where possible, allowing future cross-language mappings.

## Roadmap Node Schema

```json
{
  "id": "php-control-flow",
  "title": "Control Flow",
  "section": "Fundamentals",
  "concept_id": "concept-control-flow",
  "prerequisites": ["php-variables-types", "php-operators"],
  "estimated_minutes": 25,
  "status": "published"
}
```

## Proposing Changes

- Open an issue or PR describing **why** the sequence or prerequisite change improves learner comprehension.
- Avoid introducing nodes for narrow libraries; focus on language fundamentals, runtime mechanics, and software engineering principles.
