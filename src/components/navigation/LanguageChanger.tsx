import Container from 'components/Container';
import Icon from 'components/Icon';
import { Dropdown, DropdownOption } from 'components/form';
import { Language } from 'context/base';
import { useLanguage, useTranslation } from 'hooks';
import React from 'react';
import { CiGlobe } from 'react-icons/ci';
import styled from 'styled-components';

const StyledDropdown = styled(Dropdown)`
  border-radius: 10px;
  background-color: transparent;
  color: inherit;

  option {
    color: #000;
  }
`;

const LanguageChanger: React.FC = () => {
  const t = useTranslation('languages');
  const { language, changeLanguage } = useLanguage();

  const languageOptions: DropdownOption[] = Object.values(Language).map((value) => ({
    value,
    label: t(value),
  }));

  return (
    <Container direction="row" alignItems="center" gap="0.1rem">
      <Icon icon={<CiGlobe />} size="sm" />
      <StyledDropdown
        size="sm"
        name="lang"
        value={language}
        onChange={(event) => {
          changeLanguage(event.target.value as Language);
        }}
        options={languageOptions}
      />
    </Container>
  );
};

export default LanguageChanger;
