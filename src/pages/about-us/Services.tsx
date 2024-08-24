import CarServiceMechanicImage from 'assets/car-service-mechanic.jpg';
import TowTruckImage from 'assets/tow-truck.jpg';
import BoxAnimation from 'components/BoxAnimation';
import Container from 'components/Container';
import List from 'components/List';
import ServiceCard from 'components/card/ServiceCard';
import { useTranslation } from 'hooks';
import React from 'react';

const Services: React.FC = () => {
  const t = useTranslation('aboutUs.services');

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
            title={t('towingService.title')}
            description={t('towingService.description')}
          />
        </BoxAnimation>
        <BoxAnimation duration="500ms">
          <ServiceCard
            image={CarServiceMechanicImage}
            title={t('dpfCleaning.title')}
            description={t('dpfCleaning.description')}
          />
        </BoxAnimation>
        <BoxAnimation duration="750ms">
          <ServiceCard image={TowTruckImage} title={t('carService.title')} description={t('carService.description')} />
        </BoxAnimation>
        <BoxAnimation duration="1s">
          <ServiceCard
            image={CarServiceMechanicImage}
            title={t('towingService.title')}
            description={t('towingService.description')}
          />
        </BoxAnimation>
      </List>
    </Container>
  );
};

export default Services;
