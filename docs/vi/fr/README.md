# Đặc tả Yêu cầu Chức năng (Functional Requirements)

> **Ngôn ngữ**: [English](../../en/fr/README.md) | Tiếng Việt

Thư mục này là tài liệu đặc tả chuẩn tắc (canonical), có thể thực thi và kiểm thử cho Community MVP. Mỗi mã định danh `FR-*` và `NFR-*` đều có đúng một tài liệu chủ sở hữu duy nhất tại đây. Một yêu cầu chỉ được coi là hoàn thành khi các tiêu chí nghiệm thu của chính nó được chứng minh rõ ràng bằng kết quả thực tế.

## Vai trò tài liệu

- [`../fr-map.md`](../fr-map.md) là tổng quan: danh mục phân loại, trạng thái, giai đoạn và liên kết.
- [`../roadmap.md`](../roadmap.md) định hướng sản phẩm, dự định tương lai và trạng thái cấp giai đoạn. Tài liệu này không định nghĩa hành vi chi tiết.
- Các file trong thư mục này định nghĩa chi tiết hành vi, ranh giới, quan hệ phụ thuộc và tiêu chí nghiệm thu.

## Nguyên tắc

- Giữ ổn định mã định danh: Không bao giờ tái sử dụng hoặc đánh số lại mã định danh.
- Mỗi yêu cầu chỉ thuộc về duy nhất một file: Các file khác khi cần sẽ dẫn link thay vì mô tả lặp lại.
- `Must` (Bắt buộc), `Should` (Nên có), `Could` (Có thể có) và `Later` (Giai đoạn sau) thể hiện mức độ ưu tiên bàn giao. `Status` (Trạng thái) thể hiện tiến độ thực thi.
- `Introduced` (Giới thiệu) là giai đoạn bàn giao sớm nhất; `Release gate` (Cửa kiểm phát hành) là giai đoạn mà yêu cầu đó bắt buộc phải hoàn thành.
- Các gạch đầu dòng “Hoàn thành khi (Done when)” là tiêu chí nghiệm thu quan sát và đo lường được, không phải gợi ý triển khai.
- Các ràng buộc dùng chung nằm tại [quality-attributes.md](quality-attributes.md).

## Danh mục nhóm năng lực

| Nhóm năng lực | File đặc tả sở hữu |
|---|---|
| Nền tảng kho mã nguồn | [repository-foundation.md](repository-foundation.md) |
| Mô hình tri thức và nội dung | [knowledge-model.md](knowledge-model.md) |
| Lộ trình học PHP | [php-roadmap.md](php-roadmap.md) |
| Bài học | [lessons.md](lessons.md) |
| Tiến độ học tập | [learning-progress.md](learning-progress.md) |
| Trang chủ / Tiếp tục học | [home-continue-learning.md](home-continue-learning.md) |
| Engine thực hành dùng chung | [practice-engine.md](practice-engine.md) |
| Thực hành trắc nghiệm (MCQ) | [practice-multiple-choice.md](practice-multiple-choice.md) |
| Thực hành đoán kết quả (Predict-output) | [practice-predict-output.md](practice-predict-output.md) |
| Thực hành sửa mã (Fix-the-code) | [practice-fix-the-code.md](practice-fix-the-code.md) |
| Thực hành gỡ lỗi (Debugging) | [debugging-practice.md](debugging-practice.md) |
| Đánh giá mã do AI tạo ra | [ai-generated-code-review.md](ai-generated-code-review.md) |
| Độ thuần thục và Ôn tập | [mastery-and-review.md](mastery-and-review.md) |
| Tìm kiếm | [search.md](search.md) |
| Đóng góp nội dung | [content-contribution.md](content-contribution.md) |
| Tự lưu trữ (Self-hosting) | [self-hosting.md](self-hosting.md) |
| Vận hành nội dung | [content-operations.md](content-operations.md) |
| Thuộc tính chất lượng dùng chung (NFR) | [quality-attributes.md](quality-attributes.md) |
