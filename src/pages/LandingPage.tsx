import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  Link,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const LandingPage: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        pt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ pr: { md: 4 }, mb: 4 }}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  color: 'primary.main',
                }}
              >
                REACT: Report, Engage, Act for Change Together
              </Typography>
              <Typography
                variant="h5"
                color="textSecondary"
                paragraph
                sx={{ mb: 4 }}
              >
                A platform empowering citizens to report and track community issues,
                collaborate on solutions, and drive positive change in your neighborhood.
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="contained"
                  size="large"
                  sx={{ mr: 2 }}
                >
                  Get Started
                </Button>
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="outlined"
                  size="large"
                >
                  Sign In
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 3,
                      height: '100%',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: 'primary.main' }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {feature.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const features = [
  {
    title: 'Report Issues',
    description:
      'Easily report community issues with location tracking and detailed descriptions.',
  },
  {
    title: 'Track Progress',
    description:
      'Monitor the status of reported issues and stay updated on resolution progress.',
  },
  {
    title: 'Community Collaboration',
    description:
      'Connect with neighbors and local authorities to work together on solutions.',
  },
  {
    title: 'Data-Driven Insights',
    description:
      'Access analytics and trends to better understand community needs and impact.',
  },
];

export default LandingPage;
