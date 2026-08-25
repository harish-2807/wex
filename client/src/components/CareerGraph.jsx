import { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Loader2, Maximize, RotateCw } from 'lucide-react';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import EmptyState from './EmptyState';

const MAX_NODES = 50;

const NODE_TYPES = {
  startingSkill: { label: 'Starting Skill', color: '#1f47e6' },
  relatedSkill: { label: 'Related Skill', color: '#7c3aed' },
  job: { label: 'Job', color: '#d97706' },
  company: { label: 'Company', color: '#059669' },
  location: { label: 'Location', color: '#e11d48' },
};

const RADIUS = {
  startingSkill: 7,
  relatedSkill: 6,
  job: 9,
  company: 7,
  location: 6,
};

const RELATIONSHIPS = [
  { label: 'RELATED_TO', color: '#64748b' },
  { label: 'REQUIRED_BY', color: '#64748b' },
  { label: 'OFFERED_BY', color: '#64748b' },
  { label: 'LOCATED_IN', color: '#64748b' },
];

function buildGraphData(paths, opps) {
  const nodes = new Map();
  const links = new Map();

  const addNode = (id, type, label, extra = {}) => {
    if (!nodes.has(id)) {
      nodes.set(id, { id, type, label, ...extra });
    }
  };

  const addLink = (source, target, label) => {
    const key = `${source}->${target}::${label}`;
    if (!links.has(key)) {
      links.set(key, { source, target, label });
    }
  };

  paths.forEach((p) => {
    const startId = `skill:${p.startingSkill}`;
    const relatedId = `skill:${p.relatedSkill}`;
    const jobId = `job:${p.job.id}`;
    const companyId = `company:${p.company.id}`;
    const locationId = `location:${p.location.city}-${p.location.state}`;

    addNode(startId, 'startingSkill', p.startingSkill);
    addNode(relatedId, 'relatedSkill', p.relatedSkill);
    addNode(jobId, 'job', p.job.title, { company: p.company.name });
    addNode(companyId, 'company', p.company.name, {
      location: `${p.location.city}, ${p.location.state}`,
    });
    addNode(locationId, 'location', p.location.city, { state: p.location.state });

    addLink(startId, relatedId, 'RELATED_TO');
    addLink(relatedId, jobId, 'REQUIRED_BY');
    addLink(jobId, companyId, 'OFFERED_BY');
    addLink(companyId, locationId, 'LOCATED_IN');
  });

  const indexedNodes = Array.from(nodes.values());
  indexedNodes.forEach((node, i) => {
    node.x = node.x ?? Math.cos((i * 2 * Math.PI) / indexedNodes.length) * 180;
    node.y = node.y ?? Math.sin((i * 2 * Math.PI) / indexedNodes.length) * 180;
  });

  let finalNodes = indexedNodes;
  if (finalNodes.length > MAX_NODES) {
    finalNodes = finalNodes.slice(0, MAX_NODES);
  }

  return {
    nodes: finalNodes,
    links: Array.from(links.values()),
    truncated: nodes.size > MAX_NODES,
  };
}

function useContainerWidth() {
  const [width, setWidth] = useState(0);
  const observerRef = useRef(null);

  const containerRef = useCallback((node) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    if (!node) return;
    const measure = () => {
      const w = Math.floor(node.clientWidth);
      if (w > 0) setWidth(w);
    };
    measure();
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setWidth(Math.floor(entry.contentRect.width));
    });
    observer.observe(node);
    observerRef.current = observer;
  }, []);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return [containerRef, width];
}

function NodeDetails({ node }) {
  if (!node) return null;
  const typeLabel = NODE_TYPES[node.type]?.label || node.type;
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">Selected Node</p>
      <p className="text-base font-semibold text-slate-900">{node.label}</p>
      <p className="mt-1 text-sm text-slate-500">Node Type: {typeLabel}</p>
      {node.company && <p className="mt-1 text-sm text-slate-500">Company: {node.company}</p>}
      {node.location && <p className="mt-1 text-sm text-slate-500">Location: {node.location}</p>}
      {node.state && <p className="mt-1 text-sm text-slate-500">State: {node.state}</p>}
    </div>
  );
}

