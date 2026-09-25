# Quality Attributes

> **Languages**: English | [Tiếng Việt](../../vi/fr/quality-attributes.md)

- **Status**: In Specification
- **Last Updated**: 2026-09-25
- **Scope**: Public MVP (All)
- **Authority**: Functional Requirement Specification (Canonical)

## Simplicity

### NFR-SIMPLE-001 — Modular monolith
The MVP shall use a modular monolith. Done when no core capability requires an independently deployed service.

### NFR-SIMPLE-002 — No microservices
The MVP shall not require microservices. Done when a fresh supported deployment runs the core application as one product.

### NFR-SIMPLE-003 — No Kubernetes
The MVP shall not require Kubernetes. Done when local and self-hosted setup contains no Kubernetes prerequisite.

### NFR-SIMPLE-004 — No Kafka
The MVP shall not require Kafka. Done when learning flows complete without Kafka.

### NFR-SIMPLE-005 — No dedicated vector database
The MVP shall not require a dedicated vector database. Done when search works with the supported primary data store.

## Portability

### NFR-PORT-001 — SaaS independence
Core features shall not depend on LangStride SaaS. Done when the documented deployment completes the learning loop without a LangStride account or service.

### NFR-PORT-002 — Local development
The repository shall run in a local development environment. Done when documented setup starts the application from a fresh clone.

### NFR-PORT-003 — Version-controlled content
Educational content shall be version-controlled. Done when reviewed content changes can be submitted through Git.

### NFR-PORT-004 — Documented self-host storage
Self-host data storage shall be documented. Done when the hosting guide identifies where persistent learner and content data reside.

## Contribution and AI independence

### NFR-CONTRIB-001 — Reviewable content files
Content files shall be human-reviewable. Done when a contributor can inspect a proposed lesson change without proprietary authoring software.

### NFR-CONTRIB-002 — Reviewable challenge files
Challenge files shall be human-reviewable. Done when a contributor can inspect a challenge and its deterministic expected result in a pull request.

### NFR-CONTRIB-003 — Invalid content rejection
CI should reject structurally invalid content contributions. Done when an invalid content fixture fails the contribution validation path.

### NFR-AI-001 — AI-free core learning
Core learning shall work without an AI API. Done when lessons, progress, and deterministic challenges work with no AI credentials.

### NFR-AI-002 — Deterministic grading
Core grading shall use deterministic logic where possible. Done when each MVP challenge type declares a reproducible pass/fail outcome.

### NFR-AI-003 — Static review examples
Generated-code-review exercises may use prepared static examples. Done when an exercise can be delivered and graded without an AI runtime call.
