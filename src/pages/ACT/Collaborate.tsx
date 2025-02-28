import React, { useState } from 'react';
import {
  Box,
  Typography,
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
  Chip,
  Avatar,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
  Divider,
} from '@mui/material';
import {
  Search,
  FilterList,
  Email,
  LinkedIn,
  Public,
  LocationOn,
  Business,
  Handshake,
} from '@mui/icons-material';

interface Partner {
  id: number;
  name: string;
  type: 'NGO' | 'Government' | 'Corporate';
  description: string;
  location: string;
  focus: string[];
  website: string;
  email: string;
  linkedin: string;
  logo: string;
  activeProjects: number;
}

const partners: Partner[] = [
  {
    id: 1,
    name: "Green Earth Foundation",
    type: "NGO",
    description: "Dedicated to environmental conservation and sustainable development initiatives.",
    location: "New York, USA",
    focus: ["Environment", "Sustainability", "Education"],
    website: "https://example.com/gef",
    email: "contact@greenearthfoundation.org",
    linkedin: "linkedin.com/company/green-earth-foundation",
    logo: "https://source.unsplash.com/random/100x100/?nature",
    activeProjects: 5
  },
  {
    id: 2,
    name: "City Development Authority",
    type: "Government",
    description: "Local government agency focused on urban development and community welfare.",
    location: "London, UK",
    focus: ["Urban Planning", "Community Development", "Infrastructure"],
    website: "https://example.com/cda",
    email: "info@citydevelopment.gov",
    linkedin: "linkedin.com/company/city-development-authority",
    logo: "https://source.unsplash.com/random/100x100/?city",
    activeProjects: 8
  },
  {
    id: 3,
    name: "TechForGood Inc.",
    type: "Corporate",
    description: "Technology company providing innovative solutions for social impact.",
    location: "San Francisco, USA",
    focus: ["Technology", "Innovation", "Social Impact"],
    website: "https://example.com/tfg",
    email: "partnerships@techforgood.com",
    linkedin: "linkedin.com/company/tech-for-good",
    logo: "https://source.unsplash.com/random/100x100/?technology",
    activeProjects: 3
  }
];

const Collaborate: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as const });

  const filteredPartners = partners.filter(partner =>
    partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.focus.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleConnect = (partner: Partner) => {
    setSelectedPartner(partner);
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    setDialogOpen(false);
    setSnackbar({
      open: true,
      message: `Connection request sent to ${selectedPartner?.name}. They will contact you soon!`,
      severity: 'success'
    });
    setMessageContent('');
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'NGO':
        return 'success';
      case 'Government':
        return 'primary';
      case 'Corporate':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Collaborate
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Connect with NGOs, government organizations, and corporate partners to create meaningful impact.
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search partners by name, description, or focus area..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <FilterList />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Grid container spacing={3}>
        {filteredPartners.map((partner) => (
          <Grid item xs={12} md={6} lg={4} key={partner.id}>
            <Card elevation={3}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    src={partner.logo}
                    sx={{ width: 60, height: 60, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {partner.name}
                    </Typography>
                    <Chip
                      label={partner.type}
                      color={getTypeColor(partner.type) as any}
                      size="small"
                    />
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {partner.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOn fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2">{partner.location}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  {partner.focus.map((focus, index) => (
                    <Chip
                      key={index}
                      label={focus}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Active Projects: {partner.activeProjects}
                </Typography>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                <Box>
                  <IconButton href={`mailto:${partner.email}`} color="primary">
                    <Email />
                  </IconButton>
                  <IconButton href={partner.linkedin} target="_blank" color="primary">
                    <LinkedIn />
                  </IconButton>
                  <IconButton href={partner.website} target="_blank" color="primary">
                    <Public />
                  </IconButton>
                </Box>
                <Button
                  startIcon={<Handshake />}
                  variant="contained"
                  color="primary"
                  onClick={() => handleConnect(partner)}
                >
                  Connect
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Connect with {selectedPartner?.name}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" paragraph>
            Send a message to initiate collaboration. Describe your interests and how you'd like to work together.
          </Typography>
          <TextField
            autoFocus
            multiline
            rows={4}
            fullWidth
            label="Your Message"
            variant="outlined"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={!messageContent.trim()}
          >
            Send Request
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

export default Collaborate;
