import React from 'react';
import { Box, Container, Paper, TextField, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Join REACT
        </Typography>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TextField
            required
            fullWidth
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="new-password"
          />
          <TextField
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            autoComplete="new-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="body2" color="primary">
                Already have an account? Sign In
              </Typography>
            </Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
