# Hướng dẫn Phát triển Cục bộ (Local Development Guide)

> **Ngôn ngữ**: [English](../../en/development/local-setup.md) | Tiếng Việt

- **Trạng thái**: Hướng dẫn Hoạt động (Active Guide)
- **Cập nhật lần cuối**: 2026-10-01
- **Phạm vi**: Cài đặt cục bộ, các chế độ thực thi, lệnh phát triển và xử lý sự cố
- **Thẩm quyền**: Hướng dẫn Phát triển & Vận hành (Bản dịch tham khảo)

Tài liệu này cung cấp hướng dẫn chi tiết từng bước để cài đặt, chạy, kiểm thử và phát triển **LangStride Community Edition** trực tiếp trên máy tính cá nhân của bạn.

---

## 1. Yêu cầu Hệ thống & Tiên quyết (Prerequisites)

| Yêu cầu | Phiên bản Hỗ trợ | Ghi chú |
|---|---|---|
| **Hệ điều hành** | macOS, Linux (Ubuntu/Debian/Fedora), Windows (khuyến nghị dùng WSL2) | Đã kiểm thử trên Linux & WSL2 |
| **Node.js** | `>= 22.0.0` (đã kiểm thử với v22.x & v26.x) | Xem [.nvmrc](../../../.nvmrc) |
| **pnpm** | `>= 9.0.0` (khuyến nghị `12.6.0`) | Trình quản lý package chính |
| **Docker** | Docker Desktop hoặc Docker Engine | **Không bắt buộc**: Chỉ cần khi chạy chế độ Database |
| **Git** | `>= 2.30.0` | Để clone và quản lý mã nguồn |

> [!TIP]
> Nếu bạn sử dụng công cụ quản lý phiên bản Node như `nvm` hoặc `fnm`, hãy chạy `nvm use` hoặc `fnm use` tại thư mục gốc để tự động chọn đúng phiên bản Node được hỗ trợ.

---

## 2. Lựa chọn Chế độ Thực thi Cục bộ (Local Execution Modes)

LangStride được thiết kế với kiến trúc độc lập, hoàn toàn có thể hoạt động mà **không cần kết nối dịch vụ SaaS đám mây hay API AI bên ngoài** ([ADR-0006](../../en/adr/ADR-0006-deterministic-validation-before-ai.md), [ADR-0007](../../en/adr/ADR-0007-community-edition-must-not-depend-on-saas.md)). Bạn có thể chạy ứng dụng theo 1 trong 2 chế độ sau:

```text
┌────────────────────────────────────────────────────────────────────────┐
│             Lựa chọn A: Chế độ Siêu tốc Không cần Docker               │
│   (Nhẹ nhất, không cần Docker, đọc trực tiếp file Markdown/JSON Git)   │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│               Lựa chọn B: Chế độ Đầy đủ với Database                   │
│ (PostgreSQL/Supabase container cục bộ, đồng bộ dữ liệu qua read-model) │
└────────────────────────────────────────────────────────────────────────┘
```

### Lựa chọn A: Chế độ Siêu tốc / Không cần Docker (Khuyến nghị cho Người học & Tác giả Nội dung)
- **Đối tượng phù hợp**: Người học, người viết bài học, người đóng góp tài liệu, hoặc máy chưa cài Docker.
- **Cơ chế hoạt động**: Ứng dụng Next.js đọc trực tiếp từ các file Markdown (`content/programming/php/lessons/*.md`) và file JSON (`roadmaps/php.json`, `content/knowledge/concepts.json`) được quản lý phiên bản trong Git.
- **Ưu điểm**: Khởi động tức thì trong vài giây, không tốn RAM chạy container, chỉnh sửa bài học hiển thị ngay khi tải lại trang web.

### Lựa chọn B: Chế độ Đầy đủ với Database (Khuyến nghị cho Lập trình viên Full-Stack)
- **Đối tượng phù hợp**: Lập trình viên làm việc với cơ sở dữ liệu, viết migration, hoặc phát triển công cụ đồng bộ dữ liệu (`@langstride/content`).
- **Cơ chế hoạt động**: Sử dụng cụm container Supabase cục bộ (PostgreSQL, Studio UI). Dữ liệu từ Markdown/JSON được đồng bộ vào các bảng PostgreSQL qua lệnh `pnpm content:sync`.
- **Ưu điểm**: Mô phỏng chuẩn xác kiến trúc đọc (read-model) tương tự môi trường triển khai thực tế.

---

## 3. Khởi động Nhanh: Lựa chọn A (Không cần Docker / Chế độ File)

Khởi chạy nhanh ứng dụng mà không cần bật bất kỳ container Docker nào:

