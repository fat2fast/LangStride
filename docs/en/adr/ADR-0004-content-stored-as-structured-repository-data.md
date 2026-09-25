# ADR-0004 — Educational Content Stored as Structured Repository Data

> **Languages**: English | [Tiếng Việt](../../vi/adr/ADR-0004-content-stored-as-structured-repository-data.md)

- **Status**: Accepted
- **Last Updated**: 2026-09-25
- **Scope**: Public MVP Architecture
- **Authority**: Architecture Decision Record (Canonical)

## Context

Community contribution is a core tenet. Technical lessons, roadmaps, and practice challenges must be transparently reviewable, auditable, and version-controlled.

## Decision

Educational content (roadmaps, lessons, challenges) is authored and versioned as structured Markdown (with frontmatter) and JSON/YAML within the Git repository. The application synchronizes/seeds content from these files into the database.

## Alternatives Considered

1. Web-based Admin CMS storing directly to database: Content changes cannot be reviewed in Pull Requests or forked via Git.
2. Proprietary Headless CMS: Requires third-party cloud service accounts.

## Consequences

- Anyone can propose lesson or challenge improvements via standard Git PRs.
- Content history and attribution are preserved in Git commit history.
- Content can be validated by CI before merging.
