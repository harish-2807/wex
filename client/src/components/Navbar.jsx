import { Link, NavLink } from 'react-router-dom';
import { Network, Home, Briefcase, Route, Info } from 'lucide-react';
import { cx } from '../utils';

const links = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/jobs', label: 'Jobs', icon: Briefcase },
  { to: '/career-paths', label: 'Career Paths', icon: Route },
  { to: '/about', label: 'About', icon: Info },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold text-slate-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
            <Network size={18} />
          </span>
          <span className="text-lg tracking-tight">CareerGraph</span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Primary">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cx(
                  'flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
                  isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                )
              }
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
