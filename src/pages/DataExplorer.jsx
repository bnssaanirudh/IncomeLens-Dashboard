import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileSpreadsheet, BarChart3, X, TrendingUp, PieChart, Activity, Radar, ScatterChart, Download } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    RadialLinearScale,
    Filler,
    Tooltip,
    Legend,
    Title
} from 'chart.js';
import { Bar, Line, Doughnut, Radar as RadarChart, Scatter, PolarArea } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    RadialLinearScale,
    Filler,
    Tooltip,
    Legend,
    Title
);

const CHART_COLORS = [
    'rgba(99, 102, 241, 0.8)',   // indigo
    'rgba(168, 85, 247, 0.8)',   // purple
    'rgba(59, 130, 246, 0.8)',   // blue
    'rgba(16, 185, 129, 0.8)',   // emerald
    'rgba(245, 158, 11, 0.8)',   // amber
    'rgba(239, 68, 68, 0.8)',    // red
    'rgba(236, 72, 153, 0.8)',   // pink
    'rgba(20, 184, 166, 0.8)',   // teal
    'rgba(249, 115, 22, 0.8)',   // orange
    'rgba(132, 204, 22, 0.8)',   // lime
];

const CHART_BORDERS = CHART_COLORS.map(c => c.replace('0.8', '1'));

const parseCSV = (text) => {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
        if (values.length === headers.length) {
            const row = {};
            headers.forEach((h, idx) => {
                const num = parseFloat(values[idx]);
                row[h] = isNaN(num) ? values[idx] : num;
            });
            rows.push(row);
        }
    }
    return { headers, rows };
};

const detectColumnTypes = (headers, rows) => {
    const numeric = [];
    const categorical = [];
    headers.forEach(h => {
        const isNumeric = rows.slice(0, 20).every(r => typeof r[h] === 'number');
        if (isNumeric) numeric.push(h);
        else categorical.push(h);
    });
    return { numeric, categorical };
};

const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { labels: { color: '#94a3b8', font: { size: 11 } } },
        tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            titleColor: '#fff',
            bodyColor: '#cbd5e1',
        }
    },
    scales: {
        x: { ticks: { color: '#64748b', maxTicksLimit: 15 }, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { ticks: { color: '#64748b' }, grid: { color: 'rgba(255,255,255,0.05)' } }
    }
};

