import BoxAnimation from 'components/BoxAnimation';
import TabButtonsGroup, { ButtonProps } from 'components/ButtonsGroup';
import ProductCard from 'components/card/ProductCard';
import Container from 'components/Container';
import HorizontalList from 'components/horizontalList/HorizontalList';
import StyledSpinner from 'components/Spinner';
import { VehiclesResponse } from 'generated';
import { useTranslation } from 'hooks';
import useRequest from 'hooks/useRequest';
import { VEHICLE_STATE_TO_RIBBON_TYPE } from 'pages/constants';
import BodyTypes from 'pages/home/BodyTypes';
import { WhiteBackgroundContainer } from 'pages/home/index.styled';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'routes';
import { searchVehicles } from 'services/VehicleService';

const ProductsSection: React.FC = () => {
  const t = useTranslation('home.vehiclesSection');
  const tabs: ButtonProps[] = [
    {
      label: t('featured'),
      value: 'featured',
    },
    {
      label: t('bodyTypes'),
      value: 'bodyTypes',
    },
  ];

  const navigate = useNavigate();
  const [exploreVehiclesActiveTab, setExploreVehiclesActiveTab] = useState<string>(tabs[0].value);
  const { send, loading } = useRequest();
  const [vehiclesResponse, setVehiclesResponse] = useState<VehiclesResponse>();

  useEffect(() => {
    send(searchVehicles({ vehicleFilters: { featured: true } }).then(setVehiclesResponse));
  }, [send]);

  if (loading) {
    return <StyledSpinner centered />;
  }

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
                  onView={() => navigate(Routes.SHOP_VIEW_DETAILS.replace(':id', product.id.toString()))}
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
