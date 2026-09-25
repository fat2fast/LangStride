---
id: php-variables-and-types
slug: variables-and-types
title: Variables and Types in PHP
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
PHP began as a dynamically typed scripting language without strict runtime constraints. In modern PHP 8+, robust type safety is essential for large engineering codebases. Understanding how PHP handles scalar types, type juggling, and `declare(strict_types=1)` prevents silent casting bugs, fatal type errors, and unexpected comparisons in business logic.

## Mental model
Think of variables in PHP as labeled containers pointing to zvals (Zend Values) under the engine. By default, PHP coerces values automatically (e.g. passing `"42"` to an `int` parameter converts it silently). With strict types enabled per file, the engine acts as an unyielding bouncer: if a function expects an integer, passing a string or float immediately throws a `TypeError` rather than guessing your intent.

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
1. **Omitting `declare(strict_types=1)` at the file top**: Type hints alone do not stop loose coercive type juggling unless strict types are explicitly declared per file.
2. **Comparing values with `==` instead of `===`**: Loose equality (`==`) performs automatic type coercion, leading to notorious bugs like `0 == "a"` or falsey falses in legacy evaluation. Always use strict identity (`===`).
3. **Using floats for financial calculations**: Due to IEEE 754 binary floating-point representation, numbers like `0.1 + 0.2` do not equal `0.3`. Store monetary values as integers (e.g., cents) or use arbitrary precision extensions like `bcmath`.
