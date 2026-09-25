---
id: php-control-flow
slug: control-flow
title: Control Flow and Match Expressions in PHP
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
Decision branching drives business workflows. In PHP 8.0, the `match` expression was introduced to replace error-prone `switch` statements. Unlike `switch`, `match` returns a value, evaluates strictly without type juggling (`===`), avoids accidental fallthrough bugs caused by omitted `break` statements, and enforces exhaustive branch handling at runtime.

## Mental model
Think of `switch` as a sequential jumping table from C with loose equality and manual `break` barriers. If you forget a `break`, execution spills uncontrollably into the next branch. By contrast, think of `match` as an expression pipeline: it inspects the input, evaluates each condition with strict identity (`===`), returns the computed result immediately, and raises an `UnhandledMatchError` if any state was unhandled.

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
1. **Relying on `switch` loose comparison**: A `switch ($value)` statement uses loose `==` comparison, which may inadvertently match `0` to `"active"` or `false` to `""`.
2. **Missing `default` in un-enumerated match expressions**: If you use `match` on freeform strings or integers and don't provide a `default` arm, unhandled inputs throw an uncaught `UnhandledMatchError`.
3. **Putting side-effects in multiple match arms**: Match expressions are meant to evaluate and return values cleanly. Avoid writing complex multi-statement procedures inside match arms.
