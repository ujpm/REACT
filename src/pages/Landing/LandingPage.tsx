import React from 'react';
import { Box, Container, Typography, Button, Grid, Paper, AppBar, Toolbar, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import CommunityIcon from '@mui/icons-material/People';
import ReportIcon from '@mui/icons-material/Report';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const PublicHeader = styled(AppBar)(({ theme }) => ({
  background: 'transparent',
  boxShadow: 'none',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 2,
}));

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Box>
      <PublicHeader>
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          {isAuthenticated ? (
            <Button
              component={RouterLink}
              to="/report-issue"
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}
            >
              Go to Dashboard
            </Button>
          ) : (
            <>
              <Button
                component={RouterLink}
                to="/login"
                variant="outlined"
                color="primary"
                sx={{ mr: 2 }}
              >
                Login
              </Button>
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                color="primary"
              >
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </PublicHeader>

      <HeroSection>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontWeight: 700,
                  color: 'white',
                  mb: 2,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                }}
              >
                REACT
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: 'white',
                  mb: 4,
                  fontWeight: 300,
                }}
              >
                Empowering Communities, Driving Change
              </Typography>
              {!isAuthenticated && (
                <Button
                  component={RouterLink}
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
              )}
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
              <Typography variant="h5" gutterBottom>
                Report Issues
              </Typography>
              <Typography color="text.secondary">
                Easily report community issues with our AI-powered system that helps categorize and prioritize concerns.
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <CommunityIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Community Action
              </Typography>
              <Typography color="text.secondary">
                Connect with local organizations and fellow citizens to take meaningful action on reported issues.
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <AnalyticsIcon sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Track Progress
              </Typography>
              <Typography color="text.secondary">
                Monitor the status of reported issues and see the real impact of community engagement.
              </Typography>
            </FeatureCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;
