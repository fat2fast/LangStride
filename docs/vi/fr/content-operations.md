# Vận hành nội dung (Content Operations)

> **Ngôn ngữ**: [English](../../en/fr/content-operations.md) | Tiếng Việt

- **Trạng thái**: Đang đặc tả (In Specification)
- **Cập nhật lần cuối**: 2026-09-25
- **Phạm vi**: Public MVP (P0–P5)
- **Thẩm quyền**: Đặc tả Yêu cầu Chức năng (Bản dịch tham khảo)

### FR-ADMIN-001 — Khởi tạo / Nhập nội dung
Người duy trì dự án phải có khả năng nạp dữ liệu mẫu (seed) hoặc nhập nội dung kho mã nguồn. Hoàn thành khi một thao tác lặp lại được ghi trong tài liệu có thể nạp nội dung thuộc sở hữu của kho mã nguồn vào môi trường được hỗ trợ.

### FR-ADMIN-002 — Xây dựng lại chỉ mục nội dung
Người duy trì dự án phải có khả năng xây dựng lại (rebuild) các chỉ mục nội dung. Hoàn thành khi một thao tác rõ ràng được hỗ trợ làm mới các chỉ mục tìm kiếm/nội dung phái sinh sau khi nội dung thay đổi.

### FR-ADMIN-003 — Thiết lập trạng thái vòng đời
Người duy trì dự án nên có thể đánh dấu nội dung là bản nháp (draft) hoặc đã xuất bản (published). Hoàn thành khi quy trình nội dung được hỗ trợ có thể chuyển đổi một mục nội dung giữa các trạng thái vòng đời đã khai báo.

### FR-ADMIN-004 — Không yêu cầu CMS toàn diện
Không bắt buộc phải có một hệ thống CMS hoàn chỉnh. Hoàn thành khi tất cả các thao tác nội dung bắt buộc có thể hoàn thành thông qua nội dung kho mã nguồn và các lệnh bảo trì được hỗ trợ.

### FR-ADMIN-005 — Git là nguồn chân lý duy nhất (Source of Truth)
Git phải tiếp tục là quy trình lưu giữ nguồn chân lý được hỗ trợ cho nội dung giáo dục. Hoàn thành khi một thay đổi đã được thẩm định trên kho mã nguồn có thể được áp dụng thông qua quy trình nhập liệu hoặc triển khai đã được lập tài liệu.
