# Mô hình tri thức và nội dung (Knowledge and Content Model)

> **Ngôn ngữ**: [English](../../en/fr/knowledge-model.md) | Tiếng Việt

Trạng thái: Đã lên kế hoạch (Planned). Giới thiệu: P1. Cửa kiểm phát hành: P1. Tác nhân: Người học, người đóng góp nội dung, người duy trì dự án. Áp dụng cho: lộ trình học, bài học, thực hành, gỡ lỗi và mức độ thuần thục. Ràng buộc áp dụng: NFR-PORT-003, NFR-CONTRIB-001.

### FR-KNOW-001 — Mã định danh khái niệm ổn định (Stable Concept Identifier)
Mỗi khái niệm phải có một mã định danh duy nhất và ổn định. Hoàn thành khi các tham chiếu từ bài học, các nút trên lộ trình học và bài tập thực hành đều phân giải chính xác về một khái niệm duy nhất.

### FR-KNOW-002 — Quan hệ tiên quyết (Prerequisite Relation)
Các khái niệm phải định nghĩa các mối quan hệ tiên quyết. Hoàn thành khi một khái niệm có thể tham chiếu tới không hoặc nhiều mã định danh khái niệm tiên quyết.

### FR-KNOW-003 — Quan hệ liên quan (Related Relation)
Các khái niệm nên định nghĩa mối quan hệ khái niệm liên quan. Hoàn thành khi một khái niệm có thể liên kết tới các khái niệm liên quan nhưng không phải là điều kiện tiên quyết.

### FR-KNOW-004 — Khái niệm độc lập với ngôn ngữ lập trình
Một khái niệm phải tồn tại độc lập với bất kỳ ngôn ngữ lập trình cụ thể nào. Hoàn thành khi một khái niệm tổng quát (generic concept) có thể được biểu diễn mà không mang danh tính gắn chặt vào PHP.

### FR-KNOW-005 — Tham chiếu bài học ngôn ngữ
Một bài học theo ngôn ngữ cụ thể phải tham chiếu đến một khái niệm tổng quát. Hoàn thành khi một bài học PHP liên kết chính xác tới mã định danh khái niệm của nó.

### FR-KNOW-006 — Bài học hướng nội dung (Content-driven Lessons)
Các bài học phải được lưu trữ dưới dạng nội dung hoặc dữ liệu, không được hard-code vào mã nguồn giao diện (UI). Hoàn thành khi việc thay đổi nội dung bài học không đòi hỏi phải thay đổi thành phần giao diện hiển thị bài học (rendering component).

### FR-KNOW-007 — Vòng đời nội dung (Content Lifecycle)
Nội dung nên hỗ trợ các trạng thái: bản nháp (draft), thẩm định (review) và đã xuất bản (published). Hoàn thành khi các bản ghi nội dung có thể mang một trong các trạng thái vòng đời này và tài liệu chưa xuất bản có thể phân biệt được rõ ràng.

### FR-KNOW-008 — Nguồn tài liệu kỹ thuật đáng tin cậy (Technical Sources)
Nội dung kỹ thuật nên ghi nhận các tham chiếu nguồn. Hoàn thành khi một tác giả có thể đính kèm siêu dữ liệu nguồn có thẩm quyền (authoritative source metadata) vào một mục nội dung.

### FR-KNOW-009 — Khả năng tương thích với ngôn ngữ tương lai
Mô hình phải duy trì tính tương thích với ngôn ngữ Go và tính năng so sánh khác biệt ngôn ngữ (language difference / Lang Diff) trong tương lai. Hoàn thành khi việc thêm bài học Go có thể tái sử dụng một khái niệm tổng quát mà không cần thay đổi cấu trúc định danh khái niệm đó.
