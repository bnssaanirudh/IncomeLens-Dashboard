import React, { useState, useEffect } from 'react';
import StatCard from '../components/ui/StatCard';
import PowerBIEmbed from '../components/ui/PowerBIEmbed';
import { BadgeDollarSign, Activity, Users, TrendingUp, Sparkles, Target, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import html2pdf from 'html2pdf.js';

const DashboardOverview = () => {
    const [liveData, setLiveData] = useState({
        giniIndex: 0.38,
        incomeGapRatio: 9.4,
        povertyRate: 10.2,
        countriesAnalyzed: 142
    });

    const [isUpdating, setIsUpdating] = useState(false);

    // Simulate live data updates every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setIsUpdating(true);
            
            // Simulate API call delay
            setTimeout(() => {
                setLiveData(prev => ({
                    // Gini Index fluctuates between 0.30 and 0.45
                    giniIndex: +Math.min(0.45, Math.max(0.30, prev.giniIndex + (Math.random() - 0.5) * 0.02)).toFixed(2),
                    // Income Gap Ratio (top 10% / bottom 10%) fluctuates between 8.0 and 12.0
                    incomeGapRatio: +Math.min(12.0, Math.max(8.0, prev.incomeGapRatio + (Math.random() - 0.5) * 0.4)).toFixed(1),
                    // Poverty rate fluctuates between 8% and 12%
                    povertyRate: +Math.min(12.0, Math.max(8.0, prev.povertyRate + (Math.random() - 0.5) * 0.3)).toFixed(1),
                    // Countries analyzed increases by 0-2
                    countriesAnalyzed: Math.min(195, prev.countriesAnalyzed + Math.floor(Math.random() * 3))
                }));
                setIsUpdating(false);
            }, 300);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

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

    // Calculate dynamic status badges
    const getGiniStatus = () => {
        const change = (0.38 - liveData.giniIndex).toFixed(2);
        return change > 0 ? `↓${change}` : `↑${Math.abs(change)}`;
    };

    const getCountriesChange = () => {
        return `+${liveData.countriesAnalyzed - 142}`;
    };

    const insightsData = [
        {
            id: 1,
            title: 'Global Gini Index',
            value: liveData.giniIndex.toFixed(2),
            status: getGiniStatus(),
            icon: Activity,
            borderClass: 'border-t-blue-500/50',
            bgClass: 'bg-blue-500/10',
            bgHoverClass: 'group-hover:bg-blue-500/20',
            iconBgClass: 'bg-blue-500/20',
            iconTextClass: 'text-blue-400',
            statusBgClass: liveData.giniIndex < 0.38 ? 'bg-green-500/20' : 'bg-red-500/20',
            statusTextClass: liveData.giniIndex < 0.38 ? 'text-green-400' : 'text-red-400'
        },
        {
            id: 2,
            title: 'Income Gap Ratio',
            value: `${liveData.incomeGapRatio}x`,
            status: liveData.incomeGapRatio <= 9.0 ? 'Narrowing' : 'Wide',
            icon: TrendingUp,
            borderClass: 'border-t-purple-500/50',
            bgClass: 'bg-purple-500/10',
            bgHoverClass: 'group-hover:bg-purple-500/20',
            iconBgClass: 'bg-purple-500/20',
            iconTextClass: 'text-purple-400',
            statusBgClass: liveData.incomeGapRatio <= 9.0 ? 'bg-emerald-500/20' : 'bg-amber-500/20',
            statusTextClass: liveData.incomeGapRatio <= 9.0 ? 'text-emerald-400' : 'text-amber-400'
        },
        {
            id: 3,
            title: 'Global Poverty Rate',
            value: `${liveData.povertyRate}%`,
            status: liveData.povertyRate <= 10.0 ? 'Declining' : 'Elevated',
            icon: Target,
            borderClass: 'border-t-indigo-500/50',
            bgClass: 'bg-indigo-500/10',
            bgHoverClass: 'group-hover:bg-indigo-500/20',
            iconBgClass: 'bg-indigo-500/20',
            iconTextClass: 'text-indigo-400',
            statusBgClass: liveData.povertyRate <= 10.0 ? 'bg-green-500/20' : 'bg-orange-500/20',
            statusTextClass: liveData.povertyRate <= 10.0 ? 'text-green-400' : 'text-orange-400'
        },
        {
            id: 4,
            title: 'Countries Analyzed',
            value: liveData.countriesAnalyzed.toLocaleString(),
            status: getCountriesChange(),
            icon: Users,
            borderClass: 'border-t-emerald-500/50',
            bgClass: 'bg-emerald-500/10',
            bgHoverClass: 'group-hover:bg-emerald-500/20',
            iconBgClass: 'bg-emerald-500/20',
            iconTextClass: 'text-emerald-400',
            statusBgClass: 'bg-green-500/20',
            statusTextClass: 'text-green-400'
        }
    ];

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
                    {isUpdating && (
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                        </span>
                    )}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {insightsData.map((insight) => {
                        const IconComponent = insight.icon;
                        return (
                            <motion.div 
                                key={insight.id} 
                                className={`glass-panel p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 border ${insight.borderClass}`}
                                animate={{ 
                                    scale: isUpdating ? [1, 1.02, 1] : 1,
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl transition-colors ${insight.bgClass} ${insight.bgHoverClass}`}></div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-xl ${insight.iconBgClass} ${insight.iconTextClass}`}>
                                        <IconComponent size={24} />
                                    </div>
                                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${insight.statusBgClass} ${insight.statusTextClass}`}>{insight.status}</span>
                                </div>
                                <h4 className="text-text-secondary text-sm font-medium uppercase tracking-wider mb-1">{insight.title}</h4>
                                <motion.p 
                                    className="text-3xl font-extrabold text-white tracking-tight"
                                    key={insight.value}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {insight.value}
                                </motion.p>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>

        </motion.div>
    );
};

export default DashboardOverview;
