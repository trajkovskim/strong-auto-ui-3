import Button from 'components/Button';
import Container from 'components/Container';
import List, { ListView } from 'components/List';
import ListProductCard from 'components/ListProductCard';
import ProductCard from 'components/ProductCard';
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
  top: 68px;
  background-color: inherit;
  z-index: 99;
  background-color: white;
  box-shadow: 0px -5px 10px 0px rgba(0, 0, 0, 0.2);
`;

const Shop: React.FC = () => {
  const navigate = useNavigate();
  const [listView, setListView] = useState<ListView>(ListView.GRID);
  const pageSize = 10;
  const totalContentNumber = 34792;
  const [page, setPage] = useState<number>(8);
  const [totalPages, setTotalPages] = useState<number>(8);
  const sidebarRef = useRef<SidebarHandle>(null);

  const mappedProducts = products.slice(0, pageSize);

  const toggleListView = () => {
    listView === ListView.GRID ? setListView(ListView.LIST) : setListView(ListView.GRID);
  };

  const listActionsComponent = (
    <Container preserveWhenXs direction="row" alignItems="center" justifyContent="space-between" gap="10px">
      <Container preserveWhenXs xs={12} md="max-content" alignItems="center" direction="row" gap="0.5rem">
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
      <Container sm="max-content" preserveWhenXs direction="row" gap="0.3rem">
        <Container xs={'max-content'} gap="0.5rem">
          <Button
            maxContent
            icon={listView === ListView.GRID ? <MdGridView /> : <MdMenu />}
            size="lg"
            themeType="link"
            onClick={toggleListView}
          >
            <Container xs={0} sm="max-content">
              View
            </Container>
          </Button>
        </Container>
        <Container xs={'max-content'} lg={0}>
          <Button
            maxContent
            onClick={() => sidebarRef.current?.open()}
            icon={sidebarRef.current?.isOpen ? <HiFilter /> : <HiOutlineFilter />}
            themeType="link"
            size="lg"
          >
            <Container xs={0} sm="max-content">
              Filters
            </Container>
          </Button>
        </Container>
      </Container>
    </Container>
  );

  const breadCrumb = <Text fontSize="sm">Home {'>'} Shop</Text>;

  return (
    <Container>
      <ListActionsMobileWrapper padding={{ top: 'md', bottom: 'md', left: 'md', right: 'md' }} xs={12} lg={0}>
        {breadCrumb}
        {listActionsComponent}
      </ListActionsMobileWrapper>

      <Container xs={0} lg={12} padding={{ top: 'md', bottom: 'md', left: 'md', right: 'md' }}>
        {breadCrumb}
      </Container>

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
              {listActionsComponent}
            </Container>
            <Container direction="column" justifyContent="space-between">
              <Text type="sub" fontSize="sm">
                Results shown {pageSize * page} - {pageSize * page + pageSize} of {totalContentNumber}
              </Text>
            </Container>
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
                    imageSrc={product.imageSrc}
                    description={product.description}
                    onView={() => navigate(Routes.SHOP_VIEW_DETAILS.replace(':id', product.id.toString()))}
                    ribbon={product.state as any}
                    fullwidth
                  />
                ) : (
                  <ProductCard
                    key={product.id}
                    price={product.price}
                    title={product.title}
                    imageSrc={product.imageSrc}
                    description={product.description}
                    onView={() => navigate(Routes.SHOP_VIEW_DETAILS.replace(':id', product.id.toString()))}
                    ribbon={product.state as any}
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
