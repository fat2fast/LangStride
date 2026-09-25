import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="py-20 text-center space-y-6 max-w-md mx-auto">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-slate-500 font-bold text-2xl">
        404
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-900">Topic Not Found</h1>
        <p className="text-sm text-slate-500">
          The requested lesson does not exist or has not been published yet.
        </p>
      </div>
      <div>
        <Link
          href="/php"
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors text-sm"
        >
          Return to PHP Roadmap
        </Link>
      </div>
    </div>
  );
}
