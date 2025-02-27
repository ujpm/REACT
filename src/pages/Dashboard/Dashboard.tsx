import React from 'react';
import { Box, Container, Typography, Grid, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import GroupIcon from '@mui/icons-material/Group';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2)
}));

const Dashboard: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12}>
          <StyledPaper>
            <Typography variant="h6">Quick Actions</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" startIcon={<ReportProblemIcon />}>
                Report Issue
              </Button>
              <Button variant="outlined" startIcon={<GroupIcon />}>
                View Community
              </Button>
            </Box>
          </StyledPaper>
        </Grid>

        {/* Recent Reports */}
        <Grid item xs={12} md={8}>
          <StyledPaper>
            <Typography variant="h6">Recent Reports</Typography>
            <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography color="text.secondary">No recent reports</Typography>
            </Box>
          </StyledPaper>
        </Grid>

        {/* Activity Stats */}
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Typography variant="h6">Activity Stats</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TrendingUpIcon color="primary" />
              <Typography>Your Impact Score: 0</Typography>
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
