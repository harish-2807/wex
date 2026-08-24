import { Network } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <Network size={16} className="text-brand-600" />
          <span className="font-medium text-slate-700">CareerGraph</span>
        </div>
        <p className="text-center text-slate-400">
          Job &amp; Skill Relationship Explorer · Powered by CognoDB graph database
        </p>
      </div>
    </footer>
  );
}
