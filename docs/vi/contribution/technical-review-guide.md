# Hướng dẫn Thẩm định Kỹ thuật (Technical Review Guide)

> **Ngôn ngữ**: [English](../../en/contribution/technical-review-guide.md) | Tiếng Việt

- **Trạng thái**: Hoạt động (Active)
- **Cập nhật lần cuối**: 2026-09-25
- **Phạm vi**: Thẩm định & Đảm bảo Chất lượng
- **Thẩm quyền**: Hướng dẫn Thẩm định (Bản dịch tham khảo)

Tài liệu này quy định tiêu chuẩn chất lượng dành cho maintainer và reviewer khi đánh giá pull request trong LangStride.

## Tiêu chí kiểm tra (Review Checklist)

1. **Tính chính xác**: Lời giải thích có chuẩn xác theo đặc tả chính thức của ngôn ngữ không?
2. **Tuân thủ phạm vi MVP**: Đóng góp có nằm trong phạm vi Public MVP (P0–P5) không? Từ chối hoặc hoãn lại các đóng góp đưa vào tính năng SaaS, đồng bộ cloud hoặc dependency chưa phê duyệt.
3. **Chấm điểm tất định**: Các bài tập mới có đáp án có thể tái tạo và giải thích rõ ràng không?
4. **Liên kết toàn vẹn**: Mọi đường dẫn tương đối có hoạt động bình thường không?
5. **Tính đơn giản**: Thay đổi có tránh tạo thêm sự phức tạp hay phụ thuộc ngoài không cần thiết không?
