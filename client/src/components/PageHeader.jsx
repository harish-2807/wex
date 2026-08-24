export default function PageHeader({ title, subtitle, children }) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
      {subtitle && <p className="mt-2 max-w-2xl text-slate-500">{subtitle}</p>}
      {children}
    </div>
  );
}
