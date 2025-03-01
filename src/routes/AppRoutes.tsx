import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from '../pages/Home';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Layout from '../components/layout/Layout';
import { RootState } from '../store';

// ACT Pages
import Achievements from '../pages/ACT/Achievements';
import Campaigns from '../pages/ACT/Campaigns';
import Collaborate from '../pages/ACT/Collaborate';
import Volunteer from '../pages/ACT/Volunteer';

// REACT Pages
import ConfidentialReports from '../pages/REACT/ConfidentialReports';
import ReportIssue from '../pages/REACT/ReportIssue';
import TrackIssues from '../pages/REACT/TrackIssues';
import TrendingIssues from '../pages/REACT/TrendingIssues';

// Dashboard
import Dashboard from '../pages/Dashboard/Dashboard';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Routes - All wrapped in Layout */}
      <Route
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        {/* Home and Dashboard */}
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* ACT Routes */}
        <Route path="/act">
          <Route path="achievements" element={<Achievements />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="collaborate" element={<Collaborate />} />
          <Route path="volunteer" element={<Volunteer />} />
        </Route>
        
        {/* REACT Routes */}
        <Route path="/react">
          <Route path="confidential-reports" element={<ConfidentialReports />} />
          <Route path="report-issue" element={<ReportIssue />} />
          <Route path="track-issues" element={<TrackIssues />} />
          <Route path="trending-issues" element={<TrendingIssues />} />
        </Route>
      </Route>
      
      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
