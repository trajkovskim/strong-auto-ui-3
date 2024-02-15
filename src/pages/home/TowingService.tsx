import TowTruckImage from 'assets/tow-truck.jpg';
import Button from 'components/Button';
import Container from 'components/Container';
import Image from 'components/Image';
import Title from 'components/typography/Title';
import React from 'react';

const TowingService: React.FC = () => {
  return (
    <Container direction="row" gap="3rem" alignItems="center" justifyContent="space-between">
      <Container sm={7.5}>
        <Image rounded src={TowTruckImage} height="400px" objectFit="cover" />
      </Container>
      <Container sm={4.5} gap="1rem">
        <Title
          title="Fast and Inexpensive Towing Services"
          gap="1rem"
          // eslint-disable-next-line max-len
          description="When it is not possible to fix a vehicle on-site, we utilise our extensive network of local providers across Europe to deliver a professional and reliable towing service."
          fontSize="xl"
        />
        <Button size="lg" maxContent>
          Know more
        </Button>
      </Container>
    </Container>
  );
};

export default TowingService;
