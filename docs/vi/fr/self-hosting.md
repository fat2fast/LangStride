# Tự lưu trữ (Self-Hosting)

> **Ngôn ngữ**: [English](../../en/fr/self-hosting.md) | Tiếng Việt

Trạng thái: Đã lên kế hoạch (Planned). Giới thiệu: P0. Cửa kiểm phát hành: P5. Tác nhân: Người vận hành tự lưu trữ (self-host operator). Phụ thuộc vào FR-REPO-007 và FR-REPO-008. Ràng buộc áp dụng: NFR-PORT-001, NFR-PORT-002, và NFR-PORT-004.

### FR-HOST-001 — Khởi chạy cục bộ
Ứng dụng phải có khả năng khởi chạy cục bộ dựa trên các bước được ghi nhận trong tài liệu. Hoàn thành khi một bản sao mã nguồn mới (fresh clone) làm theo tài liệu hướng dẫn và có được ứng dụng hoạt động chính xác.

### FR-HOST-002 — Không yêu cầu dịch vụ thương mại
Ứng dụng không được yêu cầu các dịch vụ thương mại của LangStride. Hoàn thành khi tất cả các chức năng học tập cốt lõi vận hành chỉ với cấu hình cục bộ / tự lưu trữ được hỗ trợ.

### FR-HOST-003 — Dữ liệu do bên lưu trữ kiểm soát hoàn toàn
Dữ liệu tự lưu trữ phải hoàn toàn thuộc quyền kiểm soát của người vận hành máy chủ lưu trữ. Hoàn thành khi tài liệu triển khai xác định rõ các kho lưu trữ dữ liệu bền vững do người vận hành quản lý và không chứa bất kỳ yêu cầu xuất dữ liệu nào về LangStride.

### FR-HOST-004 — Hướng dẫn triển khai phi thương mại
Phải cung cấp một hướng dẫn triển khai phi thương mại. Hoàn thành khi một người vận hành có thể triển khai hệ thống cho mục đích phi thương mại được phép theo giấy phép của kho mã nguồn.

### FR-HOST-005 — Khởi chạy qua Docker
Nên hỗ trợ khởi chạy dựa trên Docker. Hoàn thành khi các bước Docker được tài liệu hóa khởi chạy được ứng dụng và các dịch vụ phụ thuộc cục bộ bắt buộc.

### FR-HOST-006 — Triển khai cho cộng đồng / giáo dục
Một phiên bản lưu trữ nên hỗ trợ mục đích sử dụng miễn phí cho cộng đồng hoặc giáo dục tuân theo giấy phép. Hoàn thành khi tài liệu hướng dẫn mô tả ranh giới vận hành phi thương mại được hỗ trợ mà không cấp thêm các quyền vượt quá giấy phép quy định.

### FR-REPO-012 — Tài liệu tự lưu trữ phi thương mại
Việc tự lưu trữ phi thương mại phải được hỗ trợ bằng tài liệu đầy đủ. Hoàn thành khi tài liệu triển khai giải thích lộ trình phi thương mại được hỗ trợ và dẫn liên kết tới giấy phép kiểm soát.
