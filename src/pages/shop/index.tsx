import Container from 'components/Container';
import Icon from 'components/Icon';
import List, { ListView } from 'components/List';
import ProductCard from 'components/ProductCard';
import { Dropdown } from 'components/form';
import Text from 'components/typography/Text';
import Title from 'components/typography/Title';
import { exploreAllVehiclesProducts } from 'pages/constants';
import Filters from 'pages/shop/Filters';
import React, { useState } from 'react';
import { MdGridView, MdMenu } from 'react-icons/md';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  background-color: #fff;
`;

const mapToProductCart: Record<ListView, 'column' | 'row'> = {
  grid: 'column',
  list: 'row',
};

const Shop: React.FC = () => {
  const [listView, setListView] = useState<ListView>(ListView.GRID);
  const pageSize = 10;
  const totalContentNumber = 34792;

  const products = exploreAllVehiclesProducts.slice(0, pageSize);

  const toggleListView = () => {
    listView === ListView.GRID ? setListView(ListView.LIST) : setListView(ListView.GRID);
  };

  return (
    <Container padding={{ left: 'md', right: 'md', bottom: 'md' }} gap="1rem">
      <StyledContainer padding="md">
        <Text>Home / Shop</Text>
        <Title title="Shop" fontSize="xl" bold />
      </StyledContainer>
      <Container direction="row" wrap gap="1rem">
        <Container sm={2}>
          <Filters />
        </Container>
        <Container sm={10} gap="1rem">
          <Container direction="row" alignItems="center" justifyContent="space-between">
            <Text type="sub">
              Results shown {pageSize} of {totalContentNumber}
            </Text>
            <Container direction="row" alignItems="center" justifyContent="flex-end" gap="10px">
              <Container direction="row" gap="0.5rem">
                <Icon
                  icon={listView === ListView.GRID ? <MdGridView /> : <MdMenu />}
                  onClick={toggleListView}
                  width="16px"
                />
              </Container>
              <Text>Sort</Text>
              <Dropdown
                options={[
                  { value: 'unsorted', label: 'Default' },
                  { value: 'price_asc', label: 'Price (Ascending)' },
                  { value: 'price_desc', label: 'Price (Descending)' },
                  { value: 'popularity_asc', label: 'Newest' },
                  { value: 'popularity_desc', label: 'Oldest' },
                ]}
              />
            </Container>
          </Container>
          <List gap="1rem" view={listView}>
            {products.map((product, index) => (
              <ProductCard {...product} type={mapToProductCart[listView]} key={index} />
            ))}
          </List>
        </Container>
      </Container>
    </Container>
  );
};

export default Shop;
