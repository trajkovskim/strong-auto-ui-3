import React, { useState } from 'react';
import HorizontalList from 'pages/home/HorizontalList';
import { products } from 'pages/constants';
import ProductCard from 'components/card/ProductCard';
import { RibbonType } from 'components/card/types';
import TabButtonsGroup from 'pages/home/ButtonsGroup';
import Container from 'components/Container';
import BodyTypes from 'pages/home/BodyTypes';
import { WhiteBackgroundContainer } from 'pages/home/index.styled';
import BoxAnimation from 'pages/home/BoxAnimation';

const ProductsSection: React.FC = () => {
  const [exploreVehiclesActiveTab, setExploreVehiclesActiveTab] = useState<number>(0);

  return (
    <WhiteBackgroundContainer
      relative
      xs={12}
      centered
      alignItems="center"
      gap="3rem"
      padding={{ top: 'xl', bottom: '2xl' }}
    >
      <BoxAnimation threshold={0.2}>
        <TabButtonsGroup
          buttons={[{ label: 'Featured' }, { label: 'Body' }]}
          onChange={(_, index) => setExploreVehiclesActiveTab(index)}
          defaultActive={exploreVehiclesActiveTab}
        />
      </BoxAnimation>

      <BoxAnimation fullwidth threshold={0.2}>
        <Container direction="row" overflow="hidden" relative xs={12}>
          {exploreVehiclesActiveTab === 0 && (
            <HorizontalList chunkGap="1.5rem" chunkSize={{ xs: '100%', md: '50%', lg: '33.33%', xl: '25%' }} centered>
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
