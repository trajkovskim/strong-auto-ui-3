import BoxAnimation from 'components/BoxAnimation';
import Container from 'components/Container';
import React from 'react';
import RentCarImage from 'assets/rent-car-image.jpg';
import Title from 'components/typography/Title';
import Text from 'components/typography/Text';
import Button from 'components/Button';
import { HiArrowRight } from 'react-icons/hi';
import styled from 'styled-components';
import Image from 'components/Image';

const StyledBuyCarImage = styled(Image)`
  border-bottom-right-radius: 150px;
  box-shadow: 0px 35px 5px -17px #a3a3a3, 18px 57px 16px -17px #b8b8b8;
  /* clip-path: ellipse(67% 75% at 75% 66%); */

  height: 100%;
  max-height: 600px;
  min-height: 400px;
`;

const StyledRightImage = styled(Image)`
  border-bottom-left-radius: 150px;
  border-top-left-radius: 150px;
  box-shadow: 0px 35px 5px -17px #a3a3a3, 18px 57px 16px -17px #b8b8b8;
  /* clip-path: ellipse(67% 75% at 75% 66%); */

  height: 100%;
  max-height: 600px;
  min-height: 400px;
`;

const BuyingACar: React.FC = () => {
  return (
    // <Container xs={12} styleConfig={{ padding: { top: 'xl', bottom: '2xl' }, gap: '2rem' }}>
    <>
      <BoxAnimation>
        <Container
          styleConfig={{
            direction: 'row',
            wrap: true,
            minHeight: '530px',
            padding: { bottom: 'lg', right: 'md', left: 'md' },
            gap: '3.5rem',
          }}
          lgStyle={{ textAlign: 'right' }}
        >
          <Container xs={12} lg={5} xl={5} styleConfig={{ gap: '1rem' }} lgStyle={{ order: 2 }}>
            <Title fontSize="2xl" bold title="Buying a car?" />
            <Text fontSize="lg">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </Text>
            <Container xs={12} styleConfig={{ alignItems: 'flex-end' }}>
              <Button size="xl" iconRight={<HiArrowRight />} maxContent themeType="link">
                Visit our cars shop
              </Button>
            </Container>
          </Container>
          <Container xs={12} lg={7} xl={5.5} lgStyle={{ order: 1 }}>
            <StyledBuyCarImage height="500px" objectFit="cover" shadow src={RentCarImage} />
          </Container>
        </Container>
      </BoxAnimation>
      <BoxAnimation threshold={0.2}>
        <Container
          styleConfig={{
            justifyContent: 'flex-end',
            direction: 'row',
            wrap: true,
            minHeight: '530px',
            padding: { bottom: 'lg', right: 'md', left: 'md' },
            gap: '3.5rem',
          }}
        >
          <Container xs={12} lg={5} xl={5} styleConfig={{ gap: '1rem' }}>
            <Title fontSize="2xl" bold title="Buying a car?" />
            <Text fontSize="lg">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </Text>
            <Container xs={12} styleConfig={{ alignItems: 'flex-end' }}>
              <Button size="xl" iconRight={<HiArrowRight />} maxContent themeType="link">
                Visit our cars shop
              </Button>
            </Container>
          </Container>
          <Container xs={12} lg={7} xl={5.5}>
            <StyledRightImage objectFit="cover" shadow src={RentCarImage} />
          </Container>
        </Container>
      </BoxAnimation>
    </>
    // </Container>
  );
};

export default BuyingACar;
