-- Migration: Add roadmap_node_prerequisites junction table
-- Enables safe forward-only upgrades for existing local read-model databases.

CREATE TABLE IF NOT EXISTS roadmap_node_prerequisites (
  node_id TEXT NOT NULL REFERENCES roadmap_nodes(id) ON DELETE CASCADE,
  prerequisite_node_id TEXT NOT NULL REFERENCES roadmap_nodes(id) ON DELETE CASCADE,
  PRIMARY KEY (node_id, prerequisite_node_id)
);
