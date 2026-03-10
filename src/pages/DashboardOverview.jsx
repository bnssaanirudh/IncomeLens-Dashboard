import React from 'react';
import StatCard from '../components/ui/StatCard';
import ChartCard from '../components/ui/ChartCard';
import AnalyticsPanel from '../components/ui/AnalyticsPanel';
import { DollarSign, Percent, TrendingDown, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';

const barData = [
    { name: 'Bottom 20%', value: 8 },
    { name: 'Second 20%', value: 12 },
    { name: 'Middle 20%', value: 16 },
    { name: 'Fourth 20%', value: 24 },
    { name: 'Top 20%', value: 50 },
];

const COLORS = ['#94a3b8', '#38bdf8', '#3b82f6', '#6366f1', '#8b5cf6'];

const DashboardOverview = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        Global Overview
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                    </h2>
                    <p className="text-text-secondary mt-1">Real-time analysis of global wealth distribution</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">Export PDF</button>
                    <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium text-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(59,130,246,0.4)]">Generate Report</button>
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Global Gini Index"
                    value="0.68"
                    icon={Percent}
                    trend={-2.1}
                    subtext="vs last decade"
                />
                <StatCard
                    title="Median Income"
                    value="$12,450"
                    icon={DollarSign}
                    trend={4.3}
                    subtext="global average"
                />
                <StatCard
                    title="Poverty Rate"
                    value="8.4%"
                    icon={TrendingDown}
                    trend={-1.2}
                    subtext="absolute extreme"
                />
                <StatCard
                    title="Affected Population"
                    value="680M"
                    icon={Users}
                    trend={0.8}
                    subtext="below threshold"
                />
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 relative group cursor-pointer transition-transform duration-300 hover:scale-[1.01]">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <AnalyticsPanel />
                </div>

                <ChartCard title="Wealth Base by Quintile" subtitle="Share of total GDP (%)">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
                            <XAxis type="number" stroke="#94a3b8" axisLine={false} tickLine={false} />
                            <YAxis dataKey="name" type="category" stroke="#94a3b8" axisLine={false} tickLine={false} width={80} />
                            <Tooltip
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                {barData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>
            </motion.div>

            <motion.div variants={itemVariants} className="glass-panel p-6 mt-6 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-400 to-purple-500"></div>
                <h3 className="text-xl font-semibold text-white mb-4">Key Insights</h3>
                <ul className="space-y-4">
                    <li className="flex gap-4 items-start p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                        <div>
                            <p className="text-white font-medium">Income disparity widening in emerging markets</p>
                            <p className="text-sm text-text-secondary mt-1">Data from South Asia and Sub-Saharan Africa indicate a 4% increase in the top 10% wealth share over 5 years.</p>
                        </div>
                    </li>
                    <li className="flex gap-4 items-start p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
                        <div>
                            <p className="text-white font-medium">Global poverty reduction trending positive</p>
                            <p className="text-sm text-text-secondary mt-1">Despite local disparities, overall global extreme poverty decreased by 1.2% year-over-year.</p>
                        </div>
                    </li>
                </ul>
            </motion.div>

        </motion.div>
    );
};

export default DashboardOverview;
