# LangStride

> **Ngôn ngữ**: [English](README.md) | Tiếng Việt

> Nền tảng học tập và thực hành lập trình hướng cộng đồng (community-first).

LangStride Community Edition là kho mã nguồn công khai của LangStride. Dự án hướng tới mục đích học tập cá nhân, giáo dục, nghiên cứu, đóng góp cộng đồng và tự lưu trữ phi thương mại (non-commercial self-hosting).

Kho mã nguồn này được thiết kế để tự thân nó đã là một sản phẩm hoàn chỉnh và hữu ích. Bất kỳ lập trình viên nào cũng có thể clone về máy, chạy cục bộ, học theo các lộ trình có cấu trúc, làm bài tập thực hành và đóng góp cải tiến mà không cần phụ thuộc vào bất kỳ dịch vụ thương mại nào của LangStride.

> Trạng thái: Đang trong giai đoạn phát triển ban đầu / Phiên bản Cộng đồng (Community Edition)  
> Tài liệu chi tiết: [Trung tâm tài liệu](docs/README.md) | [Tài liệu Tiếng Việt](docs/vi/README.md) | [Tài liệu Tiếng Anh](docs/en/README.md)

## Vấn đề LangStride đang giải quyết

Quá trình học tập của lập trình viên hiện nay thường bị phân mảnh:

- Các lộ trình (roadmaps) chỉ bảo bạn cần học cái gì;
- Tài liệu kỹ thuật (documentation) chỉ giải thích các chủ đề một cách cô lập;
- Các nền tảng luyện code chỉ cung cấp bài tập thuật toán rời rạc;
- Tài liệu phỏng vấn tập trung vào việc học vẹt, ghi nhớ đáp án;
- Hướng dẫn nâng cấp phiên bản chỉ tập trung vào khác biệt giữa các version thay vì chuyển giao kiến thức nền tảng.

LangStride kết nối tất cả những mảnh ghép này vào một vòng lặp học tập duy nhất:

```text
Lập trình (Programming)
    ↓
Thử thách thực hành (Practice Challenges)
    ↓
Gỡ lỗi (Debugging)
    ↓
So sánh phiên bản (Version Diff)
    ↓
So sánh ngôn ngữ (Lang Diff)
```

Các nhánh song song trong tương lai sẽ bao gồm:

- DevOps
- Thiết kế hệ thống tương tác (Interactive System Design)
- Kỹ năng gỡ lỗi (Debugging)
- Kiến thức nền tảng cho lập trình viên (Developer fundamentals)

Xem đặc tả chi tiết tại: [Mô hình tri thức và nội dung](docs/vi/fr/knowledge-model.md).

---

## Nguyên tắc cốt lõi

### Học tập có định hướng (Guided learning)

Người học phải luôn luôn biết mình nên học gì tiếp theo.

Lộ trình học là một con đường dẫn dắt, không chỉ đơn thuần là một danh sách các đường link.

### Học đi đôi với hành (Learn by doing)

```text
Học lý thuyết (Learn)
  ↓
Kiểm tra nhanh (Quick Check)
  ↓
Thử thách thực hành (Challenge)
  ↓
Xem lại lỗi sai (Review)
  ↓
Thử lại (Retry)
  ↓
Thành thạo (Master)
```

### Bài học ngắn gọn, tập trung (Short, focused lessons)

Một bài học tiêu chuẩn phải đủ ngắn gọn để hoàn thành trong một phiên học tập trung:

```text
Khái niệm (Concept)
↓
Vì sao điều này quan trọng (Why it matters)
↓
Mô hình tư duy trực quan (Visual explanation)
↓
Ví dụ mã nguồn (Code example)
↓
Các lỗi thường gặp (Common mistakes)
↓
Kiểm tra nhanh (Quick check)
↓
Thực hành (Practice)
```

Xem đặc tả: [Bài học (FR-LESSON)](docs/vi/fr/lessons.md).

