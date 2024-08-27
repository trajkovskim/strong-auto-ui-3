import TowTruckImage from 'assets/tow-truck.jpg';
import { BoxAnimation, Container, Icon, Image, List, Text, Title } from 'components/common';
import PageHeader from 'components/PageHeader';
import { useTranslation } from 'hooks';
import { DarkBackgroundContainer } from 'pages/common.styled';
import ContactUs from 'pages/services/ContactUs';
import React from 'react';
import { FaCheck } from 'react-icons/fa';

const TowingService: React.FC = () => {
  const t = useTranslation('services.towingService');

  const createList = (...children: React.ReactNode[]) =>
    children.map((child, index) => (
      <BoxAnimation key={index}>
        <Container styleConfig={{ direction: 'row', alignItems: 'start', gap: '1rem' }}>
          <Icon icon={<FaCheck />} size="lg" style={{ visibility: index === 0 ? 'hidden' : undefined }} />
          <Container>{child}</Container>
        </Container>
      </BoxAnimation>
    ));

  return (
    <Container styleConfig={{ gap: '3rem', padding: { bottom: 'xl' } }} lgStyle={{ gap: '9rem' }}>
      <PageHeader imageSrc={TowTruckImage}>
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
        <Container xs={12} lg={6}>
          <BoxAnimation>
            <Title
              fontSize={{ title: '2xl', description: 'lg' }}
              title={t('title')}
              description={t('description')}
              gap="3rem"
            />
          </BoxAnimation>
        </Container>
        <Container xs={12} lg={6}>
          <BoxAnimation>
            <Image src={TowTruckImage} objectFit="cover" rounded />
          </BoxAnimation>
        </Container>
      </Container>
      <Container
        xs="1400px"
        styleConfig={{
          padding: { left: 'md', right: 'md' },
          centered: true,
        }}
      >
        <List xs={1} sm={2} md={3} lg={4} gap="3rem">
          <BoxAnimation>
            <Image src={TowTruckImage} objectFit="cover" rounded />
          </BoxAnimation>
          <BoxAnimation>
            <Image src={TowTruckImage} objectFit="cover" rounded />
          </BoxAnimation>
          <BoxAnimation>
            <Image src={TowTruckImage} objectFit="cover" rounded />
          </BoxAnimation>
        </List>
      </Container>
      <DarkBackgroundContainer xs={12}>
        <Container
          xs="1400px"
          styleConfig={{ padding: { top: 'xl', bottom: 'xl', left: 'md', right: 'md' }, centered: true, gap: '3rem' }}
          lgStyle={{ padding: { top: 'xl', bottom: '2xl' } }}
        >
          <Title title={t('whyChooseOurTowingServices.title')} fontSize="2xl" />
          <List xs={1} sm={2} md={3} gap="2rem">
            <Container styleConfig={{ gap: '1rem' }}>
              {createList(
                <Text bold fontSize="lg">
                  {t('whyChooseOurTowingServices.list.0.title')}
                </Text>,
                <Text fontSize="md">{t('whyChooseOurTowingServices.list.0.items.0')}</Text>
              )}
            </Container>
            <Container styleConfig={{ gap: '1rem' }}>
              {createList(
                <Text bold fontSize="lg">
                  {t('whyChooseOurTowingServices.list.1.title')}
                </Text>,
                <Text fontSize="md">{t('whyChooseOurTowingServices.list.1.items.0')}</Text>
              )}
            </Container>
            <Container styleConfig={{ gap: '1rem' }}>
              {createList(
                <Text bold fontSize="lg">
                  {t('whyChooseOurTowingServices.list.2.title')}
                </Text>,
                <Text fontSize="md">{t('whyChooseOurTowingServices.list.2.items.0')}</Text>
              )}
            </Container>
            <Container styleConfig={{ gap: '1rem' }}>
              {createList(
                <Text bold fontSize="lg">
                  {t('whyChooseOurTowingServices.list.3.title')}
                </Text>,
                <Text fontSize="md">{t('whyChooseOurTowingServices.list.3.items.0')}</Text>
              )}
            </Container>
            <Container styleConfig={{ gap: '1rem' }}>
              {createList(
                <Text bold fontSize="lg">
                  {t('whyChooseOurTowingServices.list.4.title')}
                </Text>,
                <Text fontSize="md">{t('whyChooseOurTowingServices.list.4.items.0')}</Text>,
                <Text fontSize="md">{t('whyChooseOurTowingServices.list.4.items.1')}</Text>,
                <Text fontSize="md">{t('whyChooseOurTowingServices.list.4.items.2')}</Text>
              )}
            </Container>
            <Container styleConfig={{ gap: '1rem' }}>
              {createList(
                <Text bold fontSize="lg">
                  {t('whyChooseOurTowingServices.list.5.title')}
                </Text>,
                <Text fontSize="md">{t('whyChooseOurTowingServices.list.5.items.0')}</Text>
              )}
            </Container>
          </List>
        </Container>
      </DarkBackgroundContainer>
      <ContactUs />
    </Container>
  );
};

export default TowingService;
