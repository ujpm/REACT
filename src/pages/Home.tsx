import React from 'react';
import { Box, Typography } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to the App
      </Typography>
      <Typography variant="body1">
        This is your home page. Start adding your content here.
      </Typography>
    </Box>
  );
};

export default Home;
