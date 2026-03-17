import React, { useState, useRef, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, X, TrendingUp, TrendingDown, Users, DollarSign, BarChart2, Info } from 'lucide-react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, ArcElement,
  Tooltip, Legend
} from 'chart.js';
import { countriesList, regionColors, incomeGroupColors, rawData } from '../data/inequalityData';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

// Lazy load the heavy globe component
const ReactGlobe = lazy(() => import('react-globe.gl'));

const GINI_COLOR_SCALE = (gini) => {
  if (gini < 30) return '#10b981';
  if (gini < 40) return '#6366f1';
  if (gini < 50) return '#f59e0b';
  return '#ef4444';
};

const GiniLabel = ({ gini }) => {
  if (gini < 30) return <span className="text-emerald-400 font-bold">{gini.toFixed(1)} — Low</span>;
  if (gini < 40) return <span className="text-indigo-400 font-bold">{gini.toFixed(1)} — Moderate</span>;
  if (gini < 50) return <span className="text-amber-400 font-bold">{gini.toFixed(1)} — High</span>;
  return <span className="text-red-400 font-bold">{gini.toFixed(1)} — Very High</span>;
};

const StatItem = ({ icon: Icon, label, value, color }) => (
  <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/10">
    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
      <Icon size={18} className="text-white" />
    </div>
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-semibold text-white">{value}</p>
    </div>
  </div>
);

const CountryPanel = ({ country, onClose }) => {
  const history = rawData
    .filter(d => d.code === country.code)
    .sort((a, b) => a.year - b.year);

  const barData = {
    labels: ['Bottom 10%', 'Bottom 40%', 'Top 10%'],
    datasets: [{
      label: 'Income Share (%)',
      data: [
        country.income_share_bottom_10 ?? 0,
        country.bottom_40 ?? 0,
        country.income_share_top_10 ?? 0,
      ],
      backgroundColor: ['#10b981', '#6366f1', '#ef4444'],
      borderRadius: 6,
    }],
  };

  const giniHistory = history.filter(d => d.gini);
  const giniBarData = giniHistory.length > 1 ? {
    labels: giniHistory.map(d => d.year),
    datasets: [{
      label: 'Gini Index',
      data: giniHistory.map(d => d.gini),
      backgroundColor: giniHistory.map(d => GINI_COLOR_SCALE(d.gini)),
      borderRadius: 4,
    }],
  } : null;

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: '#9ca3af' }, grid: { color: '#ffffff10' } },
      y: { ticks: { color: '#9ca3af' }, grid: { color: '#ffffff10' } },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      className="absolute top-0 right-0 h-full w-full md:w-96 bg-black/80 backdrop-blur-xl border-l border-white/10 overflow-y-auto z-20 rounded-r-2xl"
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white">{country.country}</h3>
            <p className="text-sm text-gray-400">{country.region} · {country.year}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Gini badge */}
        <div className="mb-4 p-4 rounded-xl bg-white/5 border border-white/10 text-center">
          <p className="text-xs text-gray-400 mb-1 uppercase tracking-widest">Gini Index</p>
          <p className="text-4xl font-black"><GiniLabel gini={country.gini} /></p>
          <p className="text-xs text-gray-500 mt-1">0 = perfect equality · 100 = maximum inequality</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <StatItem icon={DollarSign} label="GDP per Capita" value={`$${country.gdp_per_capita?.toLocaleString() ?? 'N/A'}`} color="bg-emerald-500/30" />
          <StatItem icon={Users} label="Population" value={country.population ? (country.population / 1e6).toFixed(1) + 'M' : 'N/A'} color="bg-indigo-500/30" />
          <StatItem icon={TrendingDown} label="Bottom 10% Share" value={`${country.income_share_bottom_10 ?? 'N/A'}%`} color="bg-blue-500/30" />
          <StatItem icon={TrendingUp} label="Top 10% Share" value={`${country.income_share_top_10 ?? 'N/A'}%`} color="bg-red-500/30" />
        </div>

        {/* Income share bar */}
        <div className="mb-4 bg-white/5 rounded-xl p-4 border border-white/10">
          <p className="text-xs font-semibold text-gray-300 mb-3 uppercase tracking-widest flex items-center gap-2">
            <BarChart2 size={14} /> Income Share Distribution
          </p>
          <Bar data={barData} options={chartOptions} height={140} />
        </div>

        {/* Gini trend */}
        {giniBarData && (
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <p className="text-xs font-semibold text-gray-300 mb-3 uppercase tracking-widest flex items-center gap-2">
              <TrendingUp size={14} /> Gini Trend Over Time
            </p>
            <Bar data={giniBarData} options={chartOptions} height={120} />
          </div>
        )}

        {/* Income group */}
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
          <Info size={14} />
          <span>Income Group: <span className="text-white font-medium">{country.incomegroup}</span></span>
        </div>
      </div>
    </motion.div>
  );
};

