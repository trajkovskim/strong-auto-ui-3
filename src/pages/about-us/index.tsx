/* eslint-disable max-len */
import AudiHeadlightsImage from 'assets/audi-headlights.jpg';
import BMWDriftSoilImage from 'assets/bwm-drift-soil.jpg';
import { BoxAnimation, Breadcrumb, Container, Image, Line, List, Text, Title } from 'components/common';
import { useTranslation } from 'hooks';
import Services from 'pages/about-us/Services';
import FAQ from 'pages/home/Faq';
import Reviews from 'pages/home/Reviews';
import WhyChooseUs from 'pages/home/WhyChooseUs';
import React from 'react';
import styled from 'styled-components';

const AboutUsTitleWrapper = styled(Container)`
  background-image: url(${AudiHeadlightsImage});
  background-size: cover;
  background-position: center center;
  transition: 200ms;
  min-height: 300px;
  position: relative;
  color: #fff;

  &::before {
    content: '';
    background-color: #232323;
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.6;
    top: 0;
    left: 0;
  }
`;

const WelcomeIntroWrapper = styled(Container)`
  /* background-color: #232323;
  color: white; */
`;

const WelcomeIntroImage = styled(Image)`
  border-top-left-radius: 150px;
  border-bottom-left-radius: 150px;

  box-shadow: 0px 35px 5px -17px #a3a3a3, 18px 57px 16px -17px #b8b8b8;
  /* clip-path: ellipse(67% 75% at 75% 66%); */

  height: 100%;
  max-height: 600px;
  min-height: 400px;
`;

const AboutUs: React.FC = () => {
  const t = useTranslation('aboutUs');

  return (
    <Container styleConfig={{ gap: '4rem', padding: { bottom: 'xl' } }} lgStyle={{ gap: '9rem' }}>
      <AboutUsTitleWrapper>
        <Container
          xs="1400px"
          styleConfig={{
            gap: '3rem',
            padding: { left: 'md', right: 'md' },
            alignItems: 'center',
            centered: true,
          }}
          lgStyle={{
            direction: 'row-reverse',
            justifyContent: 'space-between',
          }}
        >
          <Breadcrumb />
          <Title fontSize="3xl" title={t('title')} />
        </Container>
      </AboutUsTitleWrapper>
      <WelcomeIntroWrapper
        xs={12}
        styleConfig={{
          centered: true,
          direction: 'row',
          justifyContent: 'end',
          wrap: true,
          gap: '3rem',
          padding: { left: 'md', right: 'md' },
        }}
      >
        <Container xs={12} lg={6} xl={5}>
          <BoxAnimation>
            <Title
              gap="2rem"
              fontSize={{ title: '2xl', description: 'lg' }}
              title={t('whoWeAre.title')}
              description={t('whoWeAre.description')}
            />
          </BoxAnimation>
        </Container>
        <Container xs={12} lg={6} xl={5.7}>
          <BoxAnimation>
            <WelcomeIntroImage shadow src={BMWDriftSoilImage} objectFit="cover" height="100%" />
          </BoxAnimation>
        </Container>
      </WelcomeIntroWrapper>
      <Container styleConfig={{ gap: '1rem' }}>
        <Line />
        <Container xs="1400px" styleConfig={{ centered: true }}>
          <BoxAnimation>
            <List xs={2} md={4} justifyContent="center" gap="1rem">
              <Container styleConfig={{ padding: 'md', rounded: true }}>
                <Text fontSize="2xl" bold>
                  10+
                </Text>
                <Text fontSize="lg">Years</Text>
              </Container>
              <Container styleConfig={{ padding: 'md' }}>
                <Text fontSize="2xl" bold>
                  10+
                </Text>
                <Text fontSize="lg">Years</Text>
              </Container>
              <Container styleConfig={{ padding: 'md' }}>
                <Text fontSize="2xl" bold>
                  10+
                </Text>
                <Text fontSize="lg">Years</Text>
              </Container>
            </List>
          </BoxAnimation>
        </Container>
      </Container>
      <Services />
      <WhyChooseUs />
      <Reviews />
      <FAQ />
    </Container>
  );
};

export default AboutUs;
