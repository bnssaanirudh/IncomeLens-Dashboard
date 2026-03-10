import React from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { TrendingUp, ArrowLeft } from 'lucide-react';

const AuthLayout = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] mix-blend-screen" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px] mix-blend-screen" />

            <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-text-secondary hover:text-white transition-colors">
                <ArrowLeft size={20} />
                <span>Back Home</span>
            </Link>

            <div className="w-full max-w-md">
                <div className="flex justify-center mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold shadow-[0_0_20px_rgba(59,130,246,0.6)]">
                            <TrendingUp size={24} />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                            IncomeLens
                        </h1>
                    </div>
                </div>

                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
