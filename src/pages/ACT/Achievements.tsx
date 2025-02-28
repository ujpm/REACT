import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Achievements: React.FC = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom color="success.main">
        Achievements
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Recognition system for community contributors
      </Typography>
    </Paper>
  );
};

export default Achievements;
