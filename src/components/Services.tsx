import { BoxAnimation, Button, Container, List, ServiceCard, Title } from 'components/common';
import { useTranslation } from 'hooks';
import useServices from 'hooks/useServices';
import { WhiteBackgroundContainer } from 'pages/home/index.styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'routes';

const Services: React.FC = () => {
  const navigate = useNavigate();
  const t = useTranslation('services');
  const services = useServices();

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
          <BoxAnimation>
            <Container styleConfig={{ gap: '3rem' }}>
              <Title
                title={t('viewAllCard.title')}
                fontSize={{ title: 'xl', description: 'md' }}
                description={t('viewAllCard.description')}
                gap="2rem"
              />
              <Button maxContent size="lg" onClick={() => navigate(Routes.SERVICES)}>
                {t('viewAllCard.viewAllButton')}
              </Button>
            </Container>
          </BoxAnimation>
          {services.map((card, index) => (
            <BoxAnimation key={index}>
              <ServiceCard {...card} />
            </BoxAnimation>
          ))}
        </List>
      </Container>
    </WhiteBackgroundContainer>
  );
};

export default Services;
