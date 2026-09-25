# Learning Progress

> **Languages**: English | [Tiếng Việt](../../vi/fr/learning-progress.md)

Status: Planned. Introduced: P2. Release gate: P2. Actor: learner. Depends on FR-LESSON-001. Applicable constraints: NFR-PORT-001 and NFR-PORT-004.

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

### FR-PROGRESS-006 — Bookmark lesson
A learner should be able to bookmark a lesson. Done when a bookmark can be added, removed, and listed for that learner.

### FR-PROGRESS-007 — Recent activity
A learner should see recent learning activity. Done when recent starts and completions are available in chronological order.

### FR-PROGRESS-008 — No hosted-account dependency
Progress shall work without a hosted LangStride account. Done when the supported local or self-hosted identity mode persists progress independently of LangStride SaaS.

