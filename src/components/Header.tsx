import React from 'react';
import { styled } from 'styled-components';

import Container from 'components/Container';
import Icon from 'components/Icon';
import type { DropdownOption } from 'components/form/types';
import Dropdown from 'components/form/Dropdown';
import { Language } from 'context/base';
import { useLanguage, useTranslation } from 'hooks';
import { CiGlobe } from 'react-icons/ci';
import { PiShoppingCartThin } from 'react-icons/pi';
import Image from 'components/Image';

import Logo from 'assets/logo.png';
import { Input } from 'components/form';
import Text from 'components/Text';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'routes';

const StyledDropdown = styled(Dropdown)`
  border-radius: 10px;
  background-color: transparent;
  color: inherit;
`;

const StyledTopContainer = styled(Container)`
  background-color: #232323;
  color: #707070;
`;

const StyledHeaderContainer = styled(Container)``;

const Header: React.FC = () => {
  const { language, changeLanguage } = useLanguage();
  const t = useTranslation('languages');
  const navigate = useNavigate();

  const languageOptions: DropdownOption[] = Object.values(Language).map((value) => ({
    value,
    label: t(value),
  }));

  return (
    <header>
      <StyledTopContainer
        direction="row"
        justifyContent="space-between"
        padding={{ left: 'sm', right: 'sm', top: 'xs', bottom: 'xs' }}
        gap="0.5rem"
      >
        <Container direction="row" alignItems="center" gap="0.1rem">
          <Icon icon={<CiGlobe />} height="20px" />
          <StyledDropdown
            size="medium"
            name="lang"
            value={language}
            onChange={(event) => {
              changeLanguage(event.target.value as Language);
            }}
            options={languageOptions}
          />
        </Container>
      </StyledTopContainer>
      <StyledHeaderContainer
        preserveWhenXs
        sm={10}
        md={8}
        centered
        itemsCentered
        direction="row"
        gap="1rem"
        padding={{ top: 'md', bottom: 'md' }}
      >
        <Image
          onClick={() => navigate(Routes.INDEX)}
          src={Logo}
          alt="Logo"
          width="200px"
          height="100%"
          objectFit="contain"
        />
        <Input name="search" fullwidth label="Search for anything" />
        <div>
          <div>
            <div>
              <Icon
                onClick={() => navigate(Routes.MY_CART)}
                badge={'0'}
                icon={<PiShoppingCartThin title={'0'} />}
                width="40px"
              />
            </div>
            <Text type="primary" fontSize="sm">
              My cart
            </Text>
          </div>
        </div>
      </StyledHeaderContainer>
    </header>
  );
};

export default Header;
