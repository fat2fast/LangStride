# ADR-0002 — Sử dụng TypeScript làm Ngôn ngữ Triển khai Chính

> **Ngôn ngữ**: [English](../../en/adr/ADR-0002-typescript-primary-language.md) | Tiếng Việt

- **Trạng thái**: Đã chấp thuận (Accepted)
- **Cập nhật lần cuối**: 2026-09-25
- **Phạm vi**: Kiến trúc Public MVP
- **Thẩm quyền**: Bản ghi Quyết định Kiến trúc (Bản dịch tham khảo)

## Bối cảnh (Context)

Dự án đòi hỏi sự an toàn kiểu dữ liệu (type safety) xuyên suốt từ mô hình nghiệp vụ, thành phần giao diện UI, lược đồ xác thực nội dung cho đến các công cụ dòng lệnh cục bộ.

## Quyết định (Decision)

Chúng tôi áp dụng TypeScript làm ngôn ngữ chính cho cả frontend web và backend, cũng như các công cụ phân tích và xác thực dữ liệu.

## Các phương án đã cân nhắc (Alternatives Considered)

1. Backend Go/Python + Frontend TypeScript: Tăng chi phí chuyển ngữ cảnh cho người đóng góp cộng đồng và gây phức tạp cho thiết lập monorepo trong MVP.
2. JavaScript thuần: Thiếu an toàn kiểu tại thời điểm biên dịch đối với các mô hình tri thức phức tạp.

## Hệ quả (Consequences)

- Sử dụng một hệ sinh thái và chuỗi công cụ duy nhất (Node.js/TypeScript).
- Kiểu dữ liệu được chia sẻ trực tiếp giữa backend và UI.
- Quy trình đóng góp thuận tiện cho các lập trình viên frontend và full-stack.
