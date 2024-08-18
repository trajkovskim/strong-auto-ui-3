import Button from 'components/Button';
import Container from 'components/Container';
import Autocomplete from 'components/form/Autocomplete';
import Text from 'components/typography/Text';
import Title from 'components/typography/Title';
import React from 'react';
import { BiFilter, BiSearch } from 'react-icons/bi';
import styled from 'styled-components';

const SearchBoxWrapper = styled(Container)`
  color: black;
  background-color: white;
  box-shadow: rgba(79, 139, 173, 0.12) 0px 4px 20px;

  border-radius: 4px;
`;

const StyledSearchButton = styled(Button)`
  white-space: nowrap;
  cursor: pointer;
  width: 100%;
  overflow: hidden;
`;

const SearchBox: React.FC = () => {
  return (
    // {/* <SearchBoxWrapper
    //   sm={12}
    //   md={11}
    //   lg={10}
    //   direction="row"
    //   xl="700px"
    //   centered
    //   alignItems="center"
    //   rounded
    //   padding={{ left: 'md', right: 'md', top: 'sm', bottom: 'sm' }}
    //   gap="0.3rem"
    // >
    //   <Container sm={12} md={12} direction="row" justifyContent="space-between">
    //     <Autocomplete noBorder placeholder="Search cars" fullwidth size="md" options={[{ value: 'audi' }]} />
    //   </Container>
    //   <Container sm={12} md={4} lg="max-content" alignSelf="flex-end">
    //     <StyledSearchButton id="searchButton" size="lg" icon={<BiSearch />}>
    //       Search
    //     </StyledSearchButton>
    //   </Container>
    // </SearchBoxWrapper> */}
    <SearchBoxWrapper sm="550px" gap="1.2rem" wrap rounded padding="lg" preserveWhenXs>
      <Container sm={12}>
        <Title title="Find what you are looking for" bold fontSize="md" />
      </Container>
      <Container sm={12}>
        <Autocomplete fullwidth label="Vehicle make" placeholder="Any make" size="md" options={[{ value: 'audi' }]} />
      </Container>
      <Container sm={12}>
        <Autocomplete fullwidth label="Vehicle model" placeholder="Any model" size="md" options={[{ value: 'audi' }]} />
      </Container>
      <Container sm={12}>
        <Autocomplete fullwidth label="Price" placeholder="Any price" size="md" options={[{ value: 'audi' }]} />
      </Container>
      <Container preserveWhenXs sm={12} justifyContent="flex-end" alignItems="center" direction="row" gap="0.5rem">
        <Button padding="md" themeType="link" maxContent size="md" icon={<BiFilter />}>
          Advanced
        </Button>
        <StyledSearchButton padding="md" maxContent size="md" icon={<BiSearch />}>
          Search
        </StyledSearchButton>
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
