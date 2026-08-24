import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building2, MapPin, Briefcase, Wallet, RotateCw } from 'lucide-react';
import SkillBadge from '../components/SkillBadge';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { useSelectedSkills } from '../context/SelectedSkillsContext';
import { getJobById, getMissingSkills, normalizeError } from '../services/api';
import { formatSalaryLakh } from '../utils';
import { usePageTitle } from '../hooks';

export default function JobDetailsPage() {
  const { id } = useParams();
  const { selectedSkills } = useSelectedSkills();

  const [job, setJob] = useState(null);
  const [missing, setMissing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  usePageTitle('Job Details | CareerGraph');

  const loadJob = useCallback(() => {
    let active = true;
    setLoading(true);
    setError(null);

    getJobById(id)
      .then(async (res) => {
        if (!active) return;
        const jobData = res.data;
        setJob(jobData);

        if (selectedSkills.length > 0) {
          try {
            const missRes = await getMissingSkills(id, selectedSkills.map((s) => s.name));
            if (active) setMissing(missRes.data);
          } catch {
            /* missing-skills is optional */
          }
        }
      })
      .catch((err) => {
        if (active) setError(normalizeError(err));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id, selectedSkills]);

  useEffect(() => {
    loadJob();
  }, [loadJob]);

  if (loading) return <LoadingState count={1} label="Loading job details…" />;

  if (error?.isNotFound) {
    return (
      <div className="mx-auto max-w-3xl">
        <Link
          to="/jobs"
          className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          <ArrowLeft size={16} /> Back to Jobs
        </Link>
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-card">
          <h1 className="text-2xl font-bold text-slate-900">Job not found</h1>
          <p className="mt-2 max-w-sm text-slate-500">
            The role you're looking for may no longer be available.
          </p>
          <Link
            to="/jobs"
            className="mt-6 inline-flex items-center gap-1 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            Browse all jobs
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl">
        <Link
          to="/jobs"
          className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          <ArrowLeft size={16} /> Back to Jobs
        </Link>
        <ErrorState message={error.message} onRetry={loadJob} />
      </div>
    );
  }

  if (!job) return <ErrorState message="Job not found." onRetry={loadJob} />;

  const salary = formatSalaryLakh(job.salaryMin, job.salaryMax);
  const matchedNames = new Set(missing?.matchedSkills || []);
  const missingNames = new Set(missing?.missingSkills || []);

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/jobs"
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        <ArrowLeft size={16} /> Back to Jobs
      </Link>

      <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{job.title}</h1>

        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
          {job.company && (
            <span className="inline-flex items-center gap-1">
              <Building2 size={15} /> {job.company.name}
            </span>
          )}
          {job.location && (
            <span className="inline-flex items-center gap-1">
              <MapPin size={15} /> {job.location.city}, {job.location.state}
            </span>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          {job.experienceLevel && (
            <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1 text-slate-600">
              <Briefcase size={13} /> {job.experienceLevel}
            </span>
          )}
          {job.employmentType && (
            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-slate-600">
              {job.employmentType}
            </span>
          )}
          {salary && (
            <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1 text-slate-600">
              <Wallet size={13} /> {salary}
            </span>
          )}
        </div>

        {job.description && (
          <section className="mt-6">
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Description
            </h2>
            <p className="leading-relaxed text-slate-700">{job.description}</p>
          </section>
        )}

        <section className="mt-6">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Required Skills
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {job.requiredSkills?.map((s) => (
              <SkillBadge key={s.id}>{s.name}</SkillBadge>
            ))}
          </div>
        </section>

        {missing && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <h2 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                Skills You Already Have
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {missing.matchedSkills.length > 0 ? (
                  missing.matchedSkills.map((s) => (
                    <SkillBadge key={s} variant="matched">
                      {s}
                    </SkillBadge>
                  ))
                ) : (
                  <span className="text-sm text-emerald-600/80">
                    None of your selected skills match this job yet.
                  </span>
                )}
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h2 className="mb-2 text-sm font-semibold text-slate-600">Skills To Learn</h2>
              <div className="flex flex-wrap gap-1.5">
                {missing.missingSkills.length > 0 ? (
                  missing.missingSkills.map((s) => (
                    <SkillBadge key={s} variant="missing">
                      {s}
                    </SkillBadge>
                  ))
                ) : (
                  <span className="text-sm text-slate-500">
                    You already have all required skills. 🎉
                  </span>
                )}
              </div>
            </section>
          </div>
        )}

        {selectedSkills.length === 0 && (
          <p className="mt-6 rounded-lg bg-slate-50 p-3 text-sm text-slate-500">
            Select skills on the Home page to see which ones you already have for this role.
          </p>
        )}
      </article>
    </div>
  );
}
