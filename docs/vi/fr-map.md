# LangStride Community MVP — Bản đồ Yêu cầu Chức năng (FR Map)

> **Ngôn ngữ**: [English](../en/fr-map.md) | Tiếng Việt

Trạng thái: Kế hoạch cơ sở (Planning baseline). Chưa có năng lực nào được coi là đã hoàn thành trừ khi tài liệu đặc tả FR chi tiết của năng lực đó được cập nhật rõ ràng sang trạng thái đã triển khai đi kèm bằng chứng nghiệm thu.

## Quyền sở hữu tài liệu

- [`roadmap.md`](roadmap.md) nắm giữ định hướng sản phẩm tổng thể, tiềm năng tương lai, mục tiêu từng giai đoạn và trạng thái cấp tính năng.
- File này nắm giữ cái nhìn tổng quan về các yêu cầu chức năng của Community MVP: danh mục phân loại, giai đoạn và trạng thái tài liệu hiện tại.
- [`fr/`](fr/) nắm giữ các yêu cầu đặc tả chi tiết, có thể kiểm thử độc lập và các tiêu chí nghiệm thu tương ứng.

Thư mục `fr/` là nguồn yêu cầu chuẩn tắc (normative). Bản đồ này chủ ý không lặp lại các hành vi chi tiết.

## Ranh giới phạm vi MVP

Bao gồm: Lộ trình học PHP có thể tự lưu trữ (self-host), các bài học, theo dõi tiến độ cục bộ, thực hành tất định (deterministic practice), bài tập thực hành gỡ lỗi/đánh giá code tĩnh, đo lường độ thuần thục cơ bản, tìm kiếm và quy trình đóng góp cộng đồng dựa trên Git.

Không bao gồm trong MVP này: Thanh toán SaaS, đồng bộ đám mây, tổ chức/nhóm (teams/orgs), quản trị doanh nghiệp, môi trường chạy code trực tiếp (live code sandbox), terminal từ xa, MCP, agent hỗ trợ chuyển dịch mã nguồn, lộ trình Go, Version Diff, Lang Diff, phòng lab DevOps và System Design.

## Danh mục FR và Trạng thái

| Giai đoạn | Nhóm năng lực | Đặc tả chi tiết | Mã định danh | Trạng thái |
|---|---|---|---|---|
| P0 | Nền tảng kho mã nguồn | [repository-foundation.md](fr/repository-foundation.md) | FR-REPO-001…011 | Đã lên kế hoạch (Planned) |
| P0–P5 | Tự lưu trữ (Self-hosting) | [self-hosting.md](fr/self-hosting.md) | FR-HOST-001…006; FR-REPO-012 | Đã lên kế hoạch (Planned) |
| P0–P5 | Vận hành nội dung | [content-operations.md](fr/content-operations.md) | FR-ADMIN-001…005 | Đã lên kế hoạch (Planned) |
| P1 | Mô hình tri thức và nội dung | [knowledge-model.md](fr/knowledge-model.md) | FR-KNOW-001…009 | Đã lên kế hoạch (Planned) |
| P1 | Lộ trình học PHP | [php-roadmap.md](fr/php-roadmap.md) | FR-PHP-001…008 | Đã lên kế hoạch (Planned) |
| P1–P3 | Bài học (Lessons) | [lessons.md](fr/lessons.md) | FR-LESSON-001…008 | Đã lên kế hoạch (Planned) |
| P1–P5 | Đóng góp nội dung | [content-contribution.md](fr/content-contribution.md) | FR-CONT-001…008 | Đã lên kế hoạch (Planned) |
| P2 | Tiến độ học tập | [learning-progress.md](fr/learning-progress.md) | FR-PROGRESS-001…008 | Đã lên kế hoạch (Planned) |
| P2 | Trang chủ / Tiếp tục học | [home-continue-learning.md](fr/home-continue-learning.md) | FR-HOME-001…004 | Đã lên kế hoạch (Planned) |
| P3 | Engine thực hành dùng chung | [practice-engine.md](fr/practice-engine.md) | FR-PRAC-001…010 | Đã lên kế hoạch (Planned) |
| P3 | Trắc nghiệm (Multiple Choice) | [practice-multiple-choice.md](fr/practice-multiple-choice.md) | FR-MCQ-001…003 | Đã lên kế hoạch (Planned) |
| P3 | Đoán kết quả (Predict Output) | [practice-predict-output.md](fr/practice-predict-output.md) | FR-OUTPUT-001…004 | Đã lên kế hoạch (Planned) |
| P3 | Sửa mã nguồn (Fix the Code) | [practice-fix-the-code.md](fr/practice-fix-the-code.md) | FR-FIX-001…005 | Đã lên kế hoạch (Planned) |
| P4 | Thực hành gỡ lỗi (Debugging) | [debugging-practice.md](fr/debugging-practice.md) | FR-DEBUG-001…011 | Đã lên kế hoạch (Planned) |
| P4 | Đánh giá code do AI tạo ra | [ai-generated-code-review.md](fr/ai-generated-code-review.md) | FR-AIREVIEW-001…006 | Đã lên kế hoạch (Planned) |
| P5 | Độ thuần thục và Ôn tập | [mastery-and-review.md](fr/mastery-and-review.md) | FR-MAST-001…009 | Đã lên kế hoạch (Planned) |
| P5 | Tìm kiếm | [search.md](fr/search.md) | FR-SEARCH-001…006 | Đã lên kế hoạch (Planned) |
| Toàn bộ | Thuộc tính chất lượng (Phi chức năng) | [quality-attributes.md](fr/quality-attributes.md) | NFR-SIMPLE-001…005; NFR-PORT-001…004; NFR-CONTRIB-001…003; NFR-AI-001…003 | Đã lên kế hoạch (Planned) |

## Tổng quan quan hệ phụ thuộc

```text
Nền tảng kho mã nguồn (Repository foundation)
        ↓
Mô hình tri thức → Lộ trình PHP → Bài học
        ↓                 ↓
Tiến độ học tập        Engine thực hành → Gỡ lỗi / Đánh giá code
        ↓                 ↓
Tiếp tục học           Độ thuần thục và Ôn tập
                          ↓
                        Tìm kiếm
```

Đóng góp nội dung, tự lưu trữ (self-hosting), vận hành nội dung và các thuộc tính chất lượng là các yêu cầu xuyên suốt (cross-cutting requirements).

## Thuật ngữ trạng thái

- **Đã lên kế hoạch (Planned)** — Đã đặc tả nhưng chưa có bằng chứng đã triển khai thực tế.
- **Đang thực hiện (In progress)** — Đang có công việc triển khai thực tế; tài liệu FR chi tiết ghi nhận bằng chứng này.
- **Đã hoàn thành (Implemented)** — Tất cả các tiêu chí nghiệm thu đều đã có bằng chứng xác thực.
- **Hoãn lại (Deferred)** — Chủ ý đưa ra ngoài cửa sổ phát hành hiện tại.
- **Bị thay thế (Superseded)** — Giữ lại nhằm theo dõi lịch sử; được thay thế bởi một yêu cầu liên kết.
