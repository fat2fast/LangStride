# Hướng dẫn Đóng góp Nội dung (Content Contribution)

> **Ngôn ngữ**: [English](../../en/contribution/content-guide.md) | Tiếng Việt

- **Trạng thái**: Hoạt động (Active)
- **Cập nhật lần cuối**: 2026-09-25
- **Phạm vi**: Nội dung Giáo dục
- **Thẩm quyền**: Hướng dẫn Đóng góp (Bản dịch tham khảo)

Tài liệu này hướng dẫn cách viết, cải thiện và đề xuất nội dung bài học giáo dục cho LangStride mà không cần chỉnh sửa mã nguồn ứng dụng.

## Triết lý bài học

Một bài học trên LangStride cần ngắn gọn, tập trung và hoàn thành trong một phiên học (5–10 phút đọc). Cấu trúc bắt buộc bao gồm:

```text
Tiêu đề khái niệm (Concept Title)
↓
Vì sao điều này quan trọng (Why It Matters)
↓
Mô hình tư duy / Minh họa trực quan (Mental Model)
↓
Ví dụ mã nguồn có định dạng chuẩn (Formatted Code Example)
↓
Các lỗi thường gặp (Common Mistakes)
```

> **Lưu ý về các giai đoạn tiếp theo**: Kiểm tra nhanh (Quick Check - P2) và Bài tập thực hành (Practice Challenges - P3) được lên lịch ở các phase sau và được chủ động hoãn lại trong proof slice P1 này. Trong giai đoạn hiện tại, cộng tác viên chỉ cần hoàn thiện 4 phần bắt buộc bên dưới.

## Tiêu đề bắt buộc của bài học

Mỗi file bài học markdown phải bao gồm 4 phần bắt buộc sau:

```markdown
## Why it matters
Ý nghĩa thực tế, sự đánh đổi kỹ thuật, và lý do kỹ sư cấp cao quan tâm.

## Mental model
Phép loại suy trực quan hoặc mô hình trừu tượng ở mức engine giải thích cách thức hoạt động.

## Code example
```php
<?php
// Ví dụ hoàn chỉnh, hợp lệ về mặt cú pháp và có thể nhẩm chạy được
```

## Common mistakes
1. Cạm bẫy 1 và cách phòng tránh.
2. Cạm bẫy 2 và cách phòng tránh.
```

## Cú pháp Markdown được hỗ trợ (MarkdownProse)

Để đảm bảo an toàn kết xuất và tuyệt đối không inject HTML thô, văn bản bài học được render thông qua tập con Markdown an toàn (`MarkdownProse`):

| Phần tử | Cú pháp hỗ trợ | Ghi chú |
|---|---|---|
| **Đoạn văn (Paragraphs)** | Các khối văn bản phân tách bằng dòng trống | Tự động chuẩn hóa và thoát ký tự an toàn |
| **Danh sách có thứ tự** | `1. Mục thứ nhất`<br>`2. Mục thứ hai` | Hiển thị dưới dạng thẻ ngữ nghĩa `<ol>` |
| **Danh sách không thứ tự** | `- Mục thứ nhất` hoặc `* Mục thứ nhất` | Hiển thị dưới dạng thẻ ngữ nghĩa `<ul>` |
| **Trích dẫn (Blockquotes)** | `> Ghi chú quan trọng hoặc điểm mấu chốt` | Hiển thị khối trích dẫn nổi bật |
| **Tiêu đề phụ (Subheadings)**| `### Tiêu đề phụ mục`<br>`#### Tiêu đề nhỏ` | Hỗ trợ `###` (h3) và `####` (h4) bên trong từng phần |
| **Chữ đậm (Bold)** | `**in đậm**` hoặc `__in đậm__` | Định dạng chữ đậm nội dòng |
| **Chữ nghiêng (Italic)** | `*in nghiêng*` hoặc `_in nghiêng_` | Định dạng chữ nghiêng nội dòng |
| **Mã nguồn nội dòng** | `` `code` `` | Hiển thị kiểu phông chữ đơn cách (monospace) |
| **Liên kết an toàn (Links)** | `[Tiêu đề](https://...)` hoặc `[Nội bộ](/php)` | Giới hạn ở tiền tố `https://`, `http://`, `/`, hoặc `mailto:` |

