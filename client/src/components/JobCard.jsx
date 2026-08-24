import { Link } from 'react-router-dom';
import { Building2, MapPin, Briefcase, ArrowRight } from 'lucide-react';
import SkillBadge from './SkillBadge';
import { formatSalaryLakh } from '../utils';

export default function JobCard({ job }) {
  const salary = formatSalaryLakh(job.salaryMin, job.salaryMax);
  return (
    <article className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover">
      <div className="mb-1 flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-slate-900">{job.title}</h3>
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
        {job.company && (
          <span className="inline-flex items-center gap-1">
            <Building2 size={14} /> {job.company.name}
          </span>
        )}
        {job.location && (
          <span className="inline-flex items-center gap-1">
            <MapPin size={14} /> {job.location.city}, {job.location.state}
          </span>
        )}
      </div>

      <div className="mb-3 flex flex-wrap gap-2 text-xs text-slate-500">
        {job.experienceLevel && (
          <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5">
            <Briefcase size={12} /> {job.experienceLevel}
          </span>
        )}
        {job.employmentType && (
          <span className="rounded-md bg-slate-100 px-2 py-0.5">{job.employmentType}</span>
        )}
        {salary && <span className="rounded-md bg-slate-100 px-2 py-0.5">{salary}</span>}
      </div>

      {job.requiredSkills?.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {job.requiredSkills.slice(0, 6).map((s) => (
            <SkillBadge key={s.id}>{s.name}</SkillBadge>
          ))}
          {job.requiredSkills.length > 6 && (
            <SkillBadge>+{job.requiredSkills.length - 6}</SkillBadge>
          )}
        </div>
      )}

      <Link
        to={`/jobs/${job.id}`}
        className="mt-auto inline-flex items-center gap-1 self-start rounded-lg px-3 py-1.5 text-sm font-medium text-brand-700 transition-colors hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        View Details <ArrowRight size={15} />
      </Link>
    </article>
  );
}
