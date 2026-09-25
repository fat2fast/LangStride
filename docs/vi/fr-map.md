# LangStride Community MVP — Bản đồ Yêu cầu Chức năng (FR Map)

> **Ngôn ngữ**: [English](../en/fr-map.md) | Tiếng Việt

- **Trạng thái**: Đang đặc tả (In Specification)
- **Cập nhật lần cuối**: 2026-09-25
- **Phạm vi**: Public MVP (P0–P5)
- **Thẩm quyền**: Danh mục Yêu cầu Chức năng (Bản dịch tham khảo)

Tài liệu này là chỉ mục tổng thể của toàn bộ Yêu cầu Chức năng (FR) và Yêu cầu Phi chức năng (NFR) điều phối bản LangStride Community Edition Public MVP.

## Phân cấp Quyền sở hữu Tài liệu

- [`roadmap.md`](roadmap.md) nắm giữ **KHI NÀO (WHEN)**: Các giai đoạn, mục tiêu cột mốc và tiêu chí hoàn thành.
- **File này (`fr-map.md`)** nắm giữ **CÁI GÌ (WHAT)**: Danh mục yêu cầu, tài liệu sở hữu và trạng thái vòng đời.
- [`fr/`](fr/) nắm giữ **các bản đặc tả chuẩn tắc chi tiết** và tiêu chí nghiệm thu quan sát được.
- [`../architecture/overview.md`](architecture/overview.md) nắm giữ **CÁCH THỨC (HOW)**: Kiến trúc khối mô-đun và các mẫu thiết kế.
- [`../adr/`](adr/) nắm giữ **TẠI SAO CHỌN KỸ THUẬT NÀY**: Các quyết định kiến trúc đã được chấp thuận.
- [`../contribution/`](contribution/) nắm giữ **CÁCH THỨC ĐÓNG GÓP**: Hướng dẫn cho người viết bài học, bài tập và lộ trình.

## Ranh giới Phạm vi

- **Bao gồm trong MVP (P0–P5)**: Lộ trình PHP có thể tự lưu trữ, bài học ngắn, lưu tiến độ bền vững cục bộ, bài tập thực hành tất định, bài tập gỡ lỗi/đánh giá code tĩnh, đo lường độ thuần thục minh bạch, tìm kiếm toàn văn và đóng góp cộng đồng qua Git.
- **Chủ ý loại trừ khỏi MVP**: Thanh toán SaaS, đồng bộ đám mây, Đội nhóm/Tổ chức, phân quyền doanh nghiệp, sandbox chạy code từ xa, terminal tương tác, Model Context Protocol (MCP), migration agent, lộ trình Go đầy đủ, Version Diff, Lang Diff, phòng lab DevOps và trình mô phỏng System Design.

## Danh mục FR và Trạng thái

