import { Container } from 'components/common';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <Container styleConfig={{ minHeight: '100dvh' }}>
      {/* <Container xs={0} lg={12}>
        <Header />
      </Container>
      <Navbar /> */}
      <Outlet />
    </Container>
  );
};

export default Layout;
