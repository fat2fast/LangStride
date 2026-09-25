import { z } from 'zod';

export const ConceptSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  prerequisites: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
});

export const ConceptsFileSchema = z.array(ConceptSchema);

export const RoadmapNodeSchema = z.object({
  id: z.string().min(1),
  conceptId: z.string().min(1),
  title: z.string().min(1),
  lessonSlug: z.string().optional(),
  status: z.enum(['published', 'planned']),
  order: z.number().int().nonnegative(),
  prerequisites: z.array(z.string()).optional(),
});

export const RoadmapSectionSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  order: z.number().int().nonnegative(),
  nodes: z.array(RoadmapNodeSchema),
});

export const RoadmapFileSchema = z.object({
  language: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  sections: z.array(RoadmapSectionSchema),
});

export const LessonSourceSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
});

export const LessonFrontmatterSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  conceptId: z.string().min(1),
  language: z.string().min(1),
  status: z.enum(['draft', 'review', 'published']),
  sources: z.array(LessonSourceSchema).optional(),
});
