# Debugging Practice

Status: Planned. Introduced: P4. Release gate: P4. Actor: learner and challenge contributor. Depends on FR-PRAC-001 through FR-PRAC-010. Applicable constraints: NFR-AI-002.

### FR-DEBUG-001 — Concept references
A debug challenge shall reference one or more concepts. Done when every challenge points to valid concept identifiers.

### FR-DEBUG-002 — Code snippet
A debug challenge shall support a code snippet. Done when the author can include the faulty relevant code.

### FR-DEBUG-003 — Error message
A debug challenge shall support an error message. Done when prepared error text can be displayed.

### FR-DEBUG-004 — Stack trace
A debug challenge shall support a stack trace. Done when prepared trace text can be displayed without a live runtime.

### FR-DEBUG-005 — Static test output
A debug challenge shall support static test output. Done when prepared passing and failing test information can be displayed.

### FR-DEBUG-006 — Simple logs
A debug challenge should support simple logs. Done when a prepared log excerpt can be included.

### FR-DEBUG-007 — Root-cause response
A learner shall identify the root cause. Done when the exercise captures or selects a root-cause answer separately from the fix.

### FR-DEBUG-008 — Fix response
A learner shall submit or select a fix. Done when the exercise captures a proposed correction.

### FR-DEBUG-009 — Deterministic root-cause validation
Root-cause validation shall be deterministic where possible. Done when a prepared answer rule grades the root-cause response without an AI service.

### FR-DEBUG-010 — Practice history contribution
A debug result shall contribute to concept practice history. Done when a completed debug exercise records result data against its concepts.

### FR-DEBUG-011 — No live terminal
Live shell or terminal access is not required. Done when all P4 debug exercises work with static prepared artifacts.

