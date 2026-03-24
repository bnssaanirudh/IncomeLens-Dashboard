/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is in localStorage on mount
        const storedUser = localStorage.getItem('incomelens_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email, password) => {
        setIsLoading(true);
        try {
            const userData = await authService.login(email, password);
            setUser(userData);
            localStorage.setItem('incomelens_user', JSON.stringify(userData));
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (name, email, password, role) => {
        setIsLoading(true);
        try {
            const userData = await authService.signup(name, email, password, role);
            setUser(userData);
            localStorage.setItem('incomelens_user', JSON.stringify(userData));
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        localStorage.removeItem('incomelens_user');
    };

    const value = {
        user,
        isLoading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
