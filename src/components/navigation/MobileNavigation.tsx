import { css } from '@emotion/css';
import Button from 'components/Button';
import Container from 'components/Container';
import Transition, { TransitionHandle } from 'components/Transition';
import LanguageChanger from 'components/navigation/LanguageChanger';
import LogoImage from 'components/navigation/LogoImage';
import { MobileContainer, StyledButton, StyledNavigationWrapper } from 'components/navigation/Navigation.styled';
import useNavigationOptions from 'components/navigation/useNavigationOptions';
import useSocialMedias from 'components/navigation/useSocialMedias';
import { EMAIL, OPEN_HOURS, TELEPHONE } from 'pages/constants';
import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { BiMenu } from 'react-icons/bi';
import { FaClock } from 'react-icons/fa';
import { MdClear, MdEmail, MdOutlinePhoneIphone } from 'react-icons/md';
import { call, goto, mailTo } from 'utils';

const MobileNavigation: React.FC = () => {
  const transitionRef = useRef<TransitionHandle>(null);
  const navOptions = useNavigationOptions();
  const socialMedias = useSocialMedias();

  const portalsElement = document.querySelector('#portals') as Element;

  const close = () => transitionRef.current?.gotoInitialState();

  const navigation = (
    <StyledNavigationWrapper>
      <Container styleConfig={{ gap: '1rem' }}>
        {Object.values(navOptions).map((option) => (
          <Container key={option.label} xs={12} lg="max-content">
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
          duration="200ms"
          timingFunction="ease-in-out"
          transition={{
            initial: css`
              overflow: hidden;
              transform: translateY(-100%);
            `,
            final: css`
              transform: translateY(0);
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
                <LogoImage />
                <Button maxContent icon={<MdClear />} themeType="link" onClick={close} size="3xl" />
              </Container>
              <div>{navigation}</div>
            </Container>

            <Container styleConfig={{ gap: '0.8rem', alignItems: 'center' }}>
              <LanguageChanger />
              <Container>
                <Button
                  maxContent
                  themeType="link"
                  size="lg"
                  icon={<MdOutlinePhoneIphone />}
                  onClick={() => call(TELEPHONE)}
                >
                  {TELEPHONE}
                </Button>
              </Container>
              <Container>
                <Button maxContent themeType="link" size="lg" icon={<MdEmail />} onClick={() => mailTo(EMAIL)}>
                  {EMAIL}
                </Button>
              </Container>
              <Container>
                <Button maxContent themeType="link" size="lg" icon={<FaClock />}>
                  {OPEN_HOURS}
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
      <Container xs="max-content" lg={0} styleConfig={{ alignSelf: 'end' }}>
        <Button
          maxContent
          themeType="link"
          icon={<BiMenu />}
          iconSize="3xl"
          onClick={() => {
            transitionRef.current?.toggle();
          }}
        />
      </Container>
    </>
  );
};

export default MobileNavigation;
