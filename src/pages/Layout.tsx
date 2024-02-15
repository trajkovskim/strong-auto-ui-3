import Logo from 'assets/logo.png';
import Container from 'components/Container';
import Image from 'components/Image';
import Navigation from 'components/Navigation';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Routes } from 'routes';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  background-color: #232323;
`;

const Layout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <StyledContainer direction="row" justifyContent="space-between" alignItems="center">
        <Image
          onClick={() => navigate(Routes.INDEX)}
          src={Logo}
          alt="Strong auto logo"
          width="170px"
          height="100%"
          objectFit="contain"
        />
        <Navigation />
      </StyledContainer>
      <Outlet />
    </Container>
  );
};

export default Layout;
