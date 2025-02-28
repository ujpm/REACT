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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  alpha,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  ReportProblem as ReportIcon,
  Map as MapIcon,
  People as CommunityIcon,
  Settings as SettingsIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const drawerWidth = 240;
const closedDrawerWidth = 65;

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
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isOpen, setIsOpen] = useState(false);
  const [loginDialog, setLoginDialog] = useState(false);
  const [selectedPath, setSelectedPath] = useState('');
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleDrawerToggle = () => {
    setIsOpen(!isOpen);
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
        overflow: 'hidden',
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            onClick={() => handleNavigation(item.path, item.protected)}
            sx={{
              minHeight: 48,
              px: 2.5,
              cursor: 'pointer',
              transition: theme.transitions.create(['background-color', 'color', 'padding'], {
                duration: theme.transitions.duration.standard,
              }),
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                paddingLeft: 3,
                '& .MuiListItemIcon-root': {
                  color: theme.palette.primary.main,
                },
                '& .MuiListItemText-root': {
                  color: theme.palette.primary.main,
                },
              },
              ...(location.pathname === item.path && {
                backgroundColor: alpha(theme.palette.primary.main, 0.12),
                '& .MuiListItemIcon-root': {
                  color: theme.palette.primary.main,
                },
                '& .MuiListItemText-root': {
                  color: theme.palette.primary.main,
                },
              }),
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isOpen ? 2 : 'auto',
                justifyContent: 'center',
                transition: theme.transitions.create(['margin', 'color'], {
                  duration: theme.transitions.duration.standard,
                }),
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                opacity: isOpen ? 1 : 0,
                transition: theme.transitions.create(['opacity', 'transform'], {
                  duration: theme.transitions.duration.standard,
                }),
                transform: isOpen ? 'translateX(0)' : 'translateX(-10px)',
                whiteSpace: 'nowrap',
              }}
            />
          </ListItem>
        ))}
      </List>

      {/* Settings at the bottom */}
      <List sx={{ marginTop: 'auto' }}>
        <ListItem
          onClick={() => handleNavigation('/settings', true)}
          sx={{
            minHeight: 48,
            px: 2.5,
            cursor: 'pointer',
            transition: theme.transitions.create(['background-color', 'color', 'padding'], {
              duration: theme.transitions.duration.standard,
            }),
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
              paddingLeft: 3,
              '& .MuiListItemIcon-root': {
                color: theme.palette.primary.main,
              },
              '& .MuiListItemText-root': {
                color: theme.palette.primary.main,
              },
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: isOpen ? 2 : 'auto',
              justifyContent: 'center',
              transition: theme.transitions.create(['margin', 'color'], {
                duration: theme.transitions.duration.standard,
              }),
            }}
          >
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText
            primary="Settings"
            sx={{
              opacity: isOpen ? 1 : 0,
              transition: theme.transitions.create(['opacity', 'transform'], {
                duration: theme.transitions.duration.standard,
              }),
              transform: isOpen ? 'translateX(0)' : 'translateX(-10px)',
              whiteSpace: 'nowrap',
            }}
          />
        </ListItem>
      </List>

      {/* Login Dialog */}
      <Dialog
        open={loginDialog}
        onClose={() => setLoginDialog(false)}
        aria-labelledby="login-dialog-title"
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: 1,
          },
        }}
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
        onMouseEnter={() => !isMobile && setIsOpen(true)}
        onMouseLeave={() => !isMobile && setIsOpen(false)}
        sx={{
          width: isOpen ? drawerWidth : closedDrawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isOpen ? drawerWidth : closedDrawerWidth,
            boxSizing: 'border-box',
            overflowX: 'hidden',
            transition: theme.transitions.create(['width'], {
              duration: theme.transitions.duration.standard,
              easing: theme.transitions.easing.sharp,
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
