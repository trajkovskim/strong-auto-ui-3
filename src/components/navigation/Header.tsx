import Button from 'components/Button';
import Container from 'components/Container';
import LanguageChanger from 'components/navigation/LanguageChanger';
import useSocialMedias from 'components/navigation/useSocialMedias';
import { TELEPHONE } from 'pages/constants';
import React from 'react';
import { MdOutlinePhoneIphone } from 'react-icons/md';
import styled from 'styled-components';
import { call, goto } from 'utils';

const StyledHeader = styled.header`
  background-color: #3d4246;
  color: white;
`;

const StyledButton = styled(Button)``;

const Header: React.FC = () => {
  const socialMedias = useSocialMedias();

  return (
    <StyledHeader>
      <Container
        sm={12}
        preserveWhenXs
        justifyContent="end"
        alignItems="center"
        direction="row"
        gap="1.5rem"
        padding={{ top: 'sm', bottom: 'sm', left: 'md', right: 'md' }}
      >
        <Container preserveWhenXs>
          <LanguageChanger />
        </Container>
        <Container preserveWhenXs>
          <StyledButton
            maxContent
            themeType="link"
            size="sm"
            icon={<MdOutlinePhoneIphone />}
            onClick={() => call(TELEPHONE)}
          >
            {TELEPHONE}
          </StyledButton>
        </Container>
        <Container gap="1.5rem" direction="row" preserveWhenXs>
          {socialMedias.map((socialMedia, index) => (
            <StyledButton
              key={index}
              themeType="link"
              maxContent
              icon={socialMedia.icon}
              size="sm"
              onClick={() => goto(socialMedia.href)}
            />
          ))}
        </Container>
      </Container>
    </StyledHeader>
  );
};

export default Header;
