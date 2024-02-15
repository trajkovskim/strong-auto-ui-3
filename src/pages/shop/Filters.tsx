import Button from 'components/Button';
import Container from 'components/Container';
import { Checkbox } from 'components/form';
import Autocomplete from 'components/form/Autocomplete';
import Text from 'components/typography/Text';
import React from 'react';
import { MdRestore } from 'react-icons/md';
import styled from 'styled-components';

const FiltersWrapper = styled(Container)`
  background-color: white;
  border-radius: 15px;
`;

const StyledButton = styled(Button)`
  justify-content: space-between;
`;

const Filters: React.FC = () => {
  const yearNow = new Date().getFullYear();
  const years = new Array(yearNow - 30).fill(0).map((_, index) => yearNow - index);

  const resetFilters = () => undefined;

  return (
    <Container gap="1rem">
      <FiltersWrapper justifyContent="space-between" direction="row" padding="md">
        <StyledButton size="lg" fullwidth themeType="link" maxContent iconRight={<MdRestore />} onClick={resetFilters}>
          Filtering
        </StyledButton>
      </FiltersWrapper>
      <FiltersWrapper padding="md" gap="1rem">
        <Autocomplete fullwidth placeholder="Makes" options={[{ value: 'audi' }, { value: 'bmw' }]} />
        <Autocomplete fullwidth placeholder="Models" options={[{ value: 'b8' }, { value: 'b9' }]} />
        <Autocomplete
          fullwidth
          placeholder="Price"
          options={[{ value: '0-1000' }, { value: '1000-2000' }, { value: '2000-3000' }]}
        />
      </FiltersWrapper>
      <FiltersWrapper padding="md" gap="1rem">
        <Autocomplete fullwidth placeholder="Condition" options={[{ value: 'new' }, { value: 'used' }]} />
        <Autocomplete
          fullwidth
          placeholder="Body type"
          options={[{ value: 'sedan' }, { value: 'coupe' }, { value: 'suv' }]}
        />
        <Autocomplete fullwidth placeholder="Transmission" options={[{ value: 'automatic' }, { value: 'manual' }]} />
        <Autocomplete
          fullwidth
          placeholder="Drive type"
          options={[{ value: 'awd_4wd' }, { value: '2wd_fwd' }, { value: '2wd_rwd' }]}
        />
        <Container direction="row" alignItems="center" gap="3px">
          <Autocomplete placeholder="Year" options={years.map((year) => ({ value: year.toString() }))} />
          <Text fontSize="sm">To</Text>
          <Autocomplete placeholder="Year" options={years.map((year) => ({ value: year.toString() }))} />
        </Container>
        <Container gap="0.5rem">
          <Text fontSize="lg">Features</Text>
          <Checkbox label="Air conditioner" />
          <Checkbox label="Apple CarPlay" />
          <Checkbox label="Break Assist" />
          <Checkbox label="Heater" />
          <Checkbox label="Power Steering" />
          <Checkbox label="Traction control" />
          <Checkbox label="Bluetooth" />
        </Container>
      </FiltersWrapper>
    </Container>
  );
};

export default Filters;
