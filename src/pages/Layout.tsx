import { css } from '@emotion/css';
import Logo from 'assets/logo.png';
import Container from 'components/Container';
import Image from 'components/Image';
import Transition, { TransitionHandle } from 'components/Transition';
import Header from 'components/navigation/Header';
import MobileNavigation from 'components/navigation/MobileNavigation';
import Navigation from 'components/navigation/Navigation';
import React, { useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Routes } from 'routes';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  background-color: #232323;
  box-shadow: 0px -5px 10px 0px rgba(0, 0, 0, 0.5);
  color: white;
  position: sticky;
  top: 0;
`;

const Layout: React.FC = () => {
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  );
};

export default Layout;
