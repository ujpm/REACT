import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Collaborate: React.FC = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom color="success.main">
        Collaborate
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Partner with NGOs and government organizations
      </Typography>
    </Paper>
  );
};

export default Collaborate;
