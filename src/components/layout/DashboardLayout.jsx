import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-screen bg-background text-text-primary">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden pb-10"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <Sidebar />
            </div>

            <div className="md:ml-64 transition-all duration-300">
                <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main className="p-6 mt-16 pb-20">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
