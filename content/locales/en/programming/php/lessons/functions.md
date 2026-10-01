---
id: php-functions
slug: functions
title: Functions, Signatures and Closures in PHP
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
Functions encapsulate behavior and establish clean interface boundaries. Modern PHP supports return type declarations, nullable types, union and intersection types, named arguments, and short arrow closures (`fn() => expr`). Using strict signatures prevents invalid state from propagating across architecture layers.

## Mental model
A function is an explicit contract: given inputs of type A, it guarantees an output of type B (or throws a declared Exception). In PHP, closures capture outer variables explicitly with `use ($var)` by value, whereas arrow functions `fn($x) => $x + $y` automatically bind outer scope variables by-value, making list transformations and pipeline operations elegant.

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
1. **Assuming closures capture variables by reference**: `use ($var)` captures by value unless prefixed with an ampersand `use (&$var)`. Mutating `$var` inside the closure will not affect the outer scope.
2. **Ignoring named argument coupling**: Calling functions with named arguments (e.g. `format(amount: 100)`) binds your caller code to the parameter's variable name in the function declaration. Renaming parameter names in public APIs becomes a breaking change.
3. **Missing return types**: Omitting `: void` or `: string` forces consumers and static analyzers like PHPStan to guess, weakening type guarantees.
