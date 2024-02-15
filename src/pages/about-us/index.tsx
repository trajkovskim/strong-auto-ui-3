import BMWDriftSoilImage from 'assets/bwm-drift-soil.jpg';
import Container from 'components/Container';
import Icon from 'components/Icon';
import Image from 'components/Image';
import Line from 'components/Line';
import List from 'components/List';
import Text from 'components/typography/Text';
import Title from 'components/typography/Title';
import Contact from 'pages/contact';
import FAQ from 'pages/home/Faq';
import Reviews from 'pages/home/Reviews';
import WhyChooseUs from 'pages/home/WhyChooseUs';
import React from 'react';
import { BiCheckCircle } from 'react-icons/bi';
import { GrServices } from 'react-icons/gr';

const AboutUs: React.FC = () => {
  return (
    <Container sm="1400px" gap="1rem" centered padding={{ top: 'lg', bottom: 'lg', left: 'md', right: 'md' }}>
      <Text fontSize="md">Home / About us</Text>
      <Title fontSize="2xl" title="About us" />
      <Container gap="2rem" padding={{ top: 'lg', bottom: 'lg' }}>
        <Line />
        <Title
          fontSize="lg"
          title="Welcome to Strong AUTO"
          description={`
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages.
          `}
        />
        <Container gap="1rem" alignItems="center" wrap direction="row">
          <Container sm={3} gap="1rem">
            <Image src={BMWDriftSoilImage} objectFit="cover" rounded height="500px" />
          </Container>
          <Container sm={6} wrap direction="row" gap="1rem">
            <Image src={BMWDriftSoilImage} objectFit="cover" rounded height="500px" />
          </Container>
          <Container sm={3} gap="1rem">
            <Container sm={12}>
              <Image src={BMWDriftSoilImage} objectFit="cover" rounded height="300px" />
            </Container>
            <Container sm={12}>
              <Image src={BMWDriftSoilImage} objectFit="cover" rounded height="200px" />
            </Container>
          </Container>
        </Container>
        <Line />
      </Container>
      <Container gap="1rem" padding={{ top: 'md', bottom: 'md' }} alignItems="center" direction="row">
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
      </Container>
      <Line />
      <List justifyContent="center" gap="1rem">
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
      <WhyChooseUs />
      <Contact />
      <Reviews />
      <FAQ />
    </Container>
  );
};

export default AboutUs;
