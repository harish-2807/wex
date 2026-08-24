export function formatSalary(min, max) {
  if (min == null && max == null) return null;
  const fmt = (n) => {
    if (n == null) return null;
    return `₹${Number(n).toLocaleString('en-IN')}`;
  };
  const lo = fmt(min);
  const hi = fmt(max);
  if (lo && hi) return `${lo} – ${hi}`;
  return lo || hi;
}

// Compact Indian format, e.g. 800000 -> "₹8L", 1500000 -> "₹15L".
function toLakh(n) {
  const value = Number(n) / 100000;
  const rounded = Math.round(value * 10) / 10;
  return `₹${Number.isInteger(rounded) ? rounded : rounded.toFixed(1)}L`;
}

export function formatSalaryLakh(min, max) {
  if (min == null && max == null) return null;
  const lo = min != null ? toLakh(min) : null;
  const hi = max != null ? toLakh(max) : null;
  if (lo && hi) return `${lo} – ${hi}`;
  return lo || hi;
}

export function matchColor(pct) {
  if (pct >= 70) return 'bg-emerald-100 text-emerald-700 ring-emerald-200';
  if (pct >= 40) return 'bg-amber-100 text-amber-700 ring-amber-200';
  return 'bg-rose-100 text-rose-700 ring-rose-200';
}

export function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}
