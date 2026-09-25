# LangStride Public Repository MVP — Functional Requirements Map

> Scope: **Public Community Edition MVP only**  
> This document intentionally excludes SaaS, billing, Teams, enterprise administration, MCP, migration agents, and other post-MVP product features.

---

# 1. MVP Functional Map

```text
LangStride Community MVP
│
├── Repository & Self-Hosting
│
├── PHP Learning
│   ├── Roadmap
│   ├── Concepts
│   └── Lessons
│
├── Learning Progress
│
├── Practice
│   ├── Multiple Choice
│   ├── Predict Output
│   └── Fix the Code
│
├── Debug / AI Code Review
│
├── Mastery & Review
│
├── Search
│
└── Community Contribution
```

---

# 2. Priority Definitions

| Priority | Meaning |
|---|---|
| **Must** | Required for Public MVP |
| **Should** | Valuable for MVP, but can be deferred briefly |
| **Could** | Optional enhancement |
| **Later** | Explicitly post-MVP |

---

# 3. Repository & Community Foundation

| ID | Requirement | Phase | Priority |
|---|---|---:|---|
| FR-REPO-001 | Repository provides a clear public README | P0 | Must |
| FR-REPO-002 | Repository includes the project license | P0 | Must |
| FR-REPO-003 | Repository includes contribution guidelines | P0 | Must |
| FR-REPO-004 | Repository includes a code of conduct | P0 | Should |
| FR-REPO-005 | Repository includes issue templates | P0 | Should |
| FR-REPO-006 | Repository includes PR template | P0 | Should |
| FR-REPO-007 | Repository documents local installation | P0 | Must |
| FR-REPO-008 | Repository includes `.env.example` | P0 | Must |
| FR-REPO-009 | Repository provides a repeatable seed/content import workflow | P0 | Must |
| FR-REPO-010 | CI validates build, lint and tests | P0 | Must |
| FR-REPO-011 | Repository can be used without LangStride SaaS | P0 | Must |
| FR-REPO-012 | Non-commercial self-hosting is supported by documentation | P5 | Must |

---

# 4. Knowledge Model

| ID | Requirement | Phase | Priority |
|---|---|---:|---|
| FR-KNOW-001 | Every concept has a stable unique identifier | P1 | Must |
| FR-KNOW-002 | Concepts can define prerequisite relationships | P1 | Must |
| FR-KNOW-003 | Concepts can define related concepts | P1 | Should |
| FR-KNOW-004 | A concept can exist independently of a programming language | P1 | Must |
| FR-KNOW-005 | A language-specific lesson can reference a generic concept | P1 | Must |
| FR-KNOW-006 | Lessons are stored as content/data, not hard-coded UI | P1 | Must |
| FR-KNOW-007 | Content supports draft/review/published status | P1 | Should |
| FR-KNOW-008 | Technical content can record source references | P1 | Should |
| FR-KNOW-009 | Knowledge model should remain compatible with future Go/Lang Diff expansion | P1 | Must |

---

# 5. PHP Roadmap

| ID | Requirement | Phase | Priority |
|---|---|---:|---|
| FR-PHP-001 | User can open a PHP learning roadmap | P1 | Must |
| FR-PHP-002 | Roadmap is generated from structured roadmap data | P1 | Must |
| FR-PHP-003 | Roadmap contains sections or learning groups | P1 | Must |
| FR-PHP-004 | Roadmap nodes can define prerequisites | P1 | Must |
| FR-PHP-005 | User can open a lesson from a roadmap node | P1 | Must |
| FR-PHP-006 | Initial roadmap contains roughly 20–30 concepts | P1 | Must |
| FR-PHP-007 | Initial release contains at least 10 complete lessons | P1 | Must |
| FR-PHP-008 | Incomplete/planned roadmap nodes can be visibly identified | P1 | Should |

---

# 6. Lessons

| ID | Requirement | Phase | Priority |
|---|---|---:|---|
| FR-LESSON-001 | Lesson displays concept title | P1 | Must |
| FR-LESSON-002 | Lesson explains why the concept matters | P1 | Must |
| FR-LESSON-003 | Lesson supports formatted code examples | P1 | Must |
| FR-LESSON-004 | Lesson supports common mistakes section | P1 | Should |
| FR-LESSON-005 | Lesson can contain a quick knowledge check | P1/P3 | Should |
| FR-LESSON-006 | Lesson links to related practice | P3 | Must |
| FR-LESSON-007 | Lesson links to prerequisite/related concepts | P1 | Should |
| FR-LESSON-008 | Lesson content is editable through normal Git contribution | P1 | Must |

