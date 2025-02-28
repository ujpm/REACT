import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Pages
import LandingPage from '../pages/Landing/LandingPage';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ReportIssue from '../pages/REACT/ReportIssue';
import TrackIssues from '../pages/REACT/TrackIssues';
import ConfidentialReports from '../pages/REACT/ConfidentialReports';
import TrendingIssues from '../pages/REACT/TrendingIssues';
import Volunteer from '../pages/ACT/Volunteer';
import Campaigns from '../pages/ACT/Campaigns';
import Collaborate from '../pages/ACT/Collaborate';
import Achievements from '../pages/ACT/Achievements';

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/report-issue" />} />
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/report-issue" />}
      />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/report-issue" />}
      />

      {/* Protected routes */}
      <Route
        path="/report-issue"
        element={user ? <ReportIssue /> : <Navigate to="/login" />}
      />
      <Route
        path="/track-issues"
        element={user ? <TrackIssues /> : <Navigate to="/login" />}
      />
      <Route
        path="/confidential-reports"
        element={user ? <ConfidentialReports /> : <Navigate to="/login" />}
      />
      <Route
        path="/trending-issues"
        element={user ? <TrendingIssues /> : <Navigate to="/login" />}
      />
      <Route
        path="/volunteer"
        element={user ? <Volunteer /> : <Navigate to="/login" />}
      />
      <Route
        path="/campaigns"
        element={user ? <Campaigns /> : <Navigate to="/login" />}
      />
      <Route
        path="/collaborate"
        element={user ? <Collaborate /> : <Navigate to="/login" />}
      />
      <Route
        path="/achievements"
        element={user ? <Achievements /> : <Navigate to="/login" />}
      />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
