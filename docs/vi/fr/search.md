# Tìm kiếm (Search)

> **Ngôn ngữ**: [English](../../en/fr/search.md) | Tiếng Việt

- **Trạng thái**: Đang đặc tả (In Specification)
- **Cập nhật lần cuối**: 2026-09-25
- **Phạm vi**: Public MVP (P5)
- **Thẩm quyền**: Đặc tả Yêu cầu Chức năng (Bản dịch tham khảo)

### FR-SEARCH-001 — Tìm kiếm khái niệm PHP
Người học phải có thể tìm kiếm các khái niệm PHP. Hoàn thành khi một truy vấn trả về các khái niệm PHP đã xuất bản khớp với từ khóa và có thể mở kết quả được chọn.

### FR-SEARCH-002 — Tìm kiếm bài học
Người học phải có thể tìm kiếm bài học. Hoàn thành khi một truy vấn trả về các bài học đã xuất bản khớp với từ khóa và có thể mở kết quả được chọn.

### FR-SEARCH-003 — Tìm kiếm bài tập thực hành
Người học nên có thể tìm kiếm các bài tập thực hành. Hoàn thành khi một truy vấn trả về các thử thách thực hành đã xuất bản khớp với từ khóa và có thể mở kết quả được chọn.

### FR-SEARCH-004 — Không dùng dịch vụ tìm kiếm riêng biệt
Tìm kiếm phải hoạt động mà không cần một dịch vụ tìm kiếm độc lập. Hoàn thành khi hệ thống triển khai được hỗ trợ cung cấp tính năng tìm kiếm mà không cần Elasticsearch hoặc runtime tìm kiếm chuyên dụng khác.

### FR-SEARCH-005 — Tìm kiếm toàn văn PostgreSQL (PostgreSQL Full-Text Search)
Có thể sử dụng tính năng tìm kiếm toàn văn của PostgreSQL (PostgreSQL Full Text Search). Hoàn thành khi việc áp dụng thỏa mãn từ FR-SEARCH-001 đến FR-SEARCH-004 mà không làm thay đổi các giao ước này.

### FR-SEARCH-006 — Không yêu cầu tìm kiếm vector
Tìm kiếm vector không bắt buộc cho phiên bản MVP. Hoàn thành khi phạm vi tìm kiếm nêu trên hoạt động tốt mà không cần embeddings hoặc cơ sở dữ liệu vector.
