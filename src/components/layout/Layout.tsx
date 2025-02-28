import React from 'react';
import { Box, styled } from '@mui/material';
import { Outlet } from 'react-router-dom';
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
  flexDirection: 'column',
  minHeight: '100vh',
  width: '100%'
});

const LayoutContainer = styled(Box)({
  display: 'flex',
  flex: 1,
  overflow: 'hidden'
});

const MainContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingLeft: COLLAPSED_DRAWER_WIDTH,
  transition: 'padding-left 0.3s ease',
});

const PageContent = styled(Box)({
  flex: 1,
  padding: '24px'
});

const Layout: React.FC = () => {
  return (
    <LayoutRoot>
      <Header />
      <LayoutContainer>
        <Sidebar />
        <MainContent>
          <PageContent>
            <Outlet />
          </PageContent>
          <Footer />
        </MainContent>
      </LayoutContainer>
    </LayoutRoot>
  );
};

export default Layout;
