# Contributing to LangStride Community Edition

> **Languages**: English | [Tiếng Việt](CONTRIBUTING.vi.md)

Welcome! Thank you for your interest in contributing to **LangStride Community Edition**.

LangStride is a community-first, non-commercial learning and practice platform for developers. We value all forms of contribution — especially technical writing, corrections, and challenge authoring — as much as code contributions.

## Contributor Roles & Pathways

You do **not** need to be a software engineer or understand our application codebase to contribute valuable learning material. We separate content authoring from code maintenance:

| Contribution Area | What You Contribute | Guide |
|---|---|---|
| **Lessons & Concepts** | Explain concepts, write code examples, fix technical typos | [Content Contribution Guide](docs/en/contribution/content-guide.md) |
| **Roadmaps** | Propose nodes, refine prerequisite graphs, organize sections | [Roadmap Contribution Guide](docs/en/contribution/roadmap-guide.md) |
| **Practice Challenges** | Create MCQs, predict-output, and fix-the-code challenges | [Practice Challenge Guide](docs/en/contribution/challenge-guide.md) |
| **Technical Review** | Review pull requests for accuracy and clear explanations | [Technical Review Guide](docs/en/contribution/technical-review-guide.md) |
| **Code & Infrastructure** | Work on modular packages, testing, local runner, CI | [Architecture Overview](docs/en/architecture/overview.md) |

## Filesystem Content Locations
- **Generic Knowledge Concepts**: `content/knowledge/concepts.json`
- **Roadmap Definitions**: `roadmaps/php.json`
- **Language Lessons**: `content/programming/php/lessons/*.md`
- **Content Guide**: [Content Contribution Guide](docs/en/contribution/content-guide.md)

## Contribution & PR Workflow

1. **Fork the repository** on GitHub and clone locally.
2. **Install dependencies**: `pnpm install`
3. **Start local database**: `pnpm local:setup`
4. **Create a topic branch**: `git checkout -b content/php-variables-lesson`
5. **Make your changes** in the appropriate directory (`content/`, `roadmaps/`, or `docs/`).
6. **Validate content & run checks**:
   ```bash
   pnpm content:validate
   pnpm test
   pnpm lint
   ```
7. **Verify local app**: Start `pnpm dev` and preview your changes at `/php`.
8. **Submit a Pull Request** with validation evidence and a clear summary.

## Core Rules

1. **Deterministic & AI-Free Core**: Practice challenges must include verifiable, deterministic expected results. Do not submit challenges that require a live AI API to grade.
2. **Authority & Citations**: Technical explanations should be backed by reliable documentation (e.g., official PHP.net documentation).
3. **Keep Explanations Short**: Lessons should be concise and focused on practical understanding.
4. **License Compliance**: All contributions are accepted under the repository license ([PolyForm Noncommercial License 1.0.0](LICENSE.md)).
