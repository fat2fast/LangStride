# Trang chủ và Tiếp tục học (Home and Continue Learning)

> **Ngôn ngữ**: [English](../../en/fr/home-continue-learning.md) | Tiếng Việt

- **Trạng thái**: Đang đặc tả (In Specification)
- **Cập nhật lần cuối**: 2026-09-25
- **Phạm vi**: Public MVP (P2)
- **Thẩm quyền**: Đặc tả Yêu cầu Chức năng (Bản dịch tham khảo)

## Quy tắc lựa chọn bài học (Selection rule)

“Bài học chưa hoàn thành phù hợp nhất” là bài học được truy cập gần đây nhất mà chưa hoàn thành; nếu không có bài học nào như vậy, hệ thống sẽ chọn bài học đầu tiên có sẵn trên lộ trình. Quy tắc tất định này chỉ có thể bị thay thế bởi một thay đổi yêu cầu có gắn phiên bản.

### FR-HOME-001 — Nút hành động tiếp tục học rõ ràng
Trang chủ phải hiển thị hành động Tiếp tục học (Continue Learning) rõ ràng. Hoàn thành khi hành động chính trên trang chủ có thể dễ dàng nhận diện mà không cần phải quét qua các hành động cạnh tranh khác.

### FR-HOME-002 — Mở bài học phù hợp
Nút Tiếp tục học phải mở bài học chưa hoàn thành phù hợp nhất. Hoàn thành khi hành động tuân thủ chính xác quy tắc lựa chọn ở trên.

#### Tiêu chí Nghiệm thu (Acceptance Criteria)
- **Cho (Given)**: Người học trước đó đã mở bài học "php-control-flow" nhưng chưa hoàn thành.
- **Khi (When)**: Người học truy cập vào Trang chủ.
- **Thì (Then)**: Nút "Tiếp tục học" mở trực tiếp "/php/concepts/php-control-flow" mà không bắt người học chọn giữa nhiều hành động cạnh tranh.

### FR-HOME-003 — Tiến độ lộ trình cơ bản
Trang chủ nên hiển thị tiến độ lộ trình PHP cơ bản. Hoàn thành khi người học có thể nhìn thấy số lượng bài học PHP đã hoàn thành trên tổng số bài học hiện có.

### FR-HOME-004 — Một quyết định hành động chính duy nhất
Trang chủ phải tránh bắt người học phải lựa chọn giữa quá nhiều hành động cạnh tranh. Hoàn thành khi nút Tiếp tục học luôn là lời kêu gọi hành động (CTA) chính duy nhất dành cho người học đang có nội dung học dở.
