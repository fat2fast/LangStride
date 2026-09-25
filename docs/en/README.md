# LangStride Documentation Directory (English)

> **Languages**: English | [Tiếng Việt](../vi/README.md)

- **Status**: In Specification
- **Last Updated**: 2026-09-25
- **Scope**: Public MVP (P0–P5)
- **Authority**: Documentation Index (Canonical)

This directory houses the **canonical specifications** for LangStride Community Edition Public MVP.

## Directory Layout

```text
docs/en/
├── README.md               # This index & reading guide
├── roadmap.md              # Public MVP Roadmap (P0–P5) & Post-MVP boundary (WHEN)
├── fr-map.md               # Functional Requirements Map & Status (WHAT)
├── fr/                     # 18 detailed normative requirement specifications
│   ├── repository-foundation.md
│   ├── php-roadmap.md
│   ├── lessons.md
│   ├── practice-engine.md
│   └── ...
├── architecture/
│   └── overview.md         # Modular monolith technical architecture (HOW)
├── product/
│   └── mvp-scope.md        # Product vision, learning loop, and MVP boundary (WHY)
├── adr/
│   ├── README.md           # Architectural Decision Records index
│   ├── ADR-0001-modular-monolith.md
│   └── ...
└── contribution/
    ├── README.md           # Contributor guide hub
    ├── content-guide.md
    ├── roadmap-guide.md
    ├── challenge-guide.md
    └── technical-review-guide.md
```

## Authority Table

| Document | Role | Authority |
|---|---|---|
| [`roadmap.md`](roadmap.md) | Phased milestones, exit criteria | **Source of truth (WHEN)** |
| [`fr-map.md`](fr-map.md) | Requirement catalog & status | **Source of truth (WHAT)** |
| [`architecture/overview.md`](architecture/overview.md) | Technical implementation pattern | **Technical source (HOW)** |
| [`product/mvp-scope.md`](product/mvp-scope.md) | Scope & non-MVP exclusions | **Product boundary (WHY)** |
| [`adr/`](adr/README.md) | Architecture Decision Records | **Decision record** |
| [`contribution/`](contribution/README.md) | Contribution workflows | **Contributor guide** |
