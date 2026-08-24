import { useMemo, useState, useRef, useEffect } from 'react';
import { Search, X, Plus, Check } from 'lucide-react';
import SkillBadge from './SkillBadge';
import { cx } from '../utils';

export default function SkillSelector({
  skills = [],
  selected = [],
  onAdd,
  onRemove,
}) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const selectedIds = useMemo(() => new Set(selected.map((s) => s.id)), [selected]);

  const clearSearch = () => {
    setQuery('');
    setOpen(true);
  };

  const clearAll = () => {
    selected.forEach((s) => onRemove(s.id));
  };

  const showClearAll = selected.length > 0;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return skills
      .filter((s) => !selectedIds.has(s.id))
      .filter((s) => (q ? s.name.toLowerCase().includes(q) : true))
      .slice(0, 12);
  }, [skills, selectedIds, query]);

  useEffect(() => {
    function onClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
      <label htmlFor="skill-search" className="mb-2 block text-sm font-medium text-slate-700">
        Select Your Skills
      </label>

      {selected.length > 0 && (
        <div className="mb-3">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Selected skills ({selected.length})
            </span>
            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-medium text-slate-500 hover:text-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="Selected skills">
            {selected.map((s) => (
              <span
                key={s.id}
                className="inline-flex items-center gap-1 rounded-full bg-brand-100 py-1 pl-3 pr-1 text-sm font-medium text-brand-700 ring-1 ring-inset ring-brand-200"
              >
                {s.name}
                <button
                  type="button"
                  onClick={() => onRemove(s.id)}
                  aria-label={`Remove ${s.name}`}
                  className="rounded-full p-0.5 text-brand-600 hover:bg-brand-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <div ref={wrapperRef} className="relative">
        <div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500">
          <Search size={16} className="text-slate-400" />
          <input
            id="skill-search"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder={skills.length ? 'Search skills…' : 'Loading skills…'}
            disabled={skills.length === 0}
            className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className="rounded-full p-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {open && filtered.length > 0 && (
          <ul
            role="listbox"
            aria-label="Available skills"
            className="absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded-lg border border-slate-200 bg-white py-1 shadow-card-hover"
          >
            {filtered.map((s) => (
              <li key={s.id} role="option" aria-selected={false}>
                <button
                  type="button"
                  onClick={() => {
                    onAdd(s);
                    setQuery('');
                  }}
                  className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 focus:bg-slate-100 focus:outline-none"
                >
                  <span className="flex items-center gap-2">
                    {s.name}
                    <SkillBadge variant="category">{s.category}</SkillBadge>
                  </span>
                  <Plus size={16} className="text-brand-600" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {skills.length > 0 && filtered.length === 0 && open && (
        <p className="mt-2 text-sm text-slate-400">No skills found.</p>
      )}
    </div>
  );
}
