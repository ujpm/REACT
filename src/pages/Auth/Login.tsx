import React, { useState } from 'react';
import { Box, Container, Paper, TextField, Button, Typography, Alert } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, authenticateUser, PREDEFINED_USERS } from '../../store/slices/authSlice';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = authenticateUser(formData.email, formData.password);
    
    if (result) {
      dispatch(login(result));
      // Navigate to the first page of REACT features
      navigate('/report-issue');
    } else {
      setError('We couldn\'t verify your credentials. Please check your email and password.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
          Welcome Back
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
          Access your REACT account to continue making a difference in your community
        </Typography>

        <Paper 
          component="form" 
          onSubmit={handleSubmit}
          sx={{
            p: 4,
            width: '100%',
            borderRadius: 2,
          }}
        >
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Access Account
          </Button>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              New to REACT?{' '}
              <Link to="/register" style={{ color: 'inherit', fontWeight: 'bold' }}>
                Join our community
              </Link>
            </Typography>
          </Box>

          {/* Demo Credentials */}
          <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
              For demonstration purposes:
            </Typography>
            <Typography variant="caption" color="text.secondary" component="div">
              Community Admin: {PREDEFINED_USERS.admin.email} / {PREDEFINED_USERS.admin.password}
            </Typography>
            <Typography variant="caption" color="text.secondary" component="div">
              Community Member: {PREDEFINED_USERS.user.email} / {PREDEFINED_USERS.user.password}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
