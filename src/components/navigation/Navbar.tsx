import React from 'react';
import { styled } from 'styled-components';

import Container from 'components/Container';
import LogoImage from 'components/navigation/LogoImage';
import MobileNavigation from 'components/navigation/MobileNavigation';
import Navigation from 'components/navigation/Navigation';

type WrapperProps = {
  transparent?: boolean;
};

const Wrapper = styled.div<WrapperProps>`
  background-color: ${(props) => !props.transparent && '#232628'};
  color: white;
  z-index: 10 !important;
  position: sticky;
  top: 0;
`;

const StyledContainer = styled(Container)`
  z-index: 2;
  height: 80px;
`;

type Props = WrapperProps;

const Navbar: React.FC<Props> = (props) => {
  return (
    <Wrapper transparent={props.transparent}>
      <StyledContainer
        padding={{ left: 'xs', right: 'xs' }}
        relative
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <LogoImage />
        <Container xs={0} lg="max-content" alignItems="center">
          <Navigation />
        </Container>
        <Container xs="max-content" lg={0} direction="row" padding={{ right: 'md' }} gap="1rem" alignItems="center">
          <MobileNavigation />
        </Container>
      </StyledContainer>
    </Wrapper>
  );
};

export default Navbar;
