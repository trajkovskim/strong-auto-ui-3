import BoxAnimation from 'components/BoxAnimation';
import ProductCard from 'components/card/ProductCard';
import { RibbonType } from 'components/card/types';
import Container from 'components/Container';
import HorizontalList from 'components/horizontalList/HorizontalList';
import { VehiclesResponse, VehicleState } from 'generated';
import useRequest from 'hooks/useRequest';
import BodyTypes from 'pages/home/BodyTypes';
import TabButtonsGroup, { ButtonProps } from 'components/ButtonsGroup';
import { WhiteBackgroundContainer } from 'pages/home/index.styled';
import React, { useEffect, useState } from 'react';
import { searchVehicles } from 'services/VehicleService';

const VEHICLE_STATE_TO_RIBBON_TYPE: Record<VehicleState, RibbonType> = {
  [VehicleState.Featured]: 'featured',
  [VehicleState.Sold]: 'sold',
};

const ProductsSection: React.FC = () => {
  const tabs: ButtonProps[] = [
    {
      label: 'Featured',
      value: 'featured',
    },
    {
      label: 'Body types',
      value: 'bodyType',
    },
  ];

  const [exploreVehiclesActiveTab, setExploreVehiclesActiveTab] = useState<string>(tabs[0].value);
  const { send } = useRequest();
  const [vehiclesResponse, setVehiclesResponse] = useState<VehiclesResponse>();

  useEffect(() => {
    send(searchVehicles({ vehicleFilters: { featured: true } }).then(setVehiclesResponse));
  }, [send]);

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
          buttons={tabs}
          onChange={(tab) => setExploreVehiclesActiveTab(tab.value)}
          active={exploreVehiclesActiveTab}
        />
      </BoxAnimation>

      <BoxAnimation fullwidth threshold={0.2}>
        <Container styleConfig={{ direction: 'row', relative: true }} xs={12}>
          {exploreVehiclesActiveTab === tabs[0].value && (
            <HorizontalList chunkGap="1rem" chunkSize={{ xs: 12, md: 6, lg: 4, xl: 3 }} centered circular>
              {vehiclesResponse?.vehicles.map((product) => (
                <ProductCard
                  key={product.id}
                  onView={() => undefined}
                  ribbon={VEHICLE_STATE_TO_RIBBON_TYPE[product.state]}
                  {...product}
                />
              ))}
            </HorizontalList>
          )}
          {exploreVehiclesActiveTab === tabs[1].value && <BodyTypes />}
        </Container>
      </BoxAnimation>
    </WhiteBackgroundContainer>
  );
};

export default ProductsSection;
