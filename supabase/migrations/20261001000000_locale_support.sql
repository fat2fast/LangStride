-- Migration: Add locale support for bilingual read-model
-- Preserves canonical concept/node identities while enabling locale-aware queries.

-- 1. Add locale to roadmaps
ALTER TABLE roadmaps ADD COLUMN IF NOT EXISTS locale TEXT NOT NULL DEFAULT 'en';
ALTER TABLE roadmaps DROP CONSTRAINT IF EXISTS roadmaps_language_key;
ALTER TABLE roadmaps ADD CONSTRAINT uq_roadmaps_language_locale UNIQUE (language, locale);
CREATE INDEX IF NOT EXISTS idx_roadmaps_lang_locale ON roadmaps(language, locale);

-- 2. Add locale to lessons
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS locale TEXT NOT NULL DEFAULT 'en';
ALTER TABLE lessons DROP CONSTRAINT IF EXISTS uq_lessons_language_slug;
ALTER TABLE lessons ADD CONSTRAINT uq_lessons_language_locale_slug UNIQUE (language, locale, slug);
CREATE INDEX IF NOT EXISTS idx_lessons_lang_locale_slug ON lessons(language, locale, slug);

-- 3. Create concept_translations table for localized concept presentation
CREATE TABLE IF NOT EXISTS concept_translations (
  concept_id TEXT NOT NULL REFERENCES concepts(id) ON DELETE CASCADE,
  locale TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  PRIMARY KEY (concept_id, locale)
);
CREATE INDEX IF NOT EXISTS idx_concept_translations_locale ON concept_translations(locale);
