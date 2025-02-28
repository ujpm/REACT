import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Volunteer: React.FC = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom color="success.main">
        Volunteer & Donate
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Support community projects and initiatives
      </Typography>
    </Paper>
  );
};

export default Volunteer;
