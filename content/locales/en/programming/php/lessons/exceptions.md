---
id: php-exceptions
slug: exceptions
title: Exceptions Hierarchy and Defensive Traps in PHP
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
Runtime failures are inevitable in production systems. In PHP 7+, the entire error system was unified under the `Throwable` interface, allowing both engine fatal errors (`Error`) and application exceptions (`Exception`) to be caught and managed cleanly. Writing disciplined exception traps prevents unhandled crashes, data corruption, and silent swallowed failures.

## Mental model
`Throwable` is the root ancestor of all thrown objects in PHP. Beneath it branch two primary trees:
1. `Error`: System-level failures such as `TypeError`, `ParseError`, and `DivisionByZeroError`.
2. `Exception`: Domain and application-level exceptions, such as `RuntimeException` and `InvalidArgumentException`.
Catching `Exception` will catch application issues, but will NOT catch a `TypeError`. To catch everything safely at boundary gateways, catch `Throwable`.

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
1. **Empty catch blocks (swallowing exceptions)**: Writing `catch (Exception $e) {}` silences failures and hides root causes, turning manageable bugs into debugging nightmares.
2. **Catching generic `Exception` when engine errors can occur**: If you expect to catch type mismatches or unhandled match branches, catching `Exception` will fail to intercept `TypeError` or `Error`. Always catch `Throwable` at edge boundaries.
3. **Throwing generic base `Exception`**: Throwing `throw new Exception("something failed")` forces callers to catch all exceptions rather than selectively handling specific failure domains.
