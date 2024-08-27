import DpfCleaningImage from 'assets/dpf-cleaning.jpg';
import { BoxAnimation, Container, Image, Title } from 'components/common';
import PageHeader from 'components/PageHeader';
import { useTranslation } from 'hooks';
import ContactUs from 'pages/services/ContactUs';
import React from 'react';

const DpfCleaningService: React.FC = () => {
  const t = useTranslation('services.dpfCleaningService');

  return (
    <Container styleConfig={{ gap: '3rem', padding: { bottom: 'xl' } }} lgStyle={{ gap: '9rem' }}>
      <PageHeader imageSrc={DpfCleaningImage}>
        <BoxAnimation>
          <Title fontSize="3xl" title={t('header')} />
        </BoxAnimation>
      </PageHeader>
      <Container
        xs="1400px"
        styleConfig={{
          padding: { left: 'md', right: 'md' },
          centered: true,
          direction: 'row',
          wrap: true,
          gap: '3rem',
        }}
        lgStyle={{ direction: 'row-reverse' }}
      >
        <Container xs={12}>
          <BoxAnimation>
            <Title
              fontSize={{ title: '2xl', description: 'lg' }}
              title={t('title')}
              description={t('description')}
              gap="3rem"
            />
          </BoxAnimation>
        </Container>
        <Container xs={12}>
          <BoxAnimation>
            <Image src={DpfCleaningImage} objectFit="cover" rounded />
          </BoxAnimation>
        </Container>
      </Container>
      <ContactUs />
    </Container>
  );
};

export default DpfCleaningService;
