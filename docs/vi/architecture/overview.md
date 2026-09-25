# Tổng quan Kiến trúc Kỹ thuật LangStride

> **Ngôn ngữ**: [English](../../en/architecture/overview.md) | Tiếng Việt

- **Trạng thái**: Đang đặc tả (In Specification)
- **Cập nhật lần cuối**: 2026-09-25
- **Phạm vi**: Kiến trúc Kỹ thuật Public MVP
- **Thẩm quyền**: Đặc tả Kiến trúc (Bản dịch tham khảo)

Tài liệu này mô tả **CÁCH THỨC (HOW)** LangStride Community Edition được xây dựng về mặt kỹ thuật.

## 1. Phong cách Kiến trúc: Khối mô-đun hóa (Modular Monolith)

LangStride sử dụng kiến trúc khối mô-đun hóa ([ADR-0001](../adr/ADR-0001-modular-monolith.md)). Toàn bộ các package nghiệp vụ nằm trong cùng một kho mã nguồn và đóng gói thành một ứng dụng web duy nhất.

```text
langstride/
├── apps/
│   └── web/                # Ứng dụng web Next.js (pages, routing, layout)
├── packages/
│   ├── learning/           # Nghiệp vụ học tập: khái niệm, lộ trình, bài học
│   ├── practice/           # Nghiệp vụ thực hành: bộ chấm điểm & validator
│   ├── content/            # Bộ phân tích nội dung & nạp seed/sync
│   └── ui/                 # Thư viện component UI dùng chung
├── content/                # File bài học Markdown quản lý bằng Git
├── challenges/             # File định nghĩa bài tập quản lý bằng Git
├── roadmaps/               # File định nghĩa lộ trình JSON quản lý bằng Git
└── supabase/               # Script migration PostgreSQL và dữ liệu seed
```

## 2. Công nghệ lựa chọn

- **Ngôn ngữ chính**: TypeScript ([ADR-0002](../adr/ADR-0002-typescript-primary-language.md)).
- **Tầng giao diện web**: Next.js / React và Tailwind CSS.
- **Tầng dữ liệu**: PostgreSQL thông qua Supabase ([ADR-0003](../adr/ADR-0003-postgresql-supabase-data-layer.md)).
- **Tìm kiếm**: Tìm kiếm toàn văn PostgreSQL Full Text Search (tsvector / tsquery).
- **Engine thực thi**: Chấm điểm tất định trong tiến trình ([ADR-0006](../adr/ADR-0006-deterministic-validation-before-ai.md)).

## 3. Vòng đời Nội dung Giáo dục

Nội dung giáo dục được biên soạn dưới dạng file Git ([ADR-0004](../adr/ADR-0004-content-stored-as-structured-repository-data.md)):

```text
Markdown / JSON trong Git
          ↓
CI kiểm tra cấu trúc tự động
          ↓
Bộ nạp Seed / Sync (packages/content)
          ↓
Các bảng quan hệ PostgreSQL
          ↓
Hiển thị giao diện & Tạo chỉ mục tìm kiếm
```

## 4. Engine Thực hành & Chấm điểm

Phiên bản MVP loại bỏ hoàn toàn các sandbox đám mây phức tạp:
- Trắc nghiệm: So khớp đáp án được chọn với tập đáp án đúng.
- Đoán kết quả: Chuẩn hóa chuỗi người học nộp và so khớp với chuỗi mong đợi.
- Sửa code: Đánh giá phương án sửa được chọn hoặc chuỗi code thay thế chuẩn xác.
- Bài tập gỡ lỗi: Đánh giá nguyên nhân gốc rễ và giải pháp sửa lỗi tách biệt.

Quy trình chấm điểm **không phụ thuộc vào bất kỳ API AI bên ngoài nào** ([ADR-0006](../adr/ADR-0006-deterministic-validation-before-ai.md)).
