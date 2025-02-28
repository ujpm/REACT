import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  SelectChangeEvent
} from '@mui/material';
import { Lock, Send, Security } from '@mui/icons-material';

interface ConfidentialReport {
  title: string;
  description: string;
  category: string;
  urgencyLevel: string;
  anonymous: boolean;
  contactInfo?: string;
}

const ConfidentialReports: React.FC = () => {
  const [report, setReport] = useState<ConfidentialReport>({
    title: '',
    description: '',
    category: '',
    urgencyLevel: '',
    anonymous: false,
    contactInfo: ''
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [confirmDialog, setConfirmDialog] = useState(false);

  const categories = [
    'Workplace Harassment',
    'Corruption',
    'Safety Violations',
    'Discrimination',
    'Financial Misconduct',
    'Other'
  ];

  const urgencyLevels = [
    'Low',
    'Medium',
    'High',
    'Critical'
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setReport((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReport(prev => ({ ...prev, anonymous: e.target.checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmDialog(true);
  };

  const handleConfirmSubmit = async () => {
    setConfirmDialog(false);
    setLoading(true);
    try {
      // TODO: Implement secure API call to submit confidential report
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated API call
      setSnackbar({
        open: true,
        message: 'Report submitted securely. A case number will be sent to you if contact information was provided.',
        severity: 'success'
      });
      setReport({
        title: '',
        description: '',
        category: '',
        urgencyLevel: '',
        anonymous: false,
        contactInfo: ''
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to submit report. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Lock color="primary" sx={{ mr: 1 }} />
        <Typography variant="h5" color="primary">
          Confidential Reports
        </Typography>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        <Security sx={{ mr: 1 }} />
        This is a secure channel for reporting sensitive issues. All submissions are encrypted and handled with strict confidentiality.
      </Alert>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="title"
              label="Report Title"
              value={report.title}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={report.category}
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
            <FormControl fullWidth required>
              <InputLabel>Urgency Level</InputLabel>
              <Select
                name="urgencyLevel"
                value={report.urgencyLevel}
                label="Urgency Level"
                onChange={handleInputChange}
              >
                {urgencyLevels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              multiline
              rows={6}
              name="description"
              label="Detailed Description"
              value={report.description}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={report.anonymous}
                  onChange={handleCheckboxChange}
                  name="anonymous"
                />
              }
              label="Submit Anonymously"
            />
          </Grid>

          {!report.anonymous && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="contactInfo"
                label="Contact Information (Optional)"
                helperText="Your contact information will be encrypted and only used for follow-up communication"
                value={report.contactInfo}
                onChange={handleInputChange}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <Send />}
            >
              Submit Confidential Report
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Dialog
        open={confirmDialog}
        onClose={() => setConfirmDialog(false)}
      >
        <DialogTitle>Confirm Submission</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to submit this confidential report? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmSubmit} variant="contained" color="primary">
            Confirm Submission
          </Button>
        </DialogActions>
      </Dialog>

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

export default ConfidentialReports;
