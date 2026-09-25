# Engine thực hành dùng chung (Practice Engine)

> **Ngôn ngữ**: [English](../../en/fr/practice-engine.md) | Tiếng Việt

- **Trạng thái**: Đang đặc tả (In Specification)
- **Cập nhật lần cuối**: 2026-09-25
- **Phạm vi**: Public MVP (P3)
- **Thẩm quyền**: Đặc tả Yêu cầu Chức năng (Bản dịch tham khảo)

### FR-PRAC-001 — Mã định danh bài tập ổn định
Mỗi thử thách thực hành phải có một mã định danh duy nhất và ổn định. Hoàn thành khi các lượt làm bài và tham chiếu nội dung đều phân giải về một thử thách duy nhất qua các lần cập nhật nội dung.

### FR-PRAC-002 — Tham chiếu khái niệm
Một bài tập thực hành phải tham chiếu đến một hoặc nhiều khái niệm. Hoàn thành khi mỗi bài tập được xuất bản liệt kê ít nhất một mã định danh khái niệm hợp lệ.

### FR-PRAC-003 — Tham chiếu ngôn ngữ
Một bài tập thực hành phải tham chiếu đến một ngôn ngữ lập trình. Hoàn thành khi mỗi thử thách được xuất bản khai báo ngôn ngữ của nó.

### FR-PRAC-004 — Độ khó
Một bài tập thực hành phải hỗ trợ mức độ khó. Hoàn thành khi thử thách khai báo một giá trị độ khó được hệ thống hỗ trợ.

### FR-PRAC-005 — Gợi ý (Hints)
Một bài tập thực hành nên hỗ trợ các gợi ý. Hoàn thành khi tác giả có thể cung cấp các gợi ý theo thứ tự hiển thị cho người học.

### FR-PRAC-006 — Lời giải và Giải thích
Một bài tập thực hành phải hỗ trợ lời giải hoặc lời giải thích. Hoàn thành khi người học có thể đọc phần giải thích đã được chuẩn bị sẵn sau khi nộp bài.

### FR-PRAC-007 — Lưu trữ lượt làm bài
Lượt làm bài của người dùng phải được lưu trữ bền vững. Hoàn thành khi câu trả lời đã nộp và dấu thời gian tồn tại qua các lần khởi động lại ứng dụng.

### FR-PRAC-008 — Lưu trữ kết quả
Kết quả bài tập thực hành phải được lưu trữ bền vững. Hoàn thành khi kết quả đạt/không đạt (pass/fail) tất định có sẵn sau khi khởi động lại ứng dụng.

### FR-PRAC-009 — Liên kết khắc phục khi làm sai (Failure Recovery Link)
Một bài tập làm sai phải dẫn liên kết trở lại nội dung học tập tương ứng. Hoàn thành khi làm sai hiển thị ít nhất một khái niệm hoặc bài học liên kết từ danh sách tham chiếu khái niệm của bài tập đó.

#### Tiêu chí Nghiệm thu (Acceptance Criteria)
- **Cho (Given)**: Người học nộp đáp án sai cho bài tập "chal-php-arrays-001".
- **Khi (When)**: Kết quả đánh giá "Thất bại (Failed)" hiển thị.
- **Thì (Then)**: Giao diện hiển thị đường dẫn trực tiếp để ôn tập lại khái niệm liên kết "concept-arrays".

### FR-PRAC-010 — Bài tập được biên soạn trong kho mã nguồn
Bài tập thực hành phải có thể biên soạn dưới dạng nội dung hoặc dữ liệu trong kho mã nguồn. Hoàn thành khi người đóng góp có thể thêm một bài tập hợp lệ thông qua một file mã nguồn có thể review được trong repository.
