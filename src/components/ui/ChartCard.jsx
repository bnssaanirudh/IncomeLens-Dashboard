import React from 'react';
import { motion } from 'framer-motion';

const ChartCard = ({ title, subtitle, children, className = '' }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className={`glass-panel p-6 flex flex-col ${className}`}
        >
            <div className="mb-6 flex justify-between items-end">
                <div>
                    <h3 className="text-xl font-semibold text-white tracking-tight">{title}</h3>
                    {subtitle && <p className="text-sm text-text-secondary mt-1">{subtitle}</p>}
                </div>
            </div>
            <div className="flex-1 w-full min-h-[300px]">
                {children}
            </div>
        </motion.div>
    );
};

export default ChartCard;
