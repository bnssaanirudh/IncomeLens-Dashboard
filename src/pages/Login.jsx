import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [authError, setAuthError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setAuthError('');

        const result = await login(data.email, data.password);

        if (result.success) {
            navigate('/dashboard');
        } else {
            setAuthError(result.error);
        }

        setIsSubmitting(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 md:p-10 w-full shadow-2xl relative z-10"
        >
            <h2 className="text-2xl font-bold text-white mb-2 text-center">Welcome Back</h2>
            <p className="text-text-secondary text-center mb-8">
                Access your premium analytics console
            </p>

            {authError && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-400">
                    <AlertCircle size={20} className="mt-0.5 shrink-0" />
                    <p className="text-sm">{authError}</p>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                            placeholder="admin@incomelens.com"
                        />
                    </div>
                    {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                            <Lock size={18} />
                        </div>
                        <input
                            {...register('password', { required: 'Password is required' })}
                            type="password"
                            className={`w-full bg-black/20 border ${errors.password ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-primary'} rounded-xl py-3 pl-10 pr-4 text-white placeholder-text-secondary/50 outline-none transition-colors focus:shadow-[0_0_15px_rgba(59,130,246,0.2)]`}
                            placeholder="••••••••"
                        />
                    </div>
                    {errors.password && <p className="mt-2 text-sm text-red-400">{errors.password.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                >
                    {isSubmitting ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                        'Sign In'
                    )}
                </button>
            </form>

            <div className="mt-8 text-center text-sm text-text-secondary">
                Don't have an account?{' '}
                <button onClick={() => navigate('/signup')} className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                    Create one now
                </button>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-text-secondary/80 text-left space-y-3">
                <p className="font-bold text-center text-white mb-2 pb-2 border-b border-white/10 border-dashed">Demo Credentials:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-center">
                    <div>
                        <span className="text-secondary font-bold block mb-1">Expert Role</span>
                        <p>admin@incomelens.com</p>
                        <p>admin123</p>
                    </div>
                    <div>
                        <span className="text-green-400 font-bold block mb-1">Student Role</span>
                        <p>student@incomelens.com</p>
                        <p>student123</p>
                    </div>
                    <div>
                        <span className="text-blue-400 font-bold block mb-1">General User</span>
                        <p>user@incomelens.com</p>
                        <p>user123</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Login;
