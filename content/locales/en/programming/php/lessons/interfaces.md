---
id: php-interfaces
slug: interfaces
title: Interfaces and Contract-Driven Design in PHP
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
Interfaces define what an object can do, without mandating how it accomplishes it. In modular architecture, depending on interfaces rather than concrete implementations (Dependency Inversion Principle) decouples modules, enables fearless refactoring, and makes unit testing effortless via test doubles and mocks.

## Mental model
An interface is a legal contract. If class `MailerService` signs the `NotificationSender` contract by implementing it, it legally guarantees that it exposes a `send(string $recipient, string $message): bool` method. Higher-level domain business logic only interacts with the contract, completely oblivious to whether emails, SMS, or mock in-memory notifications are being sent.

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
1. **Defining implementation logic in interfaces**: Interfaces cannot contain method bodies or member variables. Use abstract classes only when sharing code, and interfaces when declaring contracts.
2. **Breaking signature compatibility**: A class implementing an interface must adhere strictly to parameter types and return type declarations; weakening return types or adding non-optional parameters will cause fatal compile-time errors.
3. **Fat interfaces violating Interface Segregation**: Putting dozens of unrelated methods into a single massive interface forces implementations to stub out methods they don't care about. Prefer small, focused interfaces (e.g., `Countable`, `Renderable`).
