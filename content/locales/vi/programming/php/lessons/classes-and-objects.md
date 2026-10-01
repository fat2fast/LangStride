---
id: php-classes-and-objects
slug: classes-and-objects
title: Lớp, Tính Hiển Thị và Constructor Promotion trong PHP
conceptId: concept-classes-and-objects
language: php
status: published
sources:
  - title: "PHP Manual: Classes and Objects"
    url: https://www.php.net/manual/en/language.oop5.php
  - title: "PHP RFC: Constructor Property Promotion"
    url: https://wiki.php.net/rfc/constructor_promotion
---

## Why it matters
Lập trình Hướng đối tượng mô hình hóa các miền nghiệp vụ phức tạp thành các cấu trúc gắn kết, được đóng gói an toàn. Trước PHP 8, việc khai báo thuộc tính lớp đòi hỏi viết mã lặp đi lặp lại: khai báo thuộc tính, khai báo tham số constructor và gán giá trị thuộc tính bên trong thân constructor. PHP hiện đại cung cấp Constructor Property Promotion và các thuộc tính `readonly`, giảm thiểu tới 70% mã boilerplate trong khi đảm bảo tính bất biến (immutability) mạnh mẽ.

## Mental model
Lớp (class) là bản vẽ thiết kế, và đối tượng (object) là thực thể được khởi tạo cư trú trên vùng nhớ heap của engine. Constructor property promotion hợp nhất việc khai báo thuộc tính, truyền tham số và phép gán thành viên vào một dòng duy nhất. Thêm từ khóa `readonly` bảo đảm rằng sau khi được gán giá trị trong quá trình khởi tạo, thuộc tính không thể bị ghi đè hoặc gán lại từ bất cứ đâu, kể cả từ bên trong hay bên ngoài đối tượng.

## Code example
```php
<?php

declare(strict_types=1);

final class UserAccount
{
    // Constructor Property Promotion + readonly modifier
    public function __construct(
        public readonly string $id,
        public readonly string $email,
        private string $hashedPassword,
        private bool $isActive = true
    ) {}

    public function verifyPassword(string $plainPassword): bool
    {
        return password_verify($plainPassword, $this->hashedPassword);
    }

    public function deactivate(): self
    {
        $clone = clone $this;
        $clone->isActive = false;
        return $clone;
    }
}

$user = new UserAccount(
    id: 'usr_87a91',
    email: 'developer@example.com',
    hashedPassword: password_hash('secret', PASSWORD_BCRYPT)
);

echo $user->email; // Outputs: developer@example.com
```

## Common mistakes
1. **Cố gắng gán lại thuộc tính readonly**: Ghi đè `$user->email = 'new@example.com'` sẽ làm ném ra lỗi không bắt được `Error: Cannot modify readonly property`.
2. **Quên rằng đối tượng được truyền theo kiểu tay cầm (handle) tương tự tham chiếu**: Phép gán `$b = $a` không tạo ra bản sao của đối tượng bên dưới; cả hai biến cùng trỏ vào một thực thể đối tượng duy nhất. Sử dụng từ khóa `clone` nếu bạn muốn tạo một bản sao độc lập.
3. **Lạm dụng thuộc tính public có thể biến đổi (mutable)**: Để ngỏ các thuộc tính public mà không dùng `readonly` cho phép mã bên ngoài vượt qua logic kiểm thực và làm sai lệch trạng thái nội bộ.
