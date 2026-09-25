# Home and Continue Learning

> **Languages**: English | [Tiếng Việt](../../vi/fr/home-continue-learning.md)

Status: Planned. Introduced: P2. Release gate: P2. Actor: learner. Depends on FR-PROGRESS-003 and FR-PROGRESS-005.

## Selection rule

“Most relevant unfinished lesson” means the most recently accessed lesson that is not completed; if none exists, choose the first available roadmap lesson. This deterministic rule may be superseded only by a versioned requirement change.

### FR-HOME-001 — Continue action
Home shall show a clear Continue Learning action. Done when the primary home action is identifiable without scanning competing primary actions.

### FR-HOME-002 — Open relevant lesson
Continue Learning shall open the most relevant unfinished lesson. Done when the action follows the selection rule above.

### FR-HOME-003 — Basic roadmap progress
Home should show basic PHP roadmap progress. Done when the learner can see completed versus total available PHP lessons.

### FR-HOME-004 — Single primary decision
Home shall avoid requiring a learner to choose among many competing actions. Done when Continue Learning remains the single primary call to action for a learner with resumable work.

