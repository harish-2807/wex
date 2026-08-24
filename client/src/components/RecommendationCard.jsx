import { Link } from 'react-router-dom';
import { Check, X, ArrowRight, MapPin, Building2 } from 'lucide-react';
import SkillBadge from './SkillBadge';
import { matchColor, cx } from '../utils';

export default function RecommendationCard({ rec }) {
  return (
    <article className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{rec.title}</h3>
          <p className="mt-0.5 text-sm text-slate-500">
            {rec.company}
            {rec.location && (
              <span className="inline-flex items-center gap-1">
                {' · '}
                <MapPin size={13} /> {rec.location.city}, {rec.location.state}
              </span>
            )}
          </p>
        </div>
        <div
          className={cx(
            'flex shrink-0 flex-col items-center justify-center rounded-xl px-3 py-2 text-center ring-1 ring-inset',
            matchColor(rec.matchPercentage)
          )}
        >
          <span className="text-lg font-bold leading-none">{rec.matchPercentage}%</span>
          <span className="text-[10px] font-medium uppercase tracking-wide">Match</span>
        </div>
      </div>

      <div className="mb-3 space-y-2">
        <div>
          <p className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
            <Check size={13} /> You have {rec.matchedSkillCount} of {rec.totalRequired} skills
          </p>
          <div className="flex flex-wrap gap-1.5">
            {rec.matchedSkills.map((s) => (
              <SkillBadge key={s} variant="matched">
                {s}
              </SkillBadge>
            ))}
            {rec.matchedSkills.length === 0 && (
              <span className="text-xs text-slate-400">No overlapping skills</span>
            )}
          </div>
        </div>

        {rec.missingSkills.length > 0 && (
          <div>
            <p className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <X size={13} /> Top missing skills
            </p>
            <div className="flex flex-wrap gap-1.5">
              {rec.missingSkills.slice(0, 6).map((s) => (
                <SkillBadge key={s} variant="missing">
                  {s}
                </SkillBadge>
              ))}
            </div>
          </div>
        )}
      </div>

      <Link
        to={`/jobs/${rec.id}`}
        className="mt-auto inline-flex items-center gap-1 self-start rounded-lg px-3 py-1.5 text-sm font-medium text-brand-700 transition-colors hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        View Details <ArrowRight size={15} />
      </Link>
    </article>
  );
}
