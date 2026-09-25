# Thuộc tính chất lượng (Quality Attributes)

> **Ngôn ngữ**: [English](../../en/fr/quality-attributes.md) | Tiếng Việt

- **Trạng thái**: Đang đặc tả (In Specification)
- **Cập nhật lần cuối**: 2026-09-25
- **Phạm vi**: Public MVP (All)
- **Thẩm quyền**: Đặc tả Yêu cầu Chức năng (Bản dịch tham khảo)

## Tính đơn giản (Simplicity)

### NFR-SIMPLE-001 — Khối mô-đun hóa (Modular Monolith)
Phiên bản MVP phải sử dụng kiến trúc khối mô-đun hóa (modular monolith). Hoàn thành khi không có năng lực cốt lõi nào đòi hỏi một dịch vụ triển khai độc lập.

### NFR-SIMPLE-002 — Không sử dụng Microservices
Phiên bản MVP không được yêu cầu kiến trúc microservices. Hoàn thành khi một bản cài đặt mới được hỗ trợ có thể chạy ứng dụng cốt lõi như một sản phẩm duy nhất.

### NFR-SIMPLE-003 — Không yêu cầu Kubernetes
Phiên bản MVP không được yêu cầu Kubernetes. Hoàn thành khi quá trình thiết lập cục bộ và tự lưu trữ không chứa bất kỳ điều kiện tiên quyết nào về Kubernetes.

### NFR-SIMPLE-004 — Không yêu cầu Kafka
Phiên bản MVP không được yêu cầu Kafka. Hoàn thành khi các luồng học tập hoàn tất mà không cần Kafka.

### NFR-SIMPLE-005 — Không yêu cầu Cơ sở dữ liệu Vector chuyên dụng
Phiên bản MVP không được yêu cầu một cơ sở dữ liệu vector riêng biệt. Hoàn thành khi tính năng tìm kiếm hoạt động tốt với kho lưu trữ dữ liệu chính được hỗ trợ.

## Tính khả chuyển (Portability)

### NFR-PORT-001 — Độc lập với SaaS
Các tính năng cốt lõi không được phụ thuộc vào dịch vụ SaaS của LangStride. Hoàn thành khi cấu hình triển khai được ghi nhận trong tài liệu có thể hoàn thành vòng lặp học tập mà không cần tài khoản hay dịch vụ của LangStride.

### NFR-PORT-002 — Môi trường phát triển cục bộ
Kho mã nguồn phải chạy được trong môi trường phát triển cục bộ. Hoàn thành khi quy trình thiết lập được tài liệu hóa khởi chạy được ứng dụng từ một bản clone mới.

### NFR-PORT-003 — Nội dung được quản lý phiên bản (Version-controlled Content)
Nội dung giáo dục phải được quản lý phiên bản. Hoàn thành khi các thay đổi nội dung đã qua kiểm duyệt có thể được gửi lên thông qua Git.

### NFR-PORT-004 — Tài liệu hóa kho lưu trữ của phiên bản tự lưu trữ
Kho lưu trữ dữ liệu tự lưu trữ phải được ghi nhận rõ ràng trong tài liệu. Hoàn thành khi hướng dẫn lưu trữ xác định rõ nơi dữ liệu người học và nội dung được lưu trữ bền vững.

## Đóng góp và Tính độc lập với AI (Contribution and AI Independence)

### NFR-CONTRIB-001 — File nội dung có thể đánh giá bởi con người (Reviewable Content Files)
Các file nội dung phải có định dạng mà con người có thể trực tiếp thẩm định (review). Hoàn thành khi một người đóng góp có thể kiểm tra đề xuất thay đổi bài học mà không cần phần mềm soạn thảo độc quyền.

### NFR-CONTRIB-002 — File bài tập thực hành có thể đánh giá bởi con người
Các file bài tập thực hành phải có thể thẩm định trực tiếp bởi con người. Hoàn thành khi một người đóng góp có thể kiểm tra đề bài và kết quả tất định mong đợi ngay trong pull request.

### NFR-CONTRIB-003 — Từ chối nội dung sai cấu trúc
Hệ thống CI nên từ chối các đóng góp nội dung có cấu trúc không hợp lệ. Hoàn thành khi một file nội dung không hợp lệ bị chặn bởi quy trình xác thực đóng góp.

### NFR-AI-001 — Học tập cốt lõi không phụ thuộc AI
Quy trình học tập cốt lõi phải hoạt động mà không cần API AI. Hoàn thành khi các bài học, tiến độ và bài tập thực hành tất định vận hành bình thường mà không cần bất kỳ API key hay thông tin xác thực AI nào.

### NFR-AI-002 — Chấm điểm tất định (Deterministic Grading)
Quy trình chấm điểm cốt lõi phải sử dụng logic tất định khi có thể. Hoàn thành khi mỗi loại bài tập trong MVP công bố một kết quả đạt/không đạt (pass/fail) có thể tái lập chính xác.

### NFR-AI-003 — Ví dụ đánh giá code tĩnh (Static Review Examples)
Các bài tập đánh giá mã nguồn do AI tạo ra có thể sử dụng các ví dụ tĩnh được chuẩn bị sẵn. Hoàn thành khi một bài tập có thể được phân phối và chấm điểm mà không cần gọi đến runtime của AI.
