import Button from 'components/Button';
import TabButtonsGroup, { ButtonProps } from 'components/ButtonsGroup';
import Container from 'components/Container';
import MiniProductCard from 'components/card/MiniProductCard';
import { RibbonType } from 'components/card/types';
import HorizontalList from 'components/horizontalList/HorizontalList';
import Title from 'components/typography/Title';
import { VehicleEmbedded } from 'generated';
import useRequest from 'hooks/useRequest';
import React, { useEffect, useState } from 'react';
import { BsArrowUpRight } from 'react-icons/bs';
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

  const [activeTab, setActiveTab] = useState<string>(tabs[0].value);
  const { send } = useRequest();
  const [vehiclesByMake, setVehiclesByMake] = useState<Record<string, VehicleEmbedded[]>>({});

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

  if (!vehiclesByMake[activeTab]) {
    return null;
  }

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
              <Title title="Popular Makes" fontSize="2xl" bold />
            </Container>
            <Container xs="max-content" md={2}>
              <Button themeType="link" maxContent size="lg" iconRight={<BsArrowUpRight />}>
                View all
              </Button>
            </Container>
          </Container>
          <TabButtonsGroup buttons={tabs} active={activeTab} onChange={(tab) => setActiveTab(tab.value)} />
        </Container>
        <HorizontalList gap="2rem" chunkGap="1rem" chunkSize={{ xs: 12, md: 6, lg: 4.8, xl: 3.6 }} centered circular>
          {vehiclesByMake[activeTab].map((product) => (
            <MiniProductCard {...product} ribbon={product.state as RibbonType} key={product.id} />
          ))}
        </HorizontalList>
      </Container>
    </PopularMakesWrapper>
  );
};

export default PopularMakes;
