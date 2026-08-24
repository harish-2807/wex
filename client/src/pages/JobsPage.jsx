import { useEffect, useState, useMemo, useCallback } from 'react';
import { Search } from 'lucide-react';
import JobCard from '../components/JobCard';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import PageHeader from '../components/PageHeader';
import { getJobs, normalizeError } from '../services/api';
import { usePageTitle } from '../hooks';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');

  usePageTitle('Jobs | CareerGraph');

  const loadJobs = useCallback(() => {
    setLoading(true);
    setError(false);
    getJobs()
      .then((res) => setJobs(res.data || []))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const locations = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.location?.city).filter(Boolean))).sort(),
    [jobs]
  );
  const experiences = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.experienceLevel).filter(Boolean))).sort(),
    [jobs]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter((j) => {
      const matchesQuery =
        !q ||
        j.title.toLowerCase().includes(q) ||
        (j.company?.name || '').toLowerCase().includes(q);
      const matchesLocation = !location || j.location?.city === location;
      const matchesExp = !experience || j.experienceLevel === experience;
      return matchesQuery && matchesLocation && matchesExp;
    });
  }, [jobs, query, location, experience]);

  return (
    <div>
      <PageHeader
        title="Job Explorer"
        subtitle="Browse roles and the skills they require across companies and locations."
      />

      <div className="mb-6 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-card sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500">
          <Search size={16} className="text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by job title or company"
            aria-label="Search jobs"
            className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
          />
        </div>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          aria-label="Filter by location"
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-brand-500 focus:outline-none"
        >
          <option value="">All locations</option>
          {locations.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          aria-label="Filter by experience level"
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-brand-500 focus:outline-none"
        >
          <option value="">All experience</option>
          {experiences.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>

      {loading && <LoadingState count={6} label="Loading jobs…" />}
      {!loading && error && (
        <ErrorState message="We couldn't load jobs right now. Please try again." onRetry={loadJobs} />
      )}
      {!loading && !error && jobs.length === 0 && (
        <EmptyState title="No jobs are available right now." message="Check back later as new roles are added." />
      )}
      {!loading && !error && jobs.length > 0 && filtered.length === 0 && (
        <EmptyState title="No jobs match your filters" message="Try adjusting your search." />
      )}
      {!loading && !error && filtered.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
