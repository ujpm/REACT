import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import Layout from './components/layout/Layout';
import AppRoutes from './routes';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ReportIssue from './pages/REACT/ReportIssue';
import TrackIssues from './pages/REACT/TrackIssues';
import ConfidentialReports from './pages/REACT/ConfidentialReports';
import TrendingIssues from './pages/REACT/TrendingIssues';
import Volunteer from './pages/ACT/Volunteer';
import Campaigns from './pages/ACT/Campaigns';
import Collaborate from './pages/ACT/Collaborate';
import Achievements from './pages/ACT/Achievements';

// Components
import ProtectedRoute from './components/auth/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Layout>
            <AppRoutes />
          </Layout>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
