import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
  Tooltip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  ReportProblem as ReportIcon,
  Map as MapIcon,
  People as CommunityIcon,
  Settings as SettingsIcon,
  Home as HomeIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const drawerWidth = 240;

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/', protected: false },
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', protected: true },
  { text: 'Report Issue', icon: <ReportIcon />, path: '/report-issue', protected: true },
  { text: 'Issues Map', icon: <MapIcon />, path: '/issues-map', protected: true },
  { text: 'Community', icon: <CommunityIcon />, path: '/community', protected: true },
];

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isOpen, setIsOpen] = useState(!isMobile);
  const [isHovered, setIsHovered] = useState(false);
  const [loginDialog, setLoginDialog] = useState(false);
  const [selectedPath, setSelectedPath] = useState('');
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleDrawerToggle = () => {
    setIsOpen(!isOpen);
  };

  const getDrawerWidth = () => {
    if (isMobile) return drawerWidth;
    if (isHovered || isOpen) return drawerWidth;
    return theme.spacing(7);
  };

  const handleNavigation = (path: string, isProtected: boolean) => {
    if (isProtected && !isAuthenticated) {
      setSelectedPath(path);
      setLoginDialog(true);
    } else {
      navigate(path);
    }
  };

  const handleLogin = () => {
    setLoginDialog(false);
    navigate('/login', { state: { returnUrl: selectedPath } });
  };

  const drawer = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      <List>
        {menuItems.map((item) => (
          <Tooltip
            key={item.text}
            title={(!isOpen && !isHovered) ? item.text : ''}
            placement="right"
          >
            <ListItem
              button
              onClick={() => handleNavigation(item.path, item.protected)}
              sx={{
                minHeight: 48,
                justifyContent: isOpen || isHovered ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isOpen || isHovered ? 2 : 'auto',
                  justifyContent: 'center',
                  color: item.protected && !isAuthenticated ? 'text.disabled' : 'inherit',
                }}
              >
                {item.protected && !isAuthenticated ? <LockIcon /> : item.icon}
              </ListItemIcon>
              {(isOpen || isHovered) && (
                <ListItemText 
                  primary={item.text} 
                  sx={{
                    color: item.protected && !isAuthenticated ? 'text.disabled' : 'inherit',
                  }}
                />
              )}
            </ListItem>
          </Tooltip>
        ))}
      </List>
      <Divider />
      <List sx={{ marginTop: 'auto' }}>
        <Tooltip
          title={(!isOpen && !isHovered) ? 'Settings' : ''}
          placement="right"
        >
          <ListItem
            button
            onClick={() => handleNavigation('/settings', true)}
            sx={{
              minHeight: 48,
              justifyContent: isOpen || isHovered ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isOpen || isHovered ? 2 : 'auto',
                justifyContent: 'center',
                color: !isAuthenticated ? 'text.disabled' : 'inherit',
              }}
            >
              {!isAuthenticated ? <LockIcon /> : <SettingsIcon />}
            </ListItemIcon>
            {(isOpen || isHovered) && (
              <ListItemText 
                primary="Settings" 
                sx={{
                  color: !isAuthenticated ? 'text.disabled' : 'inherit',
                }}
              />
            )}
          </ListItem>
        </Tooltip>
      </List>

      {/* Login Dialog */}
      <Dialog
        open={loginDialog}
        onClose={() => setLoginDialog(false)}
        aria-labelledby="login-dialog-title"
      >
        <DialogTitle id="login-dialog-title">
          Authentication Required
        </DialogTitle>
        <DialogContent>
          <Typography>
            You need to be logged in to access this feature. Would you like to log in or register?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLoginDialog(false)}>Cancel</Button>
          <Button onClick={() => {
            setLoginDialog(false);
            navigate('/register');
          }}>
            Register
          </Button>
          <Button onClick={handleLogin} variant="contained" color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{
          position: 'fixed',
          left: theme.spacing(2),
          top: theme.spacing(2),
          zIndex: theme.zIndex.drawer + 2,
          display: { sm: 'none' },
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isOpen}
        onClose={handleDrawerToggle}
        sx={{
          width: getDrawerWidth(),
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: getDrawerWidth(),
            boxSizing: 'border-box',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            ...(!isOpen && !isHovered && !isMobile && {
              overflowX: 'hidden',
              width: theme.spacing(7),
            }),
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Sidebar;
