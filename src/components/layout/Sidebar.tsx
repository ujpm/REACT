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
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  ReportProblem as ReportIcon,
  Map as MapIcon,
  People as CommunityIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Report Issue', icon: <ReportIcon />, path: '/report-issue' },
  { text: 'Issues Map', icon: <MapIcon />, path: '/issues-map' },
  { text: 'Community', icon: <CommunityIcon />, path: '/community' },
];

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isOpen, setIsOpen] = useState(!isMobile);
  const [isHovered, setIsHovered] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleDrawerToggle = () => {
    setIsOpen(!isOpen);
  };

  const getDrawerWidth = () => {
    if (isMobile) return drawerWidth;
    if (isHovered || isOpen) return drawerWidth;
    return theme.spacing(7);
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
              onClick={() => navigate(item.path)}
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
                }}
              >
                {item.icon}
              </ListItemIcon>
              {(isOpen || isHovered) && (
                <ListItemText primary={item.text} />
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
            onClick={() => navigate('/settings')}
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
              }}
            >
              <SettingsIcon />
            </ListItemIcon>
            {(isOpen || isHovered) && (
              <ListItemText primary="Settings" />
            )}
          </ListItem>
        </Tooltip>
      </List>
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
