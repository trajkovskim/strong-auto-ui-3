import Accordion from 'components/Accordion';
import Button from 'components/Button';
import Container from 'components/Container';
import { Checkbox } from 'components/form';
import Autocomplete from 'components/form/Autocomplete';
import Text from 'components/typography/Text';
import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { MdCheck, MdRestore } from 'react-icons/md';
import styled from 'styled-components';

const FiltersWrapper = styled(Container)`
  background-color: white;
`;

const CheckboxWrapper = styled(Container)`
  max-height: 400px;
  overflow-y: auto;
`;

const StyledTitleFilterSection = styled(Container)`
  background-color: #075ebb;
  color: white;
`;

const FiltersHeader = styled(Container)`
  background-color: #075ebb;
  color: white;
`;

const StyledFilterAccordion = styled(Accordion)`
  background-color: #075ebb;
  color: white;
`;

const Filters: React.FC = () => {
  const yearNow = new Date().getFullYear();
  const years = new Array(30).fill(0).map((_, index) => yearNow - index);

  const resetFilters = () => undefined;

  return (
    <Container bordered={{ right: true }}>
      <FiltersHeader justifyContent="space-between" preserveWhenXs direction="row" padding="md">
        <Text>Filtering</Text>
        <Text>/</Text>
        <Container gap="0.5rem" direction="row" preserveWhenXs>
          <Button size="lg" fullwidth themeType="delete" icon={<MdRestore />} maxContent onClick={resetFilters} />
          <Button
            size="lg"
            disabled
            fullwidth
            themeType="success"
            icon={<MdCheck />}
            maxContent
            onClick={resetFilters}
          />
        </Container>
      </FiltersHeader>
      <StyledFilterAccordion title={<Text>Basic</Text>}>
        <Container padding="sm" gap="1rem">
          <Autocomplete
            fullwidth
            placeholder="Any Make"
            label="Make"
            size="md"
            options={[{ value: 'audi' }, { value: 'bmw' }]}
          />
          <Autocomplete
            fullwidth
            placeholder="Any Model"
            label="Model"
            size="md"
            options={[{ value: 'b8' }, { value: 'b9' }]}
          />
          <Autocomplete
            fullwidth
            placeholder="Any Price"
            label="Price"
            size="md"
            options={[{ value: '0-1000' }, { value: '1000-2000' }, { value: '2000-3000' }]}
          />
          <Container gap="0.5rem" padding={{ left: 'sm' }}>
            {[{ value: 'Sold' }, { value: 'Featured' }].map((checkbox) => (
              <Checkbox key={checkbox.value} label={checkbox.value} value={checkbox.value} size="md" />
            ))}
          </Container>
        </Container>
      </StyledFilterAccordion>
      <FiltersWrapper>
        <Container padding="sm" gap="1rem">
          <Autocomplete
            fullwidth
            placeholder="Any Make"
            label="Make"
            size="md"
            options={[{ value: 'audi' }, { value: 'bmw' }]}
          />
          <Autocomplete
            fullwidth
            placeholder="Any Model"
            label="Model"
            size="md"
            options={[{ value: 'b8' }, { value: 'b9' }]}
          />
          <Autocomplete
            fullwidth
            placeholder="Any Price"
            label="Price"
            size="md"
            options={[{ value: '0-1000' }, { value: '1000-2000' }, { value: '2000-3000' }]}
          />
          <Container gap="0.5rem" padding={{ left: 'sm' }}>
            {[{ value: 'Sold' }, { value: 'Featured' }].map((checkbox) => (
              <Checkbox key={checkbox.value} label={checkbox.value} value={checkbox.value} size="md" />
            ))}
          </Container>
        </Container>
      </FiltersWrapper>
      <FiltersWrapper>
        <StyledTitleFilterSection padding="sm">
          <Text>Technical</Text>
        </StyledTitleFilterSection>
        <Container padding="sm" gap="1rem">
          <Autocomplete
            fullwidth
            placeholder="Condition"
            label="Condition"
            size="md"
            options={[{ value: 'new' }, { value: 'used' }]}
          />
          <Container gap="0.5rem" padding={{ left: 'sm' }}>
            <Text fontSize="lg">Body Type</Text>
            <CheckboxWrapper gap="0.5rem">
              {[{ value: 'sedan' }, { value: 'coupe' }, { value: 'suv' }].map((bodyType) => (
                <Checkbox key={bodyType.value} label={bodyType.value} value={bodyType.value} size="md" />
              ))}
            </CheckboxWrapper>
          </Container>
          <Autocomplete
            fullwidth
            placeholder="Transmission"
            label="Transmission"
            size="md"
            options={[{ value: 'automatic' }, { value: 'manual' }]}
          />
          <Autocomplete
            fullwidth
            placeholder="Drive type"
            label="Drive type"
            size="md"
            options={[{ value: 'awd_4wd' }, { value: '2wd_fwd' }, { value: '2wd_rwd' }]}
          />
          <Container direction="row" preserveWhenXs alignItems="center" gap="3px">
            <Autocomplete
              placeholder="Year"
              size="md"
              label="Year (From)"
              options={years.map((year) => ({ value: year.toString() }))}
            />
            <Text fontSize="sm">To</Text>
            <Autocomplete
              placeholder="Year"
              size="md"
              label="Year (To)"
              options={years.map((year) => ({ value: year.toString() }))}
            />
          </Container>
          <Container direction="row" preserveWhenXs alignItems="center" gap="3px">
            <Autocomplete
              placeholder="Mileage"
              size="md"
              label="Mileage (From)"
              options={years.map((year) => ({ value: year.toString() }))}
            />
            <Text fontSize="sm">To</Text>
            <Autocomplete
              placeholder="Mileage"
              size="md"
              label="Mileage (To)"
              options={years.map((year) => ({ value: year.toString() }))}
            />
          </Container>
          <Autocomplete
            fullwidth
            placeholder="Fuel type"
            label="Fuel type"
            size="md"
            options={[{ value: 'Diesel' }, { value: 'Petrol' }, { value: 'Hybrid' }]}
          />
          <Autocomplete
            fullwidth
            placeholder="Color"
            label="Color"
            size="md"
            options={[{ value: 'black' }, { value: 'white' }, { value: 'red' }]}
          />
        </Container>
      </FiltersWrapper>
      <FiltersWrapper>
        <StyledTitleFilterSection padding="sm">
          <Text>Features</Text>
        </StyledTitleFilterSection>
        <Container gap="0.5rem" padding={{ left: 'md' }}>
          <CheckboxWrapper gap="0.5rem">
            {[
              { value: 'Air conditioner' },
              { value: 'Apple CarPlay' },
              { value: 'Break Assist' },
              { value: 'Heater' },
              { value: 'Power Steering' },
              { value: 'Traction control' },
              { value: 'Bluetooth' },
              { value: 'Bluetooth' },
              { value: 'Bluetooth' },
              { value: 'Bluetooth' },
              { value: 'Bluetooth' },
              { value: 'Bluetooth' },
              { value: 'Bluetooth' },
              { value: 'Bluetooth' },
              { value: 'Bluetooth' },
            ].map((feature, index) => (
              <Checkbox key={`${feature.value}-${index}`} label={feature.value} size="md" />
            ))}
          </CheckboxWrapper>
        </Container>
      </FiltersWrapper>
      <FiltersWrapper gap="0.5rem" bordered padding="md" itemsCentered>
        <Button themeType="ghost" fullwidth iconRight={<BiSearch />} iconSize="lg" size="md">
          Search cars
        </Button>
        <Button maxContent themeType="delete" iconRight={<MdRestore />} iconSize="lg" size="md">
          Reset search
        </Button>
      </FiltersWrapper>
    </Container>
  );
};

export default Filters;
