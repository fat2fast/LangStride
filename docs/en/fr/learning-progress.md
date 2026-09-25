# Learning Progress

> **Languages**: English | [Tiếng Việt](../../vi/fr/learning-progress.md)

- **Status**: In Specification
- **Last Updated**: 2026-09-25
- **Scope**: Public MVP (P2)
- **Authority**: Functional Requirement Specification (Canonical)

### FR-PROGRESS-001 — Mark started
A learner shall be able to mark a lesson started. Done when opening or explicitly starting a lesson records an in-progress state.

### FR-PROGRESS-002 — Mark completed
A learner shall be able to mark a lesson completed. Done when completion records a completed state for the learner and lesson.

### FR-PROGRESS-003 — Persist progress
Lesson progress shall persist across restart. Done when saved progress is restored after the supported application restart path.

### FR-PROGRESS-004 — Roadmap progress state
A roadmap node shall reflect the learner's current progress state. Done when not-started, in-progress, and completed lessons are visually distinguishable on the roadmap.

### FR-PROGRESS-005 — Resume position
A learner shall be able to resume the last learning position. Done when the application retains enough lesson context to return the learner to their most recent unfinished position.

#### Acceptance Criteria
- **Given**: The learner previously started lesson B and closed the application.
- **When**: The learner re-opens the application.
- **Then**: The system identifies lesson B as the active resumption target without requiring manual navigation through the roadmap.

### FR-PROGRESS-006 — Bookmark lesson
A learner should be able to bookmark a lesson. Done when a bookmark can be added, removed, and listed for that learner.

### FR-PROGRESS-007 — Recent activity
A learner should see recent learning activity. Done when recent starts and completions are available in chronological order.

### FR-PROGRESS-008 — No hosted-account dependency
Progress shall work without a hosted LangStride account. Done when the supported local or self-hosted identity mode persists progress independently of LangStride SaaS.
