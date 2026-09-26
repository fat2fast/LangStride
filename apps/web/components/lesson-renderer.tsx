import React from 'react';
import Link from 'next/link';
import type { Lesson } from '@langstride/learning';
import { MarkdownProse } from './markdown-prose';

interface LessonRendererProps {
  lesson: Lesson;
}

export function LessonRenderer({ lesson }: LessonRendererProps) {
  const { frontmatter, whyItMatters, mentalModel, codeExample, commonMistakes, prerequisiteConcepts, relatedConcepts } = lesson;

  return (
    <article className="max-w-4xl mx-auto space-y-10 py-4">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-slate-900 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/php" className="hover:text-slate-900 transition-colors">
          PHP Roadmap
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-medium truncate max-w-xs sm:max-w-md">
          {frontmatter.title}
        </span>
      </nav>

      {/* Lesson Header */}
      <header className="space-y-4 border-b border-slate-200 pb-8">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase tracking-wider">
            {frontmatter.language.toUpperCase()}
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            {frontmatter.status.charAt(0).toUpperCase() + frontmatter.status.slice(1)}
          </span>
          <span className="text-xs text-slate-400">
            Concept ID: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-mono">{frontmatter.conceptId}</code>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          {frontmatter.title}
        </h1>

        {/* Source References */}
        {frontmatter.sources && frontmatter.sources.length > 0 && (
          <div className="pt-2 text-xs text-slate-500 space-y-1">
            <span className="font-semibold text-slate-700">Authoritative Sources:</span>
            <ul className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
              {frontmatter.sources.map((src, idx) => (
                <li key={idx}>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline inline-flex items-center gap-1"
                  >
                    <span>{src.title}</span>
                    <span className="text-slate-400 text-[10px]">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* Concept Links (Prerequisites & Related) */}
      {((prerequisiteConcepts && prerequisiteConcepts.length > 0) ||
        (relatedConcepts && relatedConcepts.length > 0)) && (
        <section aria-labelledby="concept-relations-heading" className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm space-y-2">
          <h2 id="concept-relations-heading" className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Knowledge Graph Connections
          </h2>
          <div className="flex flex-wrap gap-4">
            {prerequisiteConcepts && prerequisiteConcepts.length > 0 && (
              <div className="space-y-1">
                <span className="text-xs font-medium text-slate-600">Prerequisites:</span>
                <div className="flex flex-wrap gap-1.5">
                  {prerequisiteConcepts.map((p) =>
                    p.lessonSlug ? (
                      <Link
                        key={p.id}
                        href={`/php/concepts/${p.lessonSlug}`}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-white text-indigo-700 border border-slate-200 hover:border-indigo-300 font-medium"
                      >
                        {p.title}
                      </Link>
                    ) : (
                      <span key={p.id} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-slate-200 text-slate-600 font-medium">
                        {p.title}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}

            {relatedConcepts && relatedConcepts.length > 0 && (
              <div className="space-y-1">
                <span className="text-xs font-medium text-slate-600">Related Concepts:</span>
                <div className="flex flex-wrap gap-1.5">
                  {relatedConcepts.map((r) =>
                    r.lessonSlug ? (
                      <Link
                        key={r.id}
                        href={`/php/concepts/${r.lessonSlug}`}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-white text-slate-800 border border-slate-200 hover:border-slate-400 font-medium"
                      >
                        {r.title}
                      </Link>
                    ) : (
                      <span key={r.id} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-600 font-medium">
                        {r.title}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Mandatory Section: Why it matters */}
      <section aria-labelledby="why-it-matters-heading" className="space-y-3">
        <h2 id="why-it-matters-heading" className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-600 rounded-full inline-block"></span>
          Why it matters
        </h2>
        <div className="text-base text-slate-700 leading-relaxed pl-3.5">
          <MarkdownProse content={whyItMatters} />
        </div>
      </section>

      {/* Mandatory Section: Mental model */}
      <section aria-labelledby="mental-model-heading" className="space-y-3">
        <h2 id="mental-model-heading" className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-indigo-600 rounded-full inline-block"></span>
          Mental model
        </h2>
        <div className="text-base text-slate-700 leading-relaxed pl-3.5 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
          <MarkdownProse content={mentalModel} />
        </div>
      </section>

      {/* Mandatory Section: Code example */}
      <section aria-labelledby="code-example-heading" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 id="code-example-heading" className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-600 rounded-full inline-block"></span>
            Code example
          </h2>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-700 uppercase font-semibold">
            {codeExample.language}
          </span>
        </div>
        <div className="rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-md">
          <div className="bg-slate-800/80 px-4 py-2 border-b border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono">snippet.{codeExample.language}</span>
            <span>PHP 8.x Runtime</span>
          </div>
          <pre className="p-4 sm:p-5 text-sm sm:text-base font-mono text-emerald-300 overflow-x-auto leading-relaxed">
            <code>{codeExample.code}</code>
          </pre>
        </div>
      </section>

      {/* Mandatory Section: Common mistakes */}
      <section aria-labelledby="common-mistakes-heading" className="space-y-3">
        <h2 id="common-mistakes-heading" className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-rose-600 rounded-full inline-block"></span>
          Common mistakes
        </h2>
        <div className="text-base text-slate-700 leading-relaxed pl-3.5 bg-rose-50/50 p-4 rounded-xl border border-rose-100">
          <MarkdownProse content={commonMistakes} />
        </div>
      </section>

      {/* Return to Roadmap CTA */}
      <div className="pt-8 border-t border-slate-200 flex justify-between items-center">
        <Link
          href="/php"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← Back to PHP Roadmap
        </Link>
      </div>
    </article>
  );
}
