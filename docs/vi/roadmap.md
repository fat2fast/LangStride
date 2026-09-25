# Lộ trình MVP Kho mã nguồn Công khai LangStride

> **Ngôn ngữ**: [English](../en/roadmap.md) | Tiếng Việt

> Phạm vi: **Chỉ áp dụng cho Phiên bản Cộng đồng / Kho mã nguồn Công khai (Community Edition)**  
> Mục tiêu: Xây dựng một sản phẩm học tập và thực hành lập trình hữu ích, có thể tự lưu trữ (self-hostable), phi thương mại trước khi bất kỳ công việc nào về SaaS bắt đầu.

## Quyền sở hữu tài liệu và Trạng thái hiện tại

Lộ trình này là góc nhìn ở cấp độ sản phẩm: định hướng dự định, phạm vi tương lai, thứ tự các giai đoạn và trạng thái cấp tính năng. Tài liệu này không định nghĩa hành vi chức năng chi tiết.

- [`fr-map.md`](fr-map.md) liệt kê danh mục các nhóm yêu cầu của Community MVP, trạng thái hiện tại và các liên kết tới đặc tả chi tiết.
- [`fr/`](fr/) chứa các yêu cầu chức năng chuẩn tắc và tiêu chí nghiệm thu chi tiết được dùng để hiện thực hóa một năng lực.

Trạng thái MVP hiện tại: **Kế hoạch cơ sở (Planning baseline)**. Các yêu cầu được quy định ở trạng thái đã lên kế hoạch; trạng thái triển khai thực tế phải được ghi nhận trong tài liệu FR chi tiết tương ứng và được phản ánh trên `fr-map.md`.

