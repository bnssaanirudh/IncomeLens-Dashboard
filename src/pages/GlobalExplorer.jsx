import React from 'react';
import PowerBIEmbed from '../components/ui/PowerBIEmbed';
import { motion } from 'framer-motion';
import { Globe, MapPin, Navigation, Compass } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const GlobalExplorer = () => {
    const handleExportPDF = () => {
        const element = document.getElementById('global-explorer-content');
        const opt = {
            margin: 0.5,
            filename: 'Global-Explorer-Report.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
        };
        html2pdf().set(opt).from(element).save();
    };

    const geographicInsights = [
        {
            id: 1,
            region: 'North America',
            status: 'Low Risk',
            description: 'Consistent audit adherence with <1% defect rate.',
            textColorClass: 'text-cyan-400'
        },
        {
            id: 2,
            region: 'Asia Pacific',
            status: 'Improving Compliance',
            description: 'Surpassing expectations with an 18% drop in flagged issues.',
            textColorClass: 'text-emerald-400'
        },
        {
            id: 3,
            region: 'Europe',
            status: 'Stringent Governance',
            description: 'Focusing on GDPR and enhanced financial data screening.',
            textColorClass: 'text-purple-400'
        },
        {
            id: 4,
            region: 'Latin America',
            status: 'Monitored Risk',
            description: 'High vigilance zones with targeted NLP risk assessment deployment.',
            textColorClass: 'text-orange-400'
        }
    ];

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
            id="global-explorer-content"
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 tracking-tight flex items-center gap-3">
                        Global Explorer
                        <Globe className="text-cyan-400 animate-[spin_10s_linear_infinite]" size={32} />
                    </h2>
                    <p className="text-text-secondary mt-2 text-lg">Interactive geographic intelligence and regional breakdown</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={handleExportPDF} className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] backdrop-blur-md">Export PDF</button>
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative group rounded-3xl p-1 bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative glass-card rounded-[1.4rem] overflow-hidden shadow-2xl border border-white/10 bg-black/40 backdrop-blur-xl">
                    <div className="p-4 border-b border-white/5 flex items-center gap-3">
                        <Compass className="text-emerald-400" size={20} />
                        <span className="text-sm font-bold text-white tracking-widest uppercase">Geospatial Intelligence</span>
                    </div>
                    <div className="p-2">
                        <PowerBIEmbed
                            title="Global Map Dashboard"
                            height="700px"
                            embedUrl="https://app.powerbi.com/view?r=eyJrIjoiMTMyNDk0ZjItODQwNS00N2E1LTg0NTQtYTg0YWU5MjVkZTQ3IiwidCI6IjgwOGNjODNlLWE1NDYtNDdlNy1hMDNmLTczYTFlYmJhMjRmMyIsImMiOjEwfQ%3D%3D&pageName=fe828f4aad5b98599b54"
                        />
                    </div>
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel p-8 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 rounded-3xl border border-white/5">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-colors"></div>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white mb-6 shadow-lg shadow-emerald-500/30">
                        <Navigation size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Global Compliance Mapping</h3>
                    <p className="text-text-secondary leading-relaxed">
                        In-depth analysis of international compliance reveals significant improvements in audit completion rates, driving a secure operational framework across regions.
                    </p>
                </div>

                <div className="glass-panel p-8 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 rounded-3xl border border-white/5 md:col-span-2">
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-colors"></div>
                    <h3 className="text-2xl font-bold text-white mb-6 relative z-10 flex items-center gap-2">
                        <MapPin className="text-cyan-400" /> Geographic Risk Insights
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                        {geographicInsights.map((insight) => (
                            <div key={insight.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                                <span className={`block text-sm font-bold uppercase tracking-wider mb-2 ${insight.textColorClass}`}>{insight.region}</span>
                                <span className="block text-white text-xl font-medium mb-1">{insight.status}</span>
                                <span className="text-text-secondary text-sm" dangerouslySetInnerHTML={{ __html: insight.description }}></span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default GlobalExplorer;