### Tri thức có thể tái sử dụng (Reusable knowledge)

Các khái niệm kỹ thuật không nên bị khóa chặt vào một ngôn ngữ lập trình duy nhất.

```text
              Interface (Giao diện)
                        │
          ┌─────────────┴─────────────┐
          ▼                           ▼
   PHP Interface                 Go Interface
```

Cách thiết kế này cho phép cùng một mô hình tri thức có thể hỗ trợ cả việc học tập, làm bài thực hành, so sánh phiên bản (Version Diff) và so sánh ngôn ngữ (Lang Diff).

Xem đặc tả: [Mô hình tri thức (FR-KNOW)](docs/vi/fr/knowledge-model.md).

### Tri thức kỹ thuật do cộng đồng duy trì

Nội dung kỹ thuật cần được quản lý phiên bản (version-controlled), có thể thẩm định trực tiếp bởi con người (reviewable) và trích dẫn nguồn uy tín khi thích hợp.

AI có thể hỗ trợ các quy trình trong tương lai, nhưng việc học tập và kiểm thử xác thực tất định (deterministic) không được phép phụ thuộc vào tính đúng sai ngẫu nhiên của AI.

---

# Định hướng sản phẩm

Tiến trình phát triển sản phẩm công khai chính là:

```text
Lập trình (Programming)
    ↓
Thử thách thực hành (Practice Challenges)
    ↓
So sánh phiên bản (Version Diff)
    ↓
So sánh ngôn ngữ (Lang Diff)
```

Các mảng Gỡ lỗi (Debugging), DevOps và Thiết kế hệ thống (System Design) sẽ tái sử dụng chung cùng một mô hình học tập và thực hành này.

## Lập trình (Programming)

Các nhánh ngôn ngữ ban đầu:

- PHP
- Go

Cột mốc triển khai đầu tiên tập trung hoàn toàn vào PHP.

Ví dụ lộ trình PHP:

```text
Kiến thức cơ bản (Fundamentals)
→ Kiểu dữ liệu (Types)
→ Điều khiển luồng (Control Flow)
→ Hàm (Functions)
→ Mảng (Arrays)
→ Lập trình hướng đối tượng (OOP)
→ Interfaces / Traits
→ Xử lý lỗi & Ngoại lệ (Error Handling)
→ Composer
→ Kiểm thử (Testing)
→ HTTP
→ Cơ sở dữ liệu (Database)
→ Runtime
```

Ví dụ lộ trình Go:

```text
Kiến thức cơ bản (Fundamentals)
→ Kiểu dữ liệu (Types)
→ Hàm (Functions)
→ Structs
→ Methods
→ Interfaces
→ Errors
→ Con trỏ (Pointers)
→ Slices / Maps
→ Goroutines
→ Channels
→ Context
→ Testing
→ Modules
→ HTTP
```

Các đặc tả liên quan:
- [Lộ trình học PHP (FR-PHP)](docs/vi/fr/php-roadmap.md)
- [Đặc tả bài học (FR-LESSON)](docs/vi/fr/lessons.md)

## Thử thách thực hành (Practice Challenges)

Các định dạng bài tập thực hành được lên kế hoạch:

- Trắc nghiệm (multiple choice);
- Đoán kết quả đầu ra (predict the output);
- Điền mã nguồn (fill in the code);
- Sửa lỗi (bug fixing);
- Bài tập lập trình quy mô nhỏ (small implementation tasks);
- Tái cấu trúc mã nguồn (refactoring);
- Các câu hỏi phỏng vấn tư duy kỹ thuật.

Một bài tập làm sai phải dẫn người học quay lại chính xác khái niệm họ cần ôn tập.