| Nhóm năng lực MVP | Trạng thái hiện tại | Yêu cầu chi tiết |
|---|---|---|
| P0 Nền tảng kho mã nguồn | Đã lên kế hoạch (Planned) | [FR map](fr-map.md#danh-mục-fr-và-trạng-thái) |
| P1 Mô hình tri thức, Lộ trình & Bài học | Đã lên kế hoạch (Planned) | [FR map](fr-map.md#danh-mục-fr-và-trạng-thái) |
| P2 Tiến độ & Tiếp tục học | Đã lên kế hoạch (Planned) | [FR map](fr-map.md#danh-mục-fr-và-trạng-thái) |
| P3 Thực hành tất định (Deterministic Practice) | Đã lên kế hoạch (Planned) | [FR map](fr-map.md#danh-mục-fr-và-trạng-thái) |
| P4 Gỡ lỗi & Đánh giá code do AI tạo ra | Đã lên kế hoạch (Planned) | [FR map](fr-map.md#danh-mục-fr-và-trạng-thái) |
| P5 Độ thuần thục, Tìm kiếm & Bản phát hành công khai | Đã lên kế hoạch (Planned) | [FR map](fr-map.md#danh-mục-fr-và-trạng-thái) |

---

## 1. Mục tiêu MVP

Bản MVP công khai phải chứng minh được một ý tưởng cốt lõi:

> Một lập trình viên có thể clone LangStride, chạy cục bộ trên máy, theo dõi lộ trình học PHP có định hướng, thực hành các khái niệm, xem lại lỗi sai và nâng cao tư duy phán đoán kỹ thuật mà không cần phụ thuộc vào một dịch vụ SaaS lưu trữ sẵn trên đám mây.

MVP không nhằm mục đích triển khai mọi lĩnh vực dài hạn của LangStride ngay từ đầu.

Kho mã nguồn công khai trước hết phải trở thành một dự án cộng đồng độc lập và đáng tin cậy.

---

## 2. Vòng lặp học tập cốt lõi của MVP (Core Learning Loop)

```text
Chọn lộ trình PHP
        ↓
Học một khái niệm ngắn gọn
        ↓
Kiểm tra nhanh (Quick Check)
        ↓
Thử thách thực hành (Practice Challenge)
        ↓
Xem lại kết quả
        ↓
Gỡ lỗi / Xác minh (Debug / Verify)
        ↓
Đánh dấu tiến độ
        ↓
Tiếp tục khái niệm tiếp theo
```

Bản MVP đầu tiên cần tối ưu hóa cho:

- Sự rõ ràng;
- Luồng học tập liền mạch;
- Tính tái lập được (reproducibility);
- Thân thiện với đóng góp cộng đồng;
- Khả năng chạy cục bộ / tự lưu trữ (self-hosted);
- Hạ tầng tối giản.

---

## 3. Phạm vi MVP Công khai

### Nằm trong phạm vi (Included)

```text
✓ Lộ trình hướng dẫn học PHP
✓ Các bài học ngắn có cấu trúc
✓ Mô hình khái niệm tri thức
✓ Các thử thách thực hành
✓ Các bài tập gỡ lỗi cơ bản
✓ Bài tập đánh giá mã nguồn do AI tạo ra
✓ Tiến độ học tập lưu trữ cục bộ / tự lưu trữ
✓ Tìm kiếm
✓ Quy trình đóng góp cộng đồng
✓ Quản lý phiên bản nội dung qua Git
✓ Quy trình cơ bản cho quản trị viên / tác giả nội dung
✓ Thiết lập Docker / môi trường cục bộ
```

### Chủ ý loại trừ khỏi MVP (Explicitly excluded)

```text
✕ Thanh toán SaaS
✕ Đồng bộ đám mây
✕ Tổ chức / Đội nhóm
✕ Phân quyền doanh nghiệp (Enterprise RBAC)
✕ Phụ thuộc gia sư AI (AI tutor dependency)
✕ Giao thức ngữ cảnh mô hình (MCP)
✕ Agent hỗ trợ di chuyển mã nguồn (Migration Agent)
✕ Môi trường chạy code đám mây trực tiếp (Live cloud sandbox)
✕ Toàn bộ nhánh DevOps
✕ Trình mô phỏng thiết kế hệ thống hoàn chỉnh (System Design simulator)
✕ Lộ trình học Go đầy đủ
✕ Engine so sánh phiên bản (Version Diff)
✕ Engine so sánh ngôn ngữ (Lang Diff)
```

Một số lĩnh vực bị loại trừ có thể có lược đồ (schema) hoặc vị trí dữ liệu dự phòng được chuẩn bị trước cho tính tương thích trong tương lai, nhưng chúng không được làm chậm tiến độ phát hành MVP.

---

# 4. Lộ trình theo từng giai đoạn (Phase Roadmap)

## P0 — Nền tảng kho mã nguồn & Cộng đồng

### Mục tiêu

Làm cho kho mã nguồn dễ hiểu, có thể chạy được ngay và sẵn sàng đón nhận đóng góp.

### Kết quả bàn giao (Deliverables)

- `README.md` & `README.vi.md`
- `LICENSE.md`
- `CONTRIBUTING.md`
- `CODE_OF_CONDUCT.md`
- Các mẫu issue (Issue templates)
- Mẫu pull request (PR template)
- Hướng dẫn phát triển cục bộ
- File ví dụ biến môi trường (`.env.example`)
- Cấu trúc dự án cơ sở
- Các bước kiểm tra CI tự động
- Cấu hình format và lint mã nguồn
- Lệnh chạy test
- Quy trình nạp dữ liệu mẫu (Seed data workflow)

### Cấu trúc kho mã nguồn đề xuất

```text
langstride/
│
├── apps/
│   └── web/
│
├── packages/
│   ├── learning/
│   ├── practice/
│   ├── content/
│   └── ui/
│
├── content/
│   └── programming/
│       └── php/
│
├── challenges/
│   └── php/
│
├── roadmaps/
│
├── supabase/
│
├── docs/
│   ├── README.md
│   ├── en/
│   │   ├── roadmap.md
│   │   ├── fr-map.md
│   │   └── fr/
│   └── vi/
│       ├── roadmap.md
│       ├── fr-map.md
│       └── fr/
│
└── docker/
```

### Nền tảng kỹ thuật cơ sở

- TypeScript
- Next.js / React
- Tailwind CSS
- PostgreSQL / Supabase
- Supabase Auth (khi chế độ xác thực được kích hoạt)
- PostgreSQL Full Text Search
- GitHub Actions
- Kiến trúc khối mô-đun hóa (modular monolith)

### Tiêu chí nghiệm thu hoàn thành giai đoạn (Exit criteria)

```text
[ ] Một bản clone mới có thể được cài đặt thành công theo tài liệu hướng dẫn.
[ ] CI thực thi lint / tests / build không có lỗi.
[ ] Dữ liệu mẫu (seed content) có thể được nạp vào hệ thống.
[ ] Quy tắc đóng góp cho kho mã nguồn được tài liệu hóa rõ ràng.
[ ] Không có bất kỳ phụ thuộc nào vào dịch vụ SaaS độc quyền.
```

---

## P1 — Mô hình tri thức & Lộ trình học PHP

### Mục tiêu

Xây dựng mô hình tri thức có cấu trúc tối thiểu cần thiết cho việc học tập, thực hành và các tính năng Version Diff / Lang Diff sau này.

### Các thực thể cốt lõi

```text
Concept (Khái niệm)
ConceptRelation (Quan hệ khái niệm)
Language (Ngôn ngữ)
LearningPath (Lộ trình học)
LearningSection (Phần học tập)
LearningNode (Nút học tập)
Lesson (Bài học)
KnowledgeSource (Nguồn tri thức)
```

### Nguyên tắc thiết kế quan trọng

Không mô hình hóa mọi thứ thành `php_lessons`.

Các khái niệm tổng quát phải có khả năng tái sử dụng:

```text
               Interface (Giao diện)
                        │
          ┌─────────────┴─────────────┐
          ▼                           ▼
   PHP Interface                 Go Interface
```

### Lộ trình PHP ban đầu

Mục tiêu bao phủ khoảng **20–30 khái niệm**.

Lộ trình gợi ý:

```text
PHP Fundamentals (Cơ bản về PHP)
    ↓
Variables & Types (Biến & Kiểu dữ liệu)
    ↓
Operators (Toán tử)
    ↓
Control Flow (Điều khiển luồng)
    ↓
Functions (Hàm)
    ↓
Scope (Phạm vi biến)
    ↓
Arrays (Mảng)
    ↓
Strings (Chuỗi ký tự)
    ↓
OOP Basics (Hướng đối tượng cơ bản)
    ↓
Inheritance (Kế thừa)
    ↓
Interfaces (Giao diện)
    ↓
Traits
    ↓
Exceptions / Errors (Xử lý lỗi & Ngoại lệ)
    ↓
Namespaces (Không gian tên)
    ↓
Composer
    ↓
Dependency Management (Quản lý phụ thuộc)
    ↓
HTTP / Request Lifecycle (Vòng đời Request)
    ↓
Database Basics (Cơ sở dữ liệu cơ bản)
    ↓
Testing (Kiểm thử)
    ↓
Runtime / PHP-FPM
```

### Định dạng bài học (Lesson format)

Mỗi bài học nên sử dụng một cấu trúc có thể dự đoán trước:

```text
Concept (Khái niệm)
↓
Why it matters (Tại sao điều này quan trọng)
↓
Mental model (Mô hình tư duy)
↓
Code example (Ví dụ mã nguồn)
↓
Common mistakes (Lỗi sai thường gặp)
↓
Quick check (Kiểm tra nhanh)
↓
Practice links (Liên kết bài tập thực hành)
```

### Mục tiêu nội dung cho bản MVP

Không cố gắng viết toàn bộ lộ trình ngay lập tức.

Mục tiêu cho bản phát hành đầu tiên:

```text
20–30 khái niệm trên lộ trình
10–15 bài học hoàn chỉnh
```

Các nút còn lại có thể đánh dấu rõ ràng là đang lên kế hoạch / chưa hoàn thiện.

### Tiêu chí nghiệm thu hoàn thành giai đoạn

```text
[ ] Lộ trình PHP hiển thị dựa trên dữ liệu có cấu trúc.
[ ] Các điều kiện tiên quyết được biểu diễn chính xác.
[ ] Người dùng có thể mở bài học từ một nút trên lộ trình.
[ ] Bài học được điều khiển bởi nội dung (content-driven), không hard-code trong UI.
[ ] Nội dung có thể thay đổi thông qua quy trình đóng góp Git thông thường.
```

---

## P2 — Tiến độ học tập cục bộ (Local Learning Progress)

### Mục tiêu

Biến kho mã nguồn từ một trang tài liệu thành một ứng dụng học tập thực sự.

### Các tính năng

- Đánh dấu bài học đã bắt đầu;
- Đánh dấu bài học đã hoàn thành;
- Lưu vị trí học hiện tại;
- Tiếp tục học từ điểm dừng gần nhất;
- Hiển thị trạng thái nút trên lộ trình;
- Lưu bài học yêu thích (bookmark);
- Xem lịch sử học tập cơ bản;
- Hồ sơ người dùng cục bộ / tự lưu trữ.

### Các trạng thái của nút lộ trình

```text
Locked (Khóa)
Not Started (Chưa bắt đầu)
In Progress (Đang học)
Completed (Đã hoàn thành)
```

Trạng thái `Mastered` (Thành thạo) sẽ được giới thiệu sau khi có dữ liệu thực hành.

### Nguyên tắc trải nghiệm người dùng (UX)

Trang chủ cần trả lời được một câu hỏi duy nhất:

> Mình nên học gì tiếp theo?

Nút kêu gọi hành động (CTA) chính:

```text
Continue Learning (Tiếp tục học)
```

### Các chế độ triển khai

MVP cần hỗ trợ ít nhất một trong các chế độ:

```text
Người dùng cục bộ đơn lẻ (Single local user)
hoặc
Hệ thống tự lưu trữ đa người dùng với xác thực cơ bản
```

Không làm chậm tiến độ MVP vì các giải pháp quản lý danh tính phức tạp cấp doanh nghiệp.

### Tiêu chí nghiệm thu hoàn thành giai đoạn

```text
[ ] Tiến độ người dùng được lưu trữ bền vững sau khi khởi động lại.
[ ] Người dùng có thể tiếp tục học ngay bài học gần nhất.
[ ] Lộ trình phản ánh rõ ràng tiến độ học tập bằng trực quan.
[ ] Ứng dụng duy trì đầy đủ tính năng mà không cần tài khoản đám mây LangStride.
```

---

## P3 — MVP Thực hành lập trình (Programming Practice MVP)

### Mục tiêu

Chứng minh LangStride là một nền tảng thực hành, không chỉ là nơi đọc lộ trình học.

### Các dạng bài tập thực hành ban đầu

Chỉ triển khai ba dạng bài tập trước tiên:

```text
1. Trắc nghiệm (Multiple Choice)
2. Đoán kết quả đầu ra (Predict Output)
3. Sửa lỗi mã nguồn (Fix the Code)
```

Tránh xây dựng sandbox thực thi mã nguồn đầy đủ ở giai đoạn này.

### Mô hình bài tập (Challenge Model)

```text
Challenge
├── id
├── type (loại bài tập)
├── concepts (các khái niệm liên kết)
├── language (ngôn ngữ)
├── difficulty (độ khó)
├── instructions (hướng dẫn)
├── starter_content (nội dung khởi đầu)
├── expected_answer / validator (đáp án mong đợi / bộ xác thực)
├── hints (gợi ý)
├── explanation (giải thích)
└── related_lessons (bài học liên quan)
```

### Hành vi bắt buộc

Một bài tập làm sai phải dẫn người học quay lại ôn luyện kiến thức:

```text
Bài tập thất bại
      ↓
Nguyên nhân
      ↓
Ôn tập:
PHP → Interfaces → Thiết kế Hợp đồng (Contract Design)
```

### Mục tiêu nội dung ban đầu

```text
20–30 bài tập thực hành
```

phân bổ đều trên các bài học PHP hoàn chỉnh đầu tiên.

### Tiêu chí nghiệm thu hoàn thành giai đoạn

```text
[ ] Bài tập có thể mở trực tiếp từ bài học.
[ ] Kết quả làm bài được lưu trữ bền vững.
[ ] Lời giải thích hiển thị sau khi nộp bài.
[ ] Lần làm sai dẫn liên kết tới khái niệm liên quan.
[ ] Nội dung bài tập thân thiện với việc đóng góp từ cộng đồng.
```

---

## P4 — Thực hành Gỡ lỗi & Đánh giá Code do AI tạo ra

### Mục tiêu

Thích ứng LangStride với kỷ nguyên AI bằng cách giảng dạy kỹ năng xác minh và năng lực phán đoán kỹ thuật (engineering judgment).

Giai đoạn này chủ ý được đưa vào MVP công khai vì kỹ năng gỡ lỗi và đánh giá mã do AI tạo ra là những kỹ năng cốt lõi của lập trình viên hiện đại.

### Các dạng bài tập gỡ lỗi

```text
Tìm lỗi (Find the bug)
Đọc thông báo lỗi (Read the error)
Đọc vết ngăn xếp (Read the stack trace)
Sửa mã nguồn đang lỗi (Fix failing code)
Nhận diện cách xử lý lỗi kém (Identify bad error handling)
Đánh giá mã khả nghi do AI tạo ra (Review suspicious AI-generated code)
Giải thích nguyên nhân gốc rễ (Explain the root cause)
```

### Ví dụ minh họa

```text
AI đã sinh ra đoạn mã PHP sau đây.

Kết quả kiểm thử:
✓ 12 passed
✕ 2 failed

Nhiệm vụ:
1. Xác định lỗi bug.
2. Sửa lại mã nguồn.
3. Giải thích lý do tại sao cách triển khai ban đầu là không an toàn.
```

### Dữ liệu mẫu hỗ trợ trong MVP

Giữ tính chất tĩnh và tất định:

- Đoạn mã nguồn (code snippets);
- Thông báo lỗi (error messages);
- Vết ngăn xếp (stack traces);
- Kết quả chạy test tĩnh (test output);
- Trích đoạn nhật ký ứng dụng đơn giản (logs).

Chưa yêu cầu terminal chạy lệnh trực tiếp ở giai đoạn này.

### Vòng lặp học tập trong kỷ nguyên AI

```text
Đọc (Read)
 ↓
Hiểu (Understand)
 ↓
Kiểm tra (Inspect)
 ↓
Xác minh (Verify)
 ↓
Sửa lỗi (Fix)
 ↓
Giải thích (Explain)
```

### Nguyên tắc đánh giá

Ưu tiên các bài kiểm tra tất định (deterministic checks).

Không bắt buộc phải có AI để đánh giá xem câu trả lời của người học đúng hay sai.

### Mục tiêu nội dung ban đầu

```text
8–12 bài tập gỡ lỗi / đánh giá mã nguồn
```

### Tiêu chí nghiệm thu hoàn thành giai đoạn

```text
[ ] Bài tập gỡ lỗi sử dụng cùng hệ thống khái niệm với bài học và thực hành.
[ ] Nguyên nhân gốc rễ có thể ghi nhận tách biệt với phương án sửa lỗi cuối cùng.
[ ] Người dùng có thể thực hành đánh giá mã nguồn do AI tạo ra.
[ ] Không đòi hỏi bất kỳ dịch vụ AI bên ngoài nào.
```

---

## P5 — Độ thuần thục, Ôn tập & Bản phát hành MVP Công khai

### Mục tiêu

Khép kín vòng lặp học tập và chuẩn bị sẵn sàng cho việc sử dụng rộng rãi Community Edition trong cộng đồng.

### MVP Đo lường độ thuần thục

Giữ mô hình đầu tiên thật đơn giản.

Các tín hiệu khả dĩ:

```text
Hoàn thành bài học
+
Độ chính xác khi làm bài tập
+
Lịch sử thử lại
+
Kết quả ôn tập gần đây
```

### Các tính năng

- Trạng thái thuần thục khái niệm;
- Danh sách khái niệm còn yếu;
- Hàng đợi ôn tập (review queue);
- Tiến độ theo ngày/tuần đơn giản;
- Chuỗi ngày liên tục tùy chọn (streak);
- Lịch sử làm bài tập;
- Tìm kiếm nội dung;
- Hoàn thiện tài liệu công khai;
- Hướng dẫn tự lưu trữ (self-hosting guide);
- Hướng dẫn mẫu về đóng góp nội dung.

### Các trạng thái thuần thục

```text
Not Started (Chưa bắt đầu)
Learning (Đang học)
Practiced (Đã thực hành)
Needs Review (Cần ôn tập)
Mastered (Thành thạo)
```

Tránh đưa vào cách tính điểm phức tạp trước khi có đủ dữ liệu sử dụng thực tế.

### Tìm kiếm

Hỗ trợ tìm kiếm trên:

- Các khái niệm PHP;
- Các bài học;
- Các bài tập thực hành.

Ban đầu sử dụng tính năng Tìm kiếm Toàn văn của PostgreSQL (PostgreSQL Full Text Search).

### Danh sách kiểm tra phát hành cộng đồng (Release Checklist)

```text
[ ] README phản ánh đúng quy trình cài đặt thực tế.
[ ] File LICENSE hiện diện đầy đủ.
[ ] File CONTRIBUTING.md đầy đủ quy định.
[ ] Có ít nhất một ví dụ thân thiện cho việc đóng góp nội dung.
[ ] Lệnh khởi tạo dữ liệu mẫu / cài đặt được tài liệu hóa.
[ ] Lộ trình công khai vận hành tốt.
[ ] Các bài học hoạt động trơn tru.
[ ] Các bài thực hành hoạt động tốt.
[ ] Bài tập gỡ lỗi / đánh giá code hoạt động tốt.
[ ] Lưu tiến độ hoạt động tin cậy.
[ ] Tìm kiếm hoạt động chính xác.
[ ] Hướng dẫn tự lưu trữ / chạy cục bộ được ghi nhận đầy đủ.
[ ] Không đòi hỏi bất kỳ dịch vụ trả phí nào.
```

### Tiêu chí nghiệm thu hoàn thành giai đoạn

Giai đoạn này kết thúc khi kho mã nguồn trở thành một sản phẩm cộng đồng độc lập, đáng tin cậy.

---

# 5. Hành trình Người dùng trong MVP Công khai (User Journey)

```text
Trang chủ / Tiếp đất
      ↓
Chọn ngôn ngữ PHP
      ↓
Xem Lộ trình hướng dẫn
      ↓
Tiếp tục bài học
      ↓
Kiểm tra nhanh kiến thức
      ↓
Thực hành bài tập
      ↓
Bài tập Gỡ lỗi / Đánh giá code
      ↓
Cập nhật tiến độ
      ↓
Ôn tập khái niệm còn yếu
      ↓
Tiếp tục học
```

Dự án nên tập trung tối ưu hóa hành trình này trước khi mở rộng sang các lĩnh vực mới.

---

# 6. Các trang giao diện trong MVP (MVP Pages)

Giao diện người dùng tối thiểu hữu ích:

```text
/
├── Home / Tiếp tục học
│
├── /php
│   └── Lộ trình PHP
│
├── /php/concepts/:slug
│   └── Bài học chi tiết
│
├── /practice
│   └── Danh sách bài tập thực hành
│
├── /practice/:id
│   └── Giao diện làm bài tập
│
├── /debug
│   └── Danh sách bài tập gỡ lỗi / đánh giá
│
├── /debug/:id
│   └── Giao diện bài tập gỡ lỗi
│
├── /progress
│   └── Xem tiến độ / độ thuần thục
│
└── /search
```

Không nên xây dựng dashboard quá phức tạp trước khi các luồng cơ bản này chạy thông suốt.

---

# 7. Mô hình Đóng góp Nội dung Cộng đồng

Kho mã nguồn xem các đóng góp phi mã nguồn (non-code contributions) là công dân hạng nhất.

### Các dạng đóng góp

```text
Bài học (Lesson)
Khái niệm (Concept)
Sửa lỗi lộ trình (Roadmap correction)
Bài tập thực hành (Practice challenge)
Bài tập gỡ lỗi (Debug challenge)
Hiệu đính kỹ thuật (Technical correction)
Bản dịch (Translation)
Cải thiện tài liệu nguồn / tham khảo
```

### Thuộc tính nội dung khuyến nghị

```text
id (mã định danh)
title (tiêu đề)
slug (đường dẫn thân thiện)
concept_id (mã khái niệm)
language (ngôn ngữ)
difficulty (độ khó)
prerequisites (tiên quyết)
related_concepts (khái niệm liên quan)
status (trạng thái vòng đời)
sources (nguồn tham khảo)
```

### Vòng đời nội dung

```text
Bản nháp (Draft)
 ↓
Thẩm định (Review)
 ↓
Đã xuất bản (Published)
```

Nội dung đi kèm các bản phát hành phải có thể thẩm định trực tiếp qua Git.

---

# 8. Bộ chỉ số đo lường cho MVP Công khai

Không tối ưu hóa cho các chỉ số phù phiếm (vanity metrics).

Các tín hiệu sản phẩm thực sự hữu ích:

### Học tập (Learning)

```text
Bài học đã bắt đầu
Bài học đã hoàn thành
Bài học tiếp theo được bắt đầu
```

### Thực hành (Practice)

```text
Số lượt thử làm bài
Số bài giải quyết thành công
Số lượt thử lại
Số lượt mở phần ôn tập sau khi làm sai
```

### Giữ chân người học (Retention)

```text
Người học quay trở lại
Người học tiếp tục theo lộ trình
Người học ôn lại khái niệm yếu
```

### Cộng đồng (Community)

```text
Số lượt Star kho mã nguồn
Số lượt Fork
Số lượng Issue
Số lượng Pull Request
Số người đóng góp nội dung
Số người đóng góp bài tập
```

Tín hiệu sớm mạnh mẽ nhất là:

> Người học hoàn thành một hoạt động học tập và quay trở lại để tiếp tục học.

---

# 9. Rào chắn kiến trúc (Architecture Guardrails)

Bản MVP công khai tuyệt đối không được yêu cầu:

```text
✕ Microservices
✕ Kubernetes
✕ Kafka
✕ Redis trừ khi được chứng minh là bắt buộc
✕ Elasticsearch
✕ Cơ sở dữ liệu vector chuyên dụng
✕ Phụ thuộc vào AI tại thời điểm chạy (runtime)
✕ Thực thi mã nguồn từ xa
✕ Backend đóng riêng tư
✕ Đám mây LangStride Cloud
```

Nguyên tắc cốt lõi được khuyến nghị:

> Sử dụng nội dung có cấu trúc và các hành vi tất định trước tiên.

---

# 10. Định nghĩa Hoàn thành MVP Công khai (Definition of Done)

Bản MVP công khai được coi là hoàn thành khi một người dùng mới có thể:

```text
1. Khám phá kho mã nguồn.
2. Clone về máy.
3. Chạy ứng dụng từ các bước được ghi trong tài liệu.
4. Mở lộ trình PHP.
5. Hoàn thành các bài học.
6. Giải quyết các bài tập thực hành.
7. Giải quyết các bài tập gỡ lỗi / đánh giá mã nguồn.
8. Xem tiến độ đã được lưu lại.
9. Tìm kiếm nội dung học tập.
10. Tự lưu trữ ứng dụng cho mục đích phi thương mại.
```

Và một người đóng góp có thể:

```text
1. Hiểu được cấu trúc kho mã nguồn.
2. Thêm hoặc cải thiện một bài học.
3. Thêm một bài tập thực hành.
4. Chạy kiểm thử / xác thực hợp lệ.
5. Gửi một Pull Request thành công.
```

---

# 11. Các kế hoạch sau khi hoàn thành MVP Công khai

Những mục này **không nằm trong cam kết của bản MVP công khai**.

Các cột mốc cộng đồng / công khai tiếp theo có thể bao gồm:

```text
Lộ trình học ngôn ngữ Go
So sánh phiên bản (Version Diff)
So sánh khác biệt giữa PHP và Go (PHP → Go Lang Diff)
Kiến thức nền tảng DevOps
Kiến thức nền tảng Thiết kế Hệ thống (System Design)
Môi trường Sandbox tương tác trực tiếp
```

Các sản phẩm thương mại hoặc lưu trữ đám mây trong tương lai có thể được phát triển dựa trên Community Edition, nhưng chúng nên được lên kế hoạch riêng biệt sau khi kho mã nguồn công khai đạt được mức độ trưởng thành hữu ích.

---

# 12. Thứ tự triển khai khuyến nghị

```text
P0 Nền tảng kho mã nguồn
        ↓
P1 Tri thức PHP & Lộ trình học
        ↓
P2 Tiến độ học tập cục bộ
        ↓
P3 Thực hành lập trình
        ↓
P4 Gỡ lỗi / Đánh giá mã do AI tạo ra
        ↓
P5 Độ thuần thục + Tìm kiếm + Bản phát hành công khai
```

Không bắt đầu xây dựng dịch vụ SaaS cho đến khi kho mã nguồn công khai hoàn thành vòng lặp này ở mức độ ổn định.
