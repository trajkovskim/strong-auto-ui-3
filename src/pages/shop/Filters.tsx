import Accordion from 'components/Accordion';
import Button from 'components/Button';
import Container from 'components/Container';
import { Checkbox } from 'components/form';
import Autocomplete from 'components/form/Autocomplete';
import Form from 'components/form/Form';
import Text from 'components/typography/Text';
import { VehicleFilters } from 'generated';
import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { MdCheck, MdClose, MdRestore } from 'react-icons/md';
import styled from 'styled-components';

const FiltersWrapper = styled(Container)`
  background-color: white;
`;

const CheckboxWrapper = styled(Container)`
  max-height: 400px;
  overflow-y: auto;
`;

const FiltersHeader = styled(Container)`
  background-color: #075ebb;
  color: white;
`;

const StyledFilterAccordion = styled(Accordion)`
  background-color: #075ebb;
  color: white;
`;

type Props = {
  onSubmit?: (values: VehicleFilters) => void;
  onClose?: () => void;
  noCloseButton?: boolean;
  filters?: VehicleFilters;
};

const Filters: React.FC<Props> = (props) => {
  const yearNow = new Date().getFullYear();
  const years = new Array(30).fill(0).map((_, index) => yearNow - index);

  const resetFilters = () => undefined;

  return (
    <Form
      initValues={props.filters}
      onSubmit={(values) => {
        props.onClose && props.onClose();
        props.onSubmit && props.onSubmit(values);
      }}
    >
      <Container styleConfig={{ bordered: { right: true, bottom: true }, gap: '1rem' }}>
        <FiltersHeader styleConfig={{ justifyContent: 'space-between', direction: 'row', padding: 'md' }}>
          <Text fontSize="md">Filtering</Text>
          <Container styleConfig={{ gap: '1rem', direction: 'row' }}>
            <Button size="md" fullwidth themeType="delete" icon={<MdRestore />} maxContent onClick={resetFilters} />
            <Button
              size="md"
              disabled
              fullwidth
              themeType="success"
              icon={<MdCheck />}
              maxContent
              onClick={resetFilters}
            />
            {!props.noCloseButton && (
              <Button size="md" fullwidth themeType="link" icon={<MdClose />} maxContent onClick={props.onClose} />
            )}
          </Container>
        </FiltersHeader>
        <StyledFilterAccordion defaultState="open" header={<Text>Basic</Text>}>
          <Container styleConfig={{ gap: '1rem' }}>
            <Autocomplete
              fullwidth
              name="make"
              placeholder="Any Make"
              label="Make"
              size="md"
              options={[{ value: 'audi' }, { value: 'bmw' }]}
            />
            <Autocomplete
              fullwidth
              name="model"
              placeholder="Any Model"
              label="Model"
              size="md"
              options={[{ value: 'b8' }, { value: 'b9' }]}
            />
            <Autocomplete
              fullwidth
              name="price"
              placeholder="Any Price"
              label="Price"
              size="md"
              options={[{ value: '0-1000' }, { value: '1000-2000' }, { value: '2000-3000' }]}
            />
            <Container styleConfig={{ gap: '0.5rem', padding: { left: 'sm' } }}>
              {[{ value: 'Sold' }, { value: 'Featured' }].map((checkbox) => (
                <Checkbox
                  name={checkbox.value.toLowerCase()}
                  key={checkbox.value}
                  label={checkbox.value}
                  value="true"
                  size="md"
                />
              ))}
            </Container>
          </Container>
        </StyledFilterAccordion>
        <StyledFilterAccordion header={<Text>Technical</Text>}>
          <Container styleConfig={{ gap: '1rem' }}>
            <Autocomplete
              fullwidth
              name="condition"
              placeholder="Condition"
              label="Condition"
              size="md"
              options={[{ value: 'new' }, { value: 'used' }]}
            />
            <Container styleConfig={{ gap: '0.5rem' }}>
              <Text fontSize="lg">Body Type</Text>
              <CheckboxWrapper styleConfig={{ gap: '0.5rem' }}>
                {[{ value: 'sedan' }, { value: 'coupe' }, { value: 'suv' }].map((bodyType) => (
                  <Checkbox
                    name="bodyType"
                    key={bodyType.value}
                    label={bodyType.value}
                    value={bodyType.value}
                    size="md"
                  />
                ))}
              </CheckboxWrapper>
            </Container>
            <Autocomplete
              fullwidth
              name="transmission"
              placeholder="Transmission"
              label="Transmission"
              size="md"
              options={[{ value: 'automatic' }, { value: 'manual' }]}
            />
            <Autocomplete
              fullwidth
              name="driveType"
              placeholder="Drive type"
              label="Drive type"
              size="md"
              options={[{ value: 'awd_4wd' }, { value: '2wd_fwd' }, { value: '2wd_rwd' }]}
            />
            <Container styleConfig={{ gap: '3px', direction: 'row', alignItems: 'center' }}>
              <Autocomplete
                name="yearFrom"
                placeholder="Year"
                size="md"
                label="Year (From)"
                options={years.map((year) => ({ value: year.toString() }))}
              />
              <Text fontSize="sm">To</Text>
              <Autocomplete
                name="yearTo"
                placeholder="Year"
                size="md"
                label="Year (To)"
                options={years.map((year) => ({ value: year.toString() }))}
              />
            </Container>
            <Container styleConfig={{ gap: '3px', direction: 'row', alignItems: 'center' }}>
              <Autocomplete
                name="mileageFrom"
                placeholder="Mileage"
                size="md"
                label="Mileage (From)"
                options={years.map((year) => ({ value: year.toString() }))}
              />
              <Text fontSize="sm">To</Text>
              <Autocomplete
                name="mileageTo"
                placeholder="Mileage"
                size="md"
                label="Mileage (To)"
                options={years.map((year) => ({ value: year.toString() }))}
              />
            </Container>
            <Autocomplete
              name="fuelType"
              fullwidth
              placeholder="Fuel type"
              label="Fuel type"
              size="md"
              options={[{ value: 'Diesel' }, { value: 'Petrol' }, { value: 'Hybrid' }]}
            />
            <Autocomplete
              name="color"
              fullwidth
              placeholder="Color"
              label="Color"
              size="md"
              options={[{ value: 'black' }, { value: 'white' }, { value: 'red' }]}
            />
          </Container>
        </StyledFilterAccordion>
        <StyledFilterAccordion header={<Text>Features</Text>}>
          <Container styleConfig={{ gap: '0.5rem', padding: { left: 'xs' } }}>
            <CheckboxWrapper styleConfig={{ gap: '0.5rem' }}>
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
                <Checkbox
                  name="features"
                  key={`${feature.value}-${index}`}
                  label={feature.value}
                  value={feature.value}
                  size="md"
                />
              ))}
            </CheckboxWrapper>
          </Container>
        </StyledFilterAccordion>
        <FiltersWrapper styleConfig={{ gap: '0.5rem', padding: 'md', itemsCentered: true }}>
          <Button themeType="ghost" fullwidth iconRight={<BiSearch />} type="submit" iconSize="lg" size="md">
            Search cars
          </Button>
          <Button maxContent themeType="delete" iconRight={<MdRestore />} iconSize="lg" size="md">
            Reset search
          </Button>
        </FiltersWrapper>
      </Container>
    </Form>
  );
};

export default Filters;
