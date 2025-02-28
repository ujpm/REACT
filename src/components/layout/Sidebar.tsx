import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Tooltip,
  useTheme,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  ListItemButton,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { navigationItems } from '../../config/navigation';

const DRAWER_WIDTH = 240;
const COLLAPSED_DRAWER_WIDTH = 65;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  '& .MuiDrawer-paper': {
    width: DRAWER_WIDTH,
    whiteSpace: 'nowrap',
    backgroundColor: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.divider}`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

interface StyledListItemProps {
  active: number;
  itemtype: 'REACT' | 'ACT';
}

const StyledListItemButton = styled(ListItemButton)<StyledListItemProps>(({ theme, active, itemtype }) => ({
  margin: '4px 8px',
  padding: '10px 16px',
  borderRadius: theme.shape.borderRadius,
  minHeight: 48,
  transition: theme.transitions.create(['background-color', 'margin', 'padding'], {
    duration: theme.transitions.duration.standard,
  }),
  '&:hover': {
    backgroundColor: itemtype === 'REACT' 
      ? `${theme.palette.primary.main}15`
      : `${theme.palette.secondary.main}15`,
    '& .MuiListItemIcon-root': {
      color: itemtype === 'REACT' 
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
    },
  },
  ...(active && {
    backgroundColor: itemtype === 'REACT' 
      ? `${theme.palette.primary.main}15`
      : `${theme.palette.secondary.main}15`,
    '& .MuiListItemIcon-root': {
      color: itemtype === 'REACT' 
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
    },
  }),
}));

const MobileDrawerButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  top: 12,
  left: 12,
  zIndex: theme.zIndex.drawer + 2,
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [open, setOpen] = useState(false);
  const [loginDialog, setLoginDialog] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigation = (path: string) => {
    if (!isAuthenticated) {
      setLoginDialog(true);
      return;
    }
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <List>
      {!isMobile && (
        <ListItem
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            px: 1,
          }}
        >
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </ListItem>
      )}
      {navigationItems.map((item) => (
        <Tooltip 
          key={item.path}
          title={(!open || isMobile) ? item.title : ''}
          placement="right"
          arrow
        >
          <ListItem 
            disablePadding 
            onMouseEnter={() => !isMobile && setOpen(true)}
            onMouseLeave={() => !isMobile && setOpen(false)}
          >
            <StyledListItemButton
              onClick={() => handleNavigation(item.path)}
              active={location.pathname === item.path ? 1 : 0}
              itemtype={item.type}
              sx={{
                justifyContent: open || isMobile ? 'flex-start' : 'center',
                px: open || isMobile ? 3 : 2,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: open || isMobile ? 48 : 'auto',
                  color: 'text.secondary',
                }}
              >
                <item.icon />
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                secondary={hoveredItem === item.path ? item.description : null}
                sx={{
                  opacity: open || isMobile ? 1 : 0,
                  transition: theme.transitions.create('opacity'),
                  display: open || isMobile ? 'block' : 'none',
                }}
              />
            </StyledListItemButton>
          </ListItem>
        </Tooltip>
      ))}
    </List>
  );

  return (
    <>
      <MobileDrawerButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <MenuIcon />
      </MobileDrawerButton>

      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { width: DRAWER_WIDTH },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <StyledDrawer
          variant="permanent"
          sx={{
            width: open ? DRAWER_WIDTH : COLLAPSED_DRAWER_WIDTH,
            '& .MuiDrawer-paper': {
              width: open ? DRAWER_WIDTH : COLLAPSED_DRAWER_WIDTH,
              overflowX: 'hidden',
            },
          }}
        >
          {drawer}
        </StyledDrawer>
      )}

      <Dialog open={loginDialog} onClose={() => setLoginDialog(false)}>
        <DialogTitle>Secure Access Required</DialogTitle>
        <DialogContent>
          <Typography>
            At REACT, ensuring the authenticity and security of community data is our mission. 
            To maintain the integrity of our platform, we verify all users before granting access to this feature.
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
            Would you like to join our community or access your existing account?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setLoginDialog(false);
            navigate('/register');
          }}>
            Join Community
          </Button>
          <Button onClick={() => {
            setLoginDialog(false);
            navigate('/login');
          }} variant="contained">
            Access Account
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Sidebar;
