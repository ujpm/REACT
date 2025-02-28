import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Share,
  Campaign as CampaignIcon,
  Group,
  Visibility,
} from '@mui/icons-material';

interface Campaign {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  participants: number;
  targetParticipants: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'upcoming' | 'completed';
}

const campaigns: Campaign[] = [
  {
    id: 1,
    title: "Green City Initiative",
    description: "Join our campaign to plant 1000 trees across the city and create a greener environment for future generations.",
    image: "https://source.unsplash.com/random/400x200/?nature",
    category: "Environment",
    participants: 450,
    targetParticipants: 1000,
    startDate: "2025-03-01",
    endDate: "2025-04-30",
    status: "active"
  },
  {
    id: 2,
    title: "Digital Literacy Drive",
    description: "Help bridge the digital divide by teaching basic computer skills to seniors in our community.",
    image: "https://source.unsplash.com/random/400x200/?technology",
    category: "Education",
    participants: 200,
    targetParticipants: 500,
    startDate: "2025-03-15",
    endDate: "2025-05-15",
    status: "upcoming"
  },
  {
    id: 3,
    title: "Zero Hunger Challenge",
    description: "Support local food banks and help distribute meals to those in need.",
    image: "https://source.unsplash.com/random/400x200/?food",
    category: "Social",
    participants: 750,
    targetParticipants: 1000,
    startDate: "2025-02-01",
    endDate: "2025-03-31",
    status: "active"
  }
];

const Campaigns: React.FC = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as const });
  const [email, setEmail] = useState('');

  const handleJoinCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setDialogOpen(true);
  };

  const handleShare = (campaign: Campaign) => {
    // In a real app, this would open a share dialog with social media options
    setSnackbar({
      open: true,
      message: `Sharing "${campaign.title}" campaign`,
      severity: 'success'
    });
  };

  const handleSubmit = () => {
    setDialogOpen(false);
    setSnackbar({
      open: true,
      message: 'Thank you for joining the campaign! We will send you more information shortly.',
      severity: 'success'
    });
    setEmail('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'upcoming':
        return 'info';
      case 'completed':
        return 'default';
      default:
        return 'primary';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Awareness Campaigns
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Join our awareness campaigns and help make a difference in our community.
      </Typography>

      <Grid container spacing={4}>
        {campaigns.map((campaign) => (
          <Grid item xs={12} md={6} lg={4} key={campaign.id}>
            <Card elevation={3}>
              <CardMedia
                component="img"
                height="200"
                image={campaign.image}
                alt={campaign.title}
              />
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Chip
                    label={campaign.category}
                    color="primary"
                    size="small"
                  />
                  <Chip
                    label={campaign.status}
                    color={getStatusColor(campaign.status) as any}
                    size="small"
                  />
                </Box>
                <Typography variant="h6" gutterBottom>
                  {campaign.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {campaign.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Participants
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      {campaign.participants}/{campaign.targetParticipants}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(campaign.participants / campaign.targetParticipants) * 100}
                    sx={{ mb: 2 }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">
                      Start: {campaign.startDate}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      End: {campaign.endDate}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Button
                  startIcon={<CampaignIcon />}
                  variant="contained"
                  color="primary"
                  onClick={() => handleJoinCampaign(campaign)}
                  disabled={campaign.status === 'completed'}
                >
                  Join Campaign
                </Button>
                <Button
                  startIcon={<Share />}
                  variant="outlined"
                  onClick={() => handleShare(campaign)}
                >
                  Share
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Join Campaign</DialogTitle>
        <DialogContent>
          {selectedCampaign && (
            <>
              <Typography variant="h6" gutterBottom>
                {selectedCampaign.title}
              </Typography>
              <Typography variant="body2" paragraph>
                Please provide your email to receive campaign updates and participation details.
              </Typography>
              <TextField
                autoFocus
                margin="dense"
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={!email}
          >
            Join
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Campaigns;
