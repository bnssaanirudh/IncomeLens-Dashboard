import React from 'react';
import StatCard from '../components/ui/StatCard';
import PowerBIEmbed from '../components/ui/PowerBIEmbed';
import { BadgeDollarSign, Activity, Users, TrendingUp, Sparkles, Target, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import html2pdf from 'html2pdf.js';

const DashboardOverview = () => {
    const handleExportPDF = () => {
        const element = document.getElementById('dashboard-content');
        const opt = {
            margin: 0.5,
            filename: 'Executive-Summary-Report.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
        };
        html2pdf().set(opt).from(element).save();
    };

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
            id="dashboard-content"
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header Section */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 tracking-tight flex items-center gap-3">
                        Executive Overview
                        <Sparkles className="text-purple-400 animate-pulse" size={28} />
                    </h2>
                    <p className="text-text-secondary mt-2 text-lg">AI-powered synthesis of your PowerBI intelligence</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={handleExportPDF} className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] backdrop-blur-md">Export PDF</button>
                    <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm hover:scale-105 transition-transform shadow-[0_0_25px_rgba(59,130,246,0.5)] flex items-center gap-2">
                        <Zap size={16} /> Sync Data
                    </button>
                </div>
            </motion.div>

            {/* Main PowerBI Dashboard */}
            <motion.div variants={itemVariants} className="relative group rounded-3xl p-1 bg-gradient-to-b from-white/10 to-transparent">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-secondary/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative glass-card rounded-[1.4rem] overflow-hidden shadow-2xl border border-white/10 bg-black/40 backdrop-blur-xl">
                    <div className="p-4 border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            <span className="ml-4 text-sm font-medium text-text-secondary tracking-widest uppercase">Primary Intelligence Feed</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-xs text-emerald-400 font-medium tracking-wide">Live</span>
                        </div>
                    </div>
                    <div className="p-2">
                        <PowerBIEmbed
                            title="Primary Executive Dashboard"
                            height="650px"
                            embedUrl="https://app.powerbi.com/view?r=eyJrIjoiMTMyNDk0ZjItODQwNS00N2E1LTg0NTQtYTg0YWU5MjVkZTQ3IiwidCI6IjgwOGNjODNlLWE1NDYtNDdlNy1hMDNmLTczYTFlYmJhMjRmMyIsImMiOjEwfQ%3D%3D&pageName=ReportSection"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Smart Extracted Data Cards */}
            <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Target className="text-blue-400" /> Derived Insights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 border border-t-blue-500/50">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors"></div>
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
                                <Activity size={24} />
                            </div>
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">-2.5%</span>
                        </div>
                        <h4 className="text-text-secondary text-sm font-medium uppercase tracking-wider mb-1">Overall Defect Rate</h4>
                        <p className="text-3xl font-extrabold text-white tracking-tight">1.2%</p>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 border border-t-purple-500/50">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors"></div>
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl">
                                <Zap size={24} />
                            </div>
                            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full">Live</span>
                        </div>
                        <h4 className="text-text-secondary text-sm font-medium uppercase tracking-wider mb-1">Live Camera Analysis</h4>
                        <p className="text-3xl font-extrabold text-white tracking-tight">Active</p>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 border border-t-indigo-500/50">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors"></div>
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl">
                                <Target size={24} />
                            </div>
                            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full">Optimal</span>
                        </div>
                        <h4 className="text-text-secondary text-sm font-medium uppercase tracking-wider mb-1">Document Risk Score</h4>
                        <p className="text-3xl font-extrabold text-white tracking-tight">98/100</p>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 border border-t-emerald-500/50">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-colors"></div>
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
                                <Users size={24} />
                            </div>
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">+145</span>
                        </div>
                        <h4 className="text-text-secondary text-sm font-medium uppercase tracking-wider mb-1">Analyzed Cases Today</h4>
                        <p className="text-3xl font-extrabold text-white tracking-tight">1,204</p>
                    </div>
                </div>
            </motion.div>

        </motion.div>
    );
};

export default DashboardOverview;
