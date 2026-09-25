# Hướng dẫn Đóng góp cho LangStride Community Edition

> **Ngôn ngữ**: [English](CONTRIBUTING.md) | Tiếng Việt

Chào mừng bạn! Cảm ơn bạn đã quan tâm đến việc đóng góp cho **LangStride Community Edition**.

LangStride là nền tảng học tập và thực hành lập trình phi thương mại, hướng tới cộng đồng. Chúng tôi trân trọng mọi hình thức đóng góp — đặc biệt là việc biên soạn giải thích kỹ thuật, sửa lỗi nội dung và soạn thảo bài tập thực hành — tương đương như đóng góp mã nguồn (code).

## Các Vai trò & Lộ trình Đóng góp

Bạn **không nhất thiết** phải là kỹ sư phần mềm hay hiểu toàn bộ mã nguồn ứng dụng để có thể đóng góp nội dung học tập giá trị. Chúng tôi tách bạch việc biên soạn nội dung khỏi việc phát triển code ứng dụng:

| Lĩnh vực Đóng góp | Bạn Đóng góp Gì | Hướng dẫn Chi tiết |
|---|---|---|
| **Bài học & Khái niệm** | Giải thích khái niệm, viết ví dụ code, sửa lỗi diễn đạt | [Hướng dẫn Đóng góp Nội dung](docs/vi/contribution/content-guide.md) |
| **Lộ trình học (Roadmaps)** | Đề xuất nút mới, hoàn thiện đồ thị tiên quyết, sắp xếp chủ đề | [Hướng dẫn Đóng góp Lộ trình](docs/vi/contribution/roadmap-guide.md) |
| **Thử thách Thực hành** | Soạn câu hỏi trắc nghiệm, đoán output và sửa lỗi mã nguồn | [Hướng dẫn Soạn thảo Bài tập](docs/vi/contribution/challenge-guide.md) |
| **Thẩm định Kỹ thuật** | Review pull request đảm bảo tính chính xác và rõ ràng | [Hướng dẫn Thẩm định Kỹ thuật](docs/vi/contribution/technical-review-guide.md) |
| **Mã nguồn & Hạ tầng** | Phát triển các package mô-đun, kiểm thử, công cụ runner, CI | [Tổng quan Kiến trúc Kỹ thuật](docs/vi/architecture/overview.md) |

## Quy trình Đóng góp Nhanh

1. **Fork kho mã nguồn** trên GitHub.
2. **Tạo một branch riêng**: `git checkout -b content/php-functions-lesson`.
3. **Thực hiện thay đổi** trong thư mục phù hợp (`content/`, `challenges/`, `roadmaps/`, hoặc `docs/`).
4. **Kiểm tra cục bộ**: Đảm bảo định dạng Markdown chuẩn xác và toàn bộ liên kết tương đối hoạt động bình thường.
5. **Gửi một Pull Request** với phần tóm tắt rõ ràng về những thay đổi đề xuất.

## Nguyên tắc Cốt lõi

1. **Cốt lõi Tất định & Không phụ thuộc AI**: Bài tập thực hành bắt buộc phải có kết quả mong đợi tất định, có thể xác minh được. Không gửi bài tập đòi hỏi gọi API AI trực tiếp để chấm điểm.
2. **Thẩm quyền & Trích dẫn**: Các giải thích kỹ thuật nên được dẫn chứng từ tài liệu chính thức (ví dụ tài liệu chính thống của PHP.net).
3. **Bài học Ngắn gọn**: Giữ bài học súc tích, tập trung vào mô hình tư duy thực tiễn (5–10 phút đọc).
4. **Tuân thủ Giấy phép**: Mọi đóng góp đều được tiếp nhận dưới giấy phép của kho mã nguồn ([PolyForm Noncommercial License 1.0.0](LICENSE.md)).
