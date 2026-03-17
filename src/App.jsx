import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import DashboardLayout from './components/layout/DashboardLayout';
import AuthLayout from './components/layout/AuthLayout';

// Public Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Dashboard Pages
import DashboardOverview from './pages/DashboardOverview';
import GlobalExplorer from './pages/GlobalExplorer';
import CountryAnalysis from './pages/CountryAnalysis';
import FeedbackPage from './pages/FeedbackPage';
import DataExplorer from './pages/DataExplorer';

// Context
import { ScenarioProvider } from './context/ScenarioContext';

function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Landing />} />

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Protected Dashboard Routes */}
      <Route path="/dashboard" element={
        <ScenarioProvider>
          <DashboardLayout />
        </ScenarioProvider>
      }>
        <Route index element={<DashboardOverview />} />
        <Route path="global" element={<GlobalExplorer />} />
        <Route path="country" element={<CountryAnalysis />} />
        <Route path="feedback" element={<FeedbackPage />} />
        <Route path="explore" element={<DataExplorer />} />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