Các đặc tả liên quan:
- [Engine thực hành dùng chung (FR-PRAC)](docs/vi/fr/practice-engine.md)
- [Thực hành trắc nghiệm (FR-MCQ)](docs/vi/fr/practice-multiple-choice.md)
- [Thực hành đoán kết quả (FR-OUTPUT)](docs/vi/fr/practice-predict-output.md)
- [Thực hành sửa mã nguồn (FR-FIX)](docs/vi/fr/practice-fix-the-code.md)

## Kỹ năng gỡ lỗi (Debugging)

Gỡ lỗi được coi là một kỹ năng cốt lõi của lập trình viên.

```text
Thông báo lỗi (Error Messages)
→ Vết ngăn xếp (Stack Traces)
→ Nhật ký (Logs)
→ Tái hiện lỗi (Reproducing Bugs)
→ Đặt giả thuyết (Hypothesis Building)
→ Phân tích nguyên nhân gốc rễ (Root Cause Analysis)
→ Gỡ lỗi hiệu năng (Performance Debugging)
→ Gỡ lỗi môi trường thực tế (Production Debugging)
```

Các kịch bản gỡ lỗi có thể bao gồm file mã nguồn, log, stack trace, vết truy vết HTTP, log cơ sở dữ liệu và số liệu metrics.

Các đặc tả liên quan:
- [Thực hành gỡ lỗi (FR-DEBUG)](docs/vi/fr/debugging-practice.md)
- [Đánh giá mã do AI tạo ra (FR-AIREVIEW)](docs/vi/fr/ai-generated-code-review.md)

## DevOps

Nhánh DevOps dành cho các lập trình viên ứng dụng muốn hiểu rõ cách phần mềm được build, triển khai, vận hành và debug trong môi trường thực tế.

```text
Linux / Shell / Git
        ↓
Networking / HTTP / DNS
        ↓
Docker / Docker Compose
        ↓
Reverse Proxy / TLS
        ↓
CI/CD
        ↓
Logging / Metrics / Tracing
        ↓
Điện toán đám mây cơ bản (Cloud Fundamentals)
        ↓
Hạ tầng (Infrastructure)
        ↓
Kubernetes / IaC
```

## Thiết kế hệ thống tương tác (Interactive System Design)

Thiết kế hệ thống cần được thực hành một cách trực quan:

```text
Học lý thuyết (Learn)
→ Xây dựng (Build)
→ Xác thực (Validate)
→ Đánh hỏng (Break)
→ Cải tiến (Improve)
```

Ý tưởng cho các thử thách ban đầu:

- Hệ thống rút gọn URL (URL Shortener)
- Hệ thống giới hạn tần suất gọi API (Rate Limiter)
- Hệ thống gửi thông báo (Notification System)

Các sơ đồ kiến trúc sẽ được lưu trữ dưới dạng đồ thị ngữ nghĩa (semantic graphs) thay vì chỉ lưu file ảnh chụp màn hình đơn thuần.

## So sánh phiên bản (Version Diff)

Version Diff giải thích các thay đổi quan trọng giữa các phiên bản của cùng một ngôn ngữ.

```text
PHP 7.4
   ↓
PHP 8.0
   ↓
PHP 8.1
```

Các danh mục thay đổi:

- Tính năng mới (new feature);
- Thay đổi gây phá vỡ tính tương thích (breaking change);
- Khuyên không dùng nữa (deprecated);
- Đã bị loại bỏ (removed);
- Cú pháp (syntax);
- Runtime;
- Thư viện tiêu chuẩn (standard library);
- Hiệu năng (performance);
- Bảo mật (security);
- Bộ công cụ (tooling).

Các bước chuyển đổi nguyên tử (atomic transitions) sẽ được lưu trữ độc lập và kết hợp linh hoạt khi cần.

## So sánh ngôn ngữ (Lang Diff)

Bước chuyển đổi đầu tiên được lên kế hoạch là:

```text
PHP → Go
```

Lang Diff không nhằm mục đích trở thành một công cụ chuyển đổi cú pháp tự động (syntax converter).

Nó giải thích:

