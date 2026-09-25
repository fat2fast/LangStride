# LangStride Documentation Hub / Trung tâm Tài liệu LangStride

> **Languages**: [English](en/README.md) | [Tiếng Việt](vi/README.md)

Welcome to the LangStride documentation hub. LangStride is a community-first, non-commercial developer learning and practice platform.

Chào mừng bạn đến với trung tâm tài liệu của LangStride - nền tảng học tập và thực hành lập trình hướng cộng đồng, phi thương mại.

---

## Language Authority / Quy tắc Thẩm quyền Ngôn ngữ

> **IMPORTANT RULE**:
> - 🇬🇧 **English (`docs/en/`)** is the **Canonical Specification (Source of Truth)** for all architectural and functional requirement definitions.
> - 🇻🇳 **Tiếng Việt (`docs/vi/`)** is the **Reference Translation** provided to support Vietnamese-speaking learners and contributors.
>
> In the event of any discrepancies or pending translation updates, the English specification controls.
>
> *(QUY TẮC: Tiếng Anh là đặc tả chuẩn tắc; Tiếng Việt là bản dịch tham khảo. Khi có sự khác biệt, tài liệu tiếng Anh là căn cứ chuẩn).*

---

## Document Hierarchy & Authority Matrix / Bảng Phân cấp & Thẩm quyền Tài liệu

| Document Area | Purpose | Phụ trách / Mục đích | Authority / Thẩm quyền |
|---|---|---|---|
| [`README.md`](../README.md) | Project vision & visitor overview | Tổng quan dự án cho khách ghé thăm | **Informational** (Thông tin chung) |
| [`roadmap.md`](en/roadmap.md) | Phased milestones, scope, exit criteria (**WHEN**) | Lộ trình theo giai đoạn, ranh giới MVP | **Source of Truth** (Nguồn chân lý thời gian) |
| [`fr-map.md`](en/fr-map.md) | Requirement catalog, IDs, status (**WHAT**) | Danh mục đặc tả yêu cầu chức năng | **Source of Truth** (Nguồn chân lý yêu cầu) |
| [`fr/`](en/fr/README.md) | Detailed testable specifications & acceptance criteria | 18 đặc tả chức năng chi tiết & nghiệm thu | **Normative Specification** (Đặc tả chuẩn tắc) |
| [`architecture/`](en/architecture/overview.md) | Technical structure & modular monolith (**HOW**) | Cấu trúc kỹ thuật khối mô-đun hóa | **Technical Source** (Nguồn kỹ thuật) |
| [`product/`](en/product/mvp-scope.md) | Product loop & explicit post-MVP boundary (**WHY**) | Vòng lặp học tập & ranh giới sản phẩm | **Product Boundary** (Ranh giới sản phẩm) |
| [`adr/`](en/adr/README.md) | Architectural Decision Records (**WHY TECHNICAL DECISION**) | Bản ghi các quyết định kiến trúc cốt lõi | **Decision Record** (Hồ sơ quyết định) |
| [`contribution/`](en/contribution/README.md) | Guides for lessons, challenges, reviews (**HOW TO CONTRIBUTE**) | Hướng dẫn đóng góp bài học, bài tập | **Contributor Guide** (Hướng dẫn đóng góp) |

---

## Recommended Reading Order / Thứ tự Đọc Khuyến nghị

### 1. For New Learners & Visitors
1. [Root README](../README.md) — High-level vision and philosophy.
2. [Product MVP Scope](en/product/mvp-scope.md) — The core learning loop and what LangStride solves.
3. [PHP Roadmap Spec](en/fr/php-roadmap.md) — The initial guided learning track.

### 2. For Software Engineers & Maintainers
1. [MVP Roadmap](en/roadmap.md) — Current development phase and exit criteria.
2. [Architecture Overview](en/architecture/overview.md) — Modular monolith package layout.
3. [ADR Index](en/adr/README.md) — Accepted architectural decisions (`ADR-0001` through `ADR-0007`).
4. [Functional Requirements Map](en/fr-map.md) — Detailed requirement tracking.

### 3. For Content & Challenge Contributors
1. [Contributing Overview (EN)](../CONTRIBUTING.md) | [Hướng dẫn Đóng góp (VI)](../CONTRIBUTING.vi.md) — How community contributions work.
2. [Content Guide](en/contribution/content-guide.md) — Writing short, focused lessons.
3. [Challenge Guide](en/contribution/challenge-guide.md) — Creating deterministic practice challenges.
4. [Roadmap Guide](en/contribution/roadmap-guide.md) — Proposing new roadmap nodes and prerequisites.
