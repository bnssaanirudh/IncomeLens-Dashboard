import React from 'react';
import PowerBIEmbed from '../components/ui/PowerBIEmbed';
import { motion } from 'framer-motion';

const GlobalExplorer = () => {
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
                        Global Explorer
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                        </span>
                    </h2>
                    <p className="text-text-secondary mt-1">Interactive geographic visualization of economic disparities</p>
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="glass-card p-2 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.1)] border border-primary/20 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <PowerBIEmbed
                    title="Global Income Heatmap"
                    height="700px"
                />
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="glass-panel p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors"></div>
                    <h3 className="text-xl font-semibold text-white mb-4">Regional Summary</h3>
                    <p className="text-text-secondary leading-relaxed mb-4">
                        The visualization above integrates vast datasets mapping income disparities across key economic zones. Notable shifts are observed in the Asia-Pacific territory, displaying a 6% increase in middle-income expansion.
                    </p>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5">
                            <span className="text-text-secondary">North America</span>
                            <span className="text-white font-medium">+1.2% growth</span>
                        </div>
                        <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5">
                            <span className="text-text-secondary">Europe</span>
                            <span className="text-white font-medium">-0.4% contraction</span>
                        </div>
                        <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5 border-l-4 border-l-primary/50">
                            <span className="text-white">Asia Pacific</span>
                            <span className="text-emerald-400 font-medium">+6.1% growth</span>
                        </div>
                    </div>
                </div>

                <div className="glass-panel p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl group-hover:bg-secondary/20 transition-colors"></div>
                    <h3 className="text-xl font-semibold text-white mb-4 relative z-10">Data Quality Index</h3>
                    <div className="flex flex-col h-full justify-between pb-6">
                        <div className="relative w-48 h-48 mx-auto mt-4">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="12" fill="none" />
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    stroke="url(#gradient)"
                                    strokeWidth="12"
                                    fill="none"
                                    strokeDasharray="251.2"
                                    strokeDashoffset="15.072"
                                    className="transition-all duration-1000 ease-out drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                                />
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#3b82f6" />
                                        <stop offset="100%" stopColor="#8b5cf6" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold text-white">94%</span>
                                <span className="text-xs text-text-secondary mt-1 tracking-wider uppercase">Confidence</span>
                            </div>
                        </div>
                        <p className="text-sm text-center text-text-secondary mt-6 relative z-10">
                            Based on aggregated real-time socio-economic census data streams.
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default GlobalExplorer;