| Giai đoạn | Nhóm năng lực | Tài liệu đặc tả | Mã định danh | Trạng thái |
|---|---|---|---|---|
| **P0** | Nền tảng kho mã nguồn | [repository-foundation.md](fr/repository-foundation.md) | FR-REPO-001…011 | Đang đặc tả (In Specification) |
| **P0–P5** | Tự lưu trữ (Self-Hosting) | [self-hosting.md](fr/self-hosting.md) | FR-HOST-001…006; FR-REPO-012 | Đang đặc tả (In Specification) |
| **P0–P5** | Vận hành nội dung | [content-operations.md](fr/content-operations.md) | FR-ADMIN-001…005 | Đang đặc tả (In Specification) |
| **P1** | Mô hình tri thức | [knowledge-model.md](fr/knowledge-model.md) | FR-KNOW-001…009 | Đang đặc tả (In Specification) |
| **P1** | Lộ trình học PHP | [php-roadmap.md](fr/php-roadmap.md) | FR-PHP-001…008 | Đang đặc tả (In Specification) |
| **P1–P3** | Bài học (Lessons) | [lessons.md](fr/lessons.md) | FR-LESSON-001…008 | Đang đặc tả (In Specification) |
| **P1–P5** | Đóng góp nội dung | [content-contribution.md](fr/content-contribution.md) | FR-CONT-001…008 | Đang đặc tả (In Specification) |
| **P2** | Tiến độ học tập | [learning-progress.md](fr/learning-progress.md) | FR-PROGRESS-001…008 | Đang đặc tả (In Specification) |
| **P2** | Trang chủ / Tiếp tục học | [home-continue-learning.md](fr/home-continue-learning.md) | FR-HOME-001…004 | Đang đặc tả (In Specification) |
| **P3** | Engine thực hành dùng chung | [practice-engine.md](fr/practice-engine.md) | FR-PRAC-001…010 | Đang đặc tả (In Specification) |
| **P3** | Thực hành trắc nghiệm | [practice-multiple-choice.md](fr/practice-multiple-choice.md) | FR-MCQ-001…003 | Đang đặc tả (In Specification) |
| **P3** | Thực hành đoán output | [practice-predict-output.md](fr/practice-predict-output.md) | FR-OUTPUT-001…004 | Đang đặc tả (In Specification) |
| **P3** | Thực hành sửa code | [practice-fix-the-code.md](fr/practice-fix-the-code.md) | FR-FIX-001…005 | Đang đặc tả (In Specification) |
| **P4** | Thực hành gỡ lỗi | [debugging-practice.md](fr/debugging-practice.md) | FR-DEBUG-001…011 | Đang đặc tả (In Specification) |
| **P4** | Đánh giá code do AI tạo | [ai-generated-code-review.md](fr/ai-generated-code-review.md) | FR-AIREVIEW-001…006 | Đang đặc tả (In Specification) |
| **P5** | Độ thuần thục & Ôn tập | [mastery-and-review.md](fr/mastery-and-review.md) | FR-MAST-001…009 | Đang đặc tả (In Specification) |
| **P5** | Tìm kiếm | [search.md](fr/search.md) | FR-SEARCH-001…006 | Đang đặc tả (In Specification) |
| **Toàn bộ** | Thuộc tính chất lượng (NFR) | [quality-attributes.md](fr/quality-attributes.md) | NFR-SIMPLE-001…005; NFR-PORT-001…004; NFR-CONTRIB-001…003; NFR-AI-001…003 | Đang đặc tả (In Specification) |

## Sơ đồ Phụ thuộc Nhóm Năng lực

```text
Nền tảng kho mã nguồn (P0)
        ↓
Mô hình tri thức (P1) → Lộ trình PHP (P1) → Bài học (P1)
        ↓                     ↓
Tiến độ học tập (P2)       Engine thực hành (P3) → Gỡ lỗi & Đánh giá code AI (P4)
        ↓                     ↓
Tiếp tục học (P2)          Độ thuần thục & Hàng đợi ôn tập (P5)
                              ↓
                            Tìm kiếm (P5)
```

## Bảng Từ vựng Trạng thái Chuẩn tắc

- **Đã lên kế hoạch (Planned)**: Được liệt kê trong backlog; chờ thẩm định đặc tả chính thức.
- **Đang đặc tả (In Specification)**: Đang được xác lập đặc tả chi tiết và tiêu chí nghiệm thu.
- **Sẵn sàng triển khai (Ready for Implementation)**: Đã đặc tả hoàn tất với tiêu chí nghiệm thu rõ ràng; sẵn sàng code.
- **Đang thực hiện (In Progress)**: Đang trong quá trình lập trình hoặc biên soạn nội dung.
- **Đã hoàn thành (Implemented)**: Tất cả tiêu chí nghiệm thu đã được chứng minh bằng test tự động.
- **Đã kiểm chứng (Validated)**: Đã được xác nhận trong luồng trải nghiệm người dùng thực tế.
- **Hoãn lại (Deferred)**: Yêu cầu thuộc giai đoạn sau MVP; chủ ý nằm ngoài đợt phát hành hiện tại.
