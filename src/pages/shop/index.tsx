import Breadcrumb from 'components/Breadcrumb';
import Button from 'components/Button';
import Container from 'components/Container';
import Line from 'components/Line';
import StyledSpinner from 'components/Spinner';
import ShopProductCard from 'components/card/ShopProductCard';
import { RibbonType } from 'components/card/types';
import { Dropdown } from 'components/form';
import Text from 'components/typography/Text';
import { setVehicleFiltersAction } from 'context/vehicles';
import { VehicleFilters, VehiclesResponse } from 'generated';
import { useApplicationContext, useTranslation } from 'hooks';
import useRequest from 'hooks/useRequest';
import Filters from 'pages/shop/Filters';
import Sidebar from 'pages/shop/Sidebar';
import { pageSizes, SortBy } from 'pages/shop/constants';
import React, { useCallback, useEffect, useState } from 'react';
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
  const t = useTranslation('inventory');
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>();
  const totalContentNumber = 34792;
  const [page] = useState<number>(0);
  const [totalPages] = useState<number>();
  const [filtersSidebarShow, setFiltersSidebarShow] = useState<boolean>();
  const [sortAndSizeSidebarShow, setSortAndSizeSidebarShow] = useState<boolean>(false);

  const { send, loading } = useRequest();
  const [vehiclesResponse, setVehiclesResponse] = useState<VehiclesResponse>();
  const { getState, dispatch } = useApplicationContext();

  const filters = getState().vehicles.filters;
  const setFilters = useCallback((filters: VehicleFilters) => dispatch(setVehicleFiltersAction(filters)), [dispatch]);

  useEffect(() => {
    send(
      searchVehicles({ vehicleFilters: filters, page, size: pageSize, sortBy: sortBy ? [sortBy] : undefined }).then(
        setVehiclesResponse
      )
    );
  }, [filters, page, pageSize, send, sortBy]);

  const createSortAndSizeDropdowns = (fullwidth: boolean) => (
    <>
      <Dropdown
        name="sortBy"
        noBorder
        size="md"
        label={t('pagination.sortByInput.label')}
        fullwidth={fullwidth}
        value={sortBy}
        onChange={(event) => setSortBy(event.target.value)}
        options={Object.values(SortBy).map((sortBy) => ({
          value: sortBy,
          label: t(`pagination.sortByInput.${sortBy}`),
        }))}
      />
      <Dropdown
        name="size"
        noBorder
        size="md"
        label={t('pagination.resultSizeInput.label')}
        fullwidth={fullwidth}
        value={pageSize}
        onChange={(event) => setPageSize(Number(event.target.value))}
        options={pageSizes.map((pageSize) => ({
          value: pageSize.toString(),
          label: t(`pagination.resultSizeInput.${pageSize}`),
        }))}
      />
    </>
  );

  const handleCloseSortAndSizeSidebar = () => setSortAndSizeSidebarShow(false);
  const listHeaderComponent = (
    <ListHeader
      styleConfig={{ padding: 'md', gap: '1.5rem', bordered: true, rounded: true }}
      lgStyle={{ padding: 'lg' }}
    >
      <Container xs={12} styleConfig={{ gap: '1rem' }}>
        <Breadcrumb />
        <Text type="sub" fontSize="sm">
          {t('pagination.resultsShown', { results: pageSize * page, totalResults: totalContentNumber })}
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
              {t('filters.header')}
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

  const handleCloseFiltersSidebar = useCallback(() => setFiltersSidebarShow(false), []);
  const clearFilters = useCallback(() => setFilters({}), [setFilters]);

  return (
    <>
      <Sidebar xs={12} sm="400px" open={sortAndSizeSidebarShow} onClose={handleCloseSortAndSizeSidebar}>
        <Container styleConfig={{ gap: '0.5rem', padding: 'md', alignItems: 'end', bordered: true, minHeight: '100%' }}>
          <Button size="md" themeType="link" icon={<MdClose />} maxContent onClick={handleCloseSortAndSizeSidebar} />
          {createSortAndSizeDropdowns(true)}
        </Container>
      </Sidebar>
      <Sidebar xs={12} md="400px" open={!!filtersSidebarShow} onClose={handleCloseFiltersSidebar}>
        <Filters filters={filters} onSubmit={setFilters} onClose={handleCloseFiltersSidebar} onReset={clearFilters} />
      </Sidebar>
      <ListActionsMobileWrapper xs={12} lg={0}>
        {listHeaderComponent}
      </ListActionsMobileWrapper>
      <Container xs={12} styleConfig={{ direction: 'row', alignItems: 'flex-start', padding: { bottom: 'md' } }}>
        <FiltersContainer xs={0} lg={3} xl={2.5}>
          <Filters noCloseButton filters={filters} onSubmit={setFilters} onReset={clearFilters} />
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
            {vehiclesResponse?.vehicles.map((product) => (
              <Container xs={12} lg={6} xl={4} key={product.id}>
                <ShopProductCard
                  key={product.id}
                  onView={() => navigate(Routes.SHOP_VIEW_DETAILS.replace(':id', product.id.toString()))}
                  ribbon={product.state as RibbonType}
                  fullwidth
                  {...product}
                />
              </Container>
            ))}
          </Container>
          {loading && <StyledSpinner centered />}
          {!loading && page === totalPages && (
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
