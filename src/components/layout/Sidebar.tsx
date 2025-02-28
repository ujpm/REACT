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
  Divider,
  Tooltip,
  alpha,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { navigationItems, FeatureType } from '../../config/navigation';

const drawerWidth = 240;
const closedDrawerWidth = 65;

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isOpen, setIsOpen] = useState(!isMobile);
  const [loginDialog, setLoginDialog] = useState(false);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleNavigation = (path: string, isProtected: boolean) => {
    if (isProtected && !isAuthenticated) {
      setLoginDialog(true);
      return;
    }
    navigate(path);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const getFeatureColor = (type: FeatureType) => {
    return type === 'REACT' ? theme.palette.error.main : theme.palette.success.main;
  };

  const drawer = (
    <Box sx={{ overflow: 'auto', height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton onClick={() => setIsOpen(!isOpen)}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Divider />
      {['REACT', 'ACT'].map((featureType) => (
        <React.Fragment key={featureType}>
          <Typography
            variant="overline"
            sx={{
              px: 3,
              py: 1.5,
              display: 'block',
              color: getFeatureColor(featureType as FeatureType),
              fontWeight: 'bold',
            }}
          >
            {featureType}
          </Typography>
          <List>
            {navigationItems
              .filter((item) => item.type === featureType)
              .map((item) => {
                const Icon = item.icon;
                const isSelected = location.pathname === item.path;
                return (
                  <Tooltip
                    key={item.id}
                    title={isOpen ? '' : `${item.title} - ${item.description}`}
                    placement="right"
                  >
                    <ListItem
                      button
                      onClick={() => handleNavigation(item.path, true)}
                      sx={{
                        px: 3,
                        py: 1,
                        backgroundColor: isSelected
                          ? alpha(getFeatureColor(item.type), 0.1)
                          : 'transparent',
                        '&:hover': {
                          backgroundColor: alpha(getFeatureColor(item.type), 0.05),
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 40,
                          color: isSelected ? getFeatureColor(item.type) : 'inherit',
                        }}
                      >
                        <Icon />
                      </ListItemIcon>
                      {isOpen && (
                        <ListItemText
                          primary={item.title}
                          secondary={item.description}
                          primaryTypographyProps={{
                            variant: 'body2',
                            color: isSelected ? getFeatureColor(item.type) : 'inherit',
                          }}
                          secondaryTypographyProps={{
                            variant: 'caption',
                            sx: { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' },
                          }}
                        />
                      )}
                    </ListItem>
                  </Tooltip>
                );
              })}
          </List>
          <Divider sx={{ my: 1 }} />
        </React.Fragment>
      ))}
    </Box>
  );

  return (
    <>
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        sx={{
          width: isOpen ? drawerWidth : closedDrawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isOpen ? drawerWidth : closedDrawerWidth,
            boxSizing: 'border-box',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        {drawer}
      </Drawer>

      <Dialog open={loginDialog} onClose={() => setLoginDialog(false)}>
        <DialogTitle>Secure Access Required</DialogTitle>
        <DialogContent>
          <Typography>
            At REACT, ensuring the authenticity and security of community data is our mission. To maintain the integrity of our platform, we verify all users before granting access to this feature.
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
            Would you like to join our community or access your existing account?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLoginDialog(false)}>Cancel</Button>
          <Button
            onClick={() => {
              setLoginDialog(false);
              navigate('/login');
            }}
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          <Button
            onClick={() => {
              setLoginDialog(false);
              navigate('/register');
            }}
            variant="outlined"
            color="primary"
          >
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Sidebar;
