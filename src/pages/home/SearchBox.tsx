import Button from 'components/Button';
import Container from 'components/Container';
import List from 'components/List';
import Autocomplete from 'components/form/Autocomplete';
import Text from 'components/typography/Text';
import Title from 'components/typography/Title';
import React from 'react';
import { BiFilter, BiSearch } from 'react-icons/bi';
import styled from 'styled-components';
import theme from 'theme';

const SearchBoxWrapper = styled(Container)`
  color: black;
  background-color: white;

  border-radius: 4px;

  @media (min-width: ${theme.breakpoints.minWidth.lg}) {
    padding: ${theme.padding.lg};
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
  return (
    <SearchBoxWrapper xs={12} gap="2rem" direction="row" wrap rounded padding="md">
      <Container xs={12}>
        <Title title="Find what you are looking for" bold fontSize="md" />
      </Container>
      <Container centered xs={12} gap="2rem" direction="row" wrap>
        <List sm={1} lg={4} gap="1.5rem">
          <Autocomplete fullwidth placeholder="Any make" size="md" options={[{ value: 'audi' }]} />
          <Autocomplete fullwidth placeholder="Any model" size="md" options={[{ value: 'audi' }]} />
          <Autocomplete fullwidth placeholder="Any price" size="md" options={[{ value: 'audi' }]} />
        </List>
        <Container xs={12} justifyContent="flex-end" alignItems="center" direction="row" gap="0.5rem">
          <Button padding="md" themeType="link" maxContent size="md" icon={<BiFilter />}>
            Advanced
          </Button>
          <StyledSearchButton padding="md" maxContent size="md" iconSize="md" icon={<BiSearch />}>
            Search
          </StyledSearchButton>
        </Container>
      </Container>

      <Container sm={12}>
        <Text fontSize="sm">
          Popular searches: Vissar GTR, Wondai City 1.4 IVtec, Karuti Suzukie , Wagoz R VXL, TMV 7 Series, Wondai City
          1.4 IVtec, Karuti Suzukie , Wagoz R VXL, TMV 7 Series
        </Text>
      </Container>
    </SearchBoxWrapper>
  );
};

export default SearchBox;
