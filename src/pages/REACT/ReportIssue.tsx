import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Snackbar,
  Alert,
  CircularProgress,
  SelectChangeEvent
} from '@mui/material';
import { PhotoCamera, Send } from '@mui/icons-material';
import LocationPicker from '../../components/LocationPicker';

interface IssueData {
  title: string;
  description: string;
  category: string;
  location: string;
  coordinates: [number, number];
  images: File[];
}

const ReportIssue: React.FC = () => {
  const [issueData, setIssueData] = useState<IssueData>({
    title: '',
    description: '',
    category: '',
    location: '',
    coordinates: [0, 0],
    images: []
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const categories = [
    'Infrastructure',
    'Public Safety',
    'Environmental',
    'Public Services',
    'Transportation',
    'Other'
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setIssueData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setIssueData(prev => ({
        ...prev,
        images: [...prev.images, ...Array.from(e.target.files as FileList)]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: Implement API call to submit issue
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call
      setSnackbar({
        open: true,
        message: 'Issue reported successfully!',
        severity: 'success'
      });
      setIssueData({
        title: '',
        description: '',
        category: '',
        location: '',
        coordinates: [0, 0],
        images: []
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to report issue. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Report an Issue
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Use our AI-powered system to report and categorize community issues
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="title"
              label="Issue Title"
              value={issueData.title}
              onChange={handleInputChange}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={issueData.category}
                label="Category"
                onChange={handleInputChange}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <LocationPicker
              onLocationSelect={({ address, coordinates }) => {
                setIssueData(prev => ({
                  ...prev,
                  location: address,
                  coordinates: coordinates
                }));
              }}
              initialLocation={issueData.location}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              multiline
              rows={4}
              name="description"
              label="Description"
              value={issueData.description}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<PhotoCamera />}
              sx={{ mr: 2 }}
            >
              Upload Images
              <input
                type="file"
                hidden
                multiple
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>
            {issueData.images.length > 0 && (
              <Typography variant="body2" component="span">
                {issueData.images.length} image(s) selected
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <Send />}
            >
              Submit Report
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default ReportIssue;
