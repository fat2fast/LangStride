---
id: php-functions
slug: functions
title: Hàm, Chữ Ký Hàm và Closures trong PHP
conceptId: concept-functions
language: php
status: published
sources:
  - title: "PHP Manual: Functions"
    url: https://www.php.net/manual/en/language.functions.php
  - title: "PHP RFC: Arrow Functions 2.0"
    url: https://wiki.php.net/rfc/arrow_functions_v2
---

## Why it matters
Hàm đóng gói hành vi và thiết lập ranh giới giao tiếp rõ ràng giữa các thành phần. PHP hiện đại hỗ trợ khai báo kiểu trả về, kiểu có thể null (nullable types), hợp và giao kiểu dữ liệu (union & intersection types), đối số có tên (named arguments) và hàm mũi tên ngắn gọn (`fn() => expr`). Việc áp dụng chữ ký kiểu dữ liệu chặt chẽ ngăn chặn trạng thái không hợp lệ lan truyền qua các tầng kiến trúc.

## Mental model
Hàm là một hợp đồng tường minh: nhận dữ liệu đầu vào kiểu A và đảm bảo kết quả đầu ra kiểu B (hoặc ném ra một Exception đã định nghĩa). Trong PHP, closures chụp (capture) các biến phạm vi ngoài một cách chủ động thông qua từ khóa `use ($var)` theo giá trị, trong khi hàm mũi tên (arrow functions) `fn($x) => $x + $y` tự động liên kết các biến phạm vi ngoài theo giá trị, giúp các thao tác chuyển đổi danh sách và chuỗi xử lý (pipeline) trở nên thanh thoát, dễ đọc.

## Code example
```php
<?php

declare(strict_types=1);

/**
 * Calculates discounts using a customizable pure closure.
 *
 * @param array<int, int> $prices
 * @param callable(int): int $discountStrategy
 * @return array<int, int>
 */
function applyDiscounts(array $prices, callable $discountStrategy): array
{
    return array_map($discountStrategy, $prices);
}

$cartPrices = [1000, 2500, 4999];
$discountFactor = 0.90; // 10% off

// Arrow function capturing outer variable $discountFactor automatically
$discounted = applyDiscounts($cartPrices, fn(int $price): int => (int) round($price * $discountFactor));

print_r($discounted); // [900, 2250, 4499]
```

## Common mistakes
1. **Mặc định closure chụp biến theo tham chiếu**: `use ($var)` chụp biến theo giá trị trừ khi có thêm tiền tố dấu và `use (&$var)`. Việc thay đổi `$var` bên trong closure sẽ không ảnh hưởng tới biến ngoài phạm vi.
2. **Bỏ qua sự ràng buộc của named arguments**: Gọi hàm với đối số có tên (ví dụ: `format(amount: 100)`) sẽ liên kết mã nguồn của bên gọi với tên biến tham số trong khai báo hàm. Việc đổi tên tham số trong public API lúc này sẽ trở thành một thay đổi phá vỡ tương thích (breaking change).
3. **Thiếu kiểu trả về (return types)**: Việc bỏ qua kiểu trả về như `: void` hay `: string` buộc người dùng và công cụ phân tích tĩnh như PHPStan phải tự đoán, làm suy yếu bảo đảm an toàn kiểu.
