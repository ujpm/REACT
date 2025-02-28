import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Campaigns: React.FC = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom color="success.main">
        Awareness Campaigns
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Launch and join community awareness initiatives
      </Typography>
    </Paper>
  );
};

export default Campaigns;
