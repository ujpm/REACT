import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1c355c', // Deep blue - Primary brand color
      light: '#2a4a7c',
      dark: '#142844',
    },
    secondary: {
      main: '#6a5a82', // Purple - Secondary elements
      light: '#8c7aa4',
      dark: '#4c4160',
    },
    warning: {
      main: '#fed827', // Yellow - Accent color
      light: '#fee359',
      dark: '#cbb020',
    },
    background: {
      default: '#f7f8f5', // Light cream - Background
      paper: '#ffffff',
    },
    text: {
      primary: '#1c355c',
      secondary: '#6a5a82',
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
    h5: {
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
    caption: {
      fontSize: '0.75rem',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.1em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
