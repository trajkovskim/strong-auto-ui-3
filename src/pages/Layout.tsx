import { css } from '@emotion/css';
import Logo from 'assets/logo.png';
import Container from 'components/Container';
import Image from 'components/Image';
import Transition, { TransitionHandle } from 'components/Transition';
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
  const navigate = useNavigate();
  const transitionRef = useRef<TransitionHandle>(null);

  return (
    <Container>
      <Transition
        ref={transitionRef}
        duration="200ms"
        transition={{
          final: css`
            background-color: white;
            color: black;
          `,
        }}
      >
        <StyledContainer
          direction="row"
          justifyContent="space-between"
          padding={{ top: 'sm', bottom: 'sm', left: 'md', right: 'md' }}
          alignItems="center"
          preserveWhenXs
          relative
          zIndex={999}
        >
          <Image
            onClick={() => navigate(Routes.INDEX)}
            src={Logo}
            alt="Strong auto logo"
            width="170px"
            height="100%"
            objectFit="contain"
          />
          <Container xs={0} lg="max-content">
            <Navigation />
          </Container>
          <Container xs="max-content" lg={0}>
            <MobileNavigation onClick={() => transitionRef.current?.toggle()} />
          </Container>
        </StyledContainer>
      </Transition>
      <Outlet />
    </Container>
  );
};

export default Layout;
