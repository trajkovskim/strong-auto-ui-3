import { BoxAnimation, Container, List, ServiceCard, Title } from 'components/common';
import PageHeader from 'components/PageHeader';
import { useTranslation } from 'hooks';
import useServices from 'hooks/useServices';
import React from 'react';

const Services: React.FC = () => {
  const t = useTranslation('services');
  const cards = useServices();

  return (
    <>
      <PageHeader>
        <Title fontSize="3xl" title={t('header')} />
      </PageHeader>
      <Container
        xs="1400px"
        styleConfig={{
          centered: true,
          itemsCentered: true,
          padding: { left: 'md', right: 'md', top: 'lg', bottom: 'xl' },
        }}
      >
        <List xs={1} md={2} gap="4rem" justifyContent="center" elementWidth="1fr">
          {cards.map((card, index) => (
            <BoxAnimation key={index}>
              <ServiceCard {...card} />
            </BoxAnimation>
          ))}
        </List>
      </Container>
    </>
  );
};

export default Services;
