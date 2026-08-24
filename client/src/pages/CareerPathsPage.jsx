import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Loader2, Sparkles, RotateCw } from 'lucide-react';
import SkillSelector from '../components/SkillSelector';
import CareerGraph from '../components/CareerGraph';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import { useSelectedSkills } from '../context/SelectedSkillsContext';
import { getSkills, getCareerPaths, getOpportunities, normalizeError } from '../services/api';
import { usePageTitle } from '../hooks';

function PathCard({ path }) {
  const Step = ({ label, value, sub }) => (
    <div className="px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="font-semibold text-slate-900">{value}</p>
      {sub && <p className="text-xs text-slate-500">{sub}</p>}
    </div>
  );

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card">
      <div className="flex flex-col divide-y divide-slate-100">
        <Step label="Starting Skill" value={path.startingSkill} />
        <div className="flex items-center gap-2 bg-brand-50/60 px-4 py-1 text-xs font-medium text-brand-700">
          <ArrowDown size={14} /> Related skill · strength {path.relationshipStrength}
        </div>
        <Step label="Related Skill" value={path.relatedSkill} />
        <div className="flex items-center gap-2 bg-slate-50 px-4 py-1 text-xs font-medium text-slate-500">
          <ArrowDown size={14} /> Unlocks role
        </div>
        <Step label="Job" value={path.job.title} />
        <div className="flex items-center gap-2 bg-slate-50 px-4 py-1 text-xs font-medium text-slate-500">
          <ArrowDown size={14} /> Offered by
        </div>
        <Step label="Company" value={path.company.name} />
        <div className="flex items-center gap-2 bg-slate-50 px-4 py-1 text-xs font-medium text-slate-500">
          <ArrowDown size={14} /> Location
        </div>
        <Step label="Location" value={`${path.location.city}, ${path.location.state}`} />
      </div>
    </article>
  );
}

function OpportunityCard({ opp }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
      <div className="mb-1 flex items-center justify-between gap-2">
        <h3 className="font-semibold text-slate-900">{opp.job.title}</h3>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
          score {opp.relevanceScore}
        </span>
      </div>
      <p className="mb-3 text-sm text-slate-500">
        {opp.company.name} · {opp.location.city}, {opp.location.state}
      </p>

      {opp.directlyMatchedSkills.length > 0 && (
        <div className="mb-2">
          <p className="mb-1 text-xs font-semibold text-emerald-700">Direct Match</p>
          <div className="flex flex-wrap gap-1.5">
            {opp.directlyMatchedSkills.map((s) => (
              <span
                key={s}
                className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {opp.discoveredThroughSkills.length > 0 && (
        <div>
          <p className="mb-1 text-xs font-semibold text-brand-700">Discovered Through</p>
          <div className="flex flex-wrap gap-1.5">
            {opp.discoveredThroughSkills.map((s) => (
              <span
                key={s}
                className="inline-flex items-center rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-medium text-brand-700 ring-1 ring-inset ring-brand-200"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

export default function CareerPathsPage() {
  const { selectedSkills, addSkill, removeSkill } = useSelectedSkills();
  const [allSkills, setAllSkills] = useState([]);
  const [skillsLoaded, setSkillsLoaded] = useState(false);
  const [skillsError, setSkillsError] = useState(false);

  const [paths, setPaths] = useState([]);
  const [opps, setOpps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  usePageTitle('Career Paths | CareerGraph');

  const loadSkills = useCallback(() => {
    setSkillsError(false);
    getSkills()
      .then((res) => setAllSkills(res.data || []))
      .catch(() => setSkillsError(true))
      .finally(() => setSkillsLoaded(true));
  }, []);

  useEffect(() => {
    loadSkills();
  }, [loadSkills]);

  const run = useCallback(async () => {
    if (selectedSkills.length === 0 || loading) return;
    setLoading(true);
    setError(null);
    setSearched(true);
    const names = selectedSkills.map((s) => s.name);
    try {
      const [p, o] = await Promise.all([getCareerPaths(names), getOpportunities(names)]);
      setPaths(p.data || []);
      setOpps(o.data || []);
    } catch (err) {
      setError(normalizeError(err));
      setPaths([]);
      setOpps([]);
    } finally {
      setLoading(false);
    }
  }, [selectedSkills, loading]);

  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Career Paths
        </h1>
        <p className="mt-2 max-w-2xl text-slate-500">
          See how one skill connects to related skills, the jobs they unlock, and the companies and
          locations behind them.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            {!skillsLoaded && !skillsError && (
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
                <p className="inline-flex items-center gap-2 text-sm text-slate-400">
                  <Loader2 size={16} className="animate-spin" /> Loading skills…
                </p>
              </div>
            )}
            {skillsLoaded && !skillsError && (
              <SkillSelector skills={allSkills} selected={selectedSkills} onAdd={addSkill} onRemove={removeSkill} />
            )}
            {skillsError && (
              <ErrorState
                message="We couldn't load the skill list. Please try again."
                onRetry={loadSkills}
              />
            )}
            <button
              type="button"
              onClick={run}
              disabled={selectedSkills.length === 0 || loading}
              className="w-full rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-card transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              {loading ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <Loader2 size={16} className="animate-spin" /> Exploring Paths…
                </span>
              ) : (
                'Explore Career Paths'
              )}
            </button>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Graph Traversal</h2>
            {loading && <LoadingState count={3} label="Exploring paths…" />}
            {!loading && error && (
              <ErrorState
                message="We couldn't build career paths right now. Please try again."
                onRetry={run}
              />
            )}
            {!loading && !error && searched && paths.length === 0 && (
              <EmptyState
                title="No career paths were found for these skills"
                message="Try selecting additional skills to discover more connections."
              />
            )}
            {!loading && !searched && !error && (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-400">
                Select your skills and explore how they connect to jobs.
              </div>
            )}
            {!loading && !error && paths.length > 0 && (
              <div className="grid gap-4" aria-live="polite">
                {paths.map((p, i) => (
                  <PathCard key={`${p.startingSkill}-${p.relatedSkill}-${p.job.id}-${i}`} path={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mt-10">
        <CareerGraph
          paths={paths}
          opps={opps}
          loading={loading}
          error={error}
          onRetry={run}
          selectedSkills={selectedSkills}
        />
      </section>

      <section>
        <div className="mb-4 flex items-center gap-2">
          <Sparkles size={18} className="text-brand-600" />
          <h2 className="text-lg font-semibold text-slate-900">Opportunities</h2>
        </div>
        <p className="mb-4 max-w-2xl text-sm text-slate-500">
          Jobs found through direct skill matches and through related skills discovered by the graph.
        </p>

        {loading && <LoadingState count={3} label="Finding opportunities…" />}
        {!loading && error && (
          <ErrorState
            message="We couldn't load opportunities right now. Please try again."
            onRetry={run}
          />
        )}
        {!loading && !error && searched && opps.length === 0 && (
          <EmptyState
            title="No related opportunities found"
            message="Try selecting additional skills to widen the graph traversal."
          />
        )}
        {!loading && !searched && !error && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-400">
            Opportunities will appear here after you explore paths.
          </div>
        )}
        {!loading && !error && opps.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
            {opps.map((o) => (
              <OpportunityCard key={o.job.id} opp={o} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
