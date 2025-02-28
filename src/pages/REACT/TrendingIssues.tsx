import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Tooltip,
  Avatar,
  CardHeader,
  CardActions,
  Button
} from '@mui/material';
import {
  TrendingUp,
  Whatshot,
  Schedule,
  LocationOn,
  ThumbUp,
  Comment,
  Share
} from '@mui/icons-material';

interface TrendingIssue {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  upvotes: number;
  comments: number;
  shares: number;
  timestamp: string;
  urgencyLevel: number;
  status: 'open' | 'in-progress' | 'resolved';
}

const mockTrendingIssues: TrendingIssue[] = [
  {
    id: '1',
    title: 'Major Road Construction Delay',
    description: 'Construction on Main Street causing significant traffic delays and safety concerns',
    category: 'Infrastructure',
    location: 'Main Street & 5th Avenue',
    upvotes: 234,
    comments: 45,
    shares: 28,
    timestamp: '2025-02-28T15:30:00',
    urgencyLevel: 90,
    status: 'open'
  },
  {
    id: '2',
    title: 'Park Safety Concerns',
    description: 'Multiple reports of inadequate lighting in Central Park during evening hours',
    category: 'Public Safety',
    location: 'Central Park',
    upvotes: 189,
    comments: 32,
    shares: 15,
    timestamp: '2025-02-28T14:20:00',
    urgencyLevel: 75,
    status: 'in-progress'
  },
  // Add more mock data as needed
];

const TrendingIssues: React.FC = () => {
  const [issues, setIssues] = useState<TrendingIssue[]>(mockTrendingIssues);
  const [timeRange, setTimeRange] = useState('24h');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate API call when time range changes
    const fetchTrendingIssues = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        // In real implementation, fetch data based on timeRange
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trending issues:', error);
        setLoading(false);
      }
    };

    fetchTrendingIssues();
  }, [timeRange]);

  const handleTimeRangeChange = (
    event: React.MouseEvent<HTMLElement>,
    newTimeRange: string
  ) => {
    if (newTimeRange !== null) {
      setTimeRange(newTimeRange);
    }
  };

  const getUrgencyColor = (level: number) => {
    if (level >= 80) return 'error';
    if (level >= 60) return 'warning';
    if (level >= 40) return 'info';
    return 'success';
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TrendingUp color="primary" sx={{ mr: 1 }} />
        <Typography variant="h5" color="primary">
          Trending Issues
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Typography variant="body1" color="text.secondary">
              Time Range:
            </Typography>
          </Grid>
          <Grid item>
            <ToggleButtonGroup
              value={timeRange}
              exclusive
              onChange={handleTimeRangeChange}
              size="small"
            >
              <ToggleButton value="24h">24h</ToggleButton>
              <ToggleButton value="7d">7 days</ToggleButton>
              <ToggleButton value="30d">30 days</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      </Box>

      {loading && <LinearProgress sx={{ mb: 2 }} />}

      <Grid container spacing={3}>
        {issues.map((issue) => (
          <Grid item xs={12} key={issue.id}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: getUrgencyColor(issue.urgencyLevel) }}>
                    <Whatshot />
                  </Avatar>
                }
                title={issue.title}
                subheader={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                    <Schedule fontSize="small" />
                    <Typography variant="body2">{formatTimestamp(issue.timestamp)}</Typography>
                    <LocationOn fontSize="small" sx={{ ml: 1 }} />
                    <Typography variant="body2">{issue.location}</Typography>
                  </Box>
                }
                action={
                  <Chip
                    label={`Urgency: ${issue.urgencyLevel}%`}
                    color={getUrgencyColor(issue.urgencyLevel)}
                    size="small"
                  />
                }
              />
              <CardContent>
                <Typography variant="body1" paragraph>
                  {issue.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Chip
                    label={issue.category}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    label={issue.status}
                    size="small"
                    color={
                      issue.status === 'resolved'
                        ? 'success'
                        : issue.status === 'in-progress'
                        ? 'warning'
                        : 'error'
                    }
                  />
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between' }}>
                <Box>
                  <Tooltip title="Upvote">
                    <IconButton size="small">
                      <ThumbUp />
                    </IconButton>
                  </Tooltip>
                  <Typography variant="body2" component="span" sx={{ mx: 1 }}>
                    {issue.upvotes}
                  </Typography>
                  <Tooltip title="Comment">
                    <IconButton size="small">
                      <Comment />
                    </IconButton>
                  </Tooltip>
                  <Typography variant="body2" component="span" sx={{ mx: 1 }}>
                    {issue.comments}
                  </Typography>
                  <Tooltip title="Share">
                    <IconButton size="small">
                      <Share />
                    </IconButton>
                  </Tooltip>
                  <Typography variant="body2" component="span" sx={{ mx: 1 }}>
                    {issue.shares}
                  </Typography>
                </Box>
                <Button size="small" color="primary">
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default TrendingIssues;
