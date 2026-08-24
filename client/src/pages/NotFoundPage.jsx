import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { usePageTitle } from '../hooks';

export default function NotFoundPage() {
  usePageTitle('Page Not Found | CareerGraph');

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-20 text-center shadow-card">
      <p className="mb-2 text-5xl font-bold tracking-tight text-brand-600">404</p>
      <Compass size={36} className="mb-4 text-brand-600" />
      <h1 className="text-2xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-2 max-w-sm text-slate-500">
        The page you’re looking for doesn’t exist or may have moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-1 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        Back to Home
      </Link>
    </div>
  );
}