---

# 7. Learning Progress

| ID | Requirement | Phase | Priority |
|---|---|---:|---|
| FR-PROGRESS-001 | User can mark a lesson started | P2 | Must |
| FR-PROGRESS-002 | User can mark a lesson completed | P2 | Must |
| FR-PROGRESS-003 | Lesson progress persists across restart | P2 | Must |
| FR-PROGRESS-004 | Roadmap node reflects current progress state | P2 | Must |
| FR-PROGRESS-005 | User can resume last learning position | P2 | Must |
| FR-PROGRESS-006 | User can bookmark a lesson | P2 | Should |
| FR-PROGRESS-007 | User can see recent learning activity | P2 | Should |
| FR-PROGRESS-008 | Progress works without a hosted LangStride account | P2 | Must |

---

# 8. Home / Continue Learning

| ID | Requirement | Phase | Priority |
|---|---|---:|---|
| FR-HOME-001 | Home shows a clear Continue Learning action | P2 | Must |
| FR-HOME-002 | Continue Learning opens the most relevant unfinished lesson | P2 | Must |
| FR-HOME-003 | Home can show basic PHP roadmap progress | P2 | Should |
| FR-HOME-004 | Home should avoid requiring users to choose among many competing actions | P2 | Must |

---

# 9. Practice Engine

| ID | Requirement | Phase | Priority |
|---|---|---:|---|
| FR-PRAC-001 | Challenge has a stable identifier | P3 | Must |
| FR-PRAC-002 | Challenge references one or more concepts | P3 | Must |
| FR-PRAC-003 | Challenge references a programming language | P3 | Must |
| FR-PRAC-004 | Challenge supports difficulty | P3 | Must |
| FR-PRAC-005 | Challenge supports hints | P3 | Should |
| FR-PRAC-006 | Challenge supports solution/explanation | P3 | Must |
| FR-PRAC-007 | User attempt is persisted | P3 | Must |
| FR-PRAC-008 | Challenge result is persisted | P3 | Must |
| FR-PRAC-009 | Failed challenge links to relevant learning content | P3 | Must |
| FR-PRAC-010 | Challenge can be authored as repository content/data | P3 | Must |

---

# 10. Multiple Choice Challenges

| ID | Requirement | Phase | Priority |
|---|---|---:|---|
| FR-MCQ-001 | Challenge presents multiple answer options | P3 | Must |
| FR-MCQ-002 | Exactly defined answer validation is supported | P3 | Must |
| FR-MCQ-003 | Explanation can be shown after submission | P3 | Must |

---

# 11. Predict Output Challenges

| ID | Requirement | Phase | Priority |
|---|---|---:|---|
| FR-OUTPUT-001 | Challenge displays a code snippet | P3 | Must |
| FR-OUTPUT-002 | User can submit expected output/behavior | P3 | Must |
| FR-OUTPUT-003 | Validation can be deterministic | P3 | Must |
| FR-OUTPUT-004 | Explanation describes why the output occurs | P3 | Must |

---

# 12. Fix-the-Code Challenges

| ID | Requirement | Phase | Priority |
|---|---|---:|---|
| FR-FIX-001 | Challenge displays incorrect code | P3 | Must |
| FR-FIX-002 | User can submit a corrected answer or choose a correction | P3 | Must |
| FR-FIX-003 | MVP supports deterministic answer validation | P3 | Must |
| FR-FIX-004 | Challenge explains root issue after completion | P3 | Must |
| FR-FIX-005 | Live remote code execution is not required | P3 | Must |

---

# 13. Debugging Practice

| ID | Requirement | Phase | Priority |
|---|---|---:|---|
| FR-DEBUG-001 | Debug challenge references one or more concepts | P4 | Must |
| FR-DEBUG-002 | Debug challenge can include code snippet | P4 | Must |
| FR-DEBUG-003 | Debug challenge can include an error message | P4 | Must |
| FR-DEBUG-004 | Debug challenge can include a stack trace | P4 | Must |
| FR-DEBUG-005 | Debug challenge can include static test output | P4 | Must |
| FR-DEBUG-006 | Debug challenge can include simple logs | P4 | Should |
| FR-DEBUG-007 | User can identify the root cause | P4 | Must |
| FR-DEBUG-008 | User can submit/select a fix | P4 | Must |
| FR-DEBUG-009 | Root-cause validation is deterministic where possible | P4 | Must |
| FR-DEBUG-010 | Debug result contributes to concept practice history | P4 | Must |
| FR-DEBUG-011 | Live shell/terminal is not required in MVP | P4 | Must |

