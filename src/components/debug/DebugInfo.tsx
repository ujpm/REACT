import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'react-router-dom';

const DebugInfo: React.FC = () => {
  const { user, loading, error } = useAuth();
  const location = useLocation();

  return (
    <Paper sx={{ p: 2, m: 2, backgroundColor: '#f5f5f5' }}>
      <Typography variant="h6" gutterBottom>Debug Information</Typography>
      <Box>
        <Typography>Current Path: {location.pathname}</Typography>
        <Typography>Auth Loading: {loading.toString()}</Typography>
        <Typography>Auth Error: {error || 'None'}</Typography>
        <Typography>User: {user ? JSON.stringify(user) : 'Not logged in'}</Typography>
      </Box>
    </Paper>
  );
};

export default DebugInfo;
