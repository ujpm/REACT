import React from 'react';
import { Box, Container, Typography, Button, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import CommunityIcon from '@mui/icons-material/People';
import ReportIcon from '@mui/icons-material/Report';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}88, ${theme.palette.secondary.main}88)`,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `url(/assets/city-pattern.svg)`,
    opacity: 0.1,
    zIndex: 0,
  },
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
  },
}));

const LandingPage: React.FC = () => {
  return (
    <Box>
      <HeroSection>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontWeight: 700,
                  color: 'primary.light',
                  mb: 2,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                }}
              >
                REACT
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: 'primary.light',
                  mb: 4,
                  fontWeight: 300,
                }}
              >
                Empowering Communities, Driving Change
              </Typography>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'success.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'success.dark',
                  },
                }}
              >
                Join the Movement
              </Button>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          component="h2"
          align="center"
          sx={{ mb: 6, color: 'secondary.main' }}
        >
          How REACT Works
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <ReportIcon sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
              <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
                Report Issues
              </Typography>
              <Typography color="text.secondary">
                Easily report and track community issues with AI-powered categorization
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <CommunityIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
                Community Action
              </Typography>
              <Typography color="text.secondary">
                Connect with neighbors and organize community initiatives
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <AnalyticsIcon sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
              <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
                Track Progress
              </Typography>
              <Typography color="text.secondary">
                Monitor the impact of community actions and celebrate achievements
              </Typography>
            </FeatureCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;
