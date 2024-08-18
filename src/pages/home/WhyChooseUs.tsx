import BoxAnimation from 'components/BoxAnimation';
import Container from 'components/Container';
import Line from 'components/Line';
import List from 'components/List';
import Text from 'components/typography/Text';
import Title from 'components/typography/Title';
import React from 'react';

const WhyChooseUs: React.FC = () => {
  return (
    <Container
      minHeight="430px"
      preserveWhenXs
      padding={{ top: 'xl', bottom: '2xl', left: 'md', right: 'md' }}
      gap="1rem"
    >
      <Title centered title="Why choose us" fontSize="2xl" />
      <Line />
      <Container sm="1400px" centered>
        <List sm={1} md={2} lg={4} gap="1rem">
          <BoxAnimation>
            <Container gap="0.5rem" preserveWhenXs>
              <Text bold fontSize="lg">
                Trusted Car Dealership
              </Text>
              <Text>
                It is a long established fact that a reader will be distracted by the readable content of a page when
                looking at its layout.
              </Text>
            </Container>
          </BoxAnimation>
          <BoxAnimation>
            <Container gap="0.5rem" preserveWhenXs>
              <Text bold fontSize="lg">
                Trusted Car Dealership
              </Text>
              <Text>
                It is a long established fact that a reader will be distracted by the readable content of a page when
                looking at its layout.
              </Text>
            </Container>
          </BoxAnimation>
          <BoxAnimation>
            <Container gap="0.5rem" preserveWhenXs>
              <Text bold fontSize="lg">
                Trusted Car Dealership
              </Text>
              <Text>
                It is a long established fact that a reader will be distracted by the readable content of a page when
                looking at its layout.
              </Text>
            </Container>
          </BoxAnimation>
          <BoxAnimation>
            <Container gap="0.5rem" preserveWhenXs>
              <Text bold fontSize="lg">
                Trusted Car Dealership
              </Text>
              <Text>
                It is a long established fact that a reader will be distracted by the readable content of a page when
                looking at its layout.
              </Text>
            </Container>
          </BoxAnimation>
        </List>
      </Container>
    </Container>
  );
};

export default WhyChooseUs;
