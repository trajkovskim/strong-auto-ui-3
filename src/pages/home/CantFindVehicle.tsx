import Button from 'components/Button';
import Container from 'components/Container';
import Title from 'components/typography/Title';
import React from 'react';
import styled from 'styled-components';

const CantFindVehicleContainer = styled(Container)`
  position: relative;
  overflow: hidden;
  height: 100%;
`;

const CantFindVehicle: React.FC = () => {
  return (
    <CantFindVehicleContainer direction="row" alignItems="center" justifyContent="flex-end" relative>
      <Container padding={{ top: 'lg', bottom: 'lg', right: 'md' }} gap="2rem" sm="1400px" centered alignItems="center">
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
      </Container>
    </CantFindVehicleContainer>
  );
};

export default CantFindVehicle;
