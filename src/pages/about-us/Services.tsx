import CarServiceMechanicImage from 'assets/car-service-mechanic.jpg';
import TowTruckImage from 'assets/tow-truck.jpg';
import BoxAnimation from 'components/BoxAnimation';
import Container from 'components/Container';
import List from 'components/List';
import ServiceCard from 'components/card/ServiceCard';
import React from 'react';

const Services: React.FC = () => {
  return (
    <Container
      xs="1400px"
      styleConfig={{
        centered: true,
        itemsCentered: true,
        padding: { left: 'md', right: 'md' },
      }}
    >
      <List xs={1} md={2} gap="4rem" justifyContent="center" elementWidth="1fr">
        <BoxAnimation duration="250ms">
          <ServiceCard
            image={CarServiceMechanicImage}
            title="CAR SERVICE"
            description="mply dummy text of the printing and typesetting industry."
          />
        </BoxAnimation>
        <BoxAnimation duration="500ms">
          <ServiceCard
            image={CarServiceMechanicImage}
            title="FAST AND INEXPENSIVE TOWING SERVICES"
            description="When it is not possible to fix a vehicle on-site, we utilise our extensive network of l."
          />
        </BoxAnimation>
        <BoxAnimation duration="750ms">
          <ServiceCard
            image={TowTruckImage}
            title="CAR SERVICE"
            // eslint-disable-next-line max-len
            description="mply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever It has survived not only five centuries, but"
          />
        </BoxAnimation>
        <BoxAnimation duration="1s">
          <ServiceCard
            image={TowTruckImage}
            title="FAST AND INEXPENSIVE TOWING SERVICES"
            description="When it is not possible to fix a vehicle on-site, we utilise our extensive network of l"
          />
        </BoxAnimation>
      </List>
    </Container>
  );
};

export default Services;
