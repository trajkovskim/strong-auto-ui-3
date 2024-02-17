import { css } from '@emotion/css';
import Button from 'components/Button';
import Container from 'components/Container';
import Transition, { TransitionHandle } from 'components/Transition';
import { useTranslation } from 'hooks';
import React, { useRef } from 'react';
import { BsMenuButton } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import { Routes } from 'routes';
import { styled } from 'styled-components';

const StyledNavigationWrapper = styled.nav`
  position: relative;
  z-index: 999;
`;

const StyledButton = styled.div<{ active?: boolean }>`
  display: flex;
  justify-content: center;

  padding: 10px 20px;
  cursor: pointer;

  transition: all 200ms;
  user-select: none;

  border-bottom: 1px solid transparent;

  border-bottom-color: ${(props) => (props.active ? 'white' : 'transparent')};

  &:hover {
    border-bottom-color: white;
  }
`;

const NavigationContainer = styled(Container)`
  color: white;
`;

const MobileContainer = styled(Container)`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  /* height: 100vh; */
  transform: translateY(100%);
  color: black;
  background: white;
  z-index: 999;
`;

const Navigation: React.FC = () => {
  const t = useTranslation('nav');
  const navigate = useNavigate();
  const location = useLocation();
  const transitionRef = useRef<TransitionHandle>(null);

  const navigation = (
    <StyledNavigationWrapper>
      <Container direction="row" wrap padding="md" justifyContent="flex-end">
        <Container sm={12} lg="max-content">
          <StyledButton active={location.pathname === Routes.INDEX} onClick={() => navigate(Routes.INDEX)}>
            {t('home')}
          </StyledButton>
        </Container>
        <Container sm={12} lg="max-content">
          <StyledButton active={location.pathname === Routes.SHOP} onClick={() => navigate(Routes.SHOP)}>
            {t('shop')}
          </StyledButton>
        </Container>
        <Container sm={12} lg="max-content">
          <StyledButton active={location.pathname === Routes.BLOG} onClick={() => navigate(Routes.BLOG)}>
            {t('blog')}
          </StyledButton>
        </Container>
        <Container sm={12} lg="max-content">
          <StyledButton active={location.pathname === Routes.ABOUT_US} onClick={() => navigate(Routes.ABOUT_US)}>
            {t('aboutUs')}
          </StyledButton>
        </Container>
        <Container sm={12} lg="max-content">
          <StyledButton active={location.pathname === Routes.CONTACT} onClick={() => navigate(Routes.CONTACT)}>
            {t('contact')}
          </StyledButton>
        </Container>
      </Container>
    </StyledNavigationWrapper>
  );

  return (
    <Container preserveWhenXs xs="max-content">
      <NavigationContainer xs={0} lg={12}>
        {navigation}
      </NavigationContainer>
      <Container preserveWhenXs xs="max-content" lg={0}>
        <Button
          maxContent
          themeType="link"
          icon={<BsMenuButton />}
          size="lg"
          onClick={() => transitionRef.current?.toggle()}
        />
        <Transition
          ref={transitionRef}
          duration="200ms"
          timingFunction="ease-in-out"
          transition={{
            initial: css`
              max-height: 0;
              overflow: hidden;
            `,
            final: css`
              max-height: 500px;
              overflow: auto;
            `,
          }}
        >
          <MobileContainer>{navigation}</MobileContainer>
        </Transition>
      </Container>
    </Container>
  );
};

export default Navigation;
