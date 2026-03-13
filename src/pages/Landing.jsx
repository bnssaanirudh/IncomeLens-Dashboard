import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Globe2, BarChart3, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Landing = () => {
    return (
        <div className="min-h-screen bg-background text-text-primary overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />

            {/* Navigation */}
            <nav className="glass-panel rounded-none border-t-0 border-x-0 sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold shadow-[0_0_20px_rgba(59,130,246,0.6)]">
                        <TrendingUp size={24} />
                    </div>
                    <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        IncomeLens
                    </span>
                </div>

                <div className="flex gap-4">
                    <Link to="/login" className="px-6 py-2.5 rounded-xl text-white font-medium hover:bg-white/5 transition-colors">
                        Sign In
                    </Link>
                    <Link to="/signup" className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium hover:scale-105 transition-transform shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-6 pt-24 pb-32 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-white mb-8">
                        Visualize inequality.<br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500">
                            Drive change.
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed">
                        The premium analytics platform for structural economic analysis. 
                        Transform complex inequality data into clear, actionable insights 
                        through interactive dashboards and powerful visualizations.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link to="/signup" className="flex justify-center items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-gray-200 transition-colors">
                            Start Exploring <ArrowRight size={20} />
                        </Link>

                        <Link to="/login" className="flex justify-center items-center gap-2 px-8 py-4 rounded-full glass-panel text-white font-bold text-lg hover:bg-white/10 transition-colors">
                            View Demo
                        </Link>
                    </div>
                </motion.div>

                {/* Project Goal */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="max-w-5xl mx-auto mt-24 text-center"
                >
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Project Goal
                    </h2>
                    <p className="text-text-secondary text-lg leading-relaxed">
                        This project aims to analyze global income inequality by exploring 
                        economic indicators such as the Gini Index, GDP per capita, poverty rate, 
                        and income distribution across countries and regions.
                    </p>
                </motion.section>

                {/* Feature Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="grid md:grid-cols-3 gap-8 mt-32 text-left"
                >
                    <div className="glass-card p-8">
                        <Globe2 className="text-blue-400 mb-6" size={40} />
                        <h3 className="text-2xl font-bold text-white mb-4">Global Perspective</h3>
                        <p className="text-text-secondary leading-relaxed">
                            Explore macro-economic inequality trends across regions and continents.
                        </p>
                    </div>

                    <div className="glass-card p-8 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <BarChart3 className="text-purple-400 mb-6 relative z-10" size={40} />
                        <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Deep Analytics</h3>
                        <p className="text-text-secondary leading-relaxed relative z-10">
                            Perform advanced analysis of income distribution and development indicators.
                        </p>
                    </div>

                    <div className="glass-card p-8">
                        <ShieldCheck className="text-emerald-400 mb-6" size={40} />
                        <h3 className="text-2xl font-bold text-white mb-4">Enterprise Grade</h3>
                        <p className="text-text-secondary leading-relaxed">
                            Generate meaningful insights with professional-grade security and reliability.
                        </p>
                    </div>
                </motion.div>

                {/* Team Members */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.35 }}
                    className="max-w-5xl mx-auto mt-28 text-center"
                >
                    <h2 className="text-4xl font-bold text-white mb-10">
                        Meet the Team
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                        {["Anirudh", "Samruddhi", "Tejaswi", "Riya", "Phalguni"].map((member) => (
                            <div key={member} className="glass-card p-4 text-center">
                                <p className="text-white font-semibold">{member}</p>
                            </div>
                        ))}
                    </div>
                </motion.section>
            </main>

            {/* Footer */}
            <footer className="mt-24 py-8 text-center text-text-secondary border-t border-white/10">
                <p>© 2026 IncomeLens — Global Inequality Analytics Platform</p>
            </footer>
        </div>
    );
};

export default Landing;
