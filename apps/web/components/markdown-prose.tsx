import React from 'react';

interface MarkdownProseProps {
  content: string;
  className?: string;
}

/**
 * Parses inline markdown:
 * - **bold** or __bold__
 * - *italic* or _italic_
 * - `code`
 * - [text](url) (only http/https or relative)
 * Safely creates React nodes without dangerouslySetInnerHTML.
 */
export function renderInlineMarkdown(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let remaining = text;
  let keyIndex = 0;

  // Regex matching inline tokens:
  // 1: `code`
  // 2: **bold** or __bold__
  // 3: *italic* or _italic_
  // 4: [text](url)
  const inlineRegex = /(`([^`]+)`)|\*\*([^*]+)\*\*|__([^_]+)__|(\*([^*]+)\*)|_([^_]+)_|(\[([^\]]+)\]\(([^)]+)\))/;

  while (remaining.length > 0) {
    const match = remaining.match(inlineRegex);
    if (!match || match.index === undefined) {
      nodes.push(remaining);
      break;
    }

    if (match.index > 0) {
      nodes.push(remaining.slice(0, match.index));
    }

    const matchedStr = match[0];

    if (matchedStr.startsWith('`') && matchedStr.endsWith('`')) {
      const codeText = match[2];
      nodes.push(
        <code
          key={`code-${keyIndex++}`}
          className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono text-xs sm:text-sm border border-slate-200"
        >
          {codeText}
        </code>
      );
    } else if (matchedStr.startsWith('**') || matchedStr.startsWith('__')) {
      const boldText = match[3] || match[4];
      nodes.push(
        <strong key={`strong-${keyIndex++}`} className="font-semibold text-slate-900">
          {renderInlineMarkdown(boldText)}
        </strong>
      );
    } else if (matchedStr.startsWith('*') || matchedStr.startsWith('_')) {
      const italicText = match[6] || match[7];
      nodes.push(
        <em key={`em-${keyIndex++}`} className="italic">
          {renderInlineMarkdown(italicText)}
        </em>
      );
    } else if (matchedStr.startsWith('[')) {
      const linkText = match[9];
      const rawUrl = match[10]?.trim() || '';
      // Only allow safe URLs (http, https, or relative paths)
      const isSafeUrl = /^(https?:\/\/|\/|mailto:)/i.test(rawUrl);
      if (isSafeUrl) {
        nodes.push(
          <a
            key={`a-${keyIndex++}`}
            href={rawUrl}
            target={rawUrl.startsWith('http') ? '_blank' : undefined}
            rel={rawUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="text-blue-600 hover:text-blue-800 underline underline-offset-2 inline-flex items-center gap-0.5"
          >
            {renderInlineMarkdown(linkText)}
          </a>
        );
      } else {
        nodes.push(linkText);
      }
    }

    remaining = remaining.slice(match.index + matchedStr.length);
  }

  return nodes;
}

/**
 * Constrained, secure Markdown prose renderer.
 * Converts markdown prose (paragraphs, ordered/unordered lists, blockquotes, subheadings)
 * into semantic React elements with zero dangerouslySetInnerHTML usage.
 */
export function MarkdownProse({ content, className = '' }: MarkdownProseProps) {
  if (!content) return null;

  // Split into raw line blocks
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const elements: React.ReactNode[] = [];
  let lineIdx = 0;

  while (lineIdx < lines.length) {
    const line = lines[lineIdx];

    // Blank line
    if (!line.trim()) {
      lineIdx++;
      continue;
    }

    // Ordered list item (e.g. "1. Item")
    if (/^\s*\d+\.\s+/.test(line)) {
      const listItems: string[] = [];
      while (lineIdx < lines.length && /^\s*\d+\.\s+/.test(lines[lineIdx])) {
        listItems.push(lines[lineIdx].replace(/^\s*\d+\.\s+/, ''));
        lineIdx++;
      }
      elements.push(
        <ol key={`ol-${lineIdx}`} className="list-decimal pl-6 space-y-1.5 my-3 text-slate-700 leading-relaxed">
          {listItems.map((item, idx) => (
            <li key={idx} className="pl-1">
              {renderInlineMarkdown(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Unordered list item (e.g. "- Item" or "* Item")
    if (/^\s*[-*]\s+/.test(line)) {
      const listItems: string[] = [];
      while (lineIdx < lines.length && /^\s*[-*]\s+/.test(lines[lineIdx])) {
        listItems.push(lines[lineIdx].replace(/^\s*[-*]\s+/, ''));
        lineIdx++;
      }
      elements.push(
        <ul key={`ul-${lineIdx}`} className="list-disc pl-6 space-y-1.5 my-3 text-slate-700 leading-relaxed">
          {listItems.map((item, idx) => (
            <li key={idx} className="pl-1">
              {renderInlineMarkdown(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Blockquote
    if (/^\s*>\s+/.test(line)) {
      const quoteLines: string[] = [];
      while (lineIdx < lines.length && /^\s*>\s+/.test(lines[lineIdx])) {
        quoteLines.push(lines[lineIdx].replace(/^\s*>\s+/, ''));
        lineIdx++;
      }
      elements.push(
        <blockquote
          key={`bq-${lineIdx}`}
          className="border-l-4 border-indigo-300 pl-4 py-1 italic text-slate-600 my-3 bg-slate-50/50 rounded-r"
        >
          {quoteLines.map((ql, qIdx) => (
            <p key={qIdx} className="leading-relaxed">
              {renderInlineMarkdown(ql)}
            </p>
          ))}
        </blockquote>
      );
      continue;
    }

    // Subheadings (### or ####)
    if (/^#{3,4}\s+/.test(line)) {
      const isH3 = line.startsWith('### ');
      const headingText = line.replace(/^#{3,4}\s+/, '');
      if (isH3) {
        elements.push(
          <h3 key={`h3-${lineIdx}`} className="text-lg font-bold text-slate-900 mt-4 mb-2">
            {renderInlineMarkdown(headingText)}
          </h3>
        );
      } else {
        elements.push(
          <h4 key={`h4-${lineIdx}`} className="text-base font-semibold text-slate-900 mt-3 mb-1">
            {renderInlineMarkdown(headingText)}
          </h4>
        );
      }
      lineIdx++;
      continue;
    }

    // Regular paragraph: accumulate consecutive non-empty lines that aren't list/quote/heading
    const paragraphLines: string[] = [];
    while (
      lineIdx < lines.length &&
      lines[lineIdx].trim() !== '' &&
      !/^\s*\d+\.\s+/.test(lines[lineIdx]) &&
      !/^\s*[-*]\s+/.test(lines[lineIdx]) &&
      !/^\s*>\s+/.test(lines[lineIdx]) &&
      !/^#{3,4}\s+/.test(lines[lineIdx])
    ) {
      paragraphLines.push(lines[lineIdx].trim());
      lineIdx++;
    }

    elements.push(
      <p key={`p-${lineIdx}`} className="leading-relaxed text-slate-700">
        {renderInlineMarkdown(paragraphLines.join(' '))}
      </p>
    );
  }

  return <div className={`space-y-3 ${className}`}>{elements}</div>;
}
