import React from 'react';
import Link from 'next/link';
import type { Roadmap, RoadmapNode } from '@langstride/learning';

interface PhpRoadmapProps {
  roadmap: Roadmap;
}

export function PhpRoadmap({ roadmap }: PhpRoadmapProps) {
  return (
    <div className="space-y-12">
      {/* Roadmap Header */}
      <div className="space-y-4 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          <span>Official PHP Track</span>
          <span>•</span>
          <span>PHP 8.x Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          {roadmap.title}
        </h1>
        {roadmap.description && (
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            {roadmap.description}
          </p>
        )}
      </div>

      {/* Sections */}
      <div className="space-y-10">
        {roadmap.sections
          .sort((a, b) => a.order - b.order)
          .map((section, sIndex) => (
            <div
              key={section.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:border-slate-300"
            >
              {/* Section Header */}
              <div className="bg-slate-50/80 px-6 py-5 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-6 h-6 rounded-md bg-indigo-600 text-white text-xs font-black">
                      {sIndex + 1}
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                      {section.title}
                    </h2>
                  </div>
                  {section.description && (
                    <p className="text-sm text-slate-500 pl-8">
                      {section.description}
                    </p>
                  )}
                </div>
                <div className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200/70 text-slate-700 self-start sm:self-center">
                  {section.nodes.length} {section.nodes.length === 1 ? 'Concept' : 'Concepts'}
                </div>
              </div>

              {/* Nodes List */}
              <div className="p-6 divide-y divide-slate-100">
                {section.nodes
                  .sort((a, b) => a.order - b.order)
                  .map((node) => (
                    <div key={node.id} className="py-4 first:pt-0 last:pb-0">
                      <RoadmapNodeItem node={node} />
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function RoadmapNodeItem({ node }: { node: RoadmapNode }) {
  const isPublished = node.status === 'published';

  if (isPublished && node.lessonSlug) {
    return (
      <Link
        href={`/php/concepts/${node.lessonSlug}`}
        className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 -mx-2 rounded-xl transition-all duration-200 hover:bg-indigo-50/60 hover:shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
            <h3 className="text-base font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
              {node.title}
            </h3>
          </div>
          {node.prerequisites && node.prerequisites.length > 0 && (
            <p className="text-xs text-slate-500 pl-5.5">
              Prerequisites: {node.prerequisites.join(', ')}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center pl-5 sm:pl-0">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            Published
          </span>
          <span className="text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all text-sm font-semibold">
            Open Lesson →
          </span>
        </div>
      </Link>
    );
  }

  // Planned node: visibly unavailable, cannot be opened
  return (
    <div
      aria-disabled="true"
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 -mx-2 rounded-xl bg-slate-50/60 border border-dashed border-slate-200 opacity-75"
    >
      <div className="space-y-1.5">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 flex-shrink-0" />
          <h3 className="text-base font-medium text-slate-600">
            {node.title}
          </h3>
        </div>
        <p className="text-xs text-slate-400 pl-5.5">
          Curriculum topic planned for upcoming release slice
        </p>
      </div>

      <div className="self-end sm:self-center pl-5 sm:pl-0">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
          Planned
        </span>
      </div>
    </div>
  );
}
