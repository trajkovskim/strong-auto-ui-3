import Logo from 'assets/logo.png';
import Button from 'components/Button';
import Container from 'components/Container';
import Image from 'components/Image';
import Line from 'components/Line';
import { Input } from 'components/form';
import useSocialMedias from 'components/navigation/useSocialMedias';
import Text from 'components/typography/Text';
import Title from 'components/typography/Title';
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
      <Container centered sm="1400px" gap="2rem" padding={{ left: 'md', right: 'md', top: 'lg', bottom: 'lg' }}>
        <Container xs={12} direction="row" wrap justifyContent="space-between" alignItems="center" gap="1rem">
          <Container sm={12} md="max-content">
            <Title
              title="Join our newletter"
              fontSize="md"
              description="Receive pricing updates, shopping tips & more!"
            />
          </Container>
          <StyledNewsLetterFormContainer
            sm={12}
            md="max-content"
            padding="sm"
            direction="row"
            alignItems="center"
            gap="1rem"
          >
            <Input fullwidth size="md" placeholder="Your email address" noBorder />
            <Button size="md" maxContent padding="md">
              Subscribe
            </Button>
          </StyledNewsLetterFormContainer>
        </Container>
        <Line />
        <Container gap="3rem" wrap direction="row">
          <Container sm={12} lg={3.5} gap="2rem" itemsCentered>
            <Image alt="Logo" shadow objectFit="contain" width="200px" src={Logo} />
            <Text>
              Strong auto is a Strong auto is a Strong auto is a Strong auto is a Strong auto is a auto is a Strong auto
              is a auto is a Strong auto is a
            </Text>
          </Container>
          <Container sm={4} lg={3} gap="2rem">
            <Text type="sub" bold fontSize="sm">
              Find us
            </Text>
            <Text fontSize="md">
              27 Rainbow Rd
              <br />
              Los Angeles, CA
              <br />
              California 90017
            </Text>
            <SocialMedias gap="1.5rem" direction="row">
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
          <Container sm={4} lg={3} gap="2rem">
            <Text type="sub" bold fontSize="sm">
              Contacts
            </Text>
            <Button size="md" maxContent themeType="link" onClick={() => call('+38977648648')}>
              General:
              <br />
              +38977648648
            </Button>
            <Button size="md" maxContent themeType="link" onClick={() => mailTo('vane.stamenov@gmail.com')}>
              Email:
              <br />
              vane.stamenov@gmail.com
            </Button>
          </Container>
          <Container sm={4} lg={2.5} gap="2rem">
            <Text>Useful links:</Text>
            <Container gap="0.5rem">
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
