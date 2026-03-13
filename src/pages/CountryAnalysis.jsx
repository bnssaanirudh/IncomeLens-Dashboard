import React from 'react';
import PowerBIEmbed from '../components/ui/PowerBIEmbed';
import { motion } from 'framer-motion';
import { Building2, Search, BookOpen, BarChart3 } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const CountryAnalysis = () => {
    const handleExportPDF = () => {
        const element = document.getElementById('country-analysis-content');
        const opt = {
            margin: 0.5,
            filename: 'Country-Analysis-Report.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
        };
        html2pdf().set(opt).from(element).save();
    };

    const analysisCards = [
        {
            id: 1,
            category: 'Audit Compliance',
            title: 'Regional Audit Status',
            description: 'Detailed breakdown correlates local risk factors with direct improvements in overall audit and compliance accuracy.',
            icon: BookOpen,
            borderClass: 'border-t-orange-500',
            categoryTextClass: 'text-orange-400'
        },
        {
            id: 2,
            category: 'Data Assurance',
            title: 'NLP Risk Analysis',
            description: 'Advanced NLP model processing of regional financial documents shows a 15% increase in automated fraud detection accuracy.',
            icon: Building2,
            borderClass: 'border-t-rose-500',
            categoryTextClass: 'text-rose-400'
        },
        {
            id: 3,
            category: 'Quality Metric',
            title: 'Defect Rate Monitoring',
            description: 'The embedded dashboard indicates a stabilization phase. Defect rates in localized documentation show a downward trend over the previous 6 months.',
            icon: BarChart3,
            borderClass: 'border-t-pink-500',
            categoryTextClass: 'text-pink-400'
        }
    ];

    const countries = [
        'United States - Analysis',
        'United Kingdom - Analysis',
        'Germany - Analysis',
        'India - Analysis',
        'Brazil - Analysis'
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
            id="country-analysis-content"
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500 tracking-tight flex items-center gap-3">
                        Country Analysis
                        <Building2 className="text-rose-400" size={32} />
                    </h2>
                    <p className="text-text-secondary mt-2 text-lg">Detailed macroeconomic breakdown and policy impact</p>
                </div>

                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                    <div className="w-full md:w-72 relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-rose-500 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                        <div className="relative glass-panel border border-white/20 p-1.5 rounded-xl flex items-center bg-black/50 backdrop-blur-xl">
                            <Search className="text-text-secondary ml-3 mr-2" size={18} />
                            <select className="flex-1 bg-transparent text-white font-medium border-none outline-none py-2 px-2 appearance-none cursor-pointer">
                                {countries.map((country, index) => (
                                    <option key={index} className="bg-background text-white">{country}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button onClick={handleExportPDF} className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] backdrop-blur-md whitespace-nowrap">
                        Export PDF
                    </button>
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative group rounded-3xl p-1 bg-gradient-to-tr from-orange-500/20 to-rose-500/20">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-rose-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative glass-card rounded-[1.4rem] overflow-hidden shadow-2xl border border-white/10 bg-black/40 backdrop-blur-xl">
                    <div className="p-4 border-b border-white/5 flex items-center gap-3">
                        <BarChart3 className="text-orange-400" size={20} />
                        <span className="text-sm font-bold text-white tracking-widest uppercase">Deep Dive Metrics</span>
                    </div>
                    <div className="p-2">
                        <PowerBIEmbed
                            title="Country Specific Dashboard"
                            height="650px"
                            embedUrl="https://app.powerbi.com/view?r=eyJrIjoiMTMyNDk0ZjItODQwNS00N2E1LTg0NTQtYTg0YWU5MjVkZTQ3IiwidCI6IjgwOGNjODNlLWE1NDYtNDdlNy1hMDNmLTczYTFlYmJhMjRmMyIsImMiOjEwfQ%3D%3D&pageName=54855b14d1cf11fb1eb8"
                        />
                    </div>
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {analysisCards.map((card) => {
                    const IconComponent = card.icon;
                    return (
                        <div key={card.id} className={`glass-card p-8 rounded-3xl border-t-4 relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 ${card.borderClass}`}>
                            <div className="absolute -right-10 -top-10 opacity-10 group-hover:opacity-20 transition-opacity">
                                <IconComponent size={150} />
                            </div>
                            <p className={`text-xs font-bold uppercase tracking-widest mb-3 relative z-10 ${card.categoryTextClass}`}>{card.category}</p>
                            <h4 className="text-2xl font-bold text-white mb-4 relative z-10">{card.title}</h4>
                            <p className="text-text-secondary leading-relaxed relative z-10">
                                {card.description}
                            </p>
                        </div>
                    );
                })}
            </motion.div>
        </motion.div>
    );
};

export default CountryAnalysis;
