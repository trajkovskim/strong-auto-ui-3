import Button from 'components/Button';
import Container from 'components/Container';
import Autocomplete from 'components/form/Autocomplete';
import TabButtonsGroup from 'pages/home/ButtonsGroup';
import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import styled, { css } from 'styled-components';

const SearchBoxWrapper = styled(Container)`
  color: black;
  background-color: white;
`;

const StyledSearchButton = styled(Button)<{ buttonAnimate: boolean }>`
  white-space: nowrap;
  margin-left: auto;
  cursor: pointer;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  border-radius: 10px;

  ${(props) =>
    props.buttonAnimate &&
    css`
      width: 100%;
      transition: 0.5s;
      visibility: visible;
    `};
`;

const SearchBox: React.FC = () => {
  const buttonGroupProps = [{ label: 'Simple' }, { label: 'Advanced' }];
  const [activeButtonIndex, setActiveButtonIndex] = useState<number>(0);
  const [buttonAnimate, setButtonAnimate] = useState<boolean>(false);

  const handleButtonFocus = () => {
    setButtonAnimate(true);
  };

  return (
    <Container padding="sm" sm={12} itemsCentered gap="0.5rem">
      <TabButtonsGroup
        buttons={buttonGroupProps}
        onChange={(newActiveButton, newIndex) => {
          setActiveButtonIndex(newIndex);
        }}
      />
      {activeButtonIndex === 0 && (
        <SearchBoxWrapper
          sm={12}
          md={11}
          lg={10}
          direction="row"
          xl="700px"
          centered
          alignItems="center"
          rounded
          padding={{ left: 'md', right: 'md', top: 'sm', bottom: 'sm' }}
          gap="0.3rem"
        >
          <Container onClick={handleButtonFocus} sm={12} md={12} direction="row" justifyContent="space-between">
            <Autocomplete noBorder placeholder="Search cars" fullwidth size="md" options={[{ value: 'audi' }]} />
          </Container>
          <Container sm={12} md={4} lg="max-content" alignSelf="flex-end">
            <StyledSearchButton buttonAnimate={buttonAnimate} id="searchButton" size="lg" icon={<BiSearch />}>
              Search
            </StyledSearchButton>
          </Container>
        </SearchBoxWrapper>
      )}
      {activeButtonIndex === 1 && (
        <SearchBoxWrapper
          sm={12}
          md={11}
          lg={10}
          xl="700px"
          centered
          direction="row"
          gap="1rem"
          alignItems="center"
          wrap
          rounded
          padding={{ left: 'md', right: 'md', top: 'sm', bottom: 'sm' }}
        >
          <Container sm={12} md={4} lg={3}>
            <Autocomplete
              onClick={handleButtonFocus}
              noBorder
              label="Select make"
              placeholder="Any make"
              size="lg"
              options={[{ value: 'audi' }]}
            />
          </Container>
          <Container sm={12} md={4} lg={3}>
            <Autocomplete
              onClick={handleButtonFocus}
              noBorder
              label="Select model"
              placeholder="Any model"
              size="lg"
              options={[{ value: 'audi' }]}
            />
          </Container>
          <Container sm={12} md={4} lg={3}>
            <Autocomplete
              onClick={handleButtonFocus}
              noBorder
              label="Select price"
              placeholder="Any price"
              size="lg"
              options={[{ value: 'audi' }]}
            />
          </Container>
          <Container sm={12} md={12} lg={3} justifySelf="flex-end">
            <StyledSearchButton buttonAnimate={buttonAnimate} fullwidth maxContent size="lg" icon={<BiSearch />}>
              Search
            </StyledSearchButton>
          </Container>
        </SearchBoxWrapper>
      )}
    </Container>
  );
};

export default SearchBox;
