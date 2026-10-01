---
id: php-control-flow
slug: control-flow
title: Luồng Điều Khiển và Biểu Thức Match trong PHP
conceptId: concept-control-flow
language: php
status: published
sources:
  - title: "PHP Manual: Control Structures"
    url: https://www.php.net/manual/en/language.control-structures.php
  - title: "PHP RFC: Match Expression v2"
    url: https://wiki.php.net/rfc/match_expression_v2
---

## Why it matters
Rẽ nhánh quyết định định hình luồng nghiệp vụ ứng dụng. Trong PHP 8.0, biểu thức `match` được giới thiệu nhằm thay thế câu lệnh `switch` vốn tiềm ẩn nhiều rủi ro. Khác với `switch`, `match` trả về một giá trị, đánh giá điều kiện nghiêm ngặt theo phép so sánh tuyệt đối (`===`), loại trừ hoàn toàn lỗi trôi nhánh (fallthrough) do thiếu lệnh `break`, đồng thời bắt buộc xử lý đầy đủ (exhaustive) mọi trường hợp có thể xảy ra tại runtime.

## Mental model
Hãy coi `switch` như bảng nhảy tuần tự kế thừa từ ngôn ngữ C với cơ chế so sánh lỏng lẻo và rào chắn `break` thủ công. Nếu bạn quên lệnh `break`, luồng thực thi sẽ tràn không thể kiểm soát sang nhánh tiếp theo. Ngược lại, hãy xem `match` như một đường ống biểu thức (expression pipeline): nó nhận đầu vào, kiểm tra từng nhánh với phép so sánh đồng nhất (`===`), trả về kết quả tính toán ngay lập tức và ném ra lỗi `UnhandledMatchError` nếu có trạng thái nào chưa được bao quát.

## Code example
```php
<?php

declare(strict_types=1);

enum OrderStatus: string
{
    case Pending = 'pending';
    case Processing = 'processing';
    case Shipped = 'shipped';
    case Cancelled = 'cancelled';
}

function getBadgeColor(OrderStatus $status): string
{
    return match ($status) {
        OrderStatus::Pending => 'badge-yellow',
        OrderStatus::Processing => 'badge-blue',
        OrderStatus::Shipped => 'badge-green',
        OrderStatus::Cancelled => 'badge-red',
    };
}

$status = OrderStatus::Shipped;
echo getBadgeColor($status); // Outputs: badge-green
```

## Common mistakes
1. **Phụ thuộc vào phép so sánh lỏng lẻo của `switch`**: Câu lệnh `switch ($value)` sử dụng phép so sánh `==`, điều này có thể vô tình so khớp `0` với `"active"` hoặc `false` với `""`.
2. **Thiếu nhánh `default` trong biểu thức match mở**: Nếu bạn dùng `match` với chuỗi hoặc số nguyên tự do mà không khai báo nhánh `default`, bất kỳ đầu vào chưa định nghĩa nào cũng sẽ làm ném ra lỗi không bắt được `UnhandledMatchError`.
3. **Thực thi side-effect trong các nhánh match**: Biểu thức match được thiết kế để tính toán và trả về giá trị thuần túy. Tránh viết các thủ tục nhiều dòng phức tạp có tác dụng phụ (side-effects) bên trong các nhánh match.
