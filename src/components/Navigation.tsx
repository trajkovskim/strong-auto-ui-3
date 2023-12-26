import { css } from '@emotion/css';
import Container from 'components/Container';
import Transition, { TransitionHandle } from 'components/Transition';
import { useTranslation } from 'hooks';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'routes';
import { styled } from 'styled-components';
import { SlArrowDown } from 'react-icons/sl';
import Icon from 'components/Icon';

const StyledNavigation = styled(Container)`
  background-color: #046af2;
  box-shadow: 0 4px 2px -2px rgb(0 0 0 / 0.2);
  position: relative;
`;

const StyledButton = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  color: white;

  padding: 15px 25px;
  cursor: pointer;

  transition: all 200ms;
  user-select: none;

  &:hover {
    background-color: #255a94a7 !important;
  }
`;

const alignment = {
  left: '0%',
  center: '-25%',
  right: '-50%',
};

type StyledDropdownWrapperProps = {
  align?: keyof typeof alignment;
  fullwidth?: boolean;
};

const StyledDropdownWrapper = styled.div<StyledDropdownWrapperProps>`
  max-height: 0;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  transform: translateY(100%)
    ${(props) => (!props.fullwidth ? `translateX(${alignment[props.align ?? 'left']})` : undefined)};
  background-color: #fff;
  color: #000;
  left: ${(props) => props.fullwidth && 0};
  width: ${(props) => props.fullwidth && '100%'};
  z-index: 1;
`;

const Navigation: React.FC = () => {
  const t = useTranslation('nav');
  const navigate = useNavigate();
  const animationRef = useRef<TransitionHandle>(null);
  const [dropdownRef, setDropdownRef] = useState<HTMLDivElement | null>(null);

  return (
    <nav>
      <StyledNavigation direction="row" wrap itemsCentered>
        <Container sm={12} md="max-content">
          <StyledButton
            onClick={() => {
              animationRef.current?.toggle();
              console.log(animationRef.current);
            }}
          >
            <Icon icon={<SlArrowDown />} width="13px" />
            {t('home')}
          </StyledButton>
          <Transition
            duration="100ms"
            ref={animationRef}
            transition={{
              final: css`
                max-height: ${dropdownRef?.scrollHeight}px;
              `,
            }}
          >
            <StyledDropdownWrapper ref={setDropdownRef}>
              <Container padding={{ top: 'md', bottom: 'md', left: 'lg', right: 'lg' }}>aassafdsu</Container>
            </StyledDropdownWrapper>
          </Transition>
        </Container>
        <Container sm={12} md="max-content">
          <StyledButton onClick={() => navigate(Routes.SHOP)}>{t('shop')}</StyledButton>
        </Container>
        <Container sm={12} md="max-content">
          <StyledButton onClick={() => navigate(Routes.SHOP)}>{t('offers')}</StyledButton>
        </Container>
        <Container sm={12} md="max-content">
          <StyledButton onClick={() => navigate(Routes.SHOP)}>{t('products')}</StyledButton>
        </Container>
        <Container sm={12} md="max-content">
          <StyledButton onClick={() => navigate(Routes.CONTACT)}>{t('contact')}</StyledButton>
        </Container>
      </StyledNavigation>
    </nav>
  );
};

export default Navigation;
