# LangStride

> **Ngôn ngữ**: [English](README.md) | Tiếng Việt

> Nền tảng học tập và thực hành lập trình hướng cộng đồng, phi thương mại.

LangStride Community Edition là kho mã nguồn công khai của LangStride. Dự án được xây dựng phục vụ học tập cá nhân, giáo dục lập trình, nghiên cứu, đóng góp cộng đồng và tự lưu trữ phi thương mại (non-commercial self-hosting).

Kho mã nguồn này được thiết kế để tự thân nó đã là một sản phẩm hoàn chỉnh và hữu ích. Bất kỳ lập trình viên nào cũng có thể clone về máy, chạy cục bộ, học theo các lộ trình có cấu trúc, làm bài tập thực hành tất định và đóng góp cải tiến mà không cần phụ thuộc vào bất kỳ dịch vụ thương mại đám mây nào của LangStride.

- **Trạng thái**: Hoàn thành P0 Foundation & P1 PHP First Vertical Slice (Proof Slice; đang mở rộng P1)
- **Phạm vi**: Public MVP (P0–P5)
- **Giấy phép**: PolyForm Noncommercial License 1.0.0 ([LICENSE.md](LICENSE.md))
- **Tài liệu chi tiết**: [Trung tâm Tài liệu](docs/README.md) | [Tài liệu Tiếng Việt](docs/vi/README.md) | [Tài liệu Tiếng Anh](docs/en/README.md)

---

## 1. Vấn đề LangStride Giải quyết

Quá trình học tập kỹ thuật của lập trình viên hiện nay thường bị phân mảnh rời rạc:

- Lộ trình (roadmaps) chỉ gợi ý cần học gì, nhưng không có bài tập thực hành sát thực tế;
- Tài liệu kỹ thuật giải thích tính năng một cách cô lập;
- Các nền tảng luyện code tập trung quá nặng vào việc học vẹt thuật toán trừu tượng;
- Tài liệu nâng cấp phiên bản chỉ liệt kê changelog thay vì chuyển giao mô hình tư duy.

LangStride hợp nhất tất cả những yếu tố trên vào một vòng lặp học tập liền mạch duy nhất:

```text
Học Khái niệm (Bài học ngắn, có cấu trúc)
          ↓
Thực hành Có chủ đích (Bài tập tất định)
          ↓
Gỡ lỗi & Đánh giá Code (Tìm lỗi bug, đọc vết ngăn xếp)
          ↓
Tiến độ Cục bộ & Độ thuần thục (Hàng đợi ôn tập minh bạch)
```

Xem [Tầm nhìn Sản phẩm & Ranh giới Phạm vi](docs/vi/product/mvp-scope.md).

---

## 2. Nguyên tắc Học tập Cốt lõi

- **Học tập có định hướng**: Người học luôn biết mình nên học gì tiếp theo thông qua đồ thị điều kiện tiên quyết, không phải danh bạ link web rời rạc.
- **Học đi đôi với hành**: Mỗi khái niệm ngắn đều kết nối ngay với câu hỏi kiểm tra nhanh và bài tập thực hành tất định.
- **Bài học ngắn gọn, tập trung**: Bài học được thiết kế để hoàn thành trong một phiên học tập trung (5–10 phút):
  ```text
  Tiêu đề Khái niệm → Vì sao quan trọng → Mô hình tư duy → Ví dụ Code → Lỗi thường gặp → Kiểm tra nhanh → Thực hành
  ```
- **Mô hình Tri thức Tái sử dụng**: Các khái niệm được mô hình hóa độc lập với ngôn ngữ cụ thể, cho phép chuyển giao kiến thức giữa các ngôn ngữ lập trình ([ADR-0005](docs/vi/adr/ADR-0005-concept-model-independent-of-language.md)).
- **Cốt lõi Tất định & Không phụ thuộc AI**: Bài tập thực hành và bài tập gỡ lỗi được chấm điểm có thể tái tạo 100% mà không đòi hỏi API AI bên ngoài ([ADR-0006](docs/vi/adr/ADR-0006-deterministic-validation-before-ai.md)).

---

## 3. Phạm vi Public MVP (P0 — P5)

Bản MVP của kho mã nguồn công khai chỉ tập trung chứng minh vòng lặp học tập độc lập cho ngôn ngữ **PHP**:

| Giai đoạn | Cột mốc | Tóm tắt Phạm vi | Đặc tả Chi tiết |
|---|---|---|---|
| **P0** | **Nền tảng Kho mã nguồn** | Quy ước Git, quy trình seed dữ liệu, kiểm tra CI, hướng dẫn đóng góp | [repository-foundation.md](docs/vi/fr/repository-foundation.md) |
| **P1** | **Tri thức PHP & Lộ trình** | 20–30 khái niệm, 10–15 bài học hoàn chỉnh, đồ thị tiên quyết | [php-roadmap.md](docs/vi/fr/php-roadmap.md), [lessons.md](docs/vi/fr/lessons.md) |
| **P2** | **Tiến độ Học tập Cục bộ** | Khôi phục vị trí đang học, nút Tiếp tục học (Continue Learning) | [learning-progress.md](docs/vi/fr/learning-progress.md), [home-continue-learning.md](docs/vi/fr/home-continue-learning.md) |
| **P3** | **Thực hành Lập trình** | Bài tập trắc nghiệm, đoán output, sửa lỗi mã nguồn | [practice-engine.md](docs/vi/fr/practice-engine.md) |
| **P4** | **Gỡ lỗi & Đánh giá Code AI** | Vết stack trace tĩnh, chẩn đoán lỗi, đánh giá nguyên nhân gốc rễ | [debugging-practice.md](docs/vi/fr/debugging-practice.md), [ai-generated-code-review.md](docs/vi/fr/ai-generated-code-review.md) |
| **P5** | **Độ thuần thục & Phát hành** | Hàng đợi ôn tập minh bạch, tìm kiếm toàn văn PostgreSQL, phát hành | [mastery-and-review.md](docs/vi/fr/mastery-and-review.md), [search.md](docs/vi/fr/search.md) |

Tài liệu kế hoạch chi tiết và danh mục yêu cầu:
- 🇬🇧 **[Lộ trình MVP Tiếng Anh](docs/en/roadmap.md)** | 🇻🇳 **[Lộ trình MVP Tiếng Việt](docs/vi/roadmap.md)**
- 🇬🇧 **[Bản đồ FR Tiếng Anh](docs/en/fr-map.md)** | 🇻🇳 **[Bản đồ FR Tiếng Việt](docs/vi/fr-map.md)**

---

## 4. Định hướng Sau MVP (Không thuộc Phạm vi Public MVP)

Các lĩnh vực sau đại diện cho tầm nhìn dài hạn của LangStride. Chúng **hoàn toàn nằm ngoài phạm vi Public MVP** và sẽ không được lên lịch thực hiện cho tới khi P0–P5 được hoàn thành và nghiệm thu:

```text
Lộ trình học ngôn ngữ Go đầy đủ
Engine So sánh phiên bản (Version Diff, ví dụ PHP 7.4 → PHP 8.1)
Engine So sánh ngôn ngữ PHP → Go (Lang Diff)
Kiến thức nền tảng DevOps & Phòng lab
Trình mô phỏng Thiết kế Hệ thống tương tác (System Design)
Môi trường Sandbox thực thi mã nguồn trực tiếp
Truy cập Terminal từ xa
Tích hợp Model Context Protocol (MCP)
Agent hỗ trợ di chuyển mã nguồn (Migration Agent)
Đồng bộ đám mây đa thiết bị
Thuê bao dịch vụ SaaS & Tính năng Đội nhóm
Phân quyền doanh nghiệp (Enterprise RBAC)
```

