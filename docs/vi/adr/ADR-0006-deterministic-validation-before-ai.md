# ADR-0006 — Ưu tiên Xác thực Tất định Trước khi Dùng AI

> **Ngôn ngữ**: [English](../../en/adr/ADR-0006-deterministic-validation-before-ai.md) | Tiếng Việt

- **Trạng thái**: Đã chấp thuận (Accepted)
- **Cập nhật lần cuối**: 2026-09-25
- **Phạm vi**: Kiến trúc Public MVP
- **Thẩm quyền**: Bản ghi Quyết định Kiến trúc (Bản dịch tham khảo)

## Bối cảnh (Context)

Nền tảng giáo dục phải cung cấp phản hồi nhất quán, đáng tin cậy và có thể tái tạo chính xác. Đánh giá bằng AI có thể gây ra hiện tượng ảo giác, chấm điểm không đồng nhất, độ trễ và chi phí API đắt đỏ.

## Quyết định (Decision)

Các bài tập thực hành cốt lõi (Trắc nghiệm, Đoán kết quả, Sửa code) và bài tập Gỡ lỗi phải được chấm điểm tất định bằng kết quả mong đợi, bộ so khớp chuỗi chuẩn hóa và các fixture kiểm thử tĩnh mà không cần gọi API AI.

## Các phương án đã cân nhắc (Alternatives Considered)

1. Chấm điểm mở bằng prompt AI: Chi phí cao trên mỗi lượt làm, kết quả đạt/không đạt không nhất quán, không thể chạy offline hoặc không có API key.

## Hệ quả (Consequences)

- Kết quả có thể tái tạo 100% cho người học.
- Hoàn toàn không phụ thuộc API bên ngoài hoặc chi phí vận hành cho việc thực hành.
- AI có thể được nghiên cứu như công cụ hỗ trợ soạn thảo trong tương lai, nhưng không bao giờ là cửa kiểm bắt buộc cho việc học cốt lõi.
