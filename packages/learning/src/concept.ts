/**
 * Generic, language-independent concept definition.
 * Concepts represent core programming knowledge independent of any single programming language.
 * (FR-KNOW-001, FR-KNOW-004, ADR-0005)
 */
export interface Concept {
  id: string;
  slug: string;
  title: string;
  description?: string;
  prerequisites: string[]; // Concept IDs
  related: string[];       // Concept IDs
}