---

# 14. AI-Generated Code Review Practice

| ID | Requirement | Phase | Priority |
|---|---|---:|---|
| FR-AIREVIEW-001 | Challenge can be labeled as generated-code review | P4 | Must |
| FR-AIREVIEW-002 | User can identify unsafe or incorrect implementation choices | P4 | Must |
| FR-AIREVIEW-003 | Exercise can ask why the implementation is problematic | P4 | Must |
| FR-AIREVIEW-004 | Exercise can require choosing or submitting an improved implementation | P4 | Must |
| FR-AIREVIEW-005 | AI service is not required to generate or grade the exercise at runtime | P4 | Must |
| FR-AIREVIEW-006 | Exercises should emphasize engineering judgment rather than prompt writing | P4 | Must |

---

# 15. Mastery & Review

| ID | Requirement | Phase | Priority |
|---|---|---:|---|
| FR-MAST-001 | System tracks concept-level learning state | P5 | Must |
| FR-MAST-002 | Lesson completion influences concept state | P5 | Must |
| FR-MAST-003 | Practice results influence concept state | P5 | Must |
| FR-MAST-004 | Debug/review results influence concept state | P5 | Must |
| FR-MAST-005 | User can see weak concepts | P5 | Must |
| FR-MAST-006 | System can build a simple review queue | P5 | Must |
| FR-MAST-007 | User can re-open recommended lesson/practice from review queue | P5 | Must |
| FR-MAST-008 | MVP does not require a complex ML mastery model | P5 | Must |
| FR-MAST-009 | Optional streak can be displayed | P5 | Could |

---

# 16. Search

| ID | Requirement | Phase | Priority |
|---|---|---:|---|
| FR-SEARCH-001 | User can search PHP concepts | P5 | Must |
| FR-SEARCH-002 | User can search lessons | P5 | Must |
| FR-SEARCH-003 | User can search practice challenges | P5 | Should |
| FR-SEARCH-004 | Search runs without a separate search service | P5 | Must |
| FR-SEARCH-005 | PostgreSQL Full Text Search can be used | P5 | Should |
| FR-SEARCH-006 | Vector search is not required for MVP | P5 | Must |

---

# 17. Community Content Contribution

| ID | Requirement | Phase | Priority |
|---|---|---:|---|
| FR-CONT-001 | Contributor can add/edit lesson content via repository files | P1/P5 | Must |
| FR-CONT-002 | Contributor can propose roadmap changes | P1/P5 | Must |
| FR-CONT-003 | Contributor can add a practice challenge | P3/P5 | Must |
| FR-CONT-004 | Contributor can add a debug/review challenge | P4/P5 | Must |
| FR-CONT-005 | Repository documents content schema | P5 | Must |
| FR-CONT-006 | Repository documents challenge schema | P5 | Must |
| FR-CONT-007 | CI validates contributed content structure | P5 | Should |
| FR-CONT-008 | Technical content can include authoritative source metadata | P1/P5 | Should |

---

# 18. Self-Hosting

| ID | Requirement | Phase | Priority |
|---|---|---:|---|
| FR-HOST-001 | Application can run locally from documented steps | P0 | Must |
| FR-HOST-002 | Application does not require commercial LangStride services | P0 | Must |
| FR-HOST-003 | Self-hosted data remains under host control | P2 | Must |
| FR-HOST-004 | A non-commercial deployment guide is provided | P5 | Must |
| FR-HOST-005 | Docker-based startup is desirable | P5 | Should |
| FR-HOST-006 | Hosted instance can support free community/education use subject to license | P5 | Should |

---

# 19. Basic Administration / Content Operations

| ID | Requirement | Phase | Priority |
|---|---|---:|---|
| FR-ADMIN-001 | Maintainer can seed/import repository content | P0/P1 | Must |
| FR-ADMIN-002 | Maintainer can rebuild content indexes | P1/P5 | Must |
| FR-ADMIN-003 | Maintainer can mark content draft/published | P1 | Should |
| FR-ADMIN-004 | Full CMS is not required | P0-P5 | Must |
| FR-ADMIN-005 | Git remains a supported source-of-truth workflow for educational content | P1-P5 | Must |

---

# 20. Non-Functional Requirements

## NFR — Simplicity

