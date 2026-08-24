import { Loader2 } from 'lucide-react';

export default function LoadingState({ label = 'Loading…', count = 3 }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl border border-slate-200 bg-white p-5 shadow-card"
        >
          <div className="mb-3 h-4 w-2/3 rounded bg-slate-200" />
          <div className="mb-2 h-3 w-1/2 rounded bg-slate-100" />
          <div className="flex gap-2">
            <div className="h-6 w-16 rounded-full bg-slate-100" />
            <div className="h-6 w-16 rounded-full bg-slate-100" />
          </div>
        </div>
      ))}
      <span className="sr-only">{label}</span>
      <span className="mt-2 flex items-center gap-2 text-sm text-slate-400">
        <Loader2 size={16} className="animate-spin" />
        {label}
      </span>
    </div>
  );
}