function Legend() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Node Types</p>
      <ul className="space-y-1.5">
        {Object.values(NODE_TYPES).map((t) => (
          <li key={t.label} className="flex items-center gap-2 text-sm text-slate-600">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: t.color }} />
            {t.label}
          </li>
        ))}
      </ul>
      <p className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">Relationships</p>
      <ul className="space-y-1">
        {RELATIONSHIPS.map((r) => (
          <li key={r.label} className="text-sm text-slate-500">
            {r.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CareerGraph({ paths, opps, loading, error, onRetry, selectedSkills }) {
  const fgRef = useRef(null);
  const [containerRef, width] = useContainerWidth();
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);

  const { nodes, links, truncated } = useMemo(
    () => buildGraphData(paths || [], opps || []),
    [paths, opps]
  );

  const graphData = useMemo(() => ({ nodes, links }), [nodes, links]);

  const fitView = useCallback(() => {
    if (fgRef.current) fgRef.current.zoomToFit(400, 40);
  }, []);

  useEffect(() => {
    if (!loading && nodes.length > 0) {
      const t = setTimeout(fitView, 800);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [loading, nodes.length, fitView]);

  const paintNode = (node, ctx) => {
    const type = NODE_TYPES[node.type] || { color: '#64748b' };
    const r = RADIUS[node.type] || 6;
    const isActive = selected?.id === node.id || hovered?.id === node.id;

    ctx.beginPath();
    ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
    ctx.fillStyle = type.color;
    ctx.fill();
    ctx.lineWidth = isActive ? 3 : 1.5;
    ctx.strokeStyle = isActive ? '#0f172a' : '#1e293b';
    ctx.stroke();

    const label = node.label;
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#0f172a';
    ctx.fillText(label, node.x, node.y + r + 2);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Interactive Career Graph</h3>
          {selectedSkills?.length > 0 && (
            <p className="mt-1 text-sm text-slate-500">
              Career Graph for:{' '}
              {selectedSkills.map((s) => (
                <span
                  key={s.id}
                  className="mr-1 inline-flex items-center rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-medium text-brand-700 ring-1 ring-inset ring-brand-200"
                >
                  {s.name}
                </span>
              ))}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fitView}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <Maximize size={15} /> Fit / Reset
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white py-16 text-sm text-slate-400 shadow-card">
          <Loader2 size={18} className="mr-2 animate-spin" /> Building your career graph…
        </div>
      )}

      {!loading && error && (
        <ErrorState
          message="We couldn't build your career graph right now. Please try again."
          onRetry={onRetry}
        />
      )}

      {!loading && !error && nodes.length === 0 && (
        <EmptyState
          title="No career connections found for these skills yet"
          message="Try selecting another skill to discover more connections."
        />
      )}

      {!loading && !error && nodes.length > 0 && (
        <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
          <div
            ref={containerRef}
            className="relative h-[520px] overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-card"
          >
            {width > 0 && (
              <ForceGraph2D
                ref={fgRef}
                graphData={graphData}
                width={width}
                height={520}
                backgroundColor="rgba(0,0,0,0)"
                nodeCanvasObject={paintNode}
                nodePointerAreaPaint={(node, color, ctx) => {
                  const r = (RADIUS[node.type] || 6) + 4;
                  ctx.fillStyle = color;
                  ctx.beginPath();
                  ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
                  ctx.fill();
                }}
                onNodeClick={(node) => setSelected(node)}
                onNodeHover={(node) => setHovered(node)}
                linkLabel={(link) => link.label}
                linkDirectionalArrowLength={4}
                linkDirectionalArrowRelPos={1}
                linkColor={() => '#475569'}
                linkWidth={1.5}
                cooldownTicks={120}
              />
            )}
          </div>

          <div className="space-y-4">
            <Legend />
            <NodeDetails node={selected} />
          </div>
        </div>
      )}

      {!loading && !error && truncated && nodes.length > 0 && (
        <p className="text-xs text-slate-400">Showing the most relevant {MAX_NODES} nodes.</p>
      )}
    </div>
  );
}
