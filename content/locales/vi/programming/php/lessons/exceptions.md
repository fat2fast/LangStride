---
id: php-exceptions
slug: exceptions
title: Phân Cấp Ngoại Lệ và Bẫy Lỗi Phòng Thủ trong PHP
conceptId: concept-exceptions
language: php
status: published
sources:
  - title: "PHP Manual: Errors and Exceptions"
    url: https://www.php.net/manual/en/language.exceptions.php
  - title: "PHP Manual: Predefined Exception Hierarchy"
    url: https://www.php.net/manual/en/class.throwable.php
---

## Why it matters
Sự cố trong lúc chạy (runtime failures) là điều tất yếu trong các hệ thống production. Kể từ PHP 7+, toàn bộ hệ thống lỗi đã được hợp nhất dưới giao diện `Throwable`, cho phép cả lỗi nghiêm trọng mức engine (`Error`) lẫn ngoại lệ ứng dụng (`Exception`) được bắt và xử lý bài bản. Việc thiết kế các bẫy ngoại lệ có kỷ luật giúp ngăn chặn sập ứng dụng đột ngột, sai lệch dữ liệu và tình trạng nuốt lỗi trong im lặng.

## Mental model
`Throwable` là tổ tiên gốc của mọi đối tượng có thể được ném ra (thrown) trong PHP. Bên dưới nó phân tách thành hai nhánh chính:
1. `Error`: Các lỗi mức hệ thống như `TypeError`, `ParseError`, và `DivisionByZeroError`.
2. `Exception`: Các ngoại lệ ở mức ứng dụng và nghiệp vụ, như `RuntimeException` và `InvalidArgumentException`.
Việc bắt `Exception` sẽ bắt các sự cố ứng dụng, nhưng sẽ KHÔNG bắt được `TypeError`. Để bắt an toàn mọi lỗi tại các cửa ngõ biên, hãy bắt `Throwable`.

## Code example
```php
<?php

declare(strict_types=1);

final class InsufficientFundsException extends RuntimeException
{
    public static function forWithdrawal(int $requested, int $available): self
    {
        return new self("Cannot withdraw {$requested} cents. Available balance is {$available} cents.");
    }
}

final class BankAccount
{
    private int $balanceInCents = 10000; // $100.00

    public function withdraw(int $amountInCents): void
    {
        if ($amountInCents > $this->balanceInCents) {
            throw InsufficientFundsException::forWithdrawal($amountInCents, $this->balanceInCents);
        }
        $this->balanceInCents -= $amountInCents;
    }
}

try {
    $account = new BankAccount();
    $account->withdraw(25000);
} catch (InsufficientFundsException $e) {
    // Handled domain error cleanly
    echo "Transaction rejected: " . $e->getMessage();
} catch (Throwable $e) {
    // Top-level fallback error trap
    echo "Unexpected fatal error: " . $e->getMessage();
}
```

## Common mistakes
1. **Khối catch trống rỗng (nuốt lỗi)**: Viết `catch (Exception $e) {}` sẽ dập tắt sự cố và che giấu nguyên nhân gốc rễ, biến các lỗi có thể xử lý thành cơn ác mộng khi điều tra lỗi.
2. **Bắt `Exception` chung khi lỗi engine có thể xảy ra**: Nếu bạn cần bắt các lỗi không khớp kiểu dữ liệu hoặc nhánh match chưa xử lý, việc chỉ bắt `Exception` sẽ không thể chặn được `TypeError` hay `Error`. Luôn bắt `Throwable` ở các tầng biên ngoài cùng.
3. **Ném ngoại lệ cơ sở `Exception` chung chung**: Ném `throw new Exception("something failed")` ép buộc bên gọi phải bắt tất cả ngoại lệ thay vì có thể lựa chọn xử lý từng miền sự cố cụ thể.