Xem [Ranh giới Giai đoạn Sau MVP](docs/vi/product/mvp-scope.md#4-ranh-giới-rõ-ràng-cho-giai-đoạn-sau-mvp-post-mvp).

---

## 5. Tổng quan Định hướng Kỹ thuật

| Lĩnh vực | Lựa chọn Công nghệ | Cơ sở Lý luận Kiến trúc |
|---|---|---|
| **Kiến trúc** | Khối mô-đun hóa (Modular Monolith) | Đơn vị triển khai duy nhất, dễ dàng tự lưu trữ ([ADR-0001](docs/vi/adr/ADR-0001-modular-monolith.md)) |
| **Ngôn ngữ chính** | TypeScript | An toàn kiểu xuyên suốt từ UI, schema đến công cụ dòng lệnh ([ADR-0002](docs/vi/adr/ADR-0002-typescript-primary-language.md)) |
| **Giao diện Web** | Next.js / React | Render phía server, hệ sinh thái component phong phú, định kiểu Tailwind CSS |
| **Tầng dữ liệu** | PostgreSQL / Supabase | Dữ liệu quan hệ, runner container cục bộ, công cụ migration ([ADR-0003](docs/vi/adr/ADR-0003-postgresql-supabase-data-layer.md)) |
| **Tìm kiếm** | PostgreSQL Full Text Search | Không phát sinh chi phí hạ tầng công cụ tìm kiếm phụ trợ |
| **Lưu trữ nội dung** | File quản lý phiên bản Git | Nội dung có thể thẩm định và fork qua Git Pull Request ([ADR-0004](docs/vi/adr/ADR-0004-content-stored-as-structured-repository-data.md)) |

Xem [Tổng quan Kiến trúc Kỹ thuật](docs/vi/architecture/overview.md).

---

## 6. Bắt đầu Sử dụng (Getting Started)

### Yêu cầu Tiên quyết (Prerequisites)

- **Node.js**: `v22.0.0+` (hoặc `v26+`, xem `.nvmrc`)
- **pnpm**: `v9.0.0+` (khuyến nghị `v12.x`)
- **Docker**: Docker Desktop / Docker Engine (cho PostgreSQL/Supabase cục bộ)
- **Supabase CLI**: được quản lý tự động qua `devDependencies` (`supabase` v2.118.0) và Docker

### Thiết lập & Phát triển Cục bộ (Local Setup)

1. **Clone và cài đặt phụ thuộc**:
   ```bash
   git clone https://github.com/fat2fast/LangStride.git
   cd langstride
   pnpm install
   ```

2. **Cấu hình biến môi trường**:
   ```bash
   cp .env.example .env.local
   ```
   *(Các giá trị mặc định an toàn cho môi trường cục bộ đã được thiết lập sẵn trong `.env.example`; không cần secret bên ngoài hay tài khoản đám mây).*

3. **Khởi động database cục bộ**:
   ```bash
   pnpm local:setup
   ```

4. **Xác thực và đồng bộ dữ liệu nội dung**:
   ```bash
   pnpm content:validate
   pnpm content:sync
   ```

5. **Khởi chạy ứng dụng web phát triển**:
   ```bash
   pnpm dev
   ```
   Mở [http://localhost:3000](http://localhost:3000) hoặc truy cập trực tiếp lộ trình PHP tại [http://localhost:3000/php](/php).

6. **Chạy kiểm thử và kiểm tra chất lượng**:
   ```bash
   pnpm lint
   pnpm test
   pnpm build
   ```

---

## 7. Triết lý Tự lưu trữ (Self-Hosting)

Tự lưu trữ phi thương mại là mục đích sử dụng công dân hạng nhất của LangStride Community Edition:
- Học tập cá nhân trên máy tính xách tay;
- Nhóm học tập miễn phí và các buổi meetup lập trình cộng đồng;
- Giảng dạy trong trường lớp và workshop học thuật;
- Các cụm máy chủ nội bộ phi thương mại.

Mọi hình thức tự lưu trữ phải luôn giữ tính chất phi thương mại và tuân thủ chặt chẽ [LICENSE.md](LICENSE.md) ([ADR-0007](docs/vi/adr/ADR-0007-community-edition-must-not-depend-on-saas.md)).

---

## 8. Đóng góp Cộng đồng (Community Contributions)

Chúng tôi nhiệt liệt chào đón các đóng góp kỹ thuật từ các lập trình viên, tác giả và nhà giáo dục:
- **Bài học**: Viết giải thích rõ ràng và mô hình tư duy ([Hướng dẫn Nội dung](docs/vi/contribution/content-guide.md)).
- **Lộ trình**: Hoàn thiện mối quan hệ điều kiện tiên quyết và chủ đề ([Hướng dẫn Lộ trình](docs/vi/contribution/roadmap-guide.md)).
- **Bài tập**: Biên soạn câu hỏi thực hành tất định ([Hướng dẫn Bài tập](docs/vi/contribution/challenge-guide.md)).
- **Thẩm định**: Review pull request đảm bảo tính chuẩn xác kỹ thuật ([Hướng dẫn Thẩm định](docs/vi/contribution/technical-review-guide.md)).

Đọc toàn bộ [Hướng dẫn Đóng góp (CONTRIBUTING.vi.md)](CONTRIBUTING.vi.md) để bắt đầu.

---

## 9. Giấy phép (License)

Trừ khi có tuyên bố rõ ràng khác, kho mã nguồn này được cấp phép theo giấy phép **PolyForm Noncommercial License 1.0.0**.

Các hoạt động phi thương mại được phép bao gồm:
- Xem, clone, nghiên cứu và chỉnh sửa mã nguồn;
- Học tập cá nhân, đào tạo học thuật và nghiên cứu phi thương mại;
- Khởi chạy các bản tự lưu trữ hoàn toàn miễn phí cho mục đích phi thương mại.

Giấy phép không cấp quyền cho các mục đích thương mại. Văn bản pháp lý tại [LICENSE.md](LICENSE.md) sẽ là văn bản kiểm soát có giá trị tối cao. LangStride Community Edition là **mã nguồn khả dụng cho mục đích phi thương mại (source-available for non-commercial use)** và không phải là mã nguồn mở được chuẩn hóa bởi OSI.
