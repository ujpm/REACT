import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const TrendingIssues: React.FC = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom color="error.main">
        Trending Issues
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Community-voted urgent concerns and hot topics
      </Typography>
    </Paper>
  );
};

export default TrendingIssues;
