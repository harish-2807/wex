import { cx } from '../utils';

export default function SkillBadge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-slate-100 text-slate-700 ring-slate-200',
    matched: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
    missing: 'bg-slate-100 text-slate-500 ring-slate-200',
    related: 'bg-brand-100 text-brand-700 ring-brand-200',
    category: 'bg-violet-100 text-violet-700 ring-violet-200',
  };

  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset',
        variants[variant] || variants.default,
        className
      )}
    >
      {children}
    </span>
  );
}