> **Lưu ý bảo mật**: Thẻ HTML thô (`<script>`, `<iframe>`, `<div>`, ...) và các giao thức link không an toàn (`javascript:`, `data:`) bị từ chối và không được thực thi. Tất cả khối mã nguồn phải sử dụng cú pháp fenced code block chỉ định rõ ngôn ngữ (ví dụ ` ```php `).

## Nguyên tắc nội dung

1. **Giải thích TẠI SAO và Ở ĐÂU**: Code diễn đạt CÁI GÌ; bài học giải thích TẠI SAO áp dụng mẫu thiết kế đó và Ở ĐÂU hay gặp bẫy lỗi.
2. **Nguồn tham khảo uy tín**: Dẫn chứng tài liệu chính thức (ví dụ tài liệu PHP.net, RFCs).
3. **Code độc lập**: Ví dụ code phải đúng cú pháp và có thể nhẩm chạy được.
4. **Văn phong tự nhiên**: Viết mạch lạc, dễ hiểu, tránh các từ ngữ sáo rỗng tạo bởi AI.

## Quy tắc Bản địa hóa & Đồng bộ Song ngữ (Localization & Parity)

LangStride hỗ trợ tiếng Anh chuẩn tắc (`en`) và tiếng Việt tham khảo (`vi`). Để đảm bảo chất lượng và tính nhất quán:

### 1. Các định danh bất biến qua các ngôn ngữ
Khi biên soạn hoặc dịch nội dung, các thuộc tính sau BẮT BUỘC phải giữ nguyên chính xác giữa `en` và `vi`:
- `conceptId`: Định danh khái niệm chung (ví dụ: `concept-functions`).
- `id` của node và `id` của section lộ trình: Định danh đồ thị cấu trúc.
- `id` và `slug` của bài học: Khóa định tuyến URL (ví dụ: `functions`).
- `status`: Trạng thái phát hành của node và bài học (`published` hoặc `planned`).
- `order` và `prerequisites`: Thứ tự hiển thị và mối quan hệ phụ thuộc.
- `codeExample`: Khối mã nguồn ví dụ, cú pháp ngôn ngữ và nội dung code.
- `sources[].url`: URL tài liệu tham khảo chính thức.

Những phần được phép bản địa hóa:
- `title` bài học, tiêu đề các mục, văn bản giải thích và metadata.
- `title` và `description` của section, `title` của node lộ trình.
- `title` và `description` của khái niệm (concept).
- `title` hiển thị của nguồn tài liệu tham khảo.

### 2. Yêu cầu độ phủ tuyệt đối (Không fallback ngầm)
Mỗi bài học đã phát hành ở tiếng Anh bắt buộc phải có bài học tiếng Việt tương ứng. Thiếu bài học tiếng Việt trên route `/vi` là **lỗi kiểm tra tính hợp lệ (validation failure)** khi chạy `pnpm content:validate`, KHÔNG tự động hiển thị nội dung tiếng Anh để lấp chỗ trống.

### 3. Danh sách kiểm tra chất lượng dịch thuật (Review Checklist)
Trước khi gửi bản dịch bài học hoặc cập nhật lộ trình, hãy kiểm tra:
- [ ] **Thuật ngữ (Terminology)**: Giữ nguyên từ khóa kỹ thuật chuẩn (PHP, RFC, tên hàm/kiểu dữ liệu); dịch văn phong kỹ thuật chuẩn xác, tự nhiên.
- [ ] **Toàn vẹn mã nguồn (Code Integrity)**: Giữ nguyên khối code fence, thụt lề, nội dung mã và kết quả mẫu giống hệt bản tiếng Anh.
- [ ] **Liên kết & Nguồn tham chiếu**: Kiểm tra tất cả liên kết nội bộ dùng đường dẫn tương đối không hardcode tiền tố ngôn ngữ; URL nguồn tham chiếu khớp chuẩn.
- [ ] **Khả năng tiếp cận (Accessibility)**: Tiêu đề các mục tuân theo chuẩn (`Why it matters`, `Mental model`, `Code example`, `Common mistakes` hoặc các bản dịch tiếng Việt được duyệt).
- [ ] **Kiểm tra hợp lệ**: Chạy `pnpm content:validate` vượt qua với 0 lỗi cho tất cả các locale.

## Các bước đóng góp

1. Đảm bảo khái niệm chung đã tồn tại trong `content/locales/en/knowledge/concepts.json` và bản tiếng Việt tại `content/locales/vi/knowledge/concepts.json`.
2. Định vị hoặc thêm node lộ trình trong `content/locales/en/roadmaps/php.json` và `content/locales/vi/roadmaps/php.json`.
3. Tạo file bài học chuẩn tại `content/locales/en/programming/php/lessons/<lesson-slug>.md` và bản tiếng Việt tại `content/locales/vi/programming/php/lessons/<lesson-slug>.md` với frontmatter tương ứng:
   ```yaml
   ---
   id: php-functions
   slug: functions
   title: Hàm, Chữ ký Hàm và Closures trong PHP
   conceptId: concept-functions
   language: php
   status: published
   sources:
     - title: "PHP Manual: Functions"
       url: https://www.php.net/manual/en/language.functions.php
   ---
   ```
4. Viết nội dung bài học tuân theo 4 tiêu đề bắt buộc ở trên.
5. Kiểm tra tính hợp lệ của nội dung tại máy cục bộ:
   ```bash
   pnpm content:validate
   ```
6. Tạo Pull Request với tiêu đề `content(php): add/update <topic>`.

