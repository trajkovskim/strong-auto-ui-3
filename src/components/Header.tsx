import React from 'react';
import { styled } from 'styled-components';

import Container from 'components/Container';
import Icon from 'components/Icon';
import Dropdown from 'components/form/Dropdown';
import type { DropdownOption } from 'components/form/types';
import { Language } from 'context/base';
import { useLanguage, useTranslation } from 'hooks';
import { CiGlobe } from 'react-icons/ci';

const StyledDropdown = styled(Dropdown)`
  border-radius: 10px;
  background-color: transparent;
  color: inherit;
`;

type HeaderWrapperProps = {
  transparent?: boolean;
};

const HeaderWrapper = styled.header<HeaderWrapperProps>`
  background-color: ${(props) => !props.transparent && '#232323'};
  color: #707070;
`;

type Props = HeaderWrapperProps;

const Header: React.FC<Props> = (props) => {
  const { language, changeLanguage } = useLanguage();
  const t = useTranslation('languages');

  const languageOptions: DropdownOption[] = Object.values(Language).map((value) => ({
    value,
    label: t(value),
  }));

  return (
    <HeaderWrapper transparent={props.transparent}>
      <Container
        preserveWhenXs
        direction="row"
        justifyContent="space-between"
        padding={{ left: 'sm', right: 'sm', top: 'xs', bottom: 'xs' }}
        gap="0.5rem"
      >
        <Container preserveWhenXs direction="row" alignItems="center" gap="0.1rem">
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
      </Container>
    </HeaderWrapper>
  );
};

export default Header;