1. Khác biệt về khái niệm (Concept Diff)
2. Khác biệt về cú pháp (Syntax Diff)
3. Khác biệt về phong cách đặc trưng (Idiom Diff)
4. Khác biệt về kiến trúc / Runtime (Runtime / Architecture Diff)

Ví dụ:

```text
Lập trình viên PHP
      │
      ▼
Kiến thức chuyển giao được
✓ HTTP
✓ SQL
✓ APIs
✓ Functions

Học theo cách tiếp cận mới
→ Interfaces
→ Xử lý lỗi (Error handling)
→ Thiết kế gói (Package design)

Mô hình tư duy mới hoàn toàn
→ Con trỏ (Pointers)
→ Goroutines
→ Channels
→ Context
```

Mục tiêu là giúp các lập trình viên học ngôn ngữ mới một cách chuẩn phong cách (idiomatic) thay vì chỉ dịch máy móc mã nguồn.

---

# Phiên bản Cộng đồng (Community Edition)

Kho mã nguồn này là bản LangStride Community Edition.

Luồng làm việc dự kiến là:

```text
git clone
   ↓
chạy cục bộ (run locally)
   ↓
học tập (learn)
   ↓
thực hành (practice)
   ↓
theo dõi tiến độ (track progress)
   ↓
đóng góp (contribute)
```

Trong quá trình phát triển, kho mã nguồn công khai có thể bao gồm:

- Các lộ trình học tập;
- Các bài học;
- Thử thách lập trình;
- Thử thách gỡ lỗi;
- Nội dung và phòng lab DevOps;
- Kiến thức nền tảng về Thiết kế Hệ thống;
- Dữ liệu Version Diff;
- Dữ liệu Lang Diff;
- Theo dõi tiến độ học tập cơ bản;
- Tìm kiếm cơ bản;
- Công cụ hỗ trợ đóng góp.

Các tính năng của bất kỳ sản phẩm thương mại hoặc dịch vụ đám mây riêng biệt nào đều nằm ngoài phạm vi của kho mã nguồn này.

Các đặc tả liên quan:
- [Tiến độ học tập (FR-PROGRESS)](docs/vi/fr/learning-progress.md)
- [Trang chủ & Tiếp tục học (FR-HOME)](docs/vi/fr/home-continue-learning.md)
- [Độ thuần thục và Ôn tập (FR-MAST)](docs/vi/fr/mastery-and-review.md)
- [Tìm kiếm (FR-SEARCH)](docs/vi/fr/search.md)

---

# Đóng góp cộng đồng (Community contributions)

LangStride được thiết kế để đón nhận nhiều hình thức đóng góp hơn là chỉ đóng góp mã nguồn (code).

Các vai trò người đóng góp:

```text
Người đóng góp mã nguồn (Code Contributor)
Người đóng góp nội dung (Content Contributor)
Người duy trì lộ trình (Roadmap Maintainer)
Tác giả đề bài thực hành (Challenge Author)
Người thẩm định kỹ thuật (Technical Reviewer)
Dịch giả (Translator)
```

Các đóng góp hữu ích bao gồm:

- Chỉnh sửa các giải thích kỹ thuật cho chuẩn xác hơn;
- Bổ sung ví dụ mã nguồn minh họa;
- Đề xuất thay đổi hoặc cải tiến lộ trình học;
- Thêm mới các khái niệm;
- Soạn thảo các thử thách thực hành;
- Xây dựng các kịch bản gỡ lỗi (debugging scenarios);
- Ghi chép tài liệu về thay đổi phiên bản;
- Thẩm định ánh xạ giữa PHP → Go;
- Nâng cao tính trợ năng (accessibility) và giao diện UI;
- Đóng góp các bản dịch đa ngôn ngữ;
- Cải thiện kiểm thử (tests) và công cụ tự động hóa.