const GlobeExplorer = () => {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [metric, setMetric] = useState('gini');
  const globeRef = useRef();

  // Speed up the orbit controls after the globe mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      const controls = globeRef.current?.controls?.();
      if (controls) {
        controls.rotateSpeed = 3.0;      // default is 1 — 3x faster drag
        controls.zoomSpeed = 2.0;
        controls.autoRotate = false;
        controls.enableDamping = true;
        controls.dampingFactor = 0.15;   // snappier stop
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Region summary for legend
  const regionSummary = Object.entries(
    countriesList.reduce((acc, c) => {
      if (!acc[c.region]) acc[c.region] = { count: 0, totalGini: 0 };
      acc[c.region].count++;
      acc[c.region].totalGini += c.gini;
      return acc;
    }, {})
  ).map(([region, v]) => ({
    region,
    avgGini: (v.totalGini / v.count).toFixed(1),
    color: regionColors[region] ?? '#6366f1',
  })).sort((a, b) => b.avgGini - a.avgGini);

  const metrics = [
    { key: 'gini', label: 'Gini Index' },
    { key: 'region', label: 'By Region' },
    { key: 'income', label: 'Income Group' },
  ];

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 tracking-tight flex items-center gap-3">
            Globe Explorer
            <Globe className="text-indigo-400 animate-[spin_12s_linear_infinite]" size={32} />
          </h2>
          <p className="text-gray-400 mt-1">Click any country marker to explore inequality data</p>
        </div>
        {/* Metric toggle */}
        <div className="flex gap-2 bg-white/5 border border-white/10 rounded-xl p-1">
          {metrics.map(m => (
            <button
              key={m.key}
              onClick={() => setMetric(m.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${metric === m.key ? 'bg-indigo-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Globe + panel */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-xl" style={{ height: '600px' }}>
        <Suspense fallback={
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p>Loading Globe...</p>
            </div>
          </div>
        }>
          <ReactGlobe
            ref={globeRef}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            pointsData={countriesList}
            pointLat="lat"
            pointLng="lng"
            pointColor={d => metric === 'gini'
              ? GINI_COLOR_SCALE(d.gini)
              : metric === 'region'
                ? (regionColors[d.region] ?? '#6366f1')
                : (incomeGroupColors[d.incomegroup] ?? '#6366f1')}
            pointAltitude={d => metric === 'gini' ? Math.max(0.01, d.gini / 200) : 0.04}
            pointRadius={0.5}
            pointLabel={d => `<div style="background:#1e1e2e;padding:8px 12px;border-radius:8px;border:1px solid #ffffff20;font-family:sans-serif">
              <b style="color:#fff">${d.country}</b><br/>
              <span style="color:#a5b4fc">Gini: ${d.gini}</span><br/>
              <span style="color:#6ee7b7">GDP/cap: $${d.gdp_per_capita?.toLocaleString()}</span>
            </div>`}
            onPointClick={d => setSelected(d)}
            onPointHover={d => setHovered(d)}
            height={600}
            atmosphereColor="#6366f1"
            atmosphereAltitude={0.15}
          />
        </Suspense>

        {/* Hovered tooltip hint */}
        {hovered && !selected && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 text-sm text-white pointer-events-none">
            <span className="font-semibold">{hovered.country}</span> — Gini {hovered.gini} · Click for details
          </div>
        )}

        {/* Country detail panel */}
        <AnimatePresence>
          {selected && (
            <CountryPanel country={selected} onClose={() => setSelected(null)} />
          )}
        </AnimatePresence>
      </div>

      {/* Legend + region summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gini color legend */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-widest">Gini Color Scale</p>
          <div className="space-y-2">
            {[
              { label: '< 30 — Low Inequality', color: '#10b981' },
              { label: '30–40 — Moderate', color: '#6366f1' },
              { label: '40–50 — High', color: '#f59e0b' },
              { label: '> 50 — Very High', color: '#ef4444' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: item.color }} />
                <span className="text-sm text-gray-300">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Region avg gini */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-widest">Avg Gini by Region</p>
          <div className="space-y-2">
            {regionSummary.map(r => (
              <div key={r.region} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: r.color }} />
                <span className="text-xs text-gray-400 flex-1 truncate">{r.region}</span>
                <span className="text-sm font-bold" style={{ color: r.color }}>{r.avgGini}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Country cards grid */}
      <div>
        <p className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-widest">All Countries — Latest Data</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {countriesList.map(c => (
            <button
              key={c.code}
              onClick={() => setSelected(c)}
              className="bg-white/5 border border-white/10 rounded-xl p-3 text-left hover:bg-white/10 hover:border-indigo-500/50 transition-all group"
            >
              <p className="text-xs font-bold text-gray-400 mb-1">{c.code}</p>
              <p className="text-sm font-semibold text-white truncate group-hover:text-indigo-300 transition-colors">{c.country}</p>
              <p className="text-xs mt-1 font-bold" style={{ color: GINI_COLOR_SCALE(c.gini) }}>
                Gini {c.gini}
              </p>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default GlobeExplorer;
