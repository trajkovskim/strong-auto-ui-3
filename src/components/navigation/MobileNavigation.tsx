import { css } from '@emotion/css';
import Button from 'components/Button';
import Container from 'components/Container';
import Transition, { TransitionHandle } from 'components/Transition';
import { StyledButton, StyledNavigationWrapper } from 'components/navigation/Navigation.styled';
import useNavigationOptions from 'components/navigation/useNavigationOptions';
import React, { useRef } from 'react';
import { BsMenuButton } from 'react-icons/bs';
import { styled } from 'styled-components';

const MobileContainer = styled(Container)`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  transform: translateY(100%);
  color: black;
  background: white;
  z-index: 999;
`;

type Props = {
  onClick?: () => void;
};

const MobileNavigation: React.FC<Props> = (props) => {
  const transitionRef = useRef<TransitionHandle>(null);
  const navOptions = useNavigationOptions();

  const navigation = (
    <StyledNavigationWrapper>
      <Container direction="row" wrap padding="md" justifyContent="flex-end">
        {Object.values(navOptions).map((option) => (
          <Container key={option.label} sm={12} lg="max-content">
            <StyledButton active={option.active} onClick={option.navigate}>
              {option.label}
            </StyledButton>
          </Container>
        ))}
      </Container>
    </StyledNavigationWrapper>
  );

  return (
    <div>
      <Button
        maxContent
        themeType="link"
        icon={<BsMenuButton />}
        size="lg"
        onClick={() => {
          props.onClick && props.onClick();
          transitionRef.current?.toggle();
        }}
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
    </div>
  );
};

export default MobileNavigation;