| ID | Requirement | Priority |
|---|---|---|
| NFR-SIMPLE-001 | MVP uses a modular monolith | Must |
| NFR-SIMPLE-002 | MVP avoids microservices | Must |
| NFR-SIMPLE-003 | MVP avoids Kubernetes | Must |
| NFR-SIMPLE-004 | MVP avoids Kafka | Must |
| NFR-SIMPLE-005 | MVP avoids dedicated vector DB | Must |

## NFR — Portability

| ID | Requirement | Priority |
|---|---|---|
| NFR-PORT-001 | Core features do not depend on LangStride SaaS | Must |
| NFR-PORT-002 | Repository can run in a local development environment | Must |
| NFR-PORT-003 | Content is version-controlled | Must |
| NFR-PORT-004 | Self-host data storage is documented | Must |

## NFR — Contribution

| ID | Requirement | Priority |
|---|---|---|
| NFR-CONTRIB-001 | Content files are human-reviewable | Must |
| NFR-CONTRIB-002 | Challenge files are human-reviewable | Must |
| NFR-CONTRIB-003 | CI can reject structurally invalid contributions | Should |

## NFR — AI Independence

| ID | Requirement | Priority |
|---|---|---|
| NFR-AI-001 | Core learning works with no AI API | Must |
| NFR-AI-002 | Core grading uses deterministic logic where possible | Must |
| NFR-AI-003 | AI-generated-code-review exercises may use static prepared examples | Must |

---

# 21. Public MVP Pages

| Route | Requirement | Phase |
|---|---|---:|
| `/` | Home / Continue Learning | P2 |
| `/php` | PHP roadmap | P1 |
| `/php/concepts/:slug` | Lesson | P1 |
| `/practice` | Practice index | P3 |
| `/practice/:id` | Practice challenge | P3 |
| `/debug` | Debug/review index | P4 |
| `/debug/:id` | Debug/review challenge | P4 |
| `/progress` | Progress/mastery | P2/P5 |
| `/search` | Search | P5 |

---

# 22. Phase-to-Requirement Matrix

| Domain | P0 | P1 | P2 | P3 | P4 | P5 |
|---|---|---|---|---|---|---|
| Repository/Foundation | ● | | | | | ● |
| Knowledge Model | | ● | | | | |
| PHP Roadmap | | ● | | | | |
| Lessons | | ● | | | | |
| Progress | | | ● | | | ● |
| Practice | | | | ● | | ● |
| Debugging | | | | | ● | ● |
| AI Code Review Practice | | | | | ● | |
| Mastery / Review | | | | | | ● |
| Search | | | | | | ● |
| Contribution Workflow | ● | ● | | ● | ● | ● |
| Self-host Documentation | ● | | | | | ● |

---

# 23. Dependency Map

```text
P0 Foundation
     ↓
P1 Knowledge + PHP Roadmap
     ↓
P2 Local Progress
     ↓
P3 Programming Practice
     ↓
P4 Debug / AI Code Review
     ↓
P5 Mastery + Search + Public Release
```

Important dependency rules:

```text
Concept Model
    ↓
Lessons
    ↓
Practice
    ↓
Debug / Review
    ↓
Mastery
```

Do not build mastery before activity data exists.

---

# 24. Explicit Post-MVP Requirements

The following are intentionally excluded from this FR map:

```text
Go full roadmap
Version Diff engine
PHP → Go Lang Diff
DevOps Labs
Interactive System Design
Live code sandbox
Remote terminal
Cloud sync
Subscriptions
Teams
Organizations
Enterprise features
MCP
Migration Agent
```

They should receive separate FR documents after the Community MVP is stable.

---

# 25. Public MVP Acceptance Checklist

The Public MVP can be considered complete when all of the following are true:

```text
[ ] New contributor can understand the project from README.
[ ] Fresh clone can be started from documented commands.
[ ] PHP roadmap loads from structured content.
[ ] At least 10 complete lessons exist.
[ ] At least 20 practice challenges exist.
[ ] At least 8 debugging/AI-review exercises exist.
[ ] User progress persists.
[ ] Continue Learning works.
[ ] Failed practice links back to relevant learning.
[ ] Basic mastery/review exists.
[ ] Search works.
[ ] Self-hosting is documented.
[ ] No SaaS account or paid external service is required.
[ ] Contributor can add lesson/challenge through Git PR.
```

---

# 26. Product Decision Rule

Before adding a feature to Public MVP, ask:

```text
Does this feature improve one of these?

1. Know what to learn next.
2. Understand a core concept.
3. Practice the concept.
4. Debug or verify code.
5. Review weak knowledge.
6. Contribute useful developer knowledge.
7. Run LangStride independently.
```

If the answer is **no**, it should probably wait until after the public MVP.