Các đặc tả liên quan:
- [Đóng góp nội dung (FR-CONT)](docs/vi/fr/content-contribution.md)
- [Vận hành nội dung (FR-ADMIN)](docs/vi/fr/content-operations.md)
- Quy tắc chi tiết sẽ được quy định trong `CONTRIBUTING.md`.

---

# Cấu trúc kho mã nguồn dự kiến

```text
langstride/
│
├── apps/
│   └── web/
│
├── packages/
│   ├── learning/
│   ├── practice/
│   ├── diff/
│   └── ui/
│
├── content/
│   ├── programming/
│   │   ├── php/
│   │   └── go/
│   ├── debugging/
│   ├── devops/
│   └── system-design/
│
├── challenges/
├── roadmaps/
├── supabase/
├── docs/
│   ├── README.md               # Trung tâm tài liệu đa ngôn ngữ
│   ├── en/                     # Tài liệu tiếng Anh
│   │   ├── roadmap.md
│   │   ├── fr-map.md
│   │   └── fr/
│   └── vi/                     # Tài liệu tiếng Việt
│       ├── roadmap.md
│       ├── fr-map.md
│       └── fr/
├── README.md                   # README tiếng Anh chính
└── README.vi.md                # README tiếng Việt
```

Cấu trúc này có thể phát triển thêm khi quá trình triển khai mã nguồn hoàn thiện hơn.

Đặc tả liên quan:
- [Nền tảng kho mã nguồn (FR-REPO)](docs/vi/fr/repository-foundation.md)

---

# Định hướng kỹ thuật

| Lĩnh vực | Công nghệ lựa chọn |
|---|---|
| Ngôn ngữ chính | TypeScript |
| Giao diện Web | Next.js / React |
| Định kiểu (Styling) | Tailwind CSS |
| Cơ sở dữ liệu | PostgreSQL / Supabase |
| Xác thực (Auth) | Supabase Auth |
| Tìm kiếm | PostgreSQL Full Text Search |
| CI/CD | GitHub Actions |
| Kiến trúc | Khối mô-đun hóa (Modular monolith) |
| Bảng vẽ Thiết kế Hệ thống | tldraw (dự kiến) |

Giai đoạn đầu cần tránh các hạ tầng không cần thiết như Kubernetes, Kafka, Elasticsearch, cơ sở dữ liệu vector chuyên dụng hoặc kiến trúc microservices.

Đặc tả liên quan:
- [Thuộc tính chất lượng & Yêu cầu phi chức năng (NFR)](docs/vi/fr/quality-attributes.md)

---

# Lộ trình phát triển sản phẩm (Development Roadmap)

| Giai đoạn | Phạm vi công việc |
|---|---|
| P0 | Nền tảng kho mã nguồn & Cộng đồng |
| P1 | Lộ trình học lập trình PHP & Mô hình tri thức |
| P2 | Thử thách thực hành lập trình |
| P3 | Vòng lặp học tập & Độ thuần thục |
| P4 | Kiến thức gỡ lỗi nền tảng & Thử thách gỡ lỗi |
| P5 | Kiến thức DevOps nền tảng & Phòng Lab |
| P6 | Thiết kế hệ thống tương tác |
| P7 | So sánh phiên bản (Version Diff) |
| P8 | So sánh ngôn ngữ PHP → Go (Lang Diff) |
| P9 | Thực hành chéo ngôn ngữ |
| P10 | Sandbox tương tác trực tiếp |
| P11 | MCP / Agent / Bộ công cụ di chuyển mã nguồn |

Tài liệu lập kế hoạch chi tiết và đặc tả yêu cầu:

- 🇬🇧 **[Lộ trình MVP Tiếng Anh](docs/en/roadmap.md)** | 🇻🇳 **[Lộ trình MVP Tiếng Việt](docs/vi/roadmap.md)**
- 🇬🇧 **[Bản đồ FR Tiếng Anh](docs/en/fr-map.md)** | 🇻🇳 **[Bản đồ FR Tiếng Việt](docs/vi/fr-map.md)**
- 📚 **[Trung tâm tài liệu](docs/README.md)**

