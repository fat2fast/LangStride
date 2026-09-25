export type RoadmapNodeStatus = 'published' | 'planned';

export interface RoadmapNode {
  id: string;
  conceptId: string;
  title: string;
  lessonSlug?: string;
  status: RoadmapNodeStatus;
  order: number;
  prerequisites?: string[]; // Node IDs or Concept IDs
}

export interface RoadmapSection {
  id: string;
  title: string;
  description?: string;
  order: number;
  nodes: RoadmapNode[];
}

export interface Roadmap {
  language: string;
  title: string;
  description?: string;
  sections: RoadmapSection[];
}
