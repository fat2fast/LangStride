---
id: php-variables-and-types
slug: variables-and-types
title: Biến và Hệ thống Kiểu Dữ liệu trong PHP
conceptId: concept-variables
language: php
status: published
sources:
  - title: "PHP Manual: Types and Declarations"
    url: https://www.php.net/manual/en/language.types.php
  - title: "PHP RFC: Scalar Type Declarations"
    url: https://wiki.php.net/rfc/scalar_type_hints_v5
---

## Why it matters
PHP khởi đầu là một ngôn ngữ kịch bản định kiểu động và không có ràng buộc runtime nghiêm ngặt. Trong kỷ nguyên PHP 8+, tính an toàn kiểu dữ liệu (type safety) là yếu tố sống còn cho các hệ thống phần mềm quy mô lớn. Việc thấu hiểu cơ chế quản lý kiểu vô hướng (scalar types), ép kiểu tự động (type juggling) và khai báo `declare(strict_types=1)` giúp ngăn chặn triệt để các lỗi ép kiểu ngầm, lỗi fatal type errors và các phép so sánh sai lệch trong logic nghiệp vụ.

## Mental model
Hãy hình dung biến trong PHP như các nhãn dán trỏ vào các container zval (Zend Value) bên dưới engine. Theo mặc định, PHP tự động ép kiểu linh hoạt (ví dụ: truyền `"42"` vào một tham số kiểu `int` sẽ được chuyển đổi ngầm). Khi bật chế độ strict types ở đầu file, engine đóng vai trò như một người gác cổng nghiêm ngặt: nếu hàm yêu cầu một số nguyên, việc truyền chuỗi hay số thực sẽ lập tức ném ra ngoại lệ `TypeError` thay vì tự suy diễn chủ quan ý đồ của bạn.

## Code example
```php
<?php

declare(strict_types=1);

final class Price
{
    public function __construct(
        public readonly int $amountInCents,
        public readonly string $currency = 'USD'
    ) {
        if ($this->amountInCents < 0) {
            throw new InvalidArgumentException('Price cannot be negative.');
        }
    }

    public function format(): string
    {
        return sprintf('$%.2f %s', $this->amountInCents / 100, $this->currency);
    }
}

$price = new Price(amountInCents: 2499);
echo $price->format(); // Outputs: $24.99 USD
```

## Common mistakes
1. **Quên đặt `declare(strict_types=1)` ở đầu file**: Khai báo kiểu gợi ý (type hints) sẽ không ngăn được cơ chế ép kiểu tự động lỏng lẻo trừ khi strict types được kích hoạt rõ ràng trên từng file.
2. **So sánh giá trị bằng `==` thay vì `===`**: Phép so sánh lỏng lẻo (`==`) thực hiện ép kiểu tự động, dẫn tới những cạm bẫy tai hại như `0 == "a"` hoặc các giá trị falsy không mong muốn. Luôn luôn sử dụng so sánh đồng nhất tuyệt đối (`===`).
3. **Dùng số thực (float) cho tính toán tài chính**: Do chuẩn biểu diễn dấu phẩy động nhị phân IEEE 754, các số như `0.1 + 0.2` không hoàn toàn bằng `0.3`. Hãy lưu trữ giá trị tiền tệ dưới dạng số nguyên (ví dụ: cents/xu) hoặc sử dụng các thư viện tính toán chính xác tùy ý như `bcmath`.
