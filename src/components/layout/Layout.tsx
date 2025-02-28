import React from 'react';
import { Box, styled } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const DRAWER_WIDTH = 240;
const COLLAPSED_DRAWER_WIDTH = 65;

const LayoutRoot = styled(Box)({
  display: 'flex',
  minHeight: '100vh',
  overflow: 'hidden',
  width: '100%'
});

const LayoutContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 64, // Header height
  backgroundColor: theme.palette.background.default,
}));

const MainContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 auto',
  overflow: 'auto',
  position: 'relative',
  marginLeft: COLLAPSED_DRAWER_WIDTH,
  padding: '24px',
  transition: 'margin-left 0.3s ease',
});

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutRoot>
      <Header />
      <LayoutContent>
        <Sidebar />
        <MainContent>
          {children}
          <Footer />
        </MainContent>
      </LayoutContent>
    </LayoutRoot>
  );
};

export default Layout;
