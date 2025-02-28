import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
  LinearProgress
} from '@mui/material';
import {
  Search,
  FilterList,
  LocationOn,
  AccessTime,
  ArrowUpward,
  ArrowDownward
} from '@mui/icons-material';

interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  status: 'pending' | 'in-progress' | 'resolved';
  date: string;
  votes: number;
}

const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Broken Street Light',
    description: 'Street light not working on Main Street',
    category: 'Infrastructure',
    location: 'Main Street',
    status: 'pending',
    date: '2025-02-28',
    votes: 15
  },
  {
    id: '2',
    title: 'Park Cleanup Needed',
    description: 'Excessive litter in Central Park',
    category: 'Environmental',
    location: 'Central Park',
    status: 'in-progress',
    date: '2025-02-27',
    votes: 32
  },
  // Add more mock issues as needed
];

const TrackIssues: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>(mockIssues);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);

  const statusColors = {
    pending: 'warning',
    'in-progress': 'info',
    resolved: 'success'
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    // TODO: Implement search functionality
  };

  const handleVote = (issueId: string, increment: boolean) => {
    setIssues(prevIssues =>
      prevIssues.map(issue =>
        issue.id === issueId
          ? { ...issue, votes: issue.votes + (increment ? 1 : -1) }
          : issue
      )
    );
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setLoading(true);
    // Simulate API call
    setTimeout(() => setLoading(false), 1000);
  };

  const filteredIssues = issues.filter(issue =>
    issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    issue.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Track Issues
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Monitor and track reported community issues in real-time
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search issues..."
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton>
                <FilterList />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{ mb: 2 }}
      >
        <Tab label="All Issues" />
        <Tab label="Pending" />
        <Tab label="In Progress" />
        <Tab label="Resolved" />
      </Tabs>

      {loading && <LinearProgress sx={{ mb: 2 }} />}

      <Grid container spacing={2}>
        {filteredIssues.map((issue) => (
          <Grid item xs={12} key={issue.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h6" component="div">
                    {issue.title}
                  </Typography>
                  <Chip
                    label={issue.status}
                    color={statusColors[issue.status] as 'warning' | 'info' | 'success'}
                    size="small"
                  />
                </Box>
                <Typography color="text.secondary" paragraph>
                  {issue.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, color: 'text.secondary' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOn fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2">{issue.location}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTime fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2">{issue.date}</Typography>
                  </Box>
                </Box>
              </CardContent>
              <CardActions>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => handleVote(issue.id, false)}
                  >
                    <ArrowDownward />
                  </IconButton>
                  <Typography>{issue.votes}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleVote(issue.id, true)}
                  >
                    <ArrowUpward />
                  </IconButton>
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

export default TrackIssues;
