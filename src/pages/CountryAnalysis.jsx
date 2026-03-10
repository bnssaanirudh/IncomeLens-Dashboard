import ChartCard from '../components/ui/ChartCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const timelineData = [
    { year: '2015', bottom: 12, top: 46 },
    { year: '2016', bottom: 12.5, top: 45.8 },
    { year: '2017', bottom: 13, top: 45.5 },
    { year: '2018', bottom: 13.8, top: 45 },
    { year: '2019', bottom: 14.5, top: 44.5 },
    { year: '2020', bottom: 14.2, top: 46.2 },
    { year: '2021', bottom: 13.5, top: 47 },
    { year: '2022', bottom: 14, top: 46.5 },
    { year: '2023', bottom: 14.8, top: 45.8 },
];

const CountryAnalysis = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90 } }
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
                        Country Analysis
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                        </span>
                    </h2>
                    <p className="text-text-secondary mt-1">Deep dive into national economic structures</p>
                </div>

                <div className="w-full md:w-64 glass-panel border border-primary/30 p-1 rounded-xl">
                    <select className="w-full bg-transparent text-white border-none outline-none py-2 px-3 appearance-none cursor-pointer">
                        <option className="bg-background text-white">United States</option>
                        <option className="bg-background text-white">United Kingdom</option>
                        <option className="bg-background text-white">Germany</option>
                        <option className="bg-background text-white">India</option>
                        <option className="bg-background text-white">Brazil</option>
                    </select>
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="Income Share Timeline" subtitle="Top 10% vs Bottom 50%">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={timelineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="year" stroke="#94a3b8" axisLine={false} tickLine={false} />
                            <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} domain={[0, 60]} />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Line type="monotone" dataKey="top" name="Top 10% Share" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                            <Line type="monotone" dataKey="bottom" name="Bottom 50% Share" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>

                <div className="glass-panel p-6 flex flex-col">
                    <h3 className="text-xl font-semibold text-white mb-6">Demographic Breakdown</h3>
                    <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-xl bg-black/10">
                        <p className="text-text-secondary mb-4 text-center max-w-sm">Connect Tableau or Power BI workspace to view interactive demographic filtering.</p>
                        <button className="relative px-6 py-3 rounded-xl bg-secondary hover:bg-secondary-dark text-white font-medium transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] overflow-hidden group">
                            <span className="relative z-10">Connect Data Source</span>
                            <div className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></div>
                        </button>
                    </div>
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
                <div className="glass-card p-6 border-l-4 border-l-blue-500 hover:-translate-y-1 transition-transform duration-300">
                    <p className="text-sm text-text-secondary uppercase tracking-wider mb-2">Policy Impact</p>
                    <h4 className="text-lg font-bold text-white mb-2">Tax Reform '22</h4>
                    <p className="text-sm text-text-secondary">Estimated 1.2% reduction in Gini coefficient observed post-implementation of progressive bracket adjustments.</p>
                </div>
                <div className="glass-card p-6 border-l-4 border-l-purple-500 hover:-translate-y-1 transition-transform duration-300">
                    <p className="text-sm text-text-secondary uppercase tracking-wider mb-2">Social Mobility</p>
                    <h4 className="text-lg font-bold text-white mb-2">Education Index</h4>
                    <p className="text-sm text-text-secondary">Strong correlation (0.84) between regional education funding and intergenerational wealth mobility.</p>
                </div>
                <div className="glass-card p-6 border-l-4 border-l-red-500 hover:-translate-y-1 transition-transform duration-300">
                    <p className="text-sm text-text-secondary uppercase tracking-wider mb-2">Risk Factor</p>
                    <h4 className="text-lg font-bold text-white mb-2">Inflation Pressure</h4>
                    <p className="text-sm text-text-secondary">Bottom quartile real purchasing power decreased by 4.1% over the last 18 months despite wage growth.</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default CountryAnalysis;
