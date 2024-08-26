import CarServiceMechanicImage from 'assets/car-service-mechanic.jpg';
import TowTruckImage from 'assets/tow-truck.jpg';
import { BoxAnimation, Button, Container, List, ServiceCard, Title } from 'components/common';
import { useTranslation } from 'hooks';
import { WhiteBackgroundContainer } from 'pages/home/index.styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'routes';

const Services: React.FC = () => {
  const navigate = useNavigate();
  const t = useTranslation('home.ourServices');

  return (
    <WhiteBackgroundContainer>
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
            <Container styleConfig={{ gap: '3rem' }}>
              <Title
                title={t('title')}
                fontSize={{ title: 'xl', description: 'md' }}
                description={t('description')}
                gap="2rem"
              />
              <Button maxContent size="lg">
                {t('viewAllButton')}
              </Button>
            </Container>
          </BoxAnimation>
          <BoxAnimation duration="500ms">
            <ServiceCard
              image={CarServiceMechanicImage}
              title={t('towingService.title')}
              description={t('towingService.description')}
              onClick={() => navigate(Routes.TOWING_SERVICE)}
            />
          </BoxAnimation>
          <BoxAnimation duration="750ms">
            <ServiceCard
              image={TowTruckImage}
              title={t('dpfCleaning.title')}
              description={t('dpfCleaning.description')}
            />
          </BoxAnimation>
          <BoxAnimation duration="1s">
            <ServiceCard
              image={TowTruckImage}
              title={t('carService.title')}
              description={t('carService.description')}
            />
          </BoxAnimation>
        </List>
      </Container>
    </WhiteBackgroundContainer>
  );
};

export default Services;
