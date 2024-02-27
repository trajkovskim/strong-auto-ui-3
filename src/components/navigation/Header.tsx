import React from 'react';
import { styled } from 'styled-components';

import Logo from 'assets/logo.png';
import Container from 'components/Container';
import Icon from 'components/Icon';
import Image from 'components/Image';
import Dropdown from 'components/form/Dropdown';
import type { DropdownOption } from 'components/form/types';
import MobileNavigation from 'components/navigation/MobileNavigation';
import Navigation from 'components/navigation/Navigation';
import { Language } from 'context/base';
import { useLanguage, useTranslation } from 'hooks';
import { CiGlobe } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'routes';

const StyledDropdown = styled(Dropdown)`
  border-radius: 10px;
  background-color: transparent;
  color: inherit;

  option {
    color: #000;
  }
`;

type HeaderWrapperProps = {
  transparent?: boolean;
};

const HeaderWrapper = styled.header<HeaderWrapperProps>`
  background-color: ${(props) => !props.transparent && '#232323'};
  color: white;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const StyledContainer = styled(Container)`
  z-index: 2;
`;

type Props = HeaderWrapperProps;

const Header: React.FC<Props> = (props) => {
  const { language, changeLanguage } = useLanguage();
  const t = useTranslation('languages');
  const navigate = useNavigate();

  const languageOptions: DropdownOption[] = Object.values(Language).map((value) => ({
    value,
    label: t(value),
  }));

  return (
    <>
      <HeaderWrapper transparent={props.transparent}>
        <StyledContainer relative direction="row" preserveWhenXs justifyContent="space-between" alignItems="center">
          <Container padding={{ left: 'md', bottom: 'md', top: 'md' }} preserveWhenXs>
            <Image
              onClick={() => navigate(Routes.INDEX)}
              src={Logo}
              alt="Strong auto logo"
              width="170px"
              height="100%"
              objectFit="contain"
            />
          </Container>
          <Container xs={0} lg="max-content" preserveWhenXs alignItems="center">
            <Navigation />
          </Container>
          <Container direction="row" padding={{ right: 'md' }} gap="1rem" preserveWhenXs alignItems="center">
            <Container preserveWhenXs direction="row" alignItems="center" gap="0.1rem">
              <Icon icon={<CiGlobe />} height="20px" />
              <StyledDropdown
                size="md"
                name="lang"
                value={language}
                onChange={(event) => {
                  changeLanguage(event.target.value as Language);
                }}
                options={languageOptions}
              />
            </Container>
            <MobileNavigation />
          </Container>
        </StyledContainer>
      </HeaderWrapper>
    </>
  );
};

export default Header;
