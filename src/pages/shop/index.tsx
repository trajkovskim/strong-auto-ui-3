import Breadcrumb from 'components/Breadcrumb';
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
import Sidebar from 'pages/shop/Sidebar';
import React, { useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import { HiFilter, HiOutlineFilter } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'routes';
import styled from 'styled-components';

const ListActionsMobileWrapper = styled(Container)`
  /* position: sticky; */
  top: 0;
  background-color: inherit;
  background-color: white;
  box-shadow: 0px -5px 10px 0px rgba(0, 0, 0, 0.2);
`;

const ListHeader = styled(Container)`
  background-color: white;
`;

const FiltersContainer = styled(Container)`
  position: sticky;
  top: 80px;
`;

const Shop: React.FC = () => {
  const navigate = useNavigate();
  const [listView, setListView] = useState<ListView>(ListView.GRID);
  const pageSize = 10;
  const totalContentNumber = 34792;
  const [page] = useState<number>(8);
  const [totalPages] = useState<number>(8);
  const [sidebarShow, setSidebarShow] = useState<boolean>(false);

  const mappedProducts = products.slice(0, pageSize);

  const toggleListView = () => {
    listView === ListView.GRID ? setListView(ListView.LIST) : setListView(ListView.GRID);
  };

  const tListView = {
    [ListView.GRID]: 'Grid',
    [ListView.LIST]: 'List',
  };

  const listHeaderComponent = (
    <ListHeader styleConfig={{ padding: 'sm', gap: '1rem', direction: 'row', justifyContent: 'space-between' }}>
      <Container styleConfig={{ gap: '1rem' }}>
        <Breadcrumb />
        <Container xs={0} md="max-content" styleConfig={{ gap: '1rem', direction: 'row' }}>
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
      <Container styleConfig={{ direction: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Container xs="max-content" md={0} styleConfig={{ gap: '1rem', direction: 'row' }}>
          <Button maxContent icon={<BiMenu />} themeType="link" size="lg" />
        </Container>
        <Container sm="max-content" styleConfig={{ gap: '0.3rem', direction: 'row' }}>
          <Container xs={'max-content'} lg={0}>
            <Button
              maxContent
              onClick={() => setSidebarShow(true)}
              icon={sidebarShow ? <HiFilter /> : <HiOutlineFilter />}
              themeType="link"
              size="lg"
            >
              <Container xs={0} md="max-content">
                Filters
              </Container>
            </Button>
          </Container>
          <Container xs={'max-content'} styleConfig={{ gap: '0.5rem' }}>
            {/* <Button
              maxContent
              nowrap
              icon={listView === ListView.GRID ? <MdGridView /> : <MdMenu />}
              size="lg"
              themeType="link"
              onClick={toggleListView}
            >
              <Container xs={0} md="max-content">
                {tListView[listView]} view
              </Container>
            </Button> */}
          </Container>
        </Container>
      </Container>
    </ListHeader>
  );

  const handleCloseSidebar = () => setSidebarShow(false);

  const sidebarMobile = (
    <Sidebar xs={12} md="300px" open={sidebarShow} onClose={handleCloseSidebar}>
      <Filters onClose={handleCloseSidebar} />
    </Sidebar>
  );

  return (
    <>
      {sidebarMobile}
      <ListActionsMobileWrapper xs={12} lg={0}>
        {listHeaderComponent}
      </ListActionsMobileWrapper>

      <Container styleConfig={{ direction: 'row', alignItems: 'flex-start', padding: { bottom: 'md' } }}>
        <FiltersContainer xs={0} lg={3} xl={2.5} {...{ '2xl': 2 }}>
          <Filters noCloseButton />
        </FiltersContainer>
        <Container
          xs={12}
          lg={9}
          xl={9.5}
          {...{ '2xl': 10 }}
          styleConfig={{ padding: { left: 'md', right: 'md', top: 'md' }, gap: '2rem' }}
        >
          <Container xs={0} lg={12}>
            {listHeaderComponent}
          </Container>
          <Text type="sub" fontSize="sm">
            Results shown {pageSize * page} - {pageSize * page + pageSize} of {totalContentNumber}
          </Text>
          <List
            gap="1rem"
            xs={1}
            md={listView === ListView.GRID ? 1 : 1}
            lg={listView === ListView.GRID ? 2 : 1}
            xl={listView === ListView.GRID ? 3 : 1}
            // {...{ '2xl': listView === ListView.GRID ? 4 : 1 }}
            view={listView}
          >
            {mappedProducts.map((product) =>
              listView === ListView.LIST ? (
                <ListProductCard
                  key={product.id}
                  onView={() => navigate(Routes.SHOP_VIEW_DETAILS.replace(':id', product.id.toString()))}
                  ribbon={product.state as RibbonType}
                  fullwidth
                  {...product}
                />
              ) : (
                <ProductCard
                  key={product.id}
                  onView={() => navigate(Routes.SHOP_VIEW_DETAILS.replace(':id', product.id.toString()))}
                  ribbon={product.state as RibbonType}
                  fullwidth
                  {...product}
                />
              )
            )}
          </List>
          {page === totalPages && (
            <Container styleConfig={{ itemsCentered: true }}>
              <Text fontSize="sm" type="sub">
                All results displayed
              </Text>
            </Container>
          )}
        </Container>
      </Container>
    </>
  );
};

export default Shop;
