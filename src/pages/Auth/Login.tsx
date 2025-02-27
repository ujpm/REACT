import React from 'react';
import { Box, Container, Paper, TextField, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
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
          Sign in to REACT
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
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="body2" color="primary">
                Don't have an account? Sign Up
              </Typography>
            </Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
