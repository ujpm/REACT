import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
          REACT
        </Typography>
        <Box>
          {!isAuthenticated ? (
            <>
              <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
              <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/dashboard')}>Dashboard</Button>
              <Button color="inherit" onClick={() => navigate('/report')}>Report Issue</Button>
              <Button color="inherit" onClick={() => navigate('/map')}>View Map</Button>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
