# ADR-0003 — Sử dụng PostgreSQL / Supabase cho Tầng Dữ liệu Chính

> **Ngôn ngữ**: [English](../../en/adr/ADR-0003-postgresql-supabase-data-layer.md) | Tiếng Việt

- **Trạng thái**: Đã chấp thuận (Accepted)
- **Cập nhật lần cuối**: 2026-09-25
- **Phạm vi**: Kiến trúc Public MVP
- **Thẩm quyền**: Bản ghi Quyết định Kiến trúc (Bản dịch tham khảo)

## Bối cảnh (Context)

LangStride cần lưu trữ quan hệ bền vững cho tiến độ người học, lịch sử làm bài tập, bookmark và tìm kiếm văn bản nhanh trên bài học và khái niệm.

## Quyết định (Decision)

Chúng tôi lựa chọn PostgreSQL làm cơ sở dữ liệu nền tảng, sử dụng Supabase cho môi trường phát triển đóng gói container cục bộ, quản lý migration và tính năng tìm kiếm toàn văn PostgreSQL Full Text Search.

## Các phương án đã cân nhắc (Alternatives Considered)

1. SQLite: Thiếu khả năng tìm kiếm toàn văn mạnh mẽ và khả năng xử lý đồng thời cho các phiên bản tự lưu trữ đa người dùng.
2. Elasticsearch / CSDL Vector chuyên dụng: Tiêu tốn nhiều tài nguyên RAM và hạ tầng, vi phạm ràng buộc đơn giản của MVP.

## Hệ quả (Consequences)

- Một engine cơ sở dữ liệu duy nhất xử lý quan hệ dữ liệu, theo dõi tiến độ và tìm kiếm.
- Có thể tái tạo hoàn toàn qua Docker Compose hoặc Supabase CLI cục bộ.
- Không có bất kỳ phụ thuộc nào vào CSDL đám mây đối với người tự lưu trữ.
