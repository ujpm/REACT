import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#54966a', // Green - Primary brand color for main actions and headers
      light: '#e8ebe9', // Light gray - Background and subtle elements
    },
    secondary: {
      main: '#303d4c', // Navy blue - Secondary elements and text
    },
    error: {
      main: '#eb343a', // Red - Error states and important alerts
    },
    success: {
      main: '#afbc0e', // Lime - Success states and positive actions
    },
    background: {
      default: '#e8ebe9',
      paper: '#ffffff',
    },
    text: {
      primary: '#303d4c',
      secondary: '#54966a',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;
