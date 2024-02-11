import TowTruckImage from 'assets/tow-truck.jpg';
import Button from 'components/Button';
import Container from 'components/Container';
import Title from 'components/typography/Title';
import React from 'react';
import styled from 'styled-components';

const TowingServiceWrapper = styled.div`
  background: url(${TowTruckImage});
  background-size: cover;
  background-position: center center;
  color: white;

  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.3;
  }

  * {
    z-index: 1;
  }
`;

const TowingService: React.FC = () => {
  return (
    <TowingServiceWrapper>
      <Container centered itemsCentered sm="1400px" gap="2rem" padding={{ top: 'xl', bottom: 'xl' }}>
        <Title
          centered
          title="Fast and Inexpensive Towing Services"
          gap="1rem"
          // eslint-disable-next-line max-len
          description="When it is not possible to fix a vehicle on-site, we utilise our extensive network of local providers across Europe to deliver a professional and reliable towing service."
          fontSize="xl"
        />
        <Button size="large" maxContent>
          Know more
        </Button>
      </Container>
    </TowingServiceWrapper>
  );
};

export default TowingService;
