import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const ConfidentialReports: React.FC = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom color="error.main">
        Confidential Reports
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Secure channel for sensitive issue reporting
      </Typography>
    </Paper>
  );
};

export default ConfidentialReports;
