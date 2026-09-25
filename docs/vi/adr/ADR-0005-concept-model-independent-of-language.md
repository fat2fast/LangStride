# ADR-0005 — Mô hình Khái niệm Tri thức Độc lập với Ngôn ngữ Lập trình

> **Ngôn ngữ**: [English](../../en/adr/ADR-0005-concept-model-independent-of-language.md) | Tiếng Việt

- **Trạng thái**: Đã chấp thuận (Accepted)
- **Cập nhật lần cuối**: 2026-09-25
- **Phạm vi**: Kiến trúc Public MVP
- **Thẩm quyền**: Bản ghi Quyết định Kiến trúc (Bản dịch tham khảo)

## Bối cảnh (Context)

Tầm nhìn dài hạn của LangStride bao gồm học đa ngôn ngữ và so sánh ngôn ngữ (Version Diff, PHP -> Go Lang Diff). Nếu gắn chặt các khái niệm vào PHP thì sau này sẽ phải đập đi xây lại toàn bộ.

## Quyết định (Decision)

Các Khái niệm Tri thức (Concept, ConceptRelation) tồn tại như các thực thể tổng quát, độc lập với ngôn ngữ. Các nút lộ trình và bài học theo ngôn ngữ cụ thể sẽ liên kết tới các khái niệm tổng quát này thay vì tự tạo ra các ốc đảo dữ liệu cô lập.

## Các phương án đã cân nhắc (Alternatives Considered)

1. Mô hình gắn chặt ngôn ngữ: Đơn giản ban đầu nhưng triệt tiêu hoàn toàn khả năng so sánh và chuyển giao kiến thức giữa các ngôn ngữ.

## Hệ quả (Consequences)

- Trừu tượng hóa rõ ràng: Interface là khái niệm chung; PHP Interface và Go Interface là các bài học của ngôn ngữ cụ thể.
- Sẵn sàng cho nhánh Go và engine Lang Diff trong tương lai mà không làm vỡ cấu trúc CSDL.
