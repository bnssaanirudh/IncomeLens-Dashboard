import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';

const Navbar = ({ toggleSidebar }) => {
    return (
        <header className="h-16 glass-panel border-b border-x-0 border-t-0 rounded-none fixed top-0 right-0 left-0 md:left-64 z-30 flex items-center justify-between px-6 transition-all duration-300">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="md:hidden text-text-secondary hover:text-white"
                >
                    <Menu size={24} />
                </button>

                <div className="hidden md:flex items-center gap-2 bg-black/20 border border-white/10 rounded-full px-4 py-1.5 focus-within:border-primary/50 focus-within:shadow-[0_0_10px_rgba(59,130,246,0.2)] transition-all">
                    <Search size={16} className="text-text-secondary" />
                    <input
                        type="text"
                        placeholder="Search analytics..."
                        className="bg-transparent border-none outline-none text-sm text-white placeholder-text-secondary w-64"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2 text-text-secondary hover:text-white transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                </button>
            </div>
        </header>
    );
};

export default Navbar;
