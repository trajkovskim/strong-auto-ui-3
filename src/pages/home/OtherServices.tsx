import TowTruckImage from 'assets/tow-truck.jpg';
import Button from 'components/Button';
import Container from 'components/Container';
import Image from 'components/Image';
import Line from 'components/Line';
import Title from 'components/typography/Title';
import React from 'react';

const OtherServices: React.FC = () => {
  return (
    <Container padding={{ top: 'lg', bottom: 'lg' }} gap="1rem" centered sm="1400px">
      <Title title="Other services we provide to you" fontSize="2xl" bold />
      <Line />
      <Container
        direction="row"
        padding={{ top: 'md', bottom: 'md' }}
        justifyContent="space-between"
        alignItems="center"
        gap="1rem"
      >
        <Container gap="2rem">
          <Title
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
        <Image src={TowTruckImage} objectFit="cover" width="600px" />
      </Container>
    </Container>
  );
};

export default OtherServices;