---

# Bắt đầu sử dụng (Getting Started)

Kho mã nguồn vẫn đang được khởi tạo, do đó các lệnh thực thi có thể thay đổi:

```bash
git clone <LANGSTRIDE_REPOSITORY_URL>
cd langstride
pnpm install
cp .env.example .env.local
pnpm dev
```

Quy trình tự lưu trữ dựa trên Docker có thể được bổ sung khi Community Edition hoàn thiện hơn.

Các đặc tả liên quan:
- [Cài đặt cục bộ (FR-REPO-007)](docs/vi/fr/repository-foundation.md)
- [Tự lưu trữ (FR-HOST)](docs/vi/fr/self-hosting.md)

---

# Tự lưu trữ (Self-Hosting)

Tự lưu trữ phi thương mại là mục đích sử dụng chủ đạo của LangStride Community Edition.

Ví dụ:

- Học tập cá nhân;
- Các nhóm học tập miễn phí;
- Giảng dạy trong trường lớp;
- Nghiên cứu khoa học;
- Các dự án sở thích;
- Các cụm máy chủ cộng đồng miễn phí.

Mọi hình thức sử dụng đều phải tuân thủ giấy phép của kho mã nguồn.

Đặc tả liên quan:
- [Đặc tả Tự lưu trữ (FR-HOST)](docs/vi/fr/self-hosting.md)

---

# Giấy phép (License)

Trừ khi một file hoặc thư mục có tuyên bố khác, kho mã nguồn này được cấp phép theo giấy phép **PolyForm Noncommercial License 1.0.0**.

Về mặt thực tế, các mục đích sử dụng phi thương mại được phép bao gồm:

```text
✓ xem mã nguồn
✓ clone kho mã nguồn về máy
✓ nghiên cứu cách triển khai
✓ chỉnh sửa dự án
✓ tạo bản fork
✓ học tập cá nhân
✓ nghiên cứu và giáo dục
✓ tái phân phối trong phạm vi cho phép
✓ tự lưu trữ thực sự phi thương mại
```

Giấy phép này không cấp quyền cho các mục đích thương mại.

Văn bản pháp lý tại [`LICENSE.md`](LICENSE.md) sẽ là văn bản kiểm soát có giá trị tối cao nếu bản tóm tắt này có điểm khác biệt.

Do đó, LangStride Community Edition là dự án **mã nguồn khả dụng cho mục đích phi thương mại (source-available for non-commercial use)** và không được miêu tả là mã nguồn mở được chuẩn hóa bởi OSI (OSI-approved open source).

---

# Ưu tiên trước mắt

Cột mốc sản phẩm trước mắt được thu hẹp có chủ đích:

```text
Lộ trình PHP
     ↓
Bài học ngắn
     ↓
Bài tập thực hành
     ↓
Tiến độ / Độ thuần thục
```

Dự án cần chứng minh được sự hiệu quả của vòng lặp học tập này trước khi mở rộng ra tất cả các lĩnh vực được lên kế hoạch.

---

# Triết lý dự án

LangStride giúp lập trình viên trả lời các câu hỏi:

```text
Mình nên học gì tiếp theo?
        ↓
Mình đã thực sự hiểu nó chưa?
        ↓
Mình có thể áp dụng nó vào thực tế không?
        ↓
Mình có thể tự gỡ lỗi nó không?
        ↓
Có những thay đổi gì giữa các phiên bản?
        ↓
Làm thế nào để chuyển giao kiến thức này sang một ngôn ngữ khác?
```

Kho mã nguồn công khai tồn tại để biến những kiến thức đó trở nên hữu ích, có thể đánh giá, tái sử dụng và ngày càng được cải thiện bởi cộng đồng lập trình viên.
