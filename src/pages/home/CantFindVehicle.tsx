// import CarSideViewToLeftImage from 'assets/car-side-view-to-left.png';
import CarSideViewToRightImage from 'assets/car-side-view-to-right.png';
import Button from 'components/Button';
import Container from 'components/Container';
import Image from 'components/Image';
import Title from 'components/typography/Title';
import React from 'react';
import styled from 'styled-components';

const StyledImage1 = styled(Image)`
  position: absolute;
  opacity: 0.8;
  left: -200px;
  z-index: 0 !important;
`;

const CantFindVehicleContainer = styled(Container)`
  position: relative;
  overflow: hidden;
  height: 100%;
  color: white;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.2;
    z-index: 1;
  }

  * {
    z-index: 2;
  }
`;

const CantFindVehicle: React.FC = () => {
  return (
    <CantFindVehicleContainer direction="row" alignItems="center" justifyContent="flex-end" relative>
      <StyledImage1 src={CarSideViewToRightImage} objectFit="cover" width="600px" />
      {/* <StyledImage2 src={CarSideViewToLeftImage} objectFit="cover" width="600px" /> */}
      <Container padding={{ top: 'md', bottom: 'md', right: 'md' }} gap="2rem" itemsCentered sm="100%">
        <Title
          centered
          title="Can't find the car you are looking for?"
          description="Reach out to us and we will help you looking"
          gap="1rem"
          fontSize="xl"
        />
        <Button size="lg" maxContent>
          Know more
        </Button>
      </Container>
    </CantFindVehicleContainer>
  );
};

export default CantFindVehicle;
