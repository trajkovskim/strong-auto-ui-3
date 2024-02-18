import Container from 'components/Container';
import Line from 'components/Line';
import List from 'components/List';
import Text from 'components/typography/Text';
import Title from 'components/typography/Title';
import React from 'react';

const WhyChooseUs: React.FC = () => {
  return (
    <Container padding={{ top: 'lg', bottom: 'lg' }} gap="1rem" centered sm="1400px">
      <Title title="Why choose us" fontSize="2xl" />
      <Line />
      <List sm={1} md={2} lg={4} gap="1rem">
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
      </List>
    </Container>
  );
};

export default WhyChooseUs;
