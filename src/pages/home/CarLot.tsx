import CarLotImage from 'assets/car-lot.jpg';
import Button from 'components/Button';
import Container from 'components/Container';
import Icon from 'components/Icon';
import Title from 'components/typography/Title';
import React from 'react';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import styled from 'styled-components';

const CarLotWrapper = styled.div`
  background-image: url(${CarLotImage});
  color: white;

  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.5;
  }

  * {
    z-index: 1;
  }
`;

const StyledButton = styled(Button)`
  border-bottom: 3px solid;
  &:hover {
    border-bottom-color: #075ebb;
  }
`;

const CarLot: React.FC = () => {
  return (
    <CarLotWrapper>
      <Container
        preserveWhenXs
        sm="1400px"
        centered
        itemsCentered
        gap="1rem"
        padding={{ top: 'xl', bottom: 'xl', left: 'sm', right: 'sm' }}
      >
        <Title
          centered
          textAlign="center"
          title="Our car lot"
          fontSize={{ title: '2xl', description: 'xl' }}
          bold={{ title: true }}
          description="See what you buy and before you buy it, come check us out!"
        />
        <StyledButton bold size="lg" maxContent themeType="link" iconRight={<MdKeyboardDoubleArrowRight />}>
          More info
        </StyledButton>
      </Container>
    </CarLotWrapper>
  );
};

export default CarLot;
