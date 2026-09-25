# Độ thuần thục và Ôn tập (Mastery and Review)

> **Ngôn ngữ**: [English](../../en/fr/mastery-and-review.md) | Tiếng Việt

Trạng thái: Đã lên kế hoạch (Planned). Giới thiệu: P5. Cửa kiểm phát hành: P5. Tác nhân: Người học. Phụ thuộc vào FR-PROGRESS-002, FR-PRAC-008, và FR-DEBUG-010.

## Ranh giới tính toán trong MVP

Phiên bản MVP sử dụng các quy tắc minh bạch dựa trên việc hoàn thành bài học, kết quả thực hành, kết quả gỡ lỗi/đánh giá mã và lịch sử thử lại. Hệ thống không sử dụng các mô hình dự đoán hay dựa trên học máy (ML).

### FR-MAST-001 — Trạng thái học tập cấp độ khái niệm
Hệ thống phải theo dõi trạng thái học tập ở cấp độ khái niệm. Hoàn thành khi người học có trạng thái được lưu trữ cho các khái niệm đã tiếp cận qua các hoạt động học tập.

### FR-MAST-002 — Tác động của việc hoàn thành bài học
Việc hoàn thành bài học phải tác động đến trạng thái khái niệm. Hoàn thành khi việc hoàn thành bài học làm thay đổi bằng chứng học tập của khái niệm liên kết.

### FR-MAST-003 — Tác động của kết quả thực hành
Kết quả bài tập thực hành phải tác động đến trạng thái khái niệm. Hoàn thành khi kết quả một thử thách làm thay đổi bằng chứng học tập cho từng khái niệm liên kết.

### FR-MAST-004 — Tác động của bài tập gỡ lỗi / đánh giá code
Kết quả gỡ lỗi và đánh giá code phải tác động đến trạng thái khái niệm. Hoàn thành khi một bài tập P4 hoàn tất làm thay đổi bằng chứng học tập của các khái niệm liên quan.

### FR-MAST-005 — Danh sách khái niệm còn yếu
Người học phải xem được các khái niệm còn yếu. Hoàn thành khi sản phẩm liệt kê các khái niệm được xác định bởi quy tắc minh bạch là đang cần ôn tập lại.

### FR-MAST-006 — Hàng đợi ôn tập (Review queue)
Hệ thống phải xây dựng một hàng đợi ôn tập đơn giản. Hoàn thành khi hệ thống tạo ra một danh sách hành động ôn tập khái niệm yếu được sắp xếp thứ tự ưu tiên.

### FR-MAST-007 — Mở lại hoạt động được đề xuất
Người học phải có thể mở lại bài học hoặc bài thực hành được đề xuất từ hàng đợi ôn tập. Hoàn thành khi mỗi mục trong hàng đợi liên kết trực tiếp tới một hoạt động học tập hoặc thực hành có sẵn.

### FR-MAST-008 — Không yêu cầu mô hình ML phức tạp
Phiên bản MVP không được yêu cầu mô hình học máy (ML) phức tạp để tính độ thuần thục. Hoàn thành khi hàng đợi ôn tập và kết quả khái niệm yếu được tạo ra mà không cần huấn luyện hay suy luận ML.

### FR-MAST-009 — Chuỗi ngày học liên tục tùy chọn (Streak)
Sản phẩm có thể hiển thị chuỗi ngày học liên tục (streak) tùy chọn. Hoàn thành khi người học có thể nhìn thấy các khoảng thời gian hoạt động liên tiếp mà streak không làm gián đoạn hay chặn bất kỳ luồng trải nghiệm cốt lõi nào.
