import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, Briefcase, Globe, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [authError, setAuthError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
        setAuthError('');

        const result = await signup(data.name, data.email, data.password);

        if (result.success) {
            navigate('/dashboard');
        } else {
            setAuthError(result.error);
        }

        setIsLoading(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="glass-card p-8 md:p-10 w-full shadow-2xl relative z-10"
        >
            <h2 className="text-2xl font-bold text-white mb-2 text-center">Create Account</h2>
            <p className="text-text-secondary text-center mb-8">
                Join the definitive analytics platform
            </p>

            {authError && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-400">
                    <AlertCircle size={20} className="mt-0.5 shrink-0" />
                    <p className="text-sm">{authError}</p>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Full Name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                            <User size={18} />
                        </div>
                        <input
                            {...register('name', { required: 'Name is required' })}
                            type="text"
                            className={`w-full bg-black/20 border ${errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-primary'} rounded-xl py-3 pl-10 pr-4 text-white placeholder-text-secondary/50 outline-none transition-colors focus:shadow-[0_0_15px_rgba(59,130,246,0.2)]`}
                            placeholder="John Doe"
                        />
                    </div>
                    {errors.name && <p className="mt-1.5 text-sm text-red-400">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Email address</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                            <Mail size={18} />
                        </div>
                        <input
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address'
                                }
                            })}
                            type="email"
                            className={`w-full bg-black/20 border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-primary'} rounded-xl py-3 pl-10 pr-4 text-white placeholder-text-secondary/50 outline-none transition-colors focus:shadow-[0_0_15px_rgba(59,130,246,0.2)]`}
                            placeholder="john@example.com"
                        />
                    </div>
                    {errors.email && <p className="mt-1.5 text-sm text-red-400">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                            <Lock size={18} />
                        </div>
                        <input
                            {...register('password', {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Minimum 6 characters required' }
                            })}
                            type="password"
                            className={`w-full bg-black/20 border ${errors.password ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-primary'} rounded-xl py-3 pl-10 pr-4 text-white placeholder-text-secondary/50 outline-none transition-colors focus:shadow-[0_0_15px_rgba(59,130,246,0.2)]`}
                            placeholder="••••••••"
                        />
                    </div>
                    {errors.password && <p className="mt-1.5 text-sm text-red-400">{errors.password.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-4 mt-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                >
                    {isLoading ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                        'Create Account'
                    )}
                </button>
            </form>

            <div className="mt-8 text-center text-sm text-text-secondary">
                Already have an account?{' '}
                <button onClick={() => navigate('/login')} className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                    Sign In
                </button>
            </div>
        </motion.div>
    );
};

export default Signup;
