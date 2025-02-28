import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
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

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes with Layout */}
            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              {/* REACT Features */}
              <Route path="/report-issue" element={<ReportIssue />} />
              <Route path="/track-issues" element={<TrackIssues />} />
              <Route path="/confidential-reports" element={<ConfidentialReports />} />
              <Route path="/trending-issues" element={<TrendingIssues />} />

              {/* ACT Features */}
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/collaborate" element={<Collaborate />} />
              <Route path="/achievements" element={<Achievements />} />
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
