import Container from 'components/Container';
import Text from 'components/typography/Text';
import Title from 'components/typography/Title';
import React from 'react';

const WhyChooseUs: React.FC = () => {
  return (
    <Container padding={{ top: 'lg', bottom: 'xl', left: 'md', right: 'md' }} gap="2rem" centered sm="1400px">
      <Title title="Why choose us" fontSize="2xl" bold />
      <Container direction="row" gap="1rem">
        <Container gap="0.5rem" preserveWhenXs>
          <Text bold fontSize="lg">
            Trusted Car Dealership
          </Text>
          <Text>
            It is a long established fact that a reader will be distracted by the readable content of a page when
            looking at its layout.
          </Text>
        </Container>
        <Container gap="0.5rem" preserveWhenXs>
          <Text bold fontSize="lg">
            Trusted Car Dealership
          </Text>
          <Text>
            It is a long established fact that a reader will be distracted by the readable content of a page when
            looking at its layout.
          </Text>
        </Container>
        <Container gap="0.5rem" preserveWhenXs>
          <Text bold fontSize="lg">
            Trusted Car Dealership
          </Text>
          <Text>
            It is a long established fact that a reader will be distracted by the readable content of a page when
            looking at its layout.
          </Text>
        </Container>
        <Container gap="0.5rem" preserveWhenXs>
          <Text bold fontSize="lg">
            Trusted Car Dealership
          </Text>
          <Text>
            It is a long established fact that a reader will be distracted by the readable content of a page when
            looking at its layout.
          </Text>
        </Container>
      </Container>
    </Container>
  );
};

export default WhyChooseUs;
