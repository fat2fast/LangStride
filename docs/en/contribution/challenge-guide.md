# Practice Challenge Guide

> **Languages**: English | [Tiếng Việt](../../vi/contribution/challenge-guide.md)

- **Status**: Active
- **Last Updated**: 2026-09-25
- **Scope**: Practice and Exercises
- **Authority**: Contributor Guide (Canonical)

This guide details how to author practice challenges for LangStride Community Edition MVP.

## Supported MVP Challenge Types

1. **Multiple Choice (`multiple_choice`)**:
   - 3 to 4 plausible choices.
   - Exactly one correct answer (or declared set).
   - Clear post-submission explanation of why the correct option is right and why distractors are wrong.
2. **Predict Output (`predict_output`)**:
   - Short code snippet (max 15 lines).
   - Deterministic string output or return value.
   - Whitespace and newline normalization rules declared.
3. **Fix the Code (`fix_the_code`)**:
   - Snippet containing a realistic bug or anti-pattern.
   - Expected corrected line or replacement snippet.
   - Explanation describing root defect, not just the correct syntax.

## Challenge Authoring Template

```yaml
id: chal-php-array-001
type: predict_output
language: php
concept_ids: ["concept-arrays"]
difficulty: easy
question: "What is printed by the following code?"
code: |
  $arr = [1, 2, 3];
  echo count($arr);
expected_output: "3"
explanation: "The count() function returns the number of elements in an array, which is 3."
```

## Golden Rule

**Every challenge must be deterministic.** Do not submit exercises that require an LLM or live network connection to grade.
