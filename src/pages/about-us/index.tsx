/* eslint-disable max-len */
import BMWDriftSoilImage from 'assets/bwm-drift-soil.jpg';
import BoxAnimation from 'components/BoxAnimation';
import Container from 'components/Container';
import Image from 'components/Image';
import Line from 'components/Line';
import List from 'components/List';
import Text from 'components/typography/Text';
import Title from 'components/typography/Title';
import Services from 'pages/about-us/Services';
import FAQ from 'pages/home/Faq';
import Reviews from 'pages/home/Reviews';
import WhyChooseUs from 'pages/home/WhyChooseUs';
import React from 'react';
import styled from 'styled-components';

const AboutUsTitleWrapper = styled(Container)`
  background-image: url(${BMWDriftSoilImage});
  background-size: cover;
  background-position: center center;
  transition: 200ms;
  min-height: 300px;
  position: relative;
  color: #fff;

  &::before {
    content: '';
    background-color: #000;
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    top: 0;
    left: 0;
  }

  /* & > * {
    z-index: 1;
  } */
`;

const WelcomeIntroWrapper = styled(Container)`
  /* background-color: #232323;
  color: white; */
`;

const WelcomeIntroImage = styled(Image)`
  border-top-left-radius: 150px;
  border-bottom-left-radius: 150px;
`;

const AboutUs: React.FC = () => {
  return (
    <>
      <Container gap="1rem">
        <AboutUsTitleWrapper>
          <Container xs="1400px" centered padding={{ left: 'md', right: 'md' }}>
            <Title fontSize="3xl" title="About us" />
          </Container>
        </AboutUsTitleWrapper>
        <WelcomeIntroWrapper
          centered
          direction="row"
          justifyContent="end"
          wrap
          gap="3rem"
          padding={{ top: '2xl', bottom: '2xl', left: 'md', right: 'md' }}
        >
          <Container xs={12} lg={5}>
            <BoxAnimation>
              <Title
                gap="2rem"
                fontSize="2xl"
                title="Welcome"
                description={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.`}
              />
            </BoxAnimation>
          </Container>
          <Container xs={12} lg={5.7}>
            <BoxAnimation>
              <WelcomeIntroImage shadow src={BMWDriftSoilImage} objectFit="cover" height="100%" />
            </BoxAnimation>
          </Container>
        </WelcomeIntroWrapper>
        <Line />
        <BoxAnimation>
          <Container xs="1400px" centered>
            <List xs={2} md={4} justifyContent="center" gap="1rem">
              <Container padding="md" rounded>
                <Text fontSize="2xl" bold>
                  10+
                </Text>
                <Text fontSize="lg">Years</Text>
              </Container>
              <Container padding="md">
                <Text fontSize="2xl" bold>
                  10+
                </Text>
                <Text fontSize="lg">Years</Text>
              </Container>
              <Container padding="md">
                <Text fontSize="2xl" bold>
                  10+
                </Text>
                <Text fontSize="lg">Years</Text>
              </Container>
            </List>
          </Container>
        </BoxAnimation>
        <BoxAnimation>
          <Services />

          {/* <Container
            xs="1400px"
            centered
            gap="1rem"
            padding={{ top: 'md', bottom: 'md' }}
            alignItems="center"
            direction="row"
          >
            <Container sm={4}>
              <Icon icon={<GrServices />} width="200px" />
            </Container>
            <Container sm={6} gap="1rem">
              <Title fontSize="xl" title="Our services we provide to you" />
              <Text fontSize="lg">
                <Icon icon={<BiCheckCircle />} width="15px" /> Service 1
              </Text>
              <Text fontSize="lg">
                <Icon icon={<BiCheckCircle />} width="15px" /> Service 2
              </Text>
              <Text fontSize="lg">
                <Icon icon={<BiCheckCircle />} width="15px" /> Service 3
              </Text>
              <Text fontSize="lg">
                <Icon icon={<BiCheckCircle />} width="15px" /> Service 4
              </Text>
              <Text fontSize="lg">
                <Icon icon={<BiCheckCircle />} width="15px" /> Service 5
              </Text>
            </Container>
          </Container> */}
        </BoxAnimation>
        <BoxAnimation>
          <WhyChooseUs />
        </BoxAnimation>
      </Container>
      <Container>
        <BoxAnimation>
          <Reviews />
        </BoxAnimation>
        <BoxAnimation>
          <FAQ />
        </BoxAnimation>
      </Container>
    </>
  );
};

export default AboutUs;
