import Button from 'components/Button';
import Container from 'components/Container';
import LanguageChanger from 'components/navigation/LanguageChanger';
import useSocialMedias from 'components/navigation/useSocialMedias';
import { EMAIL, OPEN_HOURS, TELEPHONE } from 'pages/constants';
import React from 'react';
import { FaClock } from 'react-icons/fa';
import { MdEmail, MdOutlinePhoneIphone } from 'react-icons/md';
import styled from 'styled-components';
import { call, goto, mailTo } from 'utils';

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
        xs={12}
        styleConfig={{
          justifyContent: 'space-between',
          alignItems: 'center',
          direction: 'row',
          gap: '1.5rem',
          padding: { top: 'xs', bottom: 'xs', left: 'md', right: 'md' },
        }}
      >
        <Container styleConfig={{ gap: '1.5rem', direction: 'row' }}>
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
        <Container styleConfig={{ direction: 'row', gap: '1.5rem' }}>
          <Container>
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
          <Container>
            <StyledButton maxContent themeType="link" size="sm" icon={<MdEmail />} onClick={() => mailTo(EMAIL)}>
              {EMAIL}
            </StyledButton>
          </Container>
          <Container>
            <StyledButton maxContent themeType="link" size="sm" icon={<FaClock />}>
              {OPEN_HOURS}
            </StyledButton>
          </Container>
        </Container>
        <Container>
          <LanguageChanger />
        </Container>
      </Container>
    </StyledHeader>
  );
};

export default Header;
