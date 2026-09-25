# Knowledge and Content Model

Status: Planned. Introduced: P1. Release gate: P1. Actor: learner, content contributor, maintainer. Applies to roadmap, lessons, practice, debugging, and mastery. Applicable constraints: NFR-PORT-003, NFR-CONTRIB-001.

### FR-KNOW-001 — Stable concept identifier
Each concept shall have a stable unique identifier. Done when references from lessons, roadmap nodes, and challenges resolve to one concept.

### FR-KNOW-002 — Prerequisite relation
Concepts shall define prerequisite relationships. Done when a concept can reference zero or more prerequisite concept identifiers.

### FR-KNOW-003 — Related relation
Concepts should define related-concept relationships. Done when a concept can link to non-prerequisite related concepts.

### FR-KNOW-004 — Language-independent concept
A concept shall exist independently of a programming language. Done when a generic concept can be represented without a PHP-specific identity.

### FR-KNOW-005 — Language lesson reference
A language-specific lesson shall reference a generic concept. Done when a PHP lesson links to its concept identifier.

### FR-KNOW-006 — Content-driven lessons
Lessons shall be stored as content or data, not hard-coded UI. Done when changing lesson material does not require changing a lesson-rendering component.

### FR-KNOW-007 — Content lifecycle
Content should support draft, review, and published status. Done when content records can carry one of these lifecycle states and unpublished material is distinguishable.

### FR-KNOW-008 — Technical sources
Technical content should record source references. Done when an author can attach authoritative source metadata to a content item.

### FR-KNOW-009 — Future language compatibility
The model shall remain compatible with future Go and language-difference work. Done when adding a Go lesson can reuse a generic concept without reshaping the concept identity.

