import React, { useState } from 'react';
import HorizontalList from 'components/horizontalList/HorizontalList';
import { products } from 'pages/constants';
import ProductCard from 'components/card/ProductCard';
import { RibbonType } from 'components/card/types';
import TabButtonsGroup from 'pages/home/ButtonsGroup';
import Container from 'components/Container';
import BodyTypes from 'pages/home/BodyTypes';
import { WhiteBackgroundContainer } from 'pages/home/index.styled';
import BoxAnimation from 'components/BoxAnimation';

const ProductsSection: React.FC = () => {
  const [exploreVehiclesActiveTab, setExploreVehiclesActiveTab] = useState<number>(0);

  return (
    <WhiteBackgroundContainer
      xs={12}
      styleConfig={{
        gap: '3rem',
        relative: true,
        centered: true,
        alignItems: 'center',
        padding: { left: 'md', right: 'md' },
      }}
    >
      <BoxAnimation threshold={0.2}>
        <TabButtonsGroup
          buttons={[{ label: 'Featured' }, { label: 'Body' }]}
          onChange={(_, index) => setExploreVehiclesActiveTab(index)}
          active={exploreVehiclesActiveTab}
        />
      </BoxAnimation>

      <BoxAnimation fullwidth threshold={0.2}>
        <Container styleConfig={{ direction: 'row', relative: true }} xs={12}>
          {exploreVehiclesActiveTab === 0 && (
            <HorizontalList chunkGap="1rem" chunkSize={{ xs: 12, md: 6, lg: 4, xl: 3 }} centered circular>
              {products.map((product) => (
                <ProductCard
                  {...product}
                  ribbon={product.state as RibbonType}
                  key={product.id}
                  onView={() => undefined}
                />
              ))}
            </HorizontalList>
          )}
          {exploreVehiclesActiveTab === 1 && <BodyTypes />}
        </Container>
      </BoxAnimation>
    </WhiteBackgroundContainer>
  );
};

export default ProductsSection;
