# AI-Generated Code Review Practice

> **Languages**: English | [Tiếng Việt](../../vi/fr/ai-generated-code-review.md)

- **Status**: In Specification
- **Last Updated**: 2026-09-25
- **Scope**: Public MVP (P4)
- **Authority**: Functional Requirement Specification (Canonical)

### FR-AIREVIEW-001 — Generated-code label
A challenge shall be labelable as generated-code review. Done when the learner can distinguish this exercise type from ordinary debugging practice.

### FR-AIREVIEW-002 — Identify unsafe choices
A learner shall identify unsafe or incorrect implementation choices. Done when the exercise accepts a selection or explanation of its prepared problematic choices.

### FR-AIREVIEW-003 — Explain the problem
An exercise shall ask why an implementation is problematic. Done when a learner-facing prompt requests the engineering rationale.

### FR-AIREVIEW-004 — Improve implementation
An exercise shall require choosing or submitting an improved implementation. Done when the exercise accepts an explicitly better prepared option or correction.

### FR-AIREVIEW-005 — No runtime AI service
An AI service shall not be required to generate or grade an exercise at runtime. Done when static content and deterministic validation complete the exercise.

### FR-AIREVIEW-006 — Engineering judgment focus
Exercises shall emphasize engineering judgment rather than prompt writing. Done when acceptance evaluates code safety, correctness, trade-offs, or verification rather than prompt phrasing.