const DataExplorer = () => {
    const [csvData, setCsvData] = useState(null);
    const [fileName, setFileName] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState('');

    const handleExportPDF = () => {
        const element = document.getElementById('data-explorer-content');
        const opt = {
            margin: 0.5,
            filename: `Data-Explorer-Report-${fileName || 'Untitled'}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, backgroundColor: '#0f172a' },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
        };
        html2pdf().set(opt).from(element).save();
    };

    const processFile = (file) => {
        if (!file) return;
        if (!file.name.endsWith('.csv')) {
            setError('Please upload a CSV file.');
            return;
        }
        setError('');
        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const parsed = parseCSV(e.target.result);
                if (parsed.rows.length === 0) {
                    setError('The CSV file appears to be empty or improperly formatted.');
                    return;
                }
                setCsvData(parsed);
            } catch {
                setError('Failed to parse the CSV file. Please check the format.');
            }
        };
        reader.readAsText(file);
    };

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        processFile(e.dataTransfer.files[0]);
    }, []);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleFileInput = (e) => {
        processFile(e.target.files[0]);
    };

    const handleClear = () => {
        setCsvData(null);
        setFileName('');
        setError('');
    };

    const generateCharts = () => {
        if (!csvData) return [];
        const { headers, rows } = csvData;
        const { numeric, categorical } = detectColumnTypes(headers, rows);

        if (numeric.length === 0) return [];

        const labelCol = categorical.length > 0 ? categorical[0] : null;
        const labels = labelCol ? rows.slice(0, 30).map(r => String(r[labelCol]).substring(0, 20)) : rows.slice(0, 30).map((_, i) => `Row ${i + 1}`);
        const charts = [];

        // 1. Bar Chart — first two numeric columns
        if (numeric.length >= 1) {
            const cols = numeric.slice(0, 3);
            charts.push({
                id: 'bar',
                title: 'Bar Chart',
                subtitle: cols.join(' vs '),
                icon: BarChart3,
                color: 'from-indigo-500 to-blue-500',
                component: (
                    <Bar
                        data={{
                            labels,
                            datasets: cols.map((col, i) => ({
                                label: col,
                                data: rows.slice(0, 30).map(r => r[col]),
                                backgroundColor: CHART_COLORS[i],
                                borderColor: CHART_BORDERS[i],
                                borderWidth: 1,
                                borderRadius: 4,
                            }))
                        }}
                        options={{ ...commonOptions, plugins: { ...commonOptions.plugins, title: { display: true, text: `${cols.join(', ')} by ${labelCol || 'Index'}`, color: '#e2e8f0' } } }}
                    />
                )
            });
        }

        // 2. Line Chart — first numeric column trend
        if (numeric.length >= 1) {
            const col = numeric[0];
            charts.push({
                id: 'line',
                title: 'Line Chart',
                subtitle: `${col} trend`,
                icon: TrendingUp,
                color: 'from-emerald-500 to-teal-500',
                component: (
                    <Line
                        data={{
                            labels,
                            datasets: [{
                                label: col,
                                data: rows.slice(0, 30).map(r => r[col]),
                                borderColor: 'rgba(16, 185, 129, 1)',
                                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                fill: true,
                                tension: 0.4,
                                pointRadius: 3,
                                pointBackgroundColor: 'rgba(16, 185, 129, 1)',
                            }]
                        }}
                        options={{ ...commonOptions, plugins: { ...commonOptions.plugins, title: { display: true, text: `${col} Trend`, color: '#e2e8f0' } } }}
                    />
                )
            });
        }

        // 3. Doughnut Chart — distribution of first numeric column (bucketed)
        if (numeric.length >= 1) {
            const col = numeric[Math.min(1, numeric.length - 1)];
            const values = rows.map(r => r[col]).filter(v => typeof v === 'number');
            const min = Math.min(...values);
            const max = Math.max(...values);
            const range = max - min || 1;
            const bucketCount = Math.min(6, values.length);
            const bucketSize = range / bucketCount;
            const buckets = Array(bucketCount).fill(0);
            const bucketLabels = [];
            for (let i = 0; i < bucketCount; i++) {
                const lo = (min + i * bucketSize).toFixed(1);
                const hi = (min + (i + 1) * bucketSize).toFixed(1);
                bucketLabels.push(`${lo}–${hi}`);
            }
            values.forEach(v => {
                let idx = Math.floor((v - min) / bucketSize);
                if (idx >= bucketCount) idx = bucketCount - 1;
                buckets[idx]++;
            });

            charts.push({
                id: 'doughnut',
                title: 'Doughnut Chart',
                subtitle: `${col} distribution`,
                icon: PieChart,
                color: 'from-purple-500 to-pink-500',
                component: (
                    <Doughnut
                        data={{
                            labels: bucketLabels,
                            datasets: [{
                                data: buckets,
                                backgroundColor: CHART_COLORS.slice(0, bucketCount),
                                borderColor: 'rgba(15, 23, 42, 1)',
                                borderWidth: 2,
                            }]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { position: 'bottom', labels: { color: '#94a3b8', padding: 12, font: { size: 11 } } },
                                title: { display: true, text: `${col} Distribution`, color: '#e2e8f0' },
                                tooltip: commonOptions.plugins.tooltip,
                            }
                        }}
                    />
                )
            });
        }

        // 4. Radar Chart — compare averages of up to 6 numeric columns
        if (numeric.length >= 3) {
            const cols = numeric.slice(0, 6);
            const avgs = cols.map(col => {
                const vals = rows.map(r => r[col]).filter(v => typeof v === 'number');
                return vals.reduce((a, b) => a + b, 0) / vals.length;
            });
            // Normalize to 0-100 for radar readability
            const maxAvg = Math.max(...avgs) || 1;
            const normalized = avgs.map(a => +((a / maxAvg) * 100).toFixed(1));

            charts.push({
                id: 'radar',
                title: 'Radar Chart',
                subtitle: 'Multi-metric comparison',
                icon: Radar,
                color: 'from-amber-500 to-orange-500',
                component: (
                    <RadarChart
                        data={{
                            labels: cols,
                            datasets: [{
                                label: 'Normalized Avg',
                                data: normalized,
                                backgroundColor: 'rgba(245, 158, 11, 0.2)',
                                borderColor: 'rgba(245, 158, 11, 1)',
                                pointBackgroundColor: 'rgba(245, 158, 11, 1)',
                                borderWidth: 2,
                            }]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                r: {
                                    angleLines: { color: 'rgba(255,255,255,0.1)' },
                                    grid: { color: 'rgba(255,255,255,0.08)' },
                                    pointLabels: { color: '#94a3b8', font: { size: 11 } },
                                    ticks: { display: false },
                                }
                            },
                            plugins: {
                                legend: { labels: { color: '#94a3b8' } },
                                title: { display: true, text: 'Metric Comparison (Normalized)', color: '#e2e8f0' },
                                tooltip: commonOptions.plugins.tooltip,
                            }
                        }}
                    />
                )
            });
        }

        // 5. Scatter Plot — first two numeric columns
        if (numeric.length >= 2) {
            charts.push({
                id: 'scatter',
                title: 'Scatter Plot',
                subtitle: `${numeric[0]} vs ${numeric[1]}`,
                icon: ScatterChart,
                color: 'from-rose-500 to-red-500',
                component: (
                    <Scatter
                        data={{
                            datasets: [{
                                label: `${numeric[0]} vs ${numeric[1]}`,
                                data: rows.slice(0, 100).map(r => ({ x: r[numeric[0]], y: r[numeric[1]] })),
                                backgroundColor: 'rgba(239, 68, 68, 0.6)',
                                borderColor: 'rgba(239, 68, 68, 1)',
                                pointRadius: 5,
                                pointHoverRadius: 8,
                            }]
                        }}
                        options={{
                            ...commonOptions,
                            plugins: {
                                ...commonOptions.plugins,
                                title: { display: true, text: `${numeric[0]} vs ${numeric[1]}`, color: '#e2e8f0' }
                            },
                            scales: {
                                x: { ...commonOptions.scales.x, title: { display: true, text: numeric[0], color: '#94a3b8' } },
                                y: { ...commonOptions.scales.y, title: { display: true, text: numeric[1], color: '#94a3b8' } },
                            }
                        }}
                    />
                )
            });
        }

        // 6. Polar Area — top values of a numeric column
        if (numeric.length >= 1) {
            const col = numeric[numeric.length > 2 ? 2 : 0];
            const topRows = [...rows].sort((a, b) => (b[col] || 0) - (a[col] || 0)).slice(0, 8);
            const topLabels = labelCol ? topRows.map(r => String(r[labelCol]).substring(0, 18)) : topRows.map((_, i) => `Item ${i + 1}`);

            charts.push({
                id: 'polar',
                title: 'Polar Area Chart',
                subtitle: `Top ${col} values`,
                icon: Activity,
                color: 'from-cyan-500 to-blue-500',
                component: (
                    <PolarArea
                        data={{
                            labels: topLabels,
                            datasets: [{
                                data: topRows.map(r => r[col]),
                                backgroundColor: CHART_COLORS.slice(0, 8).map(c => c.replace('0.8', '0.6')),
                                borderColor: CHART_BORDERS.slice(0, 8),
                                borderWidth: 1,
                            }]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                r: {
                                    grid: { color: 'rgba(255,255,255,0.08)' },
                                    ticks: { display: false },
                                }
                            },
                            plugins: {
                                legend: { position: 'bottom', labels: { color: '#94a3b8', padding: 10, font: { size: 10 } } },
                                title: { display: true, text: `Top ${col} Values`, color: '#e2e8f0' },
                                tooltip: commonOptions.plugins.tooltip,
                            }
                        }}
                    />
                )
            });
        }

        return charts;
    };

    const charts = csvData ? generateCharts() : [];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <motion.div
            id="data-explorer-content"
            className="space-y-8 p-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500 tracking-tight flex items-center gap-3">
                        Data Explorer
                        <FileSpreadsheet className="text-fuchsia-400" size={32} />
                    </h2>
                    <p className="text-text-secondary mt-2 text-lg">Upload any CSV file to generate interactive visualizations</p>
                </div>
                <div className="flex gap-3">
                    {csvData && (
                        <>
                            <button onClick={handleExportPDF} className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition-all flex items-center gap-2">
                                <Download size={16} /> Export PDF
                            </button>
                            <button onClick={handleClear} className="px-5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-medium text-sm hover:bg-red-500/20 transition-all flex items-center gap-2">
                                <X size={16} /> Clear Data
                            </button>
                        </>
                    )}
                </div>
            </motion.div>

            {/* Upload Zone */}
            <AnimatePresence mode="wait">
                {!csvData ? (
                    <motion.div
                        key="upload"
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            className={`relative glass-panel rounded-3xl border-2 border-dashed p-16 text-center transition-all duration-300 cursor-pointer group
                                ${isDragging ? 'border-violet-400 bg-violet-500/10 scale-[1.02]' : 'border-white/20 hover:border-violet-400/50 hover:bg-white/5'}
                            `}
                            onClick={() => document.getElementById('csv-file-input').click()}
                        >
                            <input type="file" id="csv-file-input" accept=".csv" onChange={handleFileInput} className="hidden" />

                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className="relative z-10">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                                    <Upload size={36} className="text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    {isDragging ? 'Drop your CSV here!' : 'Upload CSV File'}
                                </h3>
                                <p className="text-text-secondary max-w-md mx-auto">
                                    Drag and drop your CSV file here, or click to browse.
                                    We'll automatically detect columns and generate 6 different visualizations.
                                </p>
                                {error && (
                                    <p className="mt-4 text-red-400 font-medium">{error}</p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="info"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-panel rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 border border-white/10"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-violet-500/20 text-violet-400">
                                <FileSpreadsheet size={20} />
                            </div>
                            <div>
                                <p className="text-white font-semibold">{fileName}</p>
                                <p className="text-text-secondary text-sm">{csvData.rows.length} rows × {csvData.headers.length} columns</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {csvData.headers.slice(0, 8).map(h => (
                                <span key={h} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-text-secondary font-medium">{h}</span>
                            ))}
                            {csvData.headers.length > 8 && (
                                <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-text-secondary font-medium">+{csvData.headers.length - 8} more</span>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Charts Grid */}
            {charts.length > 0 && (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                    {charts.map((chart) => {
                        const IconComp = chart.icon;
                        return (
                            <motion.div
                                key={chart.id}
                                variants={itemVariants}
                                className="glass-panel rounded-3xl border border-white/10 overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
                            >
                                <div className="p-4 border-b border-white/5 flex items-center gap-3">
                                    <div className={`p-2 rounded-xl bg-gradient-to-br ${chart.color} text-white`}>
                                        <IconComp size={18} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm">{chart.title}</h4>
                                        <p className="text-text-secondary text-xs">{chart.subtitle}</p>
                                    </div>
                                </div>
                                <div className="p-4 h-[320px]">
                                    {chart.component}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            )}

            {csvData && charts.length === 0 && (
                <motion.div variants={itemVariants} className="glass-panel rounded-3xl p-12 text-center">
                    <p className="text-text-secondary text-lg">No numeric columns detected. Please upload a CSV with numeric data for visualizations.</p>
                </motion.div>
            )}
        </motion.div>
    );
};

export default DataExplorer;
