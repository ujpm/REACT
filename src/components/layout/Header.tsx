import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Stack, Tabs, Tab, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';
import { FeatureType, navigationItems } from '../../config/navigation';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);

  // Determine current feature type based on current path
  const getCurrentFeatureType = (): FeatureType => {
    const currentPath = location.pathname;
    const currentNavItem = navigationItems.find(item => currentPath.startsWith(item.path));
    return currentNavItem?.type || 'REACT';
  };

  const [featureType, setFeatureType] = useState<FeatureType>(getCurrentFeatureType());

  const handleFeatureChange = (event: React.SyntheticEvent, newValue: FeatureType) => {
    setFeatureType(newValue);
    // Navigate to the first page of the selected feature type
    const firstNavItem = navigationItems.find(item => item.type === newValue);
    if (firstNavItem) {
      navigate(firstNavItem.path);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: 'background.paper',
        color: 'text.primary',
        boxShadow: 1,
      }}
    >
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            cursor: 'pointer',
            color: 'primary.main',
            fontWeight: 'bold',
            letterSpacing: 1,
            marginRight: 4
          }} 
          onClick={() => navigate('/')}
        >
          REACT
        </Typography>

        {isAuthenticated && (
          <Tabs 
            value={featureType} 
            onChange={handleFeatureChange}
            sx={{ 
              marginRight: 'auto',
              '& .MuiTab-root': {
                fontSize: '1rem',
                fontWeight: 'medium',
              }
            }}
          >
            <Tab 
              label="REACT" 
              value="REACT" 
              sx={{ 
                color: 'error.main',
                '&.Mui-selected': { color: 'error.main' }
              }}
            />
            <Tab 
              label="ACT" 
              value="ACT" 
              sx={{ 
                color: 'success.main',
                '&.Mui-selected': { color: 'success.main' }
              }}
            />
          </Tabs>
        )}

        <Stack direction="row" spacing={2} alignItems="center">
          {isAuthenticated ? (
            <>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Welcome, {user?.name || user?.email?.split('@')[0]}
              </Typography>
              <Button 
                variant="outlined" 
                color="primary" 
                size="small"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="text" 
                color="primary"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => navigate('/register')}
              >
                Register
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
