import { AlertTriangle, RotateCw } from 'lucide-react';

export default function ErrorState({
  message = "We couldn't load this information right now. Please try again.",
  onRetry,
  retryLabel = 'Try again',
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center rounded-xl border border-rose-200 bg-rose-50 px-6 py-10 text-center"
    >
      <AlertTriangle size={28} className="mb-3 text-rose-500" />
      <p className="max-w-md font-medium text-rose-700">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-rose-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
        >
          <RotateCw size={15} /> {retryLabel}
        </button>
      )}
    </div>
  );
}
