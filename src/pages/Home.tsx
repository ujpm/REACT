import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Report as ReportIcon,
  TrendingUp,
  Campaign,
  Groups as GroupsIcon,
  Notifications,
  ArrowForward,
  LocationOn,
  AccessTime,
  PriorityHigh,
  CheckCircle,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data - replace with actual API calls
const recentReports = [
  {
    id: 1,
    title: 'Road Maintenance Required',
    location: 'Main Street, Downtown',
    status: 'In Progress',
    timestamp: '2 hours ago',
    priority: 'High',
  },
  {
    id: 2,
    title: 'Street Light Malfunction',
    location: 'Park Avenue',
    status: 'Pending',
    timestamp: '5 hours ago',
    priority: 'Medium',
  },
  {
    id: 3,
    title: 'Garbage Collection Issue',
    location: 'Residential Area B',
    status: 'Resolved',
    timestamp: '1 day ago',
    priority: 'Low',
  },
];

const activityData = [
  { name: 'Mon', reports: 4 },
  { name: 'Tue', reports: 3 },
  { name: 'Wed', reports: 7 },
  { name: 'Thu', reports: 5 },
  { name: 'Fri', reports: 8 },
  { name: 'Sat', reports: 6 },
  { name: 'Sun', reports: 4 },
];

const quickStats = [
  { title: 'Total Reports', value: '156', icon: ReportIcon, color: '#2196f3' },
  { title: 'In Progress', value: '32', icon: TrendingUp, color: '#ff9800' },
  { title: 'Resolved', value: '124', icon: CheckCircle, color: '#4caf50' },
];

const Home: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'resolved':
        return theme.palette.success.main;
      case 'in progress':
        return theme.palette.warning.main;
      default:
        return theme.palette.info.main;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return theme.palette.error.main;
      case 'medium':
        return theme.palette.warning.main;
      default:
        return theme.palette.success.main;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome back, {user?.name || 'User'}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening in your community
        </Typography>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {quickStats.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                alignItems: 'center',
                bgcolor: `${stat.color}0a`,
              }}
            >
              <stat.icon sx={{ fontSize: 40, color: stat.color, mr: 2 }} />
              <Box>
                <Typography variant="h4" component="div">
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Activity Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Weekly Activity
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="reports"
                    stroke={theme.palette.primary.main}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<ReportIcon />}
                  onClick={() => navigate('/react/report-issue')}
                >
                  Report New Issue
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Campaign />}
                  onClick={() => navigate('/act/campaigns')}
                >
                  View Active Campaigns
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<GroupsIcon />}
                  onClick={() => navigate('/act/volunteer')}
                >
                  Volunteer Opportunities
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Recent Reports */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Recent Reports</Typography>
              <Button
                endIcon={<ArrowForward />}
                onClick={() => navigate('/react/track-issues')}
              >
                View All
              </Button>
            </Box>
            <List>
              {recentReports.map((report, index) => (
                <React.Fragment key={report.id}>
                  {index > 0 && <Divider />}
                  <ListItem
                    alignItems="flex-start"
                    sx={{ py: 2 }}
                    secondaryAction={
                      <Chip
                        label={report.status}
                        size="small"
                        sx={{ bgcolor: `${getStatusColor(report.status)}20`, color: getStatusColor(report.status) }}
                      />
                    }
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: getPriorityColor(report.priority) }}>
                        <PriorityHigh />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={report.title}
                      secondary={
                        <React.Fragment>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <LocationOn sx={{ fontSize: 16, mr: 0.5 }} />
                              <Typography variant="body2" color="text.secondary">
                                {report.location}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <AccessTime sx={{ fontSize: 16, mr: 0.5 }} />
                              <Typography variant="body2" color="text.secondary">
                                {report.timestamp}
                              </Typography>
                            </Box>
                          </Box>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
