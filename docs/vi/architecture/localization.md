# Kiến trúc & Quy tắc Bản địa hóa Ứng dụng (Localization Policy)

> **Ngôn ngữ**: [English](../../en/architecture/localization.md) | Tiếng Việt

- **Trạng thái**: Đã phê duyệt (Approved)
- **Cập nhật lần cuối**: 2026-10-01
- **Phạm vi**: Ứng dụng Web Công khai & Nội dung Giáo dục
- **Thẩm quyền**: Đặc tả Kiến trúc (Bản dịch tham khảo)

Tài liệu này xác lập kiến trúc, cấu trúc URL, thứ tự ưu tiên điều hướng ngôn ngữ và thẩm quyền chuẩn tắc cho việc bản địa hóa Tiếng Anh (`en`) và Tiếng Việt (`vi`) trong LangStride.

---

## 1. Nguyên tắc cốt lõi & Thẩm quyền chuẩn tắc

1. **Thẩm quyền Tiếng Anh Chuẩn tắc (Canonical Authority)**:
   - 🇬🇧 **Tiếng Anh (`en`)** là **Nguồn chân lý chuẩn tắc (Canonical Source of Truth)** cho toàn bộ nội dung giáo dục, định danh khái niệm và đặc tả giao diện người dùng.
   - 🇻🇳 **Tiếng Việt (`vi`)** là **Nội dung & Bản dịch tham khảo** phục vụ cho cộng đồng học viên và kỹ sư nói tiếng Việt.
   - Trong trường hợp có sự khác biệt hoặc chưa thống nhất về mặt ngữ nghĩa, văn bản tiếng Anh là căn cứ chuẩn.

2. **Ngôn ngữ lập trình theo dõi (Track) và Ngôn ngữ giao diện (Locale)**:
   - Định danh `php` đại diện cho **ngôn ngữ của lộ trình học** (`trackLanguage`).
   - Các định danh `en` và `vi` đại diện cho **ngôn ngữ hiển thị và nội dung** (`locale`).
   - `php` TUYỆT ĐỐI KHÔNG PHẢI là một locale giao diện; `locale` và `trackLanguage` là hai chiều dữ liệu tách biệt hoàn toàn.

3. **Vận hành cục bộ xác định (Deterministic Local-First)**:
   - Hệ thống bản địa hóa không phụ thuộc vào API dịch thuật đám mây, dịch máy lúc chạy (runtime machine translation) hay dịch vụ mạng bên ngoài.
   - Toàn bộ nội dung bản dịch được quản lý phiên bản và lưu trữ dưới dạng file trong Git.
   - Chế độ file và chế độ cơ sở dữ liệu read-model tùy chọn trả về chính xác cùng một hợp đồng dữ liệu bản địa hóa.

---

## 2. Cấu trúc URL chuẩn tắc & Điều hướng HTTP

1. **URL có tiền tố ngôn ngữ (Locale-Prefixed URLs)**:
   - Mọi route web công khai đều có tiền tố ngôn ngữ chuẩn tắc:
     - Trang chủ: `/en`, `/vi`
     - Lộ trình PHP: `/en/php`, `/vi/php`
     - Bài học: `/en/php/concepts/:slug`, `/vi/php/concepts/:slug`
   - Thuộc tính `<html lang="...">` ở thẻ gốc phản ánh động locale hiện tại (`en` hoặc `vi`).

2. **Thứ tự ưu tiên đàm phán ngôn ngữ (Negotiation Precedence)**:
   Đối với các đường dẫn cũ hoặc không có tiền tố (`/`, `/php`, `/php/concepts/:slug`), middleware (`apps/web/middleware.ts`) sẽ đàm phán locale đích duy nhất một lần theo thứ tự:
   1. Cookie chỉ định của người dùng: `NEXT_LOCALE` (được lưu khi người dùng chọn nút chuyển đổi ngôn ngữ).
   2. Header `Accept-Language` của trình duyệt (nhận diện ưu tiên `vi`).
   3. Mặc định: `en`.

3. **Trạng thái HTTP & Hành vi chuyển hướng**:
   - Các route cũ không có tiền tố sẽ được chuyển hướng một lần (redirect 307/308) sang URL có tiền tố ngôn ngữ tương ứng (ví dụ: `/php` -> `/en/php`).
   - Các route hợp lệ có tiền tố (`/en/...`, `/vi/...`) được phục vụ trực tiếp, không tạo vòng lặp redirect.
   - Các tiền tố ngôn ngữ không được hỗ trợ (ví dụ: `/fr/...`, `/es/...`, `/de/...`) sẽ trả về **HTTP 404 (Not Found)**.
   - Slug bài học không tồn tại dưới một locale hợp lệ sẽ trả về HTTP 404.

---

## 3. Phạm vi bản địa hóa (Scope)

- **Trong phạm vi (In Scope)**:
  - Toàn bộ giao diện người dùng ứng dụng web (thanh điều hướng, shell, nút bấm, nhãn trợ năng accessibility, tooltip, hộp thoại popover, huy hiệu trạng thái, trang 404 not-found).
  - Cấu trúc và siêu dữ liệu của lộ trình lập trình viên PHP.
  - Cả 6 bài học PHP đã phát hành (`variables-and-types`, `control-flow`, `functions`, `classes-and-objects`, `interfaces`, `exceptions`).
- **Ngoài phạm vi (Excluded)**:
  - Không viết lại hàng loạt cây tài liệu hiện có (tài liệu trong `docs/en` và `docs/vi` tiếp tục tuân thủ quy tắc tại `docs/README.md`).

---

## 4. Quy ước lưu trữ nội dung (Content Storage Convention)

Dữ liệu học tập được tổ chức theo các thư mục locale rõ ràng nhằm tránh xung đột với các track ngôn ngữ lập trình:

```text
content/
└── locales/
    ├── en/
    │   ├── knowledge/
    │   │   └── concepts.json
    │   ├── roadmaps/
    │   │   └── php.json
    │   └── programming/
    │       └── php/
    │           └── lessons/
    │               ├── variables-and-types.md
    │               ├── control-flow.md
    │               ├── functions.md
    │               ├── classes-and-objects.md
    │               ├── interfaces.md
    │               └── exceptions.md
    └── vi/
        ├── knowledge/
        │   └── concepts.json
        ├── roadmaps/
        │   └── php.json
        └── programming/
            └── php/
                └── lessons/
                    ├── variables-and-types.md
                    ├── control-flow.md
                    ├── functions.md
                    ├── classes-and-objects.md
                    ├── interfaces.md
                    └── exceptions.md
```
