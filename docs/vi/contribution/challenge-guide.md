# Hướng dẫn Biên soạn Bài tập Thực hành (Challenge Guide)

> **Ngôn ngữ**: [English](../../en/contribution/challenge-guide.md) | Tiếng Việt

- **Trạng thái**: Hoạt động (Active)
- **Cập nhật lần cuối**: 2026-09-25
- **Phạm vi**: Bài tập & Thử thách thực hành
- **Thẩm quyền**: Hướng dẫn Đóng góp (Bản dịch tham khảo)

Tài liệu này hướng dẫn chi tiết cách biên soạn các bài tập thực hành cho phiên bản LangStride Community Edition MVP.

## Các dạng bài tập được hỗ trợ trong MVP

1. **Trắc nghiệm (`multiple_choice`)**:
   - 3 đến 4 đáp án hợp lý.
   - Đúng một đáp án đúng (hoặc tập hợp khai báo rõ).
   - Giải thích cặn kẽ vì sao đáp án đúng và vì sao các đáp án nhiễu bị sai.
2. **Đoán kết quả đầu ra (`predict_output`)**:
   - Đoạn code ngắn (tối đa 15 dòng).
   - Chuỗi kết quả đầu ra tất định.
   - Khai báo rõ quy tắc chuẩn hóa khoảng trắng và dòng mới.
3. **Sửa lỗi mã nguồn (`fix_the_code`)**:
   - Đoạn code chứa một lỗi sai thực tế.
   - Đoạn code sửa đổi mong đợi.
   - Giải thích nguyên nhân gốc rễ của lỗi sai.

## Nguyên tắc vàng

**Mọi bài tập phải mang tính tất định (deterministic).** Tuyệt đối không gửi bài tập yêu cầu gọi mô hình AI để chấm điểm.
