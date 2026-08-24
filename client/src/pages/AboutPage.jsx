import { Network, GitBranch, Database, MapPin, Briefcase, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks';

export default function AboutPage() {
  usePageTitle('About | CareerGraph');
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        About CareerGraph
      </h1>
      <p className="mt-3 text-slate-500">
        CareerGraph helps you discover jobs, companies, and career paths based on the skills you
        already have — and the skills connected to them.
      </p>

      <section className="mt-8 space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">What is a graph database?</h2>
        <p className="text-slate-600">
          A traditional database stores information in tables with rows and columns. A{' '}
          <strong>graph database</strong> stores information as <em>nodes</em> (things like skills,
          jobs, and companies) and <em>relationships</em> between them. Instead of joining many
          tables to answer “which jobs can my skills lead to?”, a graph follows the connections
          directly — which is fast and intuitive for relationship-heavy questions.
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Why skills and jobs are connected data
        </h2>
        <p className="text-slate-600">
          Skills relate to other skills, jobs require skills, and companies offer jobs in specific
          locations. These natural connections form a graph that makes recommendations, missing-skill
          analysis, and career exploration easy to express.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">How it works</h2>
        <ol className="space-y-3">
          {[
            { icon: Network, title: 'Your Skills', text: 'Select the technologies you know.' },
            { icon: GitBranch, title: 'Related Skills', text: 'The graph finds skills connected to yours.' },
            { icon: Briefcase, title: 'Jobs', text: 'Jobs requiring those skills are discovered.' },
            { icon: Database, title: 'Companies', text: 'The hiring companies are revealed.' },
            { icon: MapPin, title: 'Locations', text: 'And where those companies are located.' },
          ].map((step, i) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-card">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="font-medium text-slate-900">
                    {i + 1}. {step.title}
                  </p>
                  <p className="text-sm text-slate-500">{step.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
        CareerGraph is powered by <strong>CognoDB</strong>, an openCypher-compatible graph database,
        accessed through the official Neo4j JavaScript driver.
      </section>

      <div className="mt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          Get Started <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
