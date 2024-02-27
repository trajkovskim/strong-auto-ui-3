// import CarSideViewToLeftImage from 'assets/car-side-view-to-left.png';
import CarSideViewToRightImage from 'assets/car-side-view-to-right.png';
import Button from 'components/Button';
import Container from 'components/Container';
import Image from 'components/Image';
import Line from 'components/Line';
import Title from 'components/typography/Title';
import React from 'react';
import styled from 'styled-components';

const StyledImage1 = styled(Image)`
  position: absolute;
  opacity: 0.8;
  left: -200px;
`;

const CantFindVehicleContainer = styled(Container)`
  position: relative;
  overflow: hidden;
  height: 100%;
`;

const Container2 = styled(Container)`
  z-index: 1;
`;

const CantFindVehicle: React.FC = () => {
  return (
    <CantFindVehicleContainer preserveWhenXs direction="row" alignItems="center" justifyContent="flex-end" relative>
      {/* <StyledImage2 src={CarSideViewToLeftImage} objectFit="cover" width="600px" /> */}
      {/* <StyledImage1 src={CarSideViewToRightImage} objectFit="cover" width="600px" /> */}
      <Container
        preserveWhenXs
        padding={{ top: 'lg', bottom: 'lg', right: 'md' }}
        gap="2rem"
        sm="1400px"
        centered
        alignItems="center"
      >
        <Container2 itemsCentered gap="2rem">
          <Title
            centered
            title="Can't find the vehicle you are looking for?"
            description="Reach out to us and we will help you looking"
            gap="1rem"
            fontSize="xl"
          />
          <Button size="lg" maxContent themeType="white">
            Know more
          </Button>
        </Container2>
      </Container>
    </CantFindVehicleContainer>
  );
};

export default CantFindVehicle;
