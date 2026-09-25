# Search

> **Languages**: English | [Tiếng Việt](../../vi/fr/search.md)

Status: Planned. Introduced: P5. Release gate: P5. Actor: learner. Depends on FR-KNOW-006 and FR-PRAC-010. Applicable constraints: NFR-SIMPLE-005.

### FR-SEARCH-001 — Search PHP concepts
A learner shall search PHP concepts. Done when a query can return matching published PHP concepts and open the selected result.

### FR-SEARCH-002 — Search lessons
A learner shall search lessons. Done when a query can return matching published lessons and open the selected result.

### FR-SEARCH-003 — Search challenges
A learner should search practice challenges. Done when a query can return matching published challenges and open the selected result.

### FR-SEARCH-004 — No separate search service
Search shall run without a separate search service. Done when the supported deployment provides search without Elasticsearch or another dedicated search runtime.

### FR-SEARCH-005 — PostgreSQL full-text search
PostgreSQL Full Text Search may be used. Done when its adoption, if chosen, satisfies FR-SEARCH-001 through FR-SEARCH-004 without changing these contracts.

### FR-SEARCH-006 — No vector search requirement
Vector search is not required for the MVP. Done when the listed search scope works without embeddings or a vector database.

