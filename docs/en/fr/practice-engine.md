# Practice Engine

> **Languages**: English | [Tiếng Việt](../../vi/fr/practice-engine.md)

Status: Planned. Introduced: P3. Release gate: P3. Actor: learner and challenge contributor. Depends on FR-KNOW-001, FR-LESSON-006, and FR-PROGRESS-003. Applicable constraints: NFR-CONTRIB-002 and NFR-AI-002.

### FR-PRAC-001 — Stable challenge identifier
Every challenge shall have a stable identifier. Done when attempts and content references resolve to one challenge across content updates.

### FR-PRAC-002 — Concept references
A challenge shall reference one or more concepts. Done when every published challenge lists at least one valid concept identifier.

### FR-PRAC-003 — Language reference
A challenge shall reference a programming language. Done when every published challenge declares its language.

### FR-PRAC-004 — Difficulty
A challenge shall support difficulty. Done when a challenge declares a supported difficulty value.

### FR-PRAC-005 — Hints
A challenge should support hints. Done when an author can provide ordered, learner-visible hints.

### FR-PRAC-006 — Solution and explanation
A challenge shall support a solution or explanation. Done when the learner can read the prepared explanation after submission.

### FR-PRAC-007 — Persist attempt
A user attempt shall be persisted. Done when the learner's submitted answer and timestamp survive restart.

### FR-PRAC-008 — Persist result
A challenge result shall be persisted. Done when the deterministic pass/fail result is available after restart.

### FR-PRAC-009 — Failure recovery link
A failed challenge shall link to relevant learning content. Done when failure presents at least one linked concept or lesson from the challenge's concept references.

### FR-PRAC-010 — Repository-authored challenge
A challenge shall be authorable as repository content or data. Done when a contributor can add a valid challenge through a reviewable repository file.

