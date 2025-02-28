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
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Report as ReportIcon,
  Timeline as TimelineIcon,
  Security as SecurityIcon,
  TrendingUp as TrendingUpIcon,
  Handshake as HandshakeIcon,
  Campaign as CampaignIcon,
  Groups as GroupsIcon,
  EmojiEvents as EmojiEventsIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const DRAWER_WIDTH = 240;
const COLLAPSED_DRAWER_WIDTH = 65;

interface StyledDrawerProps {
  collapsed: boolean;
}

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'collapsed',
})<StyledDrawerProps>(({ theme, collapsed }) => ({
  width: collapsed ? COLLAPSED_DRAWER_WIDTH : DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '& .MuiDrawer-paper': {
    width: collapsed ? COLLAPSED_DRAWER_WIDTH : DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: theme.palette.background.paper,
    overflowX: 'hidden',
    borderRight: `1px solid ${theme.palette.divider}`,
    marginTop: 64, // Header height
  },
}));

interface StyledListItemProps {
  active: number;
  itemtype: 'react' | 'act';
}

const StyledListItemButton = styled(ListItemButton)<StyledListItemProps>(({ theme, active, itemtype }) => ({
  margin: '4px 8px',
  padding: '10px 16px',
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create(['background-color', 'margin', 'padding'], {
    duration: theme.transitions.duration.standard,
  }),
  '&:hover': {
    backgroundColor: itemtype === 'react' 
      ? `${theme.palette.primary.main}15`
      : `${theme.palette.secondary.main}15`,
    '& .MuiListItemIcon-root': {
      color: itemtype === 'react' 
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
    },
  },
  ...(active && {
    backgroundColor: itemtype === 'react' 
      ? `${theme.palette.primary.main}15`
      : `${theme.palette.secondary.main}15`,
    '& .MuiListItemIcon-root': {
      color: itemtype === 'react' 
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
    },
  }),
}));

interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  type: 'react' | 'act';
  description: string;
}

const navItems: NavItem[] = [
  // REACT Features
  {
    title: 'Report Issue',
    path: '/report-issue',
    icon: <ReportIcon />,
    type: 'react',
    description: 'Submit new community issues'
  },
  {
    title: 'Track Issues',
    path: '/track-issues',
    icon: <TimelineIcon />,
    type: 'react',
    description: 'Monitor reported issues'
  },
  {
    title: 'Confidential Reports',
    path: '/confidential-reports',
    icon: <SecurityIcon />,
    type: 'react',
    description: 'Submit sensitive reports'
  },
  {
    title: 'Trending Issues',
    path: '/trending-issues',
    icon: <TrendingUpIcon />,
    type: 'react',
    description: 'View community hotspots'
  },
  // ACT Features
  {
    title: 'Volunteer & Donate',
    path: '/volunteer',
    icon: <HandshakeIcon />,
    type: 'act',
    description: 'Support community initiatives'
  },
  {
    title: 'Campaigns',
    path: '/campaigns',
    icon: <CampaignIcon />,
    type: 'act',
    description: 'Join awareness drives'
  },
  {
    title: 'Collaborate',
    path: '/collaborate',
    icon: <GroupsIcon />,
    type: 'act',
    description: 'Work with organizations'
  },
  {
    title: 'Achievements',
    path: '/achievements',
    icon: <EmojiEventsIcon />,
    type: 'act',
    description: 'View community impact'
  },
];

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  
  const [collapsed, setCollapsed] = useState(true);
  const [loginDialog, setLoginDialog] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleNavigation = (path: string) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      setLoginDialog(true);
    }
  };

  return (
    <>
      <StyledDrawer
        variant="permanent"
        anchor="left"
        collapsed={collapsed}
      >
        <List>
          <ListItem
            sx={{
              display: 'flex',
              justifyContent: collapsed ? 'center' : 'flex-end',
              px: 1,
            }}
          >
            <IconButton onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </ListItem>
          {navItems.map((item) => (
            <Tooltip 
              key={item.path}
              title={collapsed ? item.title : ''}
              placement="right"
              arrow
            >
              <ListItem disablePadding>
                <StyledListItemButton
                  onClick={() => handleNavigation(item.path)}
                  active={location.pathname === item.path ? 1 : 0}
                  itemtype={item.type}
                  onMouseEnter={() => setHoveredItem(item.path)}
                  onMouseLeave={() => setHoveredItem(null)}
                  sx={{
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    px: collapsed ? 2 : 3,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: collapsed ? 'auto' : 48,
                      color: 'text.secondary',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    secondary={hoveredItem === item.path ? item.description : null}
                    sx={{
                      opacity: collapsed ? 0 : 1,
                      transition: theme.transitions.create('opacity'),
                      display: collapsed ? 'none' : 'block',
                    }}
                  />
                </StyledListItemButton>
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </StyledDrawer>

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
