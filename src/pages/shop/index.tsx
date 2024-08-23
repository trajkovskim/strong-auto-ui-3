import Breadcrumb from 'components/Breadcrumb';
import Button from 'components/Button';
import Container from 'components/Container';
import Line from 'components/Line';
import { ListView } from 'components/List';
import ListProductCard from 'components/card/ListProductCard';
import ShopProductCard from 'components/card/ShopProductCard';
import { RibbonType } from 'components/card/types';
import { Dropdown } from 'components/form';
import Text from 'components/typography/Text';
import { VehicleFilters, VehiclesResponse } from 'generated';
import useRequest from 'hooks/useRequest';
import Filters from 'pages/shop/Filters';
import Sidebar from 'pages/shop/Sidebar';
import React, { useEffect, useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import { HiFilter, HiOutlineFilter } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'routes';
import { searchVehicles } from 'services/VehicleService';
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
  box-shadow: rgba(79, 139, 173, 0.12) 0px 4px 20px;
`;

const FiltersContainer = styled(Container)`
  /* position: sticky;
  top: 80px; */
`;

const Shop: React.FC = () => {
  const navigate = useNavigate();
  const [listView, setListView] = useState<ListView>(ListView.GRID);
  const pageSize = 10;
  const totalContentNumber = 34792;
  const [page] = useState<number>(8);
  const [totalPages] = useState<number>(8);
  const [filtersSidebarShow, setFiltersSidebarShow] = useState<boolean>(false);
  const [sortAndSizeSidebarShow, setSortAndSizeSidebarShow] = useState<boolean>(false);
  const { send } = useRequest();
  const [vehiclesResponse, setVehiclesResponse] = useState<VehiclesResponse>();
  const [filters, setFilters] = useState<VehicleFilters>({});

  useEffect(() => {
    send(searchVehicles({ vehicleFilters: {} }).then(setVehiclesResponse));
  }, [page, send]);

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  const toggleListView = () => {
    listView === ListView.GRID ? setListView(ListView.LIST) : setListView(ListView.GRID);
  };

  const tListView = {
    [ListView.GRID]: 'Grid',
    [ListView.LIST]: 'List',
  };

  const createSortAndSizeDropdowns = (fullwidth: boolean) => (
    <>
      <Dropdown
        size="md"
        label="Sort by:"
        fullwidth={fullwidth}
        options={[
          { value: 'unsorted', label: 'Default' },
          { value: 'price_asc', label: 'Price (Ascending)' },
          { value: 'price_desc', label: 'Price (Descending)' },
          { value: 'popularity_asc', label: 'Newest' },
          { value: 'popularity_desc', label: 'Oldest' },
        ]}
      />
      <Dropdown
        size="md"
        label="Result size:"
        fullwidth={fullwidth}
        options={[
          { value: '10', label: '10' },
          { value: '20', label: '20' },
          { value: '40', label: '40' },
          { value: '60', label: '60' },
          { value: '100', label: '100' },
        ]}
      />
    </>
  );

  const handleCloseSortAndSizeSidebar = () => setSortAndSizeSidebarShow(false);
  const sidebarSortAndSize = (
    <Sidebar xs={12} sm="400px" open={sortAndSizeSidebarShow} onClose={handleCloseSortAndSizeSidebar}>
      <Container styleConfig={{ gap: '0.5rem', padding: 'md', alignItems: 'end', bordered: true, minHeight: '100%' }}>
        <Button size="md" themeType="link" icon={<MdClose />} maxContent onClick={handleCloseSortAndSizeSidebar} />
        {createSortAndSizeDropdowns(true)}
      </Container>
    </Sidebar>
  );

  const listHeaderComponent = (
    <ListHeader
      styleConfig={{ padding: 'md', gap: '1.5rem', bordered: true, rounded: true }}
      lgStyle={{ padding: 'lg' }}
    >
      <Container xs={12} styleConfig={{ gap: '1rem' }}>
        <Breadcrumb />
        <Text type="sub" fontSize="sm">
          Results shown {pageSize * page} - {pageSize * page + pageSize} of {totalContentNumber}
        </Text>
        <Container xs={0} lg={12} styleConfig={{ gap: '1rem', direction: 'row', justifyContent: 'space-between' }}>
          {createSortAndSizeDropdowns(false)}
        </Container>
      </Container>
      <Container styleConfig={{ direction: 'row', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
        <Container xs={'max-content'} lg={0} styleConfig={{ gap: '1rem', direction: 'row' }}>
          <Button
            maxContent
            onClick={() => setFiltersSidebarShow(true)}
            icon={filtersSidebarShow ? <HiFilter /> : <HiOutlineFilter />}
            themeType="link"
            size="md"
          >
            <Container xs={0} sm="max-content">
              Filters
            </Container>
          </Button>
          <Line type="vertical" />
        </Container>
        <Container xs="max-content" lg={0} styleConfig={{ gap: '1rem', direction: 'row' }}>
          <Button
            maxContent
            icon={<BiMenu />}
            size="md"
            themeType="link"
            onClick={() => setSortAndSizeSidebarShow(true)}
          />
        </Container>
      </Container>
    </ListHeader>
  );

  const handleCloseFiltersSidebar = () => setFiltersSidebarShow(false);

  const sidebarMobile = (
    <Sidebar xs={12} md="400px" open={filtersSidebarShow} onClose={handleCloseFiltersSidebar}>
      <Filters filters={filters} onSubmit={setFilters} onClose={handleCloseFiltersSidebar} />
    </Sidebar>
  );

  return (
    <>
      {sidebarSortAndSize}
      {sidebarMobile}
      <ListActionsMobileWrapper xs={12} lg={0}>
        {listHeaderComponent}
      </ListActionsMobileWrapper>
      <Container xs={12} styleConfig={{ direction: 'row', alignItems: 'flex-start', padding: { bottom: 'md' } }}>
        <FiltersContainer xs={0} lg={3} xl={2.5}>
          <Filters noCloseButton filters={filters} onSubmit={setFilters} />
        </FiltersContainer>
        <Container
          xs={12}
          lg={9}
          xl={9.5}
          styleConfig={{ padding: { left: 'md', right: 'md', top: 'md' }, gap: '2rem' }}
        >
          <Container xs={0} lg={12}>
            {listHeaderComponent}
          </Container>
          <Container styleConfig={{ gap: '1rem', direction: 'row', wrap: true }}>
            {vehiclesResponse?.vehicles.map((product) =>
              listView === ListView.LIST ? (
                <ListProductCard
                  key={product.id}
                  onView={() => navigate(Routes.SHOP_VIEW_DETAILS.replace(':id', product.id.toString()))}
                  ribbon={product.state as RibbonType}
                  fullwidth
                  {...product}
                />
              ) : (
                <Container xs={12} lg={6} xl={4} key={product.id}>
                  <ShopProductCard
                    key={product.id}
                    onView={() => navigate(Routes.SHOP_VIEW_DETAILS.replace(':id', product.id.toString()))}
                    ribbon={product.state as RibbonType}
                    fullwidth
                    {...product}
                  />
                </Container>
              )
            )}
          </Container>
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
