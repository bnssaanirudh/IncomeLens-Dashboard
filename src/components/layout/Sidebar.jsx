import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Globe2,
    Map,
    Settings,
    LogOut,
    TrendingUp,
    MessageSquare,
    BarChart3
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
    const { logout, user } = useAuth();

    const navItems = [
        { path: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
        { path: '/dashboard/global', icon: Globe2, label: 'Global Explorer' },
        { path: '/dashboard/country', icon: Map, label: 'Country Analysis' },
        { path: '/dashboard/feedback', icon: MessageSquare, label: 'Feedback' },
        { path: '/dashboard/explore', icon: BarChart3, label: 'Data Explorer' },
    ];

    return (
        <aside className="w-64 h-screen fixed left-0 top-0 glass-panel border-r border-y-0 border-l-0 rounded-none z-40 flex flex-col pt-16">
            <div className="px-6 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    <TrendingUp size={18} />
                </div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    IncomeLens
                </h1>
            </div>

            <nav className="flex-1 px-4 mt-8 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/dashboard'}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                ? 'bg-primary/20 text-blue-400 border border-primary/30 shadow-[inset_0_0_20px_rgba(59,130,246,0.1)]'
                                : 'text-text-secondary hover:text-white hover:bg-white/5 border border-transparent'
                            }`
                        }
                    >
                        <item.icon size={20} />
                        <span className="font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 mt-auto border-t border-border/50">
                <div className="flex items-center gap-3 px-4 py-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
                        <p className="text-xs text-text-secondary truncate w-32">{user?.email}</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:text-red-400 hover:bg-red-400/10 transition-colors"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
