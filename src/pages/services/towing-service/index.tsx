import TowTruckImage from 'assets/tow-truck.jpg';
import { Container, Title } from 'components/common';
import PageHeader from 'components/PageHeader';
import { useTranslation } from 'hooks';
import React from 'react';

const TowingService: React.FC = () => {
  const t = useTranslation('services.towingService');

  return (
    <>
      <PageHeader imageSrc={TowTruckImage}>
        <Title fontSize="3xl" title={t('header')} />
      </PageHeader>
      <Container
        xs="1400px"
        styleConfig={{ padding: { top: 'sm', bottom: 'xl', left: 'md', right: 'md' }, gap: '3rem', centered: true }}
      >
        <Title
          fontSize={{ title: '2xl', description: 'lg' }}
          title={t('title')}
          description={t('description')}
          gap="2rem"
        />
      </Container>
    </>
  );
};

export default TowingService;
