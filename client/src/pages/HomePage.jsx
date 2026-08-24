import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Loader2 } from 'lucide-react';
import SkillSelector from '../components/SkillSelector';
import RecommendationCard from '../components/RecommendationCard';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import { useSelectedSkills } from '../context/SelectedSkillsContext';
import { getSkills, getRecommendations, normalizeError } from '../services/api';
import { usePageTitle } from '../hooks';

export default function HomePage() {
  const navigate = useNavigate();
  const { selectedSkills, addSkill, removeSkill } = useSelectedSkills();

  const [allSkills, setAllSkills] = useState([]);
  const [skillsError, setSkillsError] = useState(false);
  const [skillsLoaded, setSkillsLoaded] = useState(false);

  const [recommendations, setRecommendations] = useState([]);
  const [loadingRecs, setLoadingRecs] = useState(false);
  const [recsError, setRecsError] = useState(false);
  const [searched, setSearched] = useState(false);
  const submittingRef = useRef(false);

  usePageTitle('CareerGraph — Job & Skill Explorer');

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

  const runRecommendations = useCallback(async () => {
    if (selectedSkills.length === 0 || submittingRef.current) return;
    submittingRef.current = true;
    setLoadingRecs(true);
    setRecsError(false);
    setSearched(true);
    try {
      const res = await getRecommendations(selectedSkills.map((s) => s.name));
      setRecommendations(res.data || []);
    } catch (err) {
      setRecsError(true);
      setRecommendations([]);
      console.error('Recommendations request failed:', normalizeError(err).message);
    } finally {
      setLoadingRecs(false);
      submittingRef.current = false;
    }
  }, [selectedSkills]);

  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 px-6 py-10 text-center shadow-card sm:px-10">
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-700">
          <Sparkles size={14} /> Graph-powered recommendations
        </span>
        <h1 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Discover where your skills can take you.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-500">
          Explore jobs, missing skills, related technologies, and career opportunities using a
          graph-powered recommendation system.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
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
            onClick={runRecommendations}
            disabled={selectedSkills.length === 0 || loadingRecs}
            className="w-full rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-card transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            {loadingRecs ? (
              <span className="inline-flex items-center justify-center gap-2">
                <Loader2 size={16} className="animate-spin" /> Finding Matching Jobs…
              </span>
            ) : (
              `Find Matching Jobs${selectedSkills.length ? ` (${selectedSkills.length})` : ''}`
            )}
          </button>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Matching Jobs</h2>

          {loadingRecs && <LoadingState count={3} label="Finding matching jobs…" />}

          {!loadingRecs && recsError && (
            <ErrorState
              message="We couldn't load recommendations right now. Please try again."
              onRetry={runRecommendations}
            />
          )}

          {!loadingRecs && !recsError && searched && recommendations.length === 0 && (
            <EmptyState
              title="No matching jobs found yet"
              message="Try adding another skill or explore related skills to discover more roles."
            />
          )}

          {!loadingRecs && !searched && !recsError && (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-400">
              Select a few skills to discover matching roles, then press “Find Matching Jobs”.
            </div>
          )}

          {!loadingRecs && !recsError && recommendations.length > 0 && (
            <div className="grid gap-4" aria-live="polite">
              {recommendations.map((rec) => (
                <RecommendationCard key={rec.id} rec={rec} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
