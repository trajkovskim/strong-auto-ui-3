import Logo from 'assets/logo.png';
import Button from 'components/Button';
import Container from 'components/Container';
import Image from 'components/Image';
import Line from 'components/Line';
import { Input } from 'components/form';
import useSocialMedias from 'components/navigation/useSocialMedias';
import Text from 'components/typography/Text';
import Title from 'components/typography/Title';
import { EMAIL, OPEN_HOURS, TELEPHONE } from 'pages/constants';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'routes';
import { styled } from 'styled-components';
import { call, goto, mailTo } from 'utils';

const StyledFooter = styled.footer`
  background-color: #232323;
  padding-top: 2rem;
  padding-bottom: 3rem;
  box-shadow: 0px -3px 7px -6px #e5ffc5;
  color: #fff;
`;

const SocialMedias = styled(Container)`
  > svg {
    height: 30px;
    width: 30px;
    filter: drop-shadow(0 0 0.1rem #aaa5a5);
  }
`;

const StyledNewsLetterFormContainer = styled(Container)`
  background-color: #fff;
  border-radius: 5px;
`;

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const socialMedias = useSocialMedias();

  return (
    <StyledFooter>
      <Container
        xs="1400px"
        styleConfig={{ centered: true, gap: '2rem', padding: { left: 'md', right: 'md', top: 'lg', bottom: 'lg' } }}
      >
        <Container
          xs={12}
          styleConfig={{
            direction: 'row',
            wrap: true,
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '2rem',
          }}
        >
          <Container xs={12} lg="max-content">
            <Title
              title="Join our newletter"
              fontSize="md"
              description="Receive pricing updates, shopping tips & more!"
            />
          </Container>
          <StyledNewsLetterFormContainer
            xs={12}
            lg="max-content"
            styleConfig={{
              padding: 'sm',
              direction: 'row',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Input fullwidth size="md" placeholder="Your email address" noBorder />
            <Button size="md" maxContent>
              Subscribe
            </Button>
          </StyledNewsLetterFormContainer>
        </Container>
        <Line />
        <Container styleConfig={{ gap: '3rem', wrap: true, direction: 'row' }}>
          <Container xs={12} lg={3.5} styleConfig={{ gap: '2rem', itemsCentered: true }}>
            <Image alt="Logo" shadow objectFit="contain" width="200px" src={Logo} />
            <Text>
              Strong auto is a Strong auto is a Strong auto is a Strong auto is a Strong auto is a auto is a Strong auto
              is a auto is a Strong auto is a
            </Text>
          </Container>
          <Container sm={4} lg={3} styleConfig={{ gap: '2rem' }}>
            <Text type="sub" bold fontSize="sm">
              Find us
            </Text>
            <Text fontSize="md">
              15 Somewhere in strumica
              <br />
              North Macedonia, MK
              <br />
              Strumica 2400
            </Text>
            <Text fontSize="md">
              Open hours:
              <br />
              {OPEN_HOURS}
            </Text>
            <SocialMedias styleConfig={{ gap: '1.5rem', direction: 'row' }}>
              {socialMedias.map((socialMedia, index) => (
                <Button
                  key={index}
                  themeType="link"
                  maxContent
                  icon={socialMedia.icon}
                  size="lg"
                  iconSize="xl"
                  onClick={() => goto(socialMedia.href)}
                />
              ))}
            </SocialMedias>
          </Container>
          <Container sm={4} lg={3} styleConfig={{ gap: '2rem' }}>
            <Text type="sub" bold fontSize="sm">
              Contacts
            </Text>
            <Button size="md" maxContent themeType="link" onClick={() => call(TELEPHONE)}>
              General:
              <br />
              {TELEPHONE}
            </Button>
            <Button size="md" maxContent themeType="link" onClick={() => mailTo(EMAIL)}>
              Email:
              <br />
              {EMAIL}
            </Button>
          </Container>
          <Container sm={4} lg={2.5} styleConfig={{ gap: '2rem' }}>
            <Text type="sub" bold fontSize="sm">
              Useful links:
            </Text>
            <Container styleConfig={{ gap: '0.5rem' }}>
              <Button size="md" maxContent themeType="link" onClick={() => navigate(Routes.INDEX)}>
                Home
              </Button>
              <Button size="md" maxContent themeType="link" onClick={() => navigate(Routes.SHOP)}>
                Shop
              </Button>
              <Button size="md" maxContent themeType="link" onClick={() => navigate(Routes.ABOUT_US)}>
                About us
              </Button>
              <Button size="md" maxContent themeType="link" onClick={() => navigate(Routes.CONTACT)}>
                Contact
              </Button>
            </Container>
          </Container>
        </Container>
      </Container>
    </StyledFooter>
  );
};
export default Footer;
