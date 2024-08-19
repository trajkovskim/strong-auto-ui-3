import Container from 'components/Container';
import Header from 'components/navigation/Header';
import Navbar from 'components/navigation/Navbar';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <Container>
      <Container xs={0} md={12}>
        <Header />
      </Container>
      <Navbar />
      <Outlet />
    </Container>
  );
};

export default Layout;
