# ADR-0001 — Sử dụng Kiến trúc Khối mô-đun hóa (Modular Monolith)

> **Ngôn ngữ**: [English](../../en/adr/ADR-0001-modular-monolith.md) | Tiếng Việt

- **Trạng thái**: Đã chấp thuận (Accepted)
- **Cập nhật lần cuối**: 2026-09-25
- **Phạm vi**: Kiến trúc Public MVP
- **Thẩm quyền**: Bản ghi Quyết định Kiến trúc (Bản dịch tham khảo)

## Bối cảnh (Context)

LangStride Community Edition cần một kiến trúc đơn giản để chạy cục bộ, dễ dàng tự lưu trữ (self-host) mà không đòi hỏi chuyên môn hạ tầng đám mây phức tạp, đồng thời đủ chặt chẽ để phân tách rõ ràng các ranh giới nghiệp vụ (học tập, thực hành, tìm kiếm).

## Quyết định (Decision)

Chúng tôi quyết định chọn kiến trúc Khối mô-đun hóa (Modular Monolith). Logic nghiệp vụ cốt lõi sẽ nằm trong các package mô-đun (ví dụ: packages/learning, packages/practice, packages/ui) trong cùng một repository, được triển khai dưới dạng một đơn vị ứng dụng duy nhất.

## Các phương án đã cân nhắc (Alternatives Considered)

1. Microservices: Tạo thêm gánh nặng lớn về mạng, triển khai và vận hành, không phù hợp cho người dùng tự lưu trữ.
2. Monolith không phân tách mô-đun: Nguy cơ phụ thuộc chéo chặt chẽ giữa tiến độ học tập, engine thực hành và giao diện UI.

## Hệ quả (Consequences)

- Tuyệt đối không cần Kubernetes, service discovery hay giao thức RPC phức tạp.
- Một kho mã nguồn duy nhất và một lệnh build/chạy duy nhất cho môi trường cục bộ và tự lưu trữ.
- Ranh giới rõ ràng được đảm bảo ở cấp độ package/mô-đun.
