import Button from 'components/Button';
import Container from 'components/Container';
import Image from 'components/Image';
import { Input } from 'components/form';
import Title from 'components/typography/Title';
import React from 'react';
import CarInEnvelope from 'assets/car-in-envelope.png';
import BoxAnimation from 'components/BoxAnimation';
import styled from 'styled-components';
import { useTranslation } from 'hooks';

const StyledCarInEnvelopeImage = styled(Image)`
  border-top-right-radius: 150px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 150px;
  border-bottom-right-radius: 50px;
`;

const NewsLetterSubscription: React.FC = () => {
  const t = useTranslation('home.newsLetterSubscription');

  return (
    <Container
      xs="1400px"
      styleConfig={{
        centered: true,
        direction: 'row',
        wrap: true,
        gap: '3rem',
        padding: { right: 'md', left: 'md' },
      }}
    >
      <Container xs={12} lg={6} xl={5.5} styleConfig={{ gap: '2rem' }}>
        <BoxAnimation>
          <Title
            title={t('title')}
            description={t('description')}
            fontSize={{ title: '2xl', description: 'lg' }}
            gap="2rem"
          />
        </BoxAnimation>
        <BoxAnimation>
          <Container styleConfig={{ gap: '1rem', direction: 'row' }}>
            <Input size="lg" fullwidth placeholder={t('emailInput.placeholder')} />
            <Button size="lg">{t('subscribeButton')}</Button>
          </Container>
        </BoxAnimation>
      </Container>
      <Container xs={12} lg={6} xl={6.5}>
        <BoxAnimation>
          <StyledCarInEnvelopeImage shadow src={CarInEnvelope} height="400px" objectFit="cover" />
        </BoxAnimation>
      </Container>
    </Container>
  );
};

export default NewsLetterSubscription;
