# Repository Foundation

> **Languages**: English | [Tiếng Việt](../../vi/fr/repository-foundation.md)

- **Status**: In Specification
- **Last Updated**: 2026-09-25
- **Scope**: Public MVP (P0)
- **Authority**: Functional Requirement Specification (Canonical)

### FR-REPO-001 — Public README
The repository shall provide a public README explaining purpose, current status, and entry points. Done when a new contributor can identify the MVP, documentation, and local-start path from the README.

### FR-REPO-002 — License
The repository shall include the project license. Done when the license file is present and linked from public project documentation.

### FR-REPO-003 — Contribution guidelines
The repository shall include contribution guidelines. Done when a contributor can find how to propose code or content changes.

### FR-REPO-004 — Code of conduct
The repository should include a code of conduct. Done when expected community conduct and reporting path are documented.

### FR-REPO-005 — Issue templates
The repository should include issue templates. Done when a user can choose structured issue guidance for supported issue categories.

### FR-REPO-006 — Pull-request template
The repository should include a pull-request template. Done when a new pull request prompts for change summary and validation evidence.

### FR-REPO-007 — Local installation
The repository shall document local installation. Done when the steps in documentation take a fresh clone to a runnable development environment.

### FR-REPO-008 — Environment example
The repository shall include `.env.example`. Done when required environment-variable names and safe example values are available without exposing secrets.

### FR-REPO-009 — Seed/content import
The repository shall provide a repeatable seed or content-import workflow. Done when the documented workflow can populate the application with its required sample learning content.

### FR-REPO-010 — CI validation
CI shall validate build, lint, and tests. Done when each check executes for repository changes and failure blocks a passing CI result.

### FR-REPO-011 — Standalone use
The repository shall be usable without LangStride SaaS. Done when the supported local path completes core learning without a hosted LangStride dependency.

#### Acceptance Criteria
- **Given**: A local machine with no external network access to LangStride cloud services.
- **When**: A developer boots the supported local application.
- **Then**: Roadmaps, lessons, and practice challenges execute with zero phone-home network calls.
