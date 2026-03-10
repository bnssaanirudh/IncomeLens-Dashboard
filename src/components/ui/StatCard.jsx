import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, trend, subtext }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 relative overflow-hidden group cursor-pointer"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-[0.15] group-hover:scale-110 transition-all duration-300">
                <Icon size={120} />
            </div>

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                    <p className="text-sm font-medium text-text-secondary">{title}</p>
                    <h3 className="text-3xl font-bold mt-1 tracking-tight text-white">{value}</h3>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 shadow-lg relative z-10">
                    <Icon className="text-blue-400 group-hover:text-white transition-colors" size={24} />
                </div>
            </div>

            <div className="flex items-center gap-2 mt-4 relative z-10">
                {trend && (
                    <span className={`text-xs font-semibold px-2 py-1 rounded-md ${trend > 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                        {trend > 0 ? '+' : ''}{trend}%
                    </span>
                )}
                <span className="text-xs text-text-secondary">{subtext}</span>
            </div>
        </motion.div>
    );
};

export default StatCard;
