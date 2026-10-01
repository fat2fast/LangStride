# Application Localization Architecture & Policy

> **Languages**: English | [Tiếng Việt](../../vi/architecture/localization.md)

- **Status**: Approved
- **Last Updated**: 2026-10-01
- **Scope**: Public Web Application & Educational Content
- **Authority**: Architecture Specification (Canonical)

This document establishes the architecture, URL scheme, negotiation precedence, and canonical authority for English (`en`) and Vietnamese (`vi`) localization in LangStride.

---

## 1. Core Principles & Authority

1. **English Canonical Authority**:
   - 🇬🇧 **English (`en`)** is the **Canonical Source of Truth** for all educational content, concept identities, and UI specifications.
   - 🇻🇳 **Tiếng Việt (`vi`)** is the **Reference Content and Translation** provided for Vietnamese-speaking learners and engineers.
   - In case of any semantic ambiguity or discrepancy, the English canonical specification controls.

2. **Track Language vs Interface Locale**:
   - The identifier `php` represents the **programming track language** (`trackLanguage`).
   - The identifiers `en` and `vi` represent **presentation and content locales** (`locale`).
   - `php` is NEVER an interface locale; `locale` and `trackLanguage` are completely separate dimensions.

3. **Deterministic Local-First Delivery**:
   - Localization does not use hosted translation APIs, runtime machine translation, or external network services.
   - All translated content is version-controlled and stored as Git files.
   - File mode and optional database read-model return the exact same localized contract.

---

## 2. Canonical URL Scheme & HTTP Routing

1. **Locale-Prefixed URLs**:
   - Every public web application route is canonical and locale-prefixed:
     - Home: `/en`, `/vi`
     - PHP Roadmap: `/en/php`, `/vi/php`
     - Lesson: `/en/php/concepts/:slug`, `/vi/php/concepts/:slug`
   - The HTML root `<html lang="...">` dynamically reflects the active locale (`en` or `vi`).

2. **Locale Negotiation & Redirect Precedence**:
   For legacy or unprefixed entry points (`/`, `/php`, `/php/concepts/:slug`), `apps/web/middleware.ts` negotiates the destination locale exactly once using the following precedence:
   1. Explicit user cookie: `NEXT_LOCALE` (set when the user interacts with the language switcher).
   2. Browser `Accept-Language` header (detecting `vi` preference).
   3. Default fallback: `en`.

3. **HTTP Status & Redirect Behavior**:
   - Legacy unprefixed routes perform a single HTTP redirect (307 in dev, 308/307 canonical) to their locale-prefixed equivalent (e.g. `/php` -> `/en/php`).
   - Valid locale prefixes (`/en/...`, `/vi/...`) are served directly without redirection loops.
   - Unsupported locale prefixes (e.g. `/fr/...`, `/es/...`, `/de/...`) return **HTTP 404 (Not Found)**.
   - Non-existent lesson slugs under a valid locale return HTTP 404.

---

## 3. Localization Scope

- **In Scope**:
  - Entire web application user interface (navigation, shell, buttons, accessibility labels, tooltips, dialogs, status badges, not-found views).
  - The PHP developer roadmap structure and metadata.
  - All six published PHP lessons (`variables-and-types`, `control-flow`, `functions`, `classes-and-objects`, `interfaces`, `exceptions`).
- **Excluded**:
  - Documentation tree bulk rewrite (documentation in `docs/en` and `docs/vi` remains governed by `docs/README.md`).

---

## 4. Content Storage Convention

Localized learning data is organized by explicit locale directories to prevent collision with programming tracks:

```text
content/
└── locales/
    ├── en/
    │   ├── knowledge/
    │   │   └── concepts.json
    │   ├── roadmaps/
    │   │   └── php.json
    │   └── programming/
    │       └── php/
    │           └── lessons/
    │               ├── variables-and-types.md
    │               ├── control-flow.md
    │               ├── functions.md
    │               ├── classes-and-objects.md
    │               ├── interfaces.md
    │               └── exceptions.md
    └── vi/
        ├── knowledge/
        │   └── concepts.json
        ├── roadmaps/
        │   └── php.json
        └── programming/
            └── php/
                └── lessons/
                    ├── variables-and-types.md
                    ├── control-flow.md
                    ├── functions.md
                    ├── classes-and-objects.md
                    ├── interfaces.md
                    └── exceptions.md
```
