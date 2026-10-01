'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ZoomIn,
  ZoomOut,
  Sparkles,
  BookOpen,
  Layers,
  ShieldCheck,
  Milestone,
  Lock,
  GitBranch,
  X,
  Trophy,
  RotateCcw,
  Check,
  ChevronDown,
  ChevronUp,
  Move,
} from 'lucide-react';
import type { Roadmap, RoadmapNode, RoadmapSection, Locale } from '@langstride/learning';
import { getMessages, localizePath, type Messages } from '../lib/i18n';

interface PhpRoadmapProps {
  roadmap: Roadmap;
  locale?: Locale;
}

export function PhpRoadmap({ roadmap, locale = 'en' }: PhpRoadmapProps) {
  const messages = getMessages(locale);

  // Non-mutating shallow copy of sections and nodes (Finding 4)
  const sortedSections = [...roadmap.sections].sort((a, b) => a.order - b.order);
  const allNodes = sortedSections.flatMap((s) => [...s.nodes].sort((a, b) => a.order - b.order));
  const publishedNodes = allNodes.filter((n) => n.status === 'published');
  const plannedNodes = allNodes.filter((n) => n.status === 'planned');
  const totalNodesCount = allNodes.length;
  const publishedPercent =
    totalNodesCount > 0 ? Math.round((publishedNodes.length / totalNodesCount) * 100) : 0;

  // Build ID-to-Title dictionary to resolve prerequisite codes into human titles (Finding 2)
  const nodeTitleMap = new Map<string, string>();
  for (const node of allNodes) {
    nodeTitleMap.set(node.id, node.title);
    if (node.conceptId) {
      nodeTitleMap.set(node.conceptId, node.title);
    }
  }

  // Zoom & Pan State (Retained per user request: "ngoại trừ phần zoom")
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // Default: ALL sections COLLAPSED initially if multiple sections; if only 1 section, expand it by default
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() => {
    if (sortedSections.length === 1 && sortedSections[0]) {
      return { [sortedSections[0].id]: true };
    }
    return {};
  });

  // Active popover node ID
  const [activePopoverNodeId, setActivePopoverNodeId] = useState<string | null>(null);

  // Canvas container ref
  const stageRef = useRef<HTMLDivElement>(null);

  // Toggle expand for a section
  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // Zoom handlers
  const handleZoomIn = () => setZoom((z) => Math.min(1.4, +(z + 0.1).toFixed(2)));
  const handleZoomOut = () => setZoom((z) => Math.max(0.65, +(z - 0.1).toFixed(2)));
  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // 2D Pan Mouse Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (
      target.closest('button') ||
      target.closest('a') ||
      target.closest('[role="dialog"]') ||
      target.closest('[role="region"]') ||
      target.closest('input')
    ) {
      return;
    }
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // 2D Pan Touch Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    const target = e.target as HTMLElement;
    if (
      target.closest('button') ||
      target.closest('a') ||
      target.closest('[role="dialog"]') ||
      target.closest('[role="region"]')
    ) {
      return;
    }
    setIsDragging(true);
    dragStartRef.current = { x: touch.clientX - pan.x, y: touch.clientY - pan.y };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setPan({
      x: touch.clientX - dragStartRef.current.x,
      y: touch.clientY - dragStartRef.current.y,
    });
  };

  const handleTouchEnd = () => setIsDragging(false);

  // Global Keyboard Shortcuts (Ctrl + Plus, Ctrl + Minus, Ctrl + 0) with capture
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === '=' || e.key === '+' || e.code === 'NumpadAdd' || e.code === 'Equal') {
          e.preventDefault();
          e.stopPropagation();
          handleZoomIn();
        } else if (e.key === '-' || e.code === 'NumpadSubtract' || e.code === 'Minus') {
          e.preventDefault();
          e.stopPropagation();
          handleZoomOut();
        } else if (e.key === '0' || e.code === 'Numpad0' || e.code === 'Digit0') {
          e.preventDefault();
          e.stopPropagation();
          handleResetZoom();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, []);

  // Global Ctrl + Wheel Listener: Prevents browser full-page zoom everywhere and zooms roadmap only!
  useEffect(() => {
    const handleGlobalWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        e.stopPropagation();
        const delta = e.deltaY < 0 ? 0.08 : -0.08;
        setZoom((z) => Math.min(1.4, Math.max(0.65, +(z + delta).toFixed(2))));
      }
    };

    window.addEventListener('wheel', handleGlobalWheel, { passive: false, capture: true });
    document.addEventListener('wheel', handleGlobalWheel, { passive: false, capture: true });
    return () => {
      window.removeEventListener('wheel', handleGlobalWheel, { capture: true });
      document.removeEventListener('wheel', handleGlobalWheel, { capture: true });
    };
  }, []);

  // Close popover when clicking outside or pressing Escape
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest('[role="dialog"]') &&
        !target.closest('[role="region"]') &&
        !target.closest('button[data-node-id]')
      ) {
        setActivePopoverNodeId(null);
      }
    };

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePopoverNodeId(null);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  // Helper for Section icons
  const getSectionIcon = (index: number) => {
    switch (index) {
      case 0:
        return <BookOpen className="w-5 h-5 text-indigo-600" aria-hidden="true" />;
      case 1:
        return <Layers className="w-5 h-5 text-indigo-600" aria-hidden="true" />;
      case 2:
        return <ShieldCheck className="w-5 h-5 text-indigo-600" aria-hidden="true" />;
      default:
        return <Milestone className="w-5 h-5 text-indigo-600" aria-hidden="true" />;
    }
  };

  const rootSection = sortedSections[0];
  const branchSections = sortedSections.slice(1);

  return (
    <div className="relative min-h-screen">
      {/* 1. Full-page Architectural Dot-Grid Background */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
          backgroundColor: '#f8fafc',
        }}
        aria-hidden="true"
      />

      <div className="space-y-8 max-w-7xl mx-auto pb-24">
        {/* Header Banner */}
        <header className="relative z-20 space-y-4 border-b border-slate-200/80 pb-6 bg-white/70 backdrop-blur rounded-3xl p-6 sm:p-8 shadow-xs border">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse motion-reduce:animate-none" />
              <span>{messages.roadmap.officialTrack}</span>
              <span>•</span>
              <span>{messages.roadmap.phpArchitecture}</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Sparkles className="w-4 h-4 text-amber-500" aria-hidden="true" />
              <span>{messages.roadmap.interactiveTree}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              {roadmap.title}
            </h1>
            {roadmap.description && (
              <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
                {roadmap.description}
              </p>
            )}
          </div>
        </header>

        {/* Main Stage: Canvas (Left) + Sticky Progress Panel (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
          {/* Left: Branching Roadmap Canvas */}
          <div className="lg:col-span-8 space-y-4">
            {/* Canvas Hint Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 bg-white/90 backdrop-blur px-5 py-3 rounded-2xl border border-slate-200 shadow-xs relative z-10">
              <div className="flex items-center gap-2.5 font-medium">
                <Move className="w-4 h-4 text-indigo-600" />
                <span>{messages.roadmap.dragPan}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-mono text-[11px]">
                    {messages.roadmap.ctrlKey}
                  </kbd>{' '}
                  {messages.roadmap.scrollZoom}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const allOpen = sortedSections.every((s) => !!expandedSections[s.id]);
                    const updated: Record<string, boolean> = {};
                    for (const s of sortedSections) {
                      updated[s.id] = !allOpen;
                    }
                    setExpandedSections(updated);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors border border-slate-200"
                >
                  {sortedSections.every((s) => !!expandedSections[s.id])
                    ? messages.roadmap.collapseAll
                    : messages.roadmap.expandAll}
                </button>
              </div>
            </div>

            {/* Seamless Canvas Stage */}
            <div
              ref={stageRef}
              className="relative w-full cursor-grab active:cursor-grabbing select-none py-4"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Pannable & Zoomable 2D Container */}
              <div
                className="w-full transition-transform duration-75 ease-out relative"
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  transformOrigin: 'top center',
                }}
              >
                {/* Tree Nodes Container */}
                <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center w-full">
                  {/* Root Node */}
                  {rootSection && (
                    <div className="w-full max-w-md mx-auto">
                      <TopicTreeNode
                        section={rootSection}
                        sIdx={0}
                        locale={locale}
                        messages={messages}
                        isExpanded={!!expandedSections[rootSection.id]}
                        toggleSection={toggleSection}
                        nodeTitleMap={nodeTitleMap}
                        activePopoverNodeId={activePopoverNodeId}
                        setActivePopoverNodeId={setActivePopoverNodeId}
                        getSectionIcon={getSectionIcon}
                      />
                    </div>
                  )}

                  {/* Branching Connectors & Parallel Branches */}
                  {branchSections.length > 0 && (
                    <>
                      {branchSections.length === 2 ? (
                        <div className="w-full h-20 relative hidden md:block pointer-events-none -my-1">
                          <svg
                            viewBox="0 0 1000 100"
                            preserveAspectRatio="none"
                            className="w-full h-full overflow-visible"
                          >
                            <circle cx="500" cy="2" r="4.5" fill="#4f46e5" />
                            <line
                              x1="500"
                              y1="2"
                              x2="500"
                              y2="24"
                              stroke="#4f46e5"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                            <circle cx="500" cy="24" r="3.5" fill="#4f46e5" />
                            <path
                              d="M 500 24 C 500 55, 240 65, 240 88"
                              stroke="#4f46e5"
                              strokeWidth="3"
                              fill="none"
                              strokeLinecap="round"
                            />
                            <line
                              x1="240"
                              y1="88"
                              x2="240"
                              y2="91"
                              stroke="#4f46e5"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                            <polygon points="233,89 247,89 240,98" fill="#4f46e5" />
                            <path
                              d="M 500 24 C 500 55, 760 65, 760 88"
                              stroke="#4f46e5"
                              strokeWidth="3"
                              fill="none"
                              strokeLinecap="round"
                            />
                            <line
                              x1="760"
                              y1="88"
                              x2="760"
                              y2="91"
                              stroke="#4f46e5"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                            <polygon points="753,89 767,89 760,98" fill="#4f46e5" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-full flex flex-col items-center pointer-events-none my-2">
                          <div className="w-1 h-8 bg-indigo-600 rounded-full" />
                          <div className="w-0 h-0 border-x-4 border-x-transparent border-t-6 border-t-indigo-600 -mt-0.5" />
                        </div>
                      )}

                      {branchSections.length === 2 && (
                        <div className="w-full flex flex-col items-center md:hidden pointer-events-none my-1">
                          <div className="w-1 h-8 bg-indigo-600 rounded-full" />
                          <div className="w-0 h-0 border-x-4 border-x-transparent border-t-6 border-t-indigo-600 -mt-0.5" />
                        </div>
                      )}

                      {/* Branch Sections Grid */}
                      <div
                        className={`w-full grid gap-8 items-start ${
                          branchSections.length === 1
                            ? 'grid-cols-1 max-w-md mx-auto'
                            : 'grid-cols-1 md:grid-cols-2'
                        }`}
                      >
                        {branchSections.map((section, bIdx) => {
                          const actualIdx = bIdx + 1;
                          return (
                            <React.Fragment key={section.id}>
                              {bIdx > 0 && branchSections.length === 2 && (
                                <div className="w-full flex flex-col items-center md:hidden pointer-events-none my-1">
                                  <div className="w-1 h-8 bg-indigo-600 rounded-full" />
                                  <div className="w-0 h-0 border-x-4 border-x-transparent border-t-6 border-t-indigo-600 -mt-0.5" />
                                </div>
                              )}
                              <div className="w-full">
                                <TopicTreeNode
                                  section={section}
                                  sIdx={actualIdx}
                                  locale={locale}
                                  messages={messages}
                                  isExpanded={!!expandedSections[section.id]}
                                  toggleSection={toggleSection}
                                  nodeTitleMap={nodeTitleMap}
                                  activePopoverNodeId={activePopoverNodeId}
                                  setActivePopoverNodeId={setActivePopoverNodeId}
                                  getSectionIcon={getSectionIcon}
                                />
                              </div>
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom-Left Floating Zoom Controls */}
            <div className="sticky bottom-6 left-6 z-30 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur border border-slate-300 rounded-2xl p-1.5 shadow-lg">
              <button
                type="button"
                onClick={handleZoomIn}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-700 hover:text-indigo-600 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                title={messages.roadmap.zoomIn}
                aria-label={messages.roadmap.zoomIn}
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-700 hover:text-indigo-600 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                title={messages.roadmap.zoomOut}
                aria-label={messages.roadmap.zoomOut}
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <div className="h-4 w-[1px] bg-slate-200 mx-0.5" />
              <button
                type="button"
                onClick={handleResetZoom}
                className="px-2.5 h-8 rounded-xl flex items-center justify-center text-xs font-bold font-mono text-indigo-600 hover:bg-indigo-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                title={messages.roadmap.resetZoom}
                aria-label={messages.roadmap.resetZoom}
              >
                {Math.round(zoom * 100)}%
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                title={messages.roadmap.defaultView}
                aria-label={messages.roadmap.defaultView}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Sticky Curriculum Coverage Sidebar */}
          <aside className="lg:col-span-4 sticky top-24 self-start space-y-5 z-20">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                    <Trophy className="w-4 h-4" />
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {messages.roadmap.curriculumContent}
                  </span>
                </div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {publishedPercent}{messages.roadmap.publishedPercent}
                </span>
              </div>

              {/* Circular Curriculum Availability Ring */}
              <div className="flex items-center justify-around py-2">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg
                    className="w-full h-full -rotate-90"
                    viewBox="0 0 36 36"
                    width="96"
                    height="96"
                    style={{ maxWidth: '96px', maxHeight: '96px' }}
                  >
                    <path
                      className="text-slate-100"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-indigo-600 transition-all duration-500"
                      strokeDasharray={`${publishedPercent}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <div className="text-xl font-extrabold text-slate-900">
                      {publishedNodes.length}
                      <span className="text-xs text-slate-400 font-medium">
                        /{totalNodesCount}
                      </span>
                    </div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">
                      {messages.roadmap.ready}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-slate-600">{messages.roadmap.opened}</span>
                    <span className="font-bold text-slate-900">{publishedNodes.length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="text-slate-600">{messages.roadmap.planned}</span>
                    <span className="font-bold text-slate-900">{plannedNodes.length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    <span className="text-slate-600">{messages.roadmap.topics}</span>
                    <span className="font-bold text-slate-900">{sortedSections.length}</span>
                  </div>
                </div>
              </div>

              {/* Topic Quick Jump List */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {messages.roadmap.quickJump}
                </div>
                <div className="space-y-2">
                  {sortedSections.map((sec, sIdx) => {
                    const isExpanded = !!expandedSections[sec.id];
                    return (
                      <button
                        key={sec.id}
                        type="button"
                        onClick={() => {
                          setExpandedSections((prev) => ({ ...prev, [sec.id]: true }));
                          const el = document.getElementById(sec.id);
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`w-full text-left p-3 rounded-2xl border text-xs font-semibold flex items-center justify-between transition-all ${
                          isExpanded
                            ? 'bg-indigo-50/70 border-indigo-200 text-indigo-700 shadow-2xs'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-xs shadow-2xs text-indigo-600">
                            {sIdx + 1}
                          </span>
                          <span className="truncate">
                            {messages.roadmap.topicPrefix} {sIdx + 1}: {sec.title}
                          </span>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// Subcomponent: Individual Topic Node on the Tree
interface TopicTreeNodeProps {
  section: RoadmapSection;
  sIdx: number;
  locale: Locale;
  messages: Messages;
  isExpanded: boolean;
  toggleSection: (id: string) => void;
  nodeTitleMap: Map<string, string>;
  activePopoverNodeId: string | null;
  setActivePopoverNodeId: React.Dispatch<React.SetStateAction<string | null>>;
  getSectionIcon: (idx: number) => React.ReactNode;
}

function TopicTreeNode({
  section,
  sIdx,
  locale,
  messages,
  isExpanded,
  toggleSection,
  nodeTitleMap,
  activePopoverNodeId,
  setActivePopoverNodeId,
  getSectionIcon,
}: TopicTreeNodeProps) {
  const sortedNodes = [...section.nodes].sort((a, b) => a.order - b.order);
  const publishedInSec = sortedNodes.filter((n) => n.status === 'published').length;

  return (
    <div
      id={section.id}
      className={`relative scroll-mt-28 ${
        sortedNodes.some((n) => n.id === activePopoverNodeId) ? 'z-40' : 'z-10'
      }`}
    >
      {/* Topic Card */}
      <button
        type="button"
        id={`section-header-${section.id}`}
        aria-expanded={isExpanded}
        aria-controls={`section-content-${section.id}`}
        onClick={() => toggleSection(section.id)}
        className={`group relative z-10 w-full p-6 rounded-3xl border-2 transition-all duration-200 cursor-pointer text-center bg-white shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-400 ${
          isExpanded
            ? 'border-indigo-500 ring-4 ring-indigo-50 shadow-md'
            : 'border-slate-200 hover:border-indigo-400'
        }`}
      >
        {/* Topic Header Row */}
        <div className="flex items-center justify-between mb-2">
          <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600">
            {getSectionIcon(sIdx)}
            <span>{messages.roadmap.topicPrefix} 0{sIdx + 1}</span>
          </span>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            {publishedInSec}/{sortedNodes.length} {messages.roadmap.lessonsOpened}
          </span>
        </div>

        {/* Section Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
          {section.title}
        </h2>

        {/* Signature Indicator Underline Bar */}
        <div
          className={`h-1.5 rounded-full mx-auto my-3 transition-all duration-300 ${
            isExpanded
              ? 'w-24 bg-indigo-600 shadow-[0_0_10px_rgba(99,102,241,0.5)]'
              : 'w-16 bg-slate-300 group-hover:w-20 group-hover:bg-indigo-500'
          }`}
        />

        {section.description && (
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto line-clamp-2">
            {section.description}
          </p>
        )}

        {/* Expand / Collapse Indicator */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs font-semibold text-indigo-600">
          {isExpanded ? (
            <>
              <span>{messages.roadmap.collapseLessons}</span>
              <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              <span>{messages.roadmap.clickToExpand} ({sortedNodes.length})</span>
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </div>
      </button>

      {/* Stepping-Stone Learning Path */}
      <div
        id={`section-content-${section.id}`}
        aria-labelledby={`section-header-${section.id}`}
        className={`transition-all duration-300 ease-in-out relative z-20 ${
          isExpanded
            ? 'opacity-100 max-h-[3000px] mt-6'
            : 'opacity-0 max-h-0 overflow-hidden pointer-events-none'
        }`}
      >
        <div className="bg-white/95 backdrop-blur rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          {/* Milestone Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-4 sm:p-5 text-white shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-100">
                {messages.roadmap.learningMilestone} 0{sIdx + 1}
              </div>
              <div className="text-base font-extrabold tracking-tight">
                {messages.roadmap.milestonePrefix} {section.title}
              </div>
            </div>
            <span className="px-3 py-1 rounded-xl bg-white/20 text-xs font-bold uppercase tracking-wider">
              {publishedInSec}/{sortedNodes.length} {messages.roadmap.readyBadge}
            </span>
          </div>

          {/* Stepping-Stone Nodes along continuous connector spine */}
          <div className="relative py-4 flex flex-col items-center">
            <div className="relative w-full max-w-sm mx-auto flex flex-col items-center">
              {sortedNodes.map((node, nIdx) => {
                const isPublished = node.status === 'published';
                const isPopoverOpen = activePopoverNodeId === node.id;
                const isLastNode = nIdx === sortedNodes.length - 1;
                const isFirstNode = nIdx === 0;

                const resolvedPrerequisites = (node.prerequisites || []).map((pId) => {
                  return nodeTitleMap.get(pId) || pId;
                });

                const lessonUrl = node.lessonSlug ? localizePath(locale, `/php/concepts/${node.lessonSlug}`) : '';

                return (
                  <React.Fragment key={node.id}>
                    {/* Node Container with auto-close on mouse leave */}
                    <div
                      className={`relative flex flex-col items-center group/node ${
                        isPopoverOpen ? 'z-50' : 'z-10'
                      }`}
                      onMouseEnter={() => setActivePopoverNodeId(node.id)}
                      onMouseLeave={() => setActivePopoverNodeId(null)}
                    >
                      {/* 3D Circular Stepping Stone Button */}
                      <button
                        type="button"
                        data-node-id={node.id}
                        tabIndex={isExpanded ? 0 : -1}
                        aria-expanded={isPopoverOpen}
                        aria-controls={`popover-panel-${node.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePopoverNodeId((prev) => (prev === node.id ? null : node.id));
                        }}
                        className={`relative w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-150 transform hover:scale-105 active:translate-y-1.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-400 z-10 ${
                          isPublished
                            ? 'bg-gradient-to-b from-amber-400 to-amber-500 text-white shadow-[0_7px_0_#d97706] hover:brightness-110 active:shadow-[0_1px_0_#d97706]'
                            : 'bg-gradient-to-b from-slate-400 to-slate-500 text-slate-100 shadow-[0_7px_0_#475569] active:shadow-[0_1px_0_#475569]'
                        }`}
                        aria-label={`${messages.roadmap.lessonPrefix} ${sIdx + 1}.${nIdx + 1}: ${node.title}`}
                      >
                        {isPublished ? (
                          nIdx % 3 === 0 ? (
                            <Sparkles className="w-8 h-8 text-white drop-shadow" />
                          ) : nIdx % 3 === 1 ? (
                            <BookOpen className="w-8 h-8 text-white drop-shadow" />
                          ) : (
                            <Trophy className="w-8 h-8 text-white drop-shadow" />
                          )
                        ) : (
                          <Lock className="w-7 h-7 text-slate-200 drop-shadow" />
                        )}

                        {isPublished && (
                          <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white shadow-xs">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </span>
                        )}
                      </button>

                      {/* Transparent Hover Bridge */}
                      {isPopoverOpen && (
                        <div
                          className={`absolute w-40 h-6 pointer-events-auto ${
                            isFirstNode ? '-bottom-3' : '-top-3'
                          }`}
                        />
                      )}

                      {/* Speech Bubble Popover */}
                      {isPopoverOpen && (
                        <div
                          id={`popover-panel-${node.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className={`absolute z-50 w-72 sm:w-80 p-5 rounded-3xl bg-gradient-to-b from-rose-500 to-pink-600 text-white shadow-2xl border-2 border-white/30 animate-in fade-in zoom-in-95 duration-150 ${
                            isFirstNode ? 'top-[88px]' : 'bottom-[88px]'
                          }`}
                          role="region"
                          aria-labelledby={`lesson-heading-${node.id}`}
                        >
                          {/* Speech Bubble Arrow Tail */}
                          {isFirstNode ? (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-b-12 border-b-rose-500" />
                          ) : (
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-12 border-t-pink-600" />
                          )}

                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-xs font-bold text-rose-100">
                              <span>{messages.roadmap.lessonPrefix} {sIdx + 1}.${nIdx + 1}</span>
                              <button
                                type="button"
                                aria-label={messages.roadmap.closeLessonDetails}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActivePopoverNodeId(null);
                                }}
                                className="p-0.5 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Lesson Title */}
                            <h3 id={`lesson-heading-${node.id}`} className="text-lg font-extrabold leading-snug">
                              {node.title}
                            </h3>

                            {/* Prerequisites Display */}
                            {resolvedPrerequisites.length > 0 && (
                              <div className="text-xs text-rose-100 space-y-1 pt-1 border-t border-rose-400/40">
                                <div className="font-semibold flex items-center gap-1">
                                  <GitBranch className="w-3.5 h-3.5" />
                                  <span>{messages.roadmap.prerequisites}</span>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {resolvedPrerequisites.map((title) => (
                                    <span
                                      key={title}
                                      className="px-2 py-0.5 rounded-md bg-white/20 text-white font-medium text-[11px]"
                                    >
                                      {title}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* 3D Action Button */}
                            <div className="pt-2">
                              {isPublished && node.lessonSlug ? (
                                <Link
                                  href={lessonUrl}
                                  tabIndex={isExpanded ? 0 : -1}
                                  className="block w-full py-3 px-4 rounded-2xl bg-white text-rose-600 font-extrabold text-sm uppercase tracking-wider text-center shadow-[0_4px_0_#cbd5e1] hover:bg-slate-50 active:translate-y-1 active:shadow-none transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                >
                                  {messages.roadmap.startLesson}
                                </Link>
                              ) : (
                                <div
                                  aria-disabled="true"
                                  className="w-full py-2.5 px-4 rounded-2xl bg-white/20 text-white font-bold text-xs uppercase tracking-wider text-center"
                                >
                                  {messages.roadmap.comingSoon}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Accessible element for automated test runners and screen readers */}
                      <div className="sr-only">
                        {isPublished && node.lessonSlug ? (
                          <Link href={lessonUrl} tabIndex={isExpanded ? 0 : -1}>
                            {node.title}
                          </Link>
                        ) : (
                          <div aria-disabled="true">
                            {node.title}
                          </div>
                        )}
                        {resolvedPrerequisites.map((title) => (
                          <span key={title}>{title}</span>
                        ))}
                      </div>
                    </div>

                    {!isLastNode && (
                      <div className="w-2 h-10 my-1 rounded-full bg-indigo-300 shadow-inner pointer-events-none" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
