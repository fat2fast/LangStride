# Mastery and Review

> **Languages**: English | [Tiếng Việt](../../vi/fr/mastery-and-review.md)

Status: Planned. Introduced: P5. Release gate: P5. Actor: learner. Depends on FR-PROGRESS-002, FR-PRAC-008, and FR-DEBUG-010.

## MVP calculation boundary

The MVP uses transparent rules based on lesson completion, practice results, debug/review results, and retry history. It does not claim predictive or ML-based mastery.

### FR-MAST-001 — Concept learning state
The system shall track concept-level learning state. Done when a learner has a stored state for concepts reached through learning activity.

### FR-MAST-002 — Lesson influence
Lesson completion shall influence concept state. Done when completing a lesson changes the associated concept's learning evidence.

### FR-MAST-003 — Practice influence
Practice results shall influence concept state. Done when a challenge result changes learning evidence for each linked concept.

### FR-MAST-004 — Debug/review influence
Debug and review results shall influence concept state. Done when a completed P4 exercise changes learning evidence for its concepts.

### FR-MAST-005 — Weak concepts
A learner shall see weak concepts. Done when the product lists concepts selected by the documented transparent rules as needing review.

### FR-MAST-006 — Review queue
The system shall build a simple review queue. Done when it produces an ordered list of weak-concept review actions.

### FR-MAST-007 — Re-open recommended activity
A learner shall re-open recommended lesson or practice from the review queue. Done when each queue item links to an available learning or practice activity.

### FR-MAST-008 — No complex ML model
The MVP shall not require a complex ML mastery model. Done when queue and weak-concept results are produced without ML training or inference.

### FR-MAST-009 — Optional streak
The product could display an optional streak. Done when a learner can see consecutive active periods without the streak blocking any core flow.

