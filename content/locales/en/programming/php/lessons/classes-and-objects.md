---
id: php-classes-and-objects
slug: classes-and-objects
title: Classes, Visibility and Constructor Promotion in PHP
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
Object-Oriented Programming models complex domains into cohesive, encapsulated structures. Before PHP 8, declaring class properties required writing repetitive boilerplate: declaring the property, declaring the constructor argument, and assigning the property inside the constructor body. Modern PHP provides Constructor Property Promotion and `readonly` properties, cutting boilerplate by 70% while guaranteeing immutability.

## Mental model
A class is a blueprint, and an object is an instantiated entity residing on the engine heap. Constructor property promotion collapses property declaration, parameter passing, and member assignment into a single unified line. Adding `readonly` ensures that once initialized during construction, the property cannot be overwritten or reassigned from anywhere inside or outside the object.

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
1. **Attempting to reassign readonly properties**: Attempting to write `$user->email = 'new@example.com'` throws an uncaught `Error: Cannot modify readonly property`.
2. **Forgetting that objects are passed by reference-like handles**: Assigning `$b = $a` does not copy the underlying object; both variables point to the same object instance. Use `clone` if you require an independent copy.
3. **Overusing public mutable properties**: Leaving properties public without `readonly` allows external code to bypass validation logic and corrupt internal state.
