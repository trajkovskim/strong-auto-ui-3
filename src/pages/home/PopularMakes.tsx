import { MiniProductCard } from 'components/card';
import { Button, ButtonProps, ButtonsGroup, Container, HorizontalList, StyledSpinner, Title } from 'components/common';
import { VehicleEmbedded } from 'generated';
import { useRequest, useTranslation } from 'hooks';
import { VEHICLE_STATE_TO_RIBBON_TYPE } from 'pages/constants';
import React, { useEffect, useState } from 'react';
import { BsArrowUpRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'routes';
import { searchVehicles } from 'services/VehicleService';
import styled from 'styled-components';

export const PopularMakesWrapper = styled(Container)`
  background-color: #232323;
  color: #fff;
`;

const PopularMakes: React.FC = () => {
  const tabs: ButtonProps[] = [
    { label: 'Audi', value: 'AUDI' },
    { label: 'BMW', value: 'BMW' },
    { label: 'Toyota', value: 'TOYOTA' },
  ];

  const t = useTranslation('home.popularMakes');
  const [activeTab, setActiveTab] = useState<string>(tabs[0].value);
  const { send, loading } = useRequest();
  const [vehiclesByMake, setVehiclesByMake] = useState<Record<string, VehicleEmbedded[]>>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab in vehiclesByMake) {
      return;
    }

    send(
      searchVehicles({ vehicleFilters: { make: activeTab } }).then((data) =>
        setVehiclesByMake((prev) => ({ ...prev, [activeTab]: data.vehicles }))
      )
    );
  }, [send, activeTab, vehiclesByMake]);

  return (
    <PopularMakesWrapper xs={12}>
      <Container
        styleConfig={{ gap: '2rem', padding: { top: 'xl', bottom: 'xl', left: 'md', right: 'md' } }}
        lgStyle={{ padding: { top: 'xl', bottom: '2xl' } }}
      >
        <Container
          xs="1400px"
          styleConfig={{ centered: true, alignItems: 'center', gap: '2rem' }}
          lgStyle={{ gap: '3rem' }}
        >
          <Container
            xs={12}
            styleConfig={{ gap: '1rem', direction: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Container xs={0} lg={2} />
            <Container xs={12} styleConfig={{ alignItems: 'center' }}>
              <Title title={t('title')} fontSize="2xl" bold />
            </Container>
            <Container xs="max-content" md={2}>
              <Button themeType="link" maxContent size="lg" iconRight={<BsArrowUpRight />}>
                {t('viewAllButton')}
              </Button>
            </Container>
          </Container>
          <ButtonsGroup buttons={tabs} active={activeTab} onChange={(tab) => setActiveTab(tab.value)} />
        </Container>
        {loading && <StyledSpinner centered />}
        {!loading && vehiclesByMake[activeTab] && (
          <HorizontalList gap="2rem" chunkGap="1rem" chunkSize={{ xs: 12, md: 6, lg: 4.8, xl: 3.6 }} centered circular>
            {vehiclesByMake[activeTab].map((product) => (
              <MiniProductCard
                {...product}
                ribbon={VEHICLE_STATE_TO_RIBBON_TYPE[product.state]}
                key={product.id}
                onView={() => navigate(Routes.SHOP_VIEW_DETAILS.replace(':id', product.id.toString()))}
              />
            ))}
          </HorizontalList>
        )}
      </Container>
    </PopularMakesWrapper>
  );
};

export default PopularMakes;