```bash
# 1. Clone repository về máy
git clone https://github.com/fat2fast/LangStride.git
cd langstride

# 2. Cài đặt các thư viện phụ thuộc
pnpm install

# 3. Tạo file cấu hình môi trường cục bộ
cp .env.example .env.local

# 4. Thiết lập biến USE_DB_READ_MODEL=false
# Bạn có thể mở .env.local trong trình soạn thảo để sửa:
#   USE_DB_READ_MODEL=false
#
# Hoặc chạy lệnh dòng lệnh tương ứng với hệ điều hành:
# Linux:
sed -i 's/USE_DB_READ_MODEL=true/USE_DB_READ_MODEL=false/' .env.local
# macOS:
sed -i '' 's/USE_DB_READ_MODEL=true/USE_DB_READ_MODEL=false/' .env.local
# Windows (PowerShell):
(Get-Content .env.local) -replace 'USE_DB_READ_MODEL=true', 'USE_DB_READ_MODEL=false' | Set-Content .env.local

# 5. Khởi chạy ứng dụng web phát triển
pnpm dev
```

Mở trình duyệt truy cập [http://localhost:3000](http://localhost:3000). Vào thẳng lộ trình PHP tại [http://localhost:3000/php](http://localhost:3000/php) để trải nghiệm các bài học.

---

## 4. Thiết lập Đầy đủ: Lựa chọn B (Chế độ Database Cục bộ)

Để chạy toàn bộ hệ thống gồm cả PostgreSQL và giao diện Supabase Studio cục bộ:

### Bước 1: Đảm bảo Docker đang chạy
Kiểm tra xem Docker daemon đã hoạt động chưa:
```bash
docker info
```

### Bước 2: Cấu hình biến môi trường
```bash
cp .env.example .env.local
```
File mẫu `.env.example` đã cấu hình sẵn giá trị mặc định cho Supabase cục bộ với `USE_DB_READ_MODEL=true`.

### Bước 3: Khởi động container Supabase cục bộ
```bash
pnpm local:setup
```
Lệnh này sẽ khởi động cụm container Supabase và tự động áp dụng toàn bộ các bản migration mới nhất (`supabase/migrations/*.sql`).

### Bước 4: Kiểm tra và Đồng bộ Nội dung vào Database
Trước khi chạy ứng dụng web, kiểm tra tính hợp lệ của bài học và đồng bộ vào bảng PostgreSQL:
```bash
pnpm content:validate
pnpm content:sync
```

### Bước 5: Bật ứng dụng web phát triển
```bash
pnpm dev
```
Mở trình duyệt tại [http://localhost:3000](http://localhost:3000).

---

## 5. Danh mục Dịch vụ & Cổng Mạng Cục bộ (Port Reference)

Khi chạy ở **Chế độ Đầy đủ với Database**, các dịch vụ sau sẽ được mở:

| Dịch vụ | URL / Cổng Cục bộ | Mô tả Chi tiết |
|---|---|---|
| **Ứng dụng Web Next.js** | `http://localhost:3000` | Giao diện học tập và lộ trình người dùng |
| **Supabase Studio** | `http://127.0.0.1:54323` | Giao diện web quản lý, xem dữ liệu bảng PostgreSQL |
| **PostgreSQL Database** | `postgresql://postgres:postgres@127.0.0.1:54322/postgres` | Chuỗi kết nối trực tiếp vào PostgreSQL |
| **Kong API Gateway** | `http://127.0.0.1:54321` | Cổng API cho REST / xác thực cục bộ |
| **Mailpit (Inbucket)** | `http://127.0.0.1:54324` | Hòm thư giả lập để test gửi email đăng nhập |

> [!NOTE]
> Mọi mật khẩu, token JWT trong môi trường cục bộ đều là các giá trị mẫu an toàn được định nghĩa trong `.env.example` và `supabase/config.toml`. Bạn hoàn toàn không cần tài khoản đám mây hay API key nào từ bên ngoài.

---

## 6. Bảng Tra cứu Lệnh Phát triển Hàng ngày

| Lệnh Dòng lệnh | Mục đích Sử dụng |
|---|---|
| `pnpm dev` | Khởi chạy máy chủ phát triển Next.js với tính năng hot-reload |
| `pnpm content:validate` | Xác thực cấu trúc frontmatter Markdown, JSON roadmap và concepts |
| `pnpm content:sync` | Đọc file nội dung Git và đồng bộ vào các bảng PostgreSQL cục bộ |
| `pnpm test` | Chạy toàn bộ bộ kiểm thử tự động với Vitest |
| `pnpm lint` | Kiểm tra định dạng và lỗi cú pháp với ESLint |
| `pnpm build` | Đóng gói bản build production của ứng dụng web `@langstride/web` |
| `pnpm local:setup` | Khởi động cụm container Supabase (`supabase start`) và áp dụng migration |
| `pnpm dlx supabase status` | Xem trạng thái hoạt động và các URL của container Supabase |
| `pnpm dlx supabase stop` | Dừng toàn bộ container Supabase để giải phóng RAM & CPU |
| `pnpm dlx supabase db reset` | Đặt lại database về ban đầu và chạy lại toàn bộ migration |

---

## 7. Quy trình Biên soạn & Xem trước Nội dung (Live Preview)

Tác giả bài học có thể xem trước nội dung mình viết theo thời gian thực:

1. **Tìm vị trí file nội dung**:
   - Khái niệm tri thức chung: [content/knowledge/concepts.json](../../../content/knowledge/concepts.json)
   - Lộ trình PHP: [roadmaps/php.json](../../../roadmaps/php.json)
   - Các bài học PHP: [content/programming/php/lessons/](../../../content/programming/php/lessons/)

2. **Chỉnh sửa nội dung**:
   Tuân thủ theo [Hướng dẫn Đóng góp Nội dung](../contribution/content-guide.md) với các phần bắt buộc:
   - `Why It Matters` (Vì sao quan trọng)
   - `Mental Model` (Mô hình tư duy)
   - `Code Example` (Ví dụ Code minh họa)
   - `Common Mistakes` (Lỗi thường gặp)

3. **Xem trước trên trình duyệt**:
   - Với **Chế độ File (`USE_DB_READ_MODEL=false`)**: Lưu file và chỉ cần F5 lại trình duyệt tại `http://localhost:3000/php/concepts/<slug-bai-hoc>`.
   - Với **Chế độ Database (`USE_DB_READ_MODEL=true`)**: Chạy lệnh `pnpm content:sync` trong terminal rồi F5 lại trang web.

4. **Kiểm tra trước khi commit Git**:
   ```bash
   pnpm content:validate
   pnpm test
   pnpm lint
   ```

---

## 8. Xử lý Sự cố Thường gặp (FAQ & Troubleshooting)

### Câu hỏi 1: Lỗi `connect ECONNREFUSED 127.0.0.1:54322`
- **Nguyên nhân**: Ứng dụng đang cấu hình đọc từ PostgreSQL (`USE_DB_READ_MODEL=true`), nhưng container database chưa được bật.
- **Cách khắc phục**:
  - Hoặc khởi động database: `pnpm local:setup`
  - Hoặc chuyển sang Chế độ File trong `.env.local`: `USE_DB_READ_MODEL=false`

### Câu hỏi 2: Lỗi `docker: command not found` hoặc không kết nối được Docker daemon
- **Nguyên nhân**: Chưa cài đặt hoặc chưa khởi động Docker Desktop / Docker Engine.
- **Cách khắc phục**: Bạn không bắt buộc phải có Docker để chạy LangStride! Hãy dùng Lựa chọn A bằng cách đặt `USE_DB_READ_MODEL=false` trong file `.env.local` rồi chạy `pnpm dev`.

### Câu hỏi 3: Cổng 3000 đã bị chiếm dụng bởi ứng dụng khác
- **Nguyên nhân**: Một tiến trình khác (hoặc dev server trước đó chưa tắt) đang chiếm port 3000.
- **Cách khắc phục**:
  - Tìm và tắt tiến trình đang chiếm cổng 3000:
    ```bash
    # Linux / macOS:
    lsof -ti :3000 | xargs kill -9

    # Windows (PowerShell):
    Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force

    # Công cụ đa nền tảng (nếu có sẵn npx):
    npx kill-port 3000
    ```
  - Nếu bạn chủ động muốn chạy trên một cổng khác, truyền biến `PORT`:
    ```bash
    PORT=3001 pnpm dev
    ```
    *(Lưu ý: Nếu đổi sang port 3001, các đường dẫn truy cập trình duyệt cần đổi tương ứng thành `http://localhost:3001/php`)*.

### Câu hỏi 4: Cảnh báo hoặc lỗi liên quan đến phiên bản Node.js
- **Nguyên nhân**: Phiên bản Node.js hiện tại thấp hơn `v22.0.0`.
- **Cách khắc phục**: Nâng cấp Node.js lên bản v22 trở lên:
  ```bash
  nvm install 22
  nvm use 22
  ```

### Câu hỏi 5: Dữ liệu trong database bị lệch hoặc không khớp với file nội dung
- **Nguyên nhân**: Có thay đổi migration hoặc nội dung chưa được đồng bộ lại.
- **Cách khắc phục**:
  ```bash
  pnpm dlx supabase db reset
  pnpm content:sync
  ```

### Câu hỏi 6: Cách tắt các container chạy ngầm khi không làm việc nữa?
- Chạy lệnh:
  ```bash
  pnpm dlx supabase stop
  ```
