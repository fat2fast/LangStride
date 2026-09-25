# ADR-0004 — Lưu trữ Nội dung Giáo dục dưới dạng Dữ liệu có Cấu trúc trong Kho Mã nguồn

> **Ngôn ngữ**: [English](../../en/adr/ADR-0004-content-stored-as-structured-repository-data.md) | Tiếng Việt

- **Trạng thái**: Đã chấp thuận (Accepted)
- **Cập nhật lần cuối**: 2026-09-25
- **Phạm vi**: Kiến trúc Public MVP
- **Thẩm quyền**: Bản ghi Quyết định Kiến trúc (Bản dịch tham khảo)

## Bối cảnh (Context)

Đóng góp cộng đồng là nguyên tắc cốt lõi. Các bài học kỹ thuật, lộ trình và bài tập thực hành phải có thể thẩm định trực quan, kiểm toán và quản lý phiên bản minh bạch.

## Quyết định (Decision)

Nội dung giáo dục (lộ trình, bài học, thử thách) được biên soạn và quản lý phiên bản dưới dạng file Markdown (với frontmatter) và JSON/YAML có cấu trúc ngay trong kho Git. Ứng dụng sẽ đồng bộ / nạp dữ liệu từ các file này vào cơ sở dữ liệu.

## Các phương án đã cân nhắc (Alternatives Considered)

1. Hệ thống CMS lưu trực tiếp vào CSDL: Các thay đổi nội dung không thể được đánh giá trong Pull Request hoặc fork qua Git.
2. CMS Headless độc quyền: Đòi hỏi tài khoản dịch vụ đám mây của bên thứ ba.

## Hệ quả (Consequences)

- Bất kỳ ai cũng có thể đề xuất bài học hoặc bài tập mới qua Git PR thông thường.
- Lịch sử nội dung và quyền tác giả được lưu giữ vĩnh viễn trong commit history.
- Nội dung được tự động kiểm thử cấu trúc bởi CI trước khi merge.
