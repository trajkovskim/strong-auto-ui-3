import Button from 'components/Button';
import Container from 'components/Container';
import List from 'components/List';
import { Form } from 'components/form';
import Autocomplete from 'components/form/Autocomplete';
import Text from 'components/typography/Text';
import Title from 'components/typography/Title';
import { setVehicleFiltersAction } from 'context/vehicles';
import { VehicleFilters } from 'generated';
import { useApplicationContext, useTranslation } from 'hooks';
import React from 'react';
import { BiFilter, BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'routes';
import styled from 'styled-components';
import theme from 'theme';

const SearchBoxWrapper = styled(Container)`
  @media (min-width: ${theme.breakpoints.minWidth.lg}) {
    box-shadow: rgba(79, 139, 173, 0.12) 0px 4px 20px;
  }
`;

const StyledSearchButton = styled(Button)`
  white-space: nowrap;
  cursor: pointer;
  width: 100%;
  overflow: hidden;
`;

const SearchBox: React.FC = () => {
  const { dispatch } = useApplicationContext();
  const navigate = useNavigate();
  const t = useTranslation('home.searchBox');

  const handleSubmit = (filters: VehicleFilters) => {
    dispatch(setVehicleFiltersAction(filters));
    navigate(Routes.SHOP);
  };

  return (
    <SearchBoxWrapper
      xs="1400px"
      styleConfig={{
        gap: '2rem',
        padding: 'md',
      }}
      lgStyle={{
        padding: 'lg',
        centered: true,
        itemsCentered: true,
        rounded: true,
      }}
    >
      <Container xs={12}>
        <Title title={t('title')} bold fontSize="lg" />
      </Container>
      <Form onSubmit={handleSubmit}>
        <Container xs={12} styleConfig={{ centered: true, gap: '2rem', direction: 'row', wrap: true }}>
          <List sm={1} lg={4} gap="1.5rem">
            <Autocomplete
              name="make"
              fullwidth
              placeholder={t('makeInput.placeholder')}
              size="xl"
              options={[{ value: 'audi' }]}
            />
            <Autocomplete
              name="model"
              fullwidth
              placeholder={t('modelInput.placeholder')}
              size="xl"
              options={[{ value: 'audi' }]}
            />
            <Autocomplete
              name="price"
              fullwidth
              placeholder={t('priceInput.placeholder')}
              size="xl"
              options={[{ value: 'audi' }]}
            />
          </List>
          <Container
            xs={12}
            styleConfig={{ justifyContent: 'flex-end', alignItems: 'center', direction: 'row', gap: '1rem' }}
          >
            <Button themeType="link" maxContent size="md" icon={<BiFilter />} onClick={() => navigate(Routes.SHOP)}>
              {t('advancedButton')}
            </Button>
            <StyledSearchButton type="submit" maxContent size="md" iconSize="md" icon={<BiSearch />}>
              {t('searchButton')}
            </StyledSearchButton>
          </Container>
        </Container>
      </Form>

      <Container xs={12}>
        <Text fontSize="sm">
          {t('popularSearches')} Vissar GTR, Wondai City 1.4 IVtec, Karuti Suzukie , Wagoz R VXL, TMV 7 Series, Wondai
          City 1.4 IVtec, Karuti Suzukie , Wagoz R VXL, TMV 7 Series
        </Text>
      </Container>
    </SearchBoxWrapper>
  );
};

export default SearchBox;
