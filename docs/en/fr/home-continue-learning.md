# Home and Continue Learning

> **Languages**: English | [Tiếng Việt](../../vi/fr/home-continue-learning.md)

- **Status**: In Specification
- **Last Updated**: 2026-09-25
- **Scope**: Public MVP (P2)
- **Authority**: Functional Requirement Specification (Canonical)

## Selection rule

“Most relevant unfinished lesson” means the most recently accessed lesson that is not completed; if none exists, choose the first available roadmap lesson. This deterministic rule may be superseded only by a versioned requirement change.

### FR-HOME-001 — Continue action
Home shall show a clear Continue Learning action. Done when the primary home action is identifiable without scanning competing primary actions.

### FR-HOME-002 — Open relevant lesson
Continue Learning shall open the most relevant unfinished lesson. Done when the action follows the selection rule above.

#### Acceptance Criteria
- **Given**: The learner previously accessed lesson "php-control-flow" and left it uncompleted.
- **When**: The learner navigates to the Home page.
- **Then**: "Continue Learning" opens "/php/concepts/php-control-flow" directly without showing competing primary CTAs.

### FR-HOME-003 — Basic roadmap progress
Home should show basic PHP roadmap progress. Done when the learner can see completed versus total available PHP lessons.

### FR-HOME-004 — Single primary decision
Home shall avoid requiring a learner to choose among many competing actions. Done when Continue Learning remains the single primary call to action for a learner with resumable work.
