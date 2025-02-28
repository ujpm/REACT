import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const TrackIssues: React.FC = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom color="error.main">
        Track Issues
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Real-time tracking and status updates for reported issues
      </Typography>
    </Paper>
  );
};

export default TrackIssues;
