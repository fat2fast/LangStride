# Tầm nhìn Sản phẩm & Ranh giới Phạm vi LangStride

> **Ngôn ngữ**: [English](../../en/product/mvp-scope.md) | Tiếng Việt

- **Trạng thái**: Đang đặc tả (In Specification)
- **Cập nhật lần cuối**: 2026-09-25
- **Phạm vi**: Ranh giới Sản phẩm & Định nghĩa MVP
- **Thẩm quyền**: Đặc tả Phạm vi Sản phẩm (Bản dịch tham khảo)

Tài liệu này định nghĩa **LÝ DO (WHY)** LangStride tồn tại và **RANH GIỚI** những gì nằm trong và ngoài bản Public Repository MVP.

## 1. Vấn đề sản phẩm giải quyết

Quá trình học tập kỹ thuật của lập trình viên hiện nay bị phân mảnh trầm trọng giữa các lộ trình rời rạc, tài liệu tĩnh, các nền tảng giải thuật thiếu tính thực tế và các câu hỏi phỏng vấn học vẹt.

LangStride hợp nhất việc hiểu khái niệm, thực hành có chủ đích, rèn luyện kỹ năng gỡ lỗi và chuyển giao mô hình tư duy giữa các ngôn ngữ vào một vòng lặp phản hồi duy nhất.

## 2. Vòng lặp Học tập Cốt lõi của MVP

```text
Chọn Lộ trình Hướng dẫn (PHP)
          ↓
Học Khái niệm Ngắn có Cấu trúc
          ↓
Kiểm tra Nhanh Mức độ Hiểu bài
          ↓
Giải Thử thách Thực hành
          ↓
Xem lại Kết quả & Giải thích Lỗi sai
          ↓
Gỡ lỗi & Xác minh Mã nguồn
          ↓
Lưu trữ Tiến độ Cục bộ
          ↓
Tiếp tục sang Khái niệm Tiếp theo
```

## 3. Phạm vi Public MVP (P0 — P5)

Bản MVP của kho mã nguồn công khai chỉ tập trung chứng minh vòng lặp học tập độc lập cho PHP:

- **P0**: Nền tảng kho mã nguồn & Cộng đồng (Tài liệu, license, setup, nạp dữ liệu seed).
- **P1**: Mô hình Tri thức PHP & Lộ trình Hướng dẫn (20–30 khái niệm, 10–15 bài học hoàn chỉnh).
- **P2**: Tiến độ Học tập Cục bộ (Lưu bền vững, nút Tiếp tục học).
- **P3**: Thực hành Lập trình (Trắc nghiệm, đoán output, sửa code).
- **P4**: Thực hành Gỡ lỗi & Đánh giá Code do AI tạo ra (Lỗi tĩnh, trace, tư duy phán đoán).
- **P5**: Độ thuần thục, Hàng đợi Ôn tập, Tìm kiếm Toàn văn và Bản phát hành Công khai.

## 4. Ranh giới Rõ ràng cho Giai đoạn Sau MVP (Post-MVP)

Các mảng sau đây đại diện cho tầm nhìn dài hạn nhưng **tuyệt đối không nằm trong phạm vi bàn giao hiện tại**:

- **Mở rộng ngôn ngữ**: Lộ trình Go hoàn chỉnh.
- **So sánh ngôn ngữ**: Engine so sánh phiên bản (Version Diff), so sánh PHP → Go (Lang Diff).
- **Nhánh học nâng cao**: Phòng lab DevOps, trình mô phỏng Thiết kế Hệ thống tương tác.
- **Runtime phức tạp**: Sandbox chạy code đám mây trực tiếp, terminal từ xa.
- **Tích hợp AI**: Server MCP (Model Context Protocol), migration agent tự động.
- **Sản phẩm thương mại**: Đăng ký thuê bao SaaS, đồng bộ đám mây đa thiết bị, tính năng Đội nhóm và phân quyền doanh nghiệp.

Việc tách biệt rõ ràng các mảng này đảm bảo phiên bản cộng đồng trở thành một nền tảng vững chắc, gọn nhẹ và đáng tin cậy trước tiên.
