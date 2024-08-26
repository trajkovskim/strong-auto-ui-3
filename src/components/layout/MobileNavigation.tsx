import { css } from '@emotion/css';
import { Button, Container, Transition, TransitionHandle } from 'components/common';
import LanguageChanger from 'components/LanguageChanger';
import LogoImage from 'components/layout/LogoImage';
import { MobileContainer, StyledButton, StyledNavigationWrapper } from 'components/layout/Navigation.styled';
import { useNavigationOptions, useSocialMedias, useTranslation } from 'hooks';
import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { BiMenu } from 'react-icons/bi';
import { FaClock } from 'react-icons/fa';
import { MdClear } from 'react-icons/md';
import { goto } from 'utils';

const MobileNavigation: React.FC = () => {
  const t = useTranslation();
  const transitionRef = useRef<TransitionHandle>(null);
  const navOptions = useNavigationOptions();
  const socialMedias = useSocialMedias();

  const portalsElement = document.querySelector('#portals') as Element;

  const close = () => transitionRef.current?.gotoInitialState();

  const navigation = (
    <StyledNavigationWrapper>
      <Container styleConfig={{ gap: '1rem' }}>
        {Object.values(navOptions).map((option) => (
          <Container key={option.label} xs={12}>
            <StyledButton
              fullwidth
              size="xl"
              iconSize="lg"
              themeType="link"
              icon={option.icon}
              active={option.active}
              onClick={() => {
                close();
                option.navigate();
              }}
            >
              {option.label}
            </StyledButton>
          </Container>
        ))}
      </Container>
    </StyledNavigationWrapper>
  );

  return (
    <>
      {createPortal(
        <Transition
          ref={transitionRef}
          duration="300ms"
          timingFunction="ease-in-out"
          transition={{
            initial: css`
              overflow: hidden;
              opacity: 0;
              z-index: -99;
              /* transform: translateY(-100%); */
            `,
            final: css`
              /* transform: translateY(0); */
              opacity: 1;
              z-index: 99;
              overflow: auto;
            `,
          }}
        >
          <MobileContainer
            styleConfig={{
              gap: '1rem',
              padding: 'md',
              justifyContent: 'space-between',
            }}
          >
            <Container styleConfig={{ gap: '3rem' }}>
              <Container xs={12} styleConfig={{ direction: 'row', justifyContent: 'space-between' }}>
                <Container xs={1} />
                <LogoImage />
                <Button maxContent icon={<MdClear />} themeType="link" onClick={close} size="3xl" />
              </Container>
              <div>{navigation}</div>
            </Container>

            <Container styleConfig={{ gap: '0.8rem', alignItems: 'center' }}>
              <LanguageChanger />
              <Container>
                <Button maxContent themeType="link" size="lg" icon={<FaClock />}>
                  {t('openHours')}
                </Button>
              </Container>
              <Container styleConfig={{ gap: '1.5rem', direction: 'row' }}>
                {socialMedias.map((socialMedia, index) => (
                  <Button
                    key={index}
                    themeType="link"
                    maxContent
                    icon={socialMedia.icon}
                    size="lg"
                    onClick={() => goto(socialMedia.href)}
                  />
                ))}
              </Container>
            </Container>
          </MobileContainer>
        </Transition>,
        portalsElement
      )}
      <Button
        maxContent
        themeType="link"
        icon={<BiMenu />}
        iconSize="3xl"
        onClick={() => {
          transitionRef.current?.toggle();
        }}
      />
    </>
  );
};

export default MobileNavigation;
