import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import Layout from './components/layout/Layout';
import LandingPage from './pages/Landing/LandingPage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// REACT Features
import ReportIssue from './pages/REACT/ReportIssue';
import TrackIssues from './pages/REACT/TrackIssues';
import ConfidentialReports from './pages/REACT/ConfidentialReports';
import TrendingIssues from './pages/REACT/TrendingIssues';

// ACT Features
import Volunteer from './pages/ACT/Volunteer';
import Campaigns from './pages/ACT/Campaigns';
import Collaborate from './pages/ACT/Collaborate';
import Achievements from './pages/ACT/Achievements';

import { useSelector } from 'react-redux';
import { RootState } from './store';

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

// App component
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* REACT Features */}
          <Route
            path="/report-issue"
            element={
              <ProtectedRoute>
                <ReportIssue />
              </ProtectedRoute>
            }
          />
          <Route
            path="/track-issues"
            element={
              <ProtectedRoute>
                <TrackIssues />
              </ProtectedRoute>
            }
          />
          <Route
            path="/confidential"
            element={
              <ProtectedRoute>
                <ConfidentialReports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trending"
            element={
              <ProtectedRoute>
                <TrendingIssues />
              </ProtectedRoute>
            }
          />

          {/* ACT Features */}
          <Route
            path="/volunteer"
            element={
              <ProtectedRoute>
                <Volunteer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/campaigns"
            element={
              <ProtectedRoute>
                <Campaigns />
              </ProtectedRoute>
            }
          />
          <Route
            path="/collaborate"
            element={
              <ProtectedRoute>
                <Collaborate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/achievements"
            element={
              <ProtectedRoute>
                <Achievements />
              </ProtectedRoute>
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
