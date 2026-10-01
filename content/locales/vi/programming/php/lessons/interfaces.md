---
id: php-interfaces
slug: interfaces
title: Giao Diện và Thiết Kế Theo Hợp Đồng trong PHP
conceptId: concept-interfaces
language: php
status: published
sources:
  - title: "PHP Manual: Object Interfaces"
    url: https://www.php.net/manual/en/language.oop5.interfaces.php
  - title: "PHP-FIG: PSR-3 Logger Interface"
    url: https://www.php-fig.org/psr/psr-3/
---

## Why it matters
Giao diện (Interface) xác định một đối tượng có thể làm gì, mà không ép buộc cách thức đối tượng đó hoàn thành công việc. Trong kiến trúc mô-đun hóa, việc phụ thuộc vào giao diện thay vì hiện thực cụ thể (Nguyên lý đảo ngược phụ thuộc - Dependency Inversion Principle) giúp tách rời các mô-đun, cho phép tái cấu trúc an tâm và biến việc viết unit test trở nên dễ dàng nhờ test doubles và mocks.

## Mental model
Interface là một hợp đồng pháp lý. Nếu lớp `MailerService` ký kết hợp đồng `NotificationSender` bằng cách hiện thực (implements) nó, lớp này bảo đảm cung cấp phương thức `send(string $recipient, string $message): bool`. Logic nghiệp vụ cấp cao của miền chỉ tương tác với hợp đồng, hoàn toàn không cần bận tâm việc thông báo đang được gửi qua email, SMS hay một đối tượng giả lập trong bộ nhớ.

## Code example
```php
<?php

declare(strict_types=1);

interface PaymentGateway
{
    public function charge(string $customerId, int $amountInCents): string;
}

final class StripeGateway implements PaymentGateway
{
    public function charge(string $customerId, int $amountInCents): string
    {
        // Interacts with Stripe API
        return "ch_stripe_" . bin2hex(random_bytes(8));
    }
}

final class CheckoutProcessor
{
    // Depends on the contract, not the concrete implementation
    public function __construct(
        private readonly PaymentGateway $gateway
    ) {}

    public function process(string $customerId, int $amount): string
    {
        return $this->gateway->charge($customerId, $amount);
    }
}

$processor = new CheckoutProcessor(new StripeGateway());
$transactionId = $processor->process('cus_4401', 5000);
echo $transactionId;
```

## Common mistakes
1. **Định nghĩa logic thực thi trong interface**: Interface không thể chứa phần thân phương thức hay biến thành viên. Chỉ dùng abstract class khi cần chia sẻ mã nguồn chung, và dùng interface khi cần công bố hợp đồng.
2. **Phá vỡ tính tương thích của chữ ký phương thức**: Một lớp hiện thực interface phải tuân thủ nghiêm ngặt kiểu tham số và khai báo kiểu trả về; làm lỏng kiểu trả về hoặc thêm tham số bắt buộc sẽ gây ra lỗi fatal ở thời điểm biên dịch.
3. **Interface phình to vi phạm Phân tách Giao diện (Interface Segregation)**: Nhồi nhét hàng tá phương thức không liên quan vào một interface duy nhất buộc các lớp hiện thực phải tạo ra các hàm rỗng cho những phương thức chúng không cần. Hãy ưu tiên các interface nhỏ gọn, tập trung (ví dụ: `Countable`, `Renderable`).
