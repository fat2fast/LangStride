# Nền tảng kho mã nguồn (Repository Foundation)

> **Ngôn ngữ**: [English](../../en/fr/repository-foundation.md) | Tiếng Việt

Trạng thái: Đã lên kế hoạch (Planned). Giới thiệu: P0. Cửa kiểm phát hành: P0. Tác nhân: Người đóng góp (contributor) hoặc Người vận hành tự lưu trữ (self-host operator). Ràng buộc áp dụng: NFR-PORT-001, NFR-PORT-002.

### FR-REPO-001 — README công khai
Kho mã nguồn phải cung cấp một file README công khai giải thích mục đích, trạng thái hiện tại và các điểm bắt đầu. Hoàn thành khi một người đóng góp mới có thể xác định được phạm vi MVP, tài liệu và lộ trình khởi chạy cục bộ ngay từ README.

### FR-REPO-002 — Giấy phép (License)
Kho mã nguồn phải bao gồm giấy phép của dự án. Hoàn thành khi file giấy phép hiện diện và được liên kết từ tài liệu công khai của dự án.

### FR-REPO-003 — Hướng dẫn đóng góp (Contribution Guidelines)
Kho mã nguồn phải bao gồm hướng dẫn đóng góp. Hoàn thành khi một người đóng góp có thể tìm thấy cách đề xuất thay đổi về mã nguồn hoặc nội dung.

### FR-REPO-004 — Quy tắc ứng xử (Code of Conduct)
Kho mã nguồn nên bao gồm quy tắc ứng xử. Hoàn thành khi hành vi cộng đồng được kỳ vọng và kênh báo cáo vi phạm được lập tài liệu.

### FR-REPO-005 — Mẫu tạo Issue (Issue Templates)
Kho mã nguồn nên bao gồm các mẫu tạo issue. Hoàn thành khi người dùng có thể chọn hướng dẫn issue có cấu trúc cho các danh mục issue được hỗ trợ.

### FR-REPO-006 — Mẫu tạo Pull Request (PR Template)
Kho mã nguồn nên bao gồm mẫu pull request. Hoàn thành khi một pull request mới yêu cầu tóm tắt các thay đổi và bằng chứng xác minh/kiểm thử.

### FR-REPO-007 — Cài đặt cục bộ (Local Installation)
Kho mã nguồn phải ghi nhận hướng dẫn cài đặt cục bộ. Hoàn thành khi các bước trong tài liệu giúp một bản sao mã nguồn mới (fresh clone) trở thành một môi trường phát triển có thể chạy được.

### FR-REPO-008 — Ví dụ biến môi trường (Environment Example)
Kho mã nguồn phải bao gồm file `.env.example`. Hoàn thành khi các tên biến môi trường bắt buộc và các giá trị ví dụ an toàn có sẵn mà không làm lộ bí mật bảo mật.

### FR-REPO-009 — Khởi tạo dữ liệu mẫu / Nhập nội dung (Seed/Content Import)
Kho mã nguồn phải cung cấp quy trình khởi tạo dữ liệu mẫu (seed) hoặc nhập nội dung có thể lặp lại. Hoàn thành khi quy trình được lập tài liệu có thể nạp vào ứng dụng nội dung học tập mẫu bắt buộc.

### FR-REPO-010 — Xác minh CI (CI Validation)
CI phải xác thực quá trình build, lint và các bài kiểm thử (tests). Hoàn thành khi mỗi lượt kiểm tra được thực thi đối với các thay đổi trên kho mã nguồn và bất kỳ lỗi nào cũng sẽ chặn kết quả pass của CI.

### FR-REPO-011 — Sử dụng độc lập (Standalone Use)
Kho mã nguồn phải có khả năng sử dụng mà không cần dịch vụ SaaS của LangStride. Hoàn thành khi quy trình cục bộ được hỗ trợ có thể hoàn thành vòng lặp học tập cốt lõi mà không phụ thuộc vào dịch vụ lưu trữ của LangStride.
