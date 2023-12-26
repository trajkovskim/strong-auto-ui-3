import { css } from '@emotion/css';
import Button from 'components/Button';
import Container from 'components/Container';
import Icon from 'components/Icon';
import Transition, { TransitionHandle } from 'components/Transition';
import { useTranslation } from 'hooks';
import React, { useRef, useState } from 'react';
import { SlArrowDown, SlArrowRight } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'routes';
import { styled } from 'styled-components';

const StyledNavigationWrapper = styled.nav`
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
  box-shadow: 0px 1px 6px 3px rgba(35, 35, 35, 0.05);
`;

const StyledButtonInside = styled(Button)`
  padding: 15px 150px 15px 10px;
`;

const Navigation: React.FC = () => {
  const t = useTranslation('nav');
  const navigate = useNavigate();
  const animationRef = useRef<TransitionHandle>(null);
  const [dropdownRef, setDropdownRef] = useState<HTMLDivElement | null>(null);

  return (
    <StyledNavigationWrapper>
      <Container direction="row" wrap itemsCentered>
        <Container sm={12} md="max-content">
          <StyledButton
            onClick={() => {
              animationRef.current?.toggle();
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
              <Container sm="1400px" centered>
                <StyledButtonInside icon={<SlArrowRight />} size="large" themeType="link">
                  Parts
                </StyledButtonInside>
                <StyledButtonInside size="large" themeType="link">
                  Autos
                </StyledButtonInside>
              </Container>
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
      </Container>
    </StyledNavigationWrapper>
  );
};

export default Navigation;
