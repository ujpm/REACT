import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link as MuiLink,
  IconButton,
  useTheme,
  styled,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(4),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
    backgroundSize: '20px 20px',
  },
}));

const FooterLink = styled(MuiLink)(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.warning.main,
  },
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  color: 'inherit',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: theme.palette.warning.main,
  },
}));

const Footer: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'Features',
      links: [
        { name: 'Report Issue', path: '/report-issue' },
        { name: 'Track Issues', path: '/track-issues' },
        { name: 'Volunteer', path: '/volunteer' },
        { name: 'Campaigns', path: '/campaigns' },
      ],
    },
    {
      title: 'Community',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Success Stories', path: '/stories' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Help Center', path: '/help' },
        { name: 'Guidelines', path: '/guidelines' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
      ],
    },
  ];

  return (
    <StyledFooter>
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Grid container spacing={4}>
          {/* Logo and Description */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ color: theme.palette.warning.main }}>
              REACT
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
              Empowering communities through collective action. Report, engage, and transform your neighborhood together.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'inherit', '&:hover': { color: theme.palette.warning.main } }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'inherit', '&:hover': { color: theme.palette.warning.main } }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'inherit', '&:hover': { color: theme.palette.warning.main } }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'inherit', '&:hover': { color: theme.palette.warning.main } }}
              >
                <GitHubIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Navigation Sections */}
          {sections.map((section) => (
            <Grid item xs={12} sm={6} md={2} key={section.title}>
              <Typography variant="subtitle1" gutterBottom sx={{ color: theme.palette.warning.main }}>
                {section.title}
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {section.links.map((link) => (
                  <Box component="li" key={link.name} sx={{ mb: 1 }}>
                    <MuiLink
                      component={RouterLink}
                      to={link.path}
                      sx={{
                        color: 'inherit',
                        textDecoration: 'none',
                        '&:hover': { color: theme.palette.warning.main },
                      }}
                    >
                      {link.name}
                    </MuiLink>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}

          {/* Newsletter Signup */}
          <Grid item xs={12} md={2}>
            <Typography variant="subtitle1" gutterBottom sx={{ color: theme.palette.warning.main }}>
              Stay Connected
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Join our newsletter to stay up to date with community initiatives and success stories.
            </Typography>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Box
          sx={{
            mt: 8,
            pt: 3,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            &copy; {currentYear} REACT. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
