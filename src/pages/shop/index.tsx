import Button from 'components/Button';
import Container from 'components/Container';
import List, { ListView } from 'components/List';
import ListProductCard from 'components/card/ListProductCard';
import ProductCard from 'components/card/ProductCard';
import { RibbonType } from 'components/card/types';
import { Dropdown } from 'components/form';
import Text from 'components/typography/Text';
import { products } from 'pages/constants';
import Filters from 'pages/shop/Filters';
import Sidebar, { SidebarHandle } from 'pages/shop/Sidebar';
import React, { useRef, useState } from 'react';
import { HiFilter, HiOutlineFilter } from 'react-icons/hi';
import { MdGridView, MdMenu } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'routes';
import styled from 'styled-components';

const ListActionsMobileWrapper = styled(Container)`
  position: sticky;
  top: 0;
  background-color: inherit;
  z-index: 10;
  background-color: white;
  box-shadow: 0px -5px 10px 0px rgba(0, 0, 0, 0.2);
`;

const ListHeader = styled(Container)`
  background-color: white;
`;

const Shop: React.FC = () => {
  const navigate = useNavigate();
  const [listView, setListView] = useState<ListView>(ListView.GRID);
  const pageSize = 10;
  const totalContentNumber = 34792;
  const [page] = useState<number>(8);
  const [totalPages] = useState<number>(8);
  const sidebarRef = useRef<SidebarHandle>(null);

  const mappedProducts = products.slice(0, pageSize);

  const toggleListView = () => {
    listView === ListView.GRID ? setListView(ListView.LIST) : setListView(ListView.GRID);
  };

  const tListView = {
    [ListView.GRID]: 'Grid',
    [ListView.LIST]: 'List',
  };

  const breadCrumb = <Text fontSize="sm">Home {'>'} Shop</Text>;

  const listHeaderComponent = (
    <ListHeader padding="sm" gap="1rem" direction="row" justifyContent="space-between" alignItems="flex-end">
      <Container gap="1rem">
        {breadCrumb}
        <Container xs={0} md="max-content" preserveWhenXs direction="row" gap="1rem">
          <Dropdown
            fullwidth
            size="md"
            label="Sort:"
            options={[
              { value: 'unsorted', label: 'Default' },
              { value: 'price_asc', label: 'Price (Ascending)' },
              { value: 'price_desc', label: 'Price (Descending)' },
              { value: 'popularity_asc', label: 'Newest' },
              { value: 'popularity_desc', label: 'Oldest' },
            ]}
          />
          <Dropdown
            fullwidth
            size="md"
            label="Size:"
            options={[
              { value: '10', label: '10' },
              { value: '20', label: '20' },
              { value: '40', label: '40' },
              { value: '60', label: '60' },
              { value: '100', label: '100' },
            ]}
          />
        </Container>
      </Container>
      <Container sm="max-content" preserveWhenXs direction="row" gap="0.3rem">
        <Container xs={'max-content'} lg={0}>
          <Button
            maxContent
            onClick={() => sidebarRef.current?.open()}
            icon={sidebarRef.current?.isOpen ? <HiFilter /> : <HiOutlineFilter />}
            themeType="link"
            size="md"
          >
            <Container xs={0} sm="max-content">
              Filters
            </Container>
          </Button>
        </Container>
        <Container xs={'max-content'} gap="0.5rem">
          <Button
            maxContent
            icon={listView === ListView.GRID ? <MdGridView /> : <MdMenu />}
            size="md"
            themeType="link"
            onClick={toggleListView}
          >
            <Container xs={0} sm="max-content">
              {tListView[listView]} view
            </Container>
          </Button>
        </Container>
      </Container>
    </ListHeader>
  );

  return (
    <Container>
      <ListActionsMobileWrapper xs={12} lg={0}>
        {listHeaderComponent}
      </ListActionsMobileWrapper>

      <Container padding={{ top: 'md', bottom: 'md', left: 'md', right: 'md' }} gap="1rem">
        <Sidebar ref={sidebarRef}>
          <Filters />
        </Sidebar>
        <Container direction="row" wrap gap="1rem">
          <Container xs={0} lg={3.2} xl={2.5} {...{ '2xl': 2 }}>
            <Filters />
          </Container>
          <Container sm={12} lg={8.8} xl={9.5} {...{ '2xl': 10 }} gap="1rem">
            <Container xs={0} lg={12}>
              {listHeaderComponent}
            </Container>
            <Text type="sub" fontSize="sm">
              Results shown {pageSize * page} - {pageSize * page + pageSize} of {totalContentNumber}
            </Text>
            <List
              gap="1rem"
              xs={1}
              md={listView === ListView.GRID ? 2 : 1}
              xl={listView === ListView.GRID ? 3 : 1}
              {...{ '2xl': listView === ListView.GRID ? 4 : 1 }}
              view={listView}
            >
              {mappedProducts.map((product) =>
                listView === ListView.LIST ? (
                  <ListProductCard
                    key={product.id}
                    price={product.price}
                    title={product.title}
                    images={product.images}
                    description={product.description}
                    onView={() => navigate(Routes.SHOP_VIEW_DETAILS.replace(':id', product.id.toString()))}
                    ribbon={product.state as RibbonType}
                    fullwidth
                  />
                ) : (
                  <ProductCard
                    key={product.id}
                    price={product.price}
                    title={product.title}
                    images={product.images}
                    description={product.description}
                    onView={() => navigate(Routes.SHOP_VIEW_DETAILS.replace(':id', product.id.toString()))}
                    ribbon={product.state as RibbonType}
                    fullwidth
                  />
                )
              )}
            </List>
            {page === totalPages && (
              <Container itemsCentered>
                <Text fontSize="sm" type="sub">
                  All results displayed
                </Text>
              </Container>
            )}
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default Shop;
