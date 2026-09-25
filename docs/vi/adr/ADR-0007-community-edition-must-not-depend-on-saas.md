# ADR-0007 — Community Edition Không Được Phụ thuộc vào LangStride SaaS

> **Ngôn ngữ**: [English](../../en/adr/ADR-0007-community-edition-must-not-depend-on-saas.md) | Tiếng Việt

- **Trạng thái**: Đã chấp thuận (Accepted)
- **Cập nhật lần cuối**: 2026-09-25
- **Phạm vi**: Kiến trúc Public MVP
- **Thẩm quyền**: Bản ghi Quyết định Kiến trúc (Bản dịch tham khảo)

## Bối cảnh (Context)

LangStride được phát hành như một kho mã nguồn hướng cộng đồng theo giấy phép PolyForm Noncommercial. Để dự án thực sự có giá trị cho lập trình viên và giáo viên, nó phải có khả năng chạy độc lập hoàn toàn.

## Quyết định (Decision)

Tuyệt đối không có tính năng cốt lõi nào trong MVP (lộ trình PHP, bài học, thực hành, gỡ lỗi, tiến độ cục bộ, tìm kiếm, tự lưu trữ) được phép đòi hỏi tài khoản LangStride đám mây, gửi dữ liệu telemetry về máy chủ trung tâm hay phụ thuộc vào backend đóng.

## Các phương án đã cân nhắc (Alternatives Considered)

1. Mô hình Open-core bắt buộc đồng bộ đám mây để lưu tiến độ: Làm tổn hại lòng tin người dùng và khiến các cụm học tập cục bộ trở nên mong manh.

## Hệ quả (Consequences)

- Khả năng tự lưu trữ offline và riêng tư thực sự cho trường học, nhóm học tập và cá nhân.
- Ranh giới kiến trúc rõ ràng giữa bản Community công khai và các sản phẩm thương mại tương lai.
