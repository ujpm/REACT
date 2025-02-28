import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const ReportIssue: React.FC = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom color="error.main">
        Report an Issue
      </Typography>
      <Typography variant="body1" color="text.secondary">
        AI-powered issue reporting and categorization system
      </Typography>
    </Paper>
  );
};

export default ReportIssue;
