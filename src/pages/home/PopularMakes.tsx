import BoxAnimation from 'components/BoxAnimation';
import Button from 'components/Button';
import Container from 'components/Container';
import MiniProductCard from 'components/card/MiniProductCard';
import Title from 'components/typography/Title';
import TabButtonsGroup from 'pages/home/ButtonsGroup';
import React, { useState } from 'react';
import { BsArrowUpRight } from 'react-icons/bs';
import HorizontalList from 'components/horizontalList/HorizontalList';
import { products } from 'pages/constants';
import { RibbonType } from 'components/card/types';
import styled from 'styled-components';

export const PopularMakesWrapper = styled(Container)`
  background-color: #232323;
  color: #fff;
`;

const PopularMakes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const popularMakesProducts = products;

  return (
    <PopularMakesWrapper xs={12}>
      <BoxAnimation threshold={0.2}>
        <Container
          styleConfig={{ gap: '2rem', padding: { top: 'lg', bottom: 'xl' } }}
          lgStyle={{ padding: { top: 'xl', bottom: '2xl' } }}
        >
          <Container
            xs="1400px"
            styleConfig={{ centered: true, alignItems: 'center', gap: '2rem', padding: { left: 'md', right: 'md' } }}
            lgStyle={{ gap: '3rem' }}
          >
            <Container
              xs={12}
              styleConfig={{ gap: '1rem', direction: 'row', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Container xs={0} lg={2} />
              <Container xs={12} styleConfig={{ alignItems: 'center' }}>
                <Title title="Popular Makes" fontSize="2xl" bold />
              </Container>
              <Container xs="max-content" md={2}>
                <Button themeType="link" maxContent size="lg" iconRight={<BsArrowUpRight />}>
                  View all
                </Button>
              </Container>
            </Container>
            <TabButtonsGroup
              active={activeTab}
              onChange={(_, index) => setActiveTab(index)}
              buttons={[{ label: 'Audi' }, { label: 'BMW' }, { label: 'Toyota' }]}
            />
          </Container>
          <HorizontalList
            gap="2rem"
            chunkGap="1rem"
            chunkSize={{ xs: '100%', md: '50%', lg: '40%', xl: '30%' }}
            centered
          >
            {popularMakesProducts.map((product) => (
              <MiniProductCard {...product} ribbon={product.state as RibbonType} key={product.id} />
            ))}
          </HorizontalList>
        </Container>
      </BoxAnimation>
    </PopularMakesWrapper>
  );
};

export default PopularMakes;
