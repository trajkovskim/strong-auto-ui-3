import { css } from '@emotion/css';
import Button from 'components/Button';
import Container from 'components/Container';
import Transition, { TransitionHandle } from 'components/Transition';
import { MobileContainer, StyledButton, StyledNavigationWrapper } from 'components/navigation/Navigation.styled';
import useNavigationOptions from 'components/navigation/useNavigationOptions';
import useSocialMedias from 'components/navigation/useSocialMedias';
import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { BiMenu } from 'react-icons/bi';
import { MdClear } from 'react-icons/md';
import { goto } from 'utils';

const MobileNavigation: React.FC = () => {
  const transitionRef = useRef<TransitionHandle>(null);
  const navOptions = useNavigationOptions();
  const socialMedias = useSocialMedias();

  const portalsElement = document.querySelector('#portals') as Element;

  const close = () => transitionRef.current?.gotoInitialState();

  const navigation = (
    <StyledNavigationWrapper>
      <Container direction="row" wrap padding="md" justifyContent="flex-end" gap="1rem">
        {Object.values(navOptions).map((option) => (
          <Container key={option.label} xs={12} lg="max-content">
            <StyledButton
              fullwidth
              size="xl"
              iconSize="2xl"
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
          <MobileContainer preserveWhenXs>
            <Container>
              <Container preserveWhenXs alignSelf="flex-end" padding={{ top: 'lg', right: 'md' }}>
                <Button maxContent icon={<MdClear />} themeType="link" onClick={close} size="2xl" />
              </Container>
              <div>{navigation}</div>
            </Container>
            <Container
              gap="1.5rem"
              direction="row"
              preserveWhenXs
              alignSelf="flex-end"
              padding={{ top: 'lg', bottom: 'md', right: 'md', left: 'md' }}
            >
              {socialMedias.map((socialMedia, index) => (
                <Button
                  key={index}
                  themeType="link"
                  maxContent
                  icon={socialMedia.icon}
                  size="2xl"
                  onClick={() => goto(socialMedia.href)}
                />
              ))}
            </Container>
          </MobileContainer>
        </Transition>,
        portalsElement
      )}
      <Container xs="max-content" lg={0} preserveWhenXs>
        <Button
          maxContent
          themeType="link"
          icon={<BiMenu />}
          size="lg"
          onClick={() => {
            transitionRef.current?.toggle();
          }}
        />
      </Container>
    </>
  );
};

export default MobileNavigation;
