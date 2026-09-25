# Đánh giá mã nguồn do AI tạo ra (AI-Generated Code Review Practice)

> **Ngôn ngữ**: [English](../../en/fr/ai-generated-code-review.md) | Tiếng Việt

- **Trạng thái**: Đang đặc tả (In Specification)
- **Cập nhật lần cuối**: 2026-09-25
- **Phạm vi**: Public MVP (P4)
- **Thẩm quyền**: Đặc tả Yêu cầu Chức năng (Bản dịch tham khảo)

### FR-AIREVIEW-001 — Nhãn bài tập đánh giá code do AI tạo
Một bài tập phải có thể gắn nhãn là bài tập đánh giá mã nguồn do AI tạo. Hoàn thành khi người học có thể phân biệt loại bài tập này với các bài thực hành gỡ lỗi thông thường.

### FR-AIREVIEW-002 — Xác định các lựa chọn không an toàn
Người học phải xác định được các lựa chọn triển khai không an toàn hoặc không chính xác. Hoàn thành khi bài tập chấp nhận việc lựa chọn hoặc giải thích về các vấn đề có chủ đích đã được chuẩn bị sẵn.

### FR-AIREVIEW-003 — Giải thích vấn đề
Một bài tập phải hỏi lý do tại sao một cách triển khai lại có vấn đề. Hoàn thành khi một câu hỏi hướng đến người học yêu cầu đưa ra lập luận kỹ thuật (engineering rationale).

### FR-AIREVIEW-004 — Cải thiện cách triển khai
Một bài tập phải yêu cầu chọn hoặc nộp một giải pháp triển khai cải tiến hơn. Hoàn thành khi bài tập chấp nhận một phương án sửa đổi hoặc tùy chọn được chuẩn bị sẵn có chất lượng tốt hơn rõ ràng.

### FR-AIREVIEW-005 — Không dùng dịch vụ AI runtime
Không bắt buộc phải có dịch vụ AI để tạo đề hoặc chấm điểm bài tập tại thời điểm chạy (runtime). Hoàn thành khi nội dung tĩnh và xác thực tất định hoàn tất được bài tập.

### FR-AIREVIEW-006 — Tập trung vào phán đoán kỹ thuật
Các bài tập phải nhấn mạnh vào phán đoán kỹ thuật (engineering judgment) thay vì kỹ năng viết prompt. Hoàn thành khi việc đánh giá dựa trên độ an toàn của code, tính đúng đắn, sự đánh đổi kỹ thuật (trade-offs) hoặc việc xác minh kiểm thử, thay vì cách diễn đạt lời nhắc (prompt phrasing).
