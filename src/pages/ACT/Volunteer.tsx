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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Chip,
} from '@mui/material';
import {
  Favorite,
  AccessTime,
  LocationOn,
  People,
  Volunteer as VolunteerIcon,
} from '@mui/icons-material';

interface VolunteerOpportunity {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  spotsAvailable: number;
  category: string;
}

const volunteerOpportunities: VolunteerOpportunity[] = [
  {
    id: 1,
    title: "Community Garden Project",
    description: "Help maintain and grow our local community garden. Perfect for nature enthusiasts!",
    location: "Central Park",
    date: "2025-03-15",
    spotsAvailable: 10,
    category: "Environment"
  },
  {
    id: 2,
    title: "Youth Mentorship Program",
    description: "Make a difference in a young person's life through our mentorship program.",
    location: "City Youth Center",
    date: "2025-03-20",
    spotsAvailable: 5,
    category: "Education"
  },
  {
    id: 3,
    title: "Food Bank Distribution",
    description: "Help sort and distribute food to families in need.",
    location: "Community Center",
    date: "2025-03-10",
    spotsAvailable: 8,
    category: "Social Services"
  }
];

const Volunteer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<VolunteerOpportunity | null>(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as const });

  const handleVolunteerClick = (opportunity: VolunteerOpportunity) => {
    setSelectedOpportunity(opportunity);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
    setSnackbar({
      open: true,
      message: 'Thank you for volunteering! We will contact you soon.',
      severity: 'success'
    });
  };

  const handleDonate = () => {
    if (donationAmount) {
      setSnackbar({
        open: true,
        message: `Thank you for your donation of $${donationAmount}!`,
        severity: 'success'
      });
      setDonationAmount('');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Volunteer & Donate
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" gutterBottom color="success.main" sx={{ mb: 3 }}>
            Current Opportunities
          </Typography>
          <Grid container spacing={3}>
            {volunteerOpportunities.map((opportunity) => (
              <Grid item xs={12} md={6} key={opportunity.id}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {opportunity.title}
                    </Typography>
                    <Chip
                      label={opportunity.category}
                      color="primary"
                      size="small"
                      sx={{ mb: 2 }}
                    />
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {opportunity.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationOn fontSize="small" sx={{ mr: 1 }} />
                      <Typography variant="body2">{opportunity.location}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <AccessTime fontSize="small" sx={{ mr: 1 }} />
                      <Typography variant="body2">{opportunity.date}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <People fontSize="small" sx={{ mr: 1 }} />
                      <Typography variant="body2">{opportunity.spotsAvailable} spots available</Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button
                      startIcon={<VolunteerIcon />}
                      variant="contained"
                      color="primary"
                      onClick={() => handleVolunteerClick(opportunity)}
                    >
                      Volunteer
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom color="success.main">
              Make a Donation
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Your donation helps us continue our community initiatives and support those in need.
            </Typography>
            <TextField
              fullWidth
              label="Amount ($)"
              type="number"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<Favorite />}
              onClick={handleDonate}
              disabled={!donationAmount}
            >
              Donate Now
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sign Up to Volunteer</DialogTitle>
        <DialogContent>
          {selectedOpportunity && (
            <>
              <Typography variant="h6" gutterBottom>
                {selectedOpportunity.title}
              </Typography>
              <Typography variant="body2" paragraph>
                {selectedOpportunity.description}
              </Typography>
              <Typography variant="body2">
                Location: {selectedOpportunity.location}
              </Typography>
              <Typography variant="body2">
                Date: {selectedOpportunity.date}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Confirm
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

export default Volunteer;
