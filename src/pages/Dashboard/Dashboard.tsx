import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Box>
        {/* Dashboard content will go here */}
      </Box>
    </Container>
  );
};

export default Dashboard;
