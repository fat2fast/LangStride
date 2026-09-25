import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'LangStride - Engineering-Grade Programming Roadmaps',
  description: 'Structured, language-neutral roadmaps and bite-sized lessons designed for senior engineers and aspiring experts.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col">
        <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-slate-900 hover:text-blue-600 transition-colors">
              <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
                L
              </span>
              <span>LangStride</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
              <Link href="/php" className="hover:text-blue-600 transition-colors">PHP Roadmap</Link>
              <a href="https://github.com/fat2fast/LangStride" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-700 transition-colors">GitHub</a>
            </nav>
          </div>
        </header>
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
          {children}
        </main>
        <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
          <p>LangStride Community Edition &mdash; Open-source, deterministic, local-first.</p>
        </footer>
      </body>
    </html>
  );
}
