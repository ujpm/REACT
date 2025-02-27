import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface IssueForm {
  title: string;
  description: string;
  location: string;
  category: string;
  isConfidential: boolean;
  images: File[];
}

const categories = [
  'Infrastructure',
  'Public Safety',
  'Environmental',
  'Public Services',
  'Transportation',
  'Other'
];

const ReportIssue: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<IssueForm>({
    title: '',
    description: '',
    location: '',
    category: '',
    isConfidential: false,
    images: []
  });
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    // If description changes, trigger AI categorization after a delay
    if (name === 'description' && value.length > 20) {
      handleAiCategorization(value);
    }
  };

  const handleAiCategorization = async (description: string) => {
    // TODO: Implement AI categorization using Wolfram API
    // This will be implemented when we integrate Wolfram
    setLoading(true);
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Example suggestions based on keywords
      const mockSuggestions = ['Infrastructure', 'Public Safety'];
      setAiSuggestions(mockSuggestions);
    } catch (error) {
      console.error('Error in AI categorization:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted:', form);
    navigate('/issues-map'); // Redirect to issues map after submission
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Report an Issue
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={form.title}
            onChange={handleInputChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={form.description}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={4}
            required
            helperText="Provide detailed information about the issue"
          />

          {loading && (
            <Alert severity="info" sx={{ my: 2 }}>
              Analyzing issue details...
            </Alert>
          )}

          {aiSuggestions.length > 0 && (
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                AI Suggested Categories:
              </Typography>
              {aiSuggestions.map((suggestion, index) => (
                <Chip
                  key={index}
                  label={suggestion}
                  onClick={() => setForm(prev => ({ ...prev, category: suggestion }))}
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>
          )}

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Category</InputLabel>
            <Select
              value={form.category}
              label="Category"
              onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
            <LocationOnIcon sx={{ mr: 1, color: 'primary.main' }} />
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={form.location}
              onChange={handleInputChange}
              required
              helperText="Enter address or click to select on map"
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ mt: 3 }}
          >
            Submit Report
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ReportIssue;
