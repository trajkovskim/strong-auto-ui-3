import Logo from 'assets/logo.png';
import Button from 'components/Button';
import Container from 'components/Container';
import Image from 'components/Image';
import Line from 'components/Line';
import { Input } from 'components/form';
import Text from 'components/typography/Text';
import Title from 'components/typography/Title';
import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTelegram } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { call, goto, mailTo } from 'utils';
import { Routes } from 'routes';

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
  border-radius: 25px;
`;

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <StyledFooter>
      <Container centered sm="1200px" gap="2rem">
        <Container direction="column" alignItems="center" gap="1rem">
          <Title
            centered
            title="Join our newletter"
            fontSize="md"
            description="Receive pricing updates, shopping tips & more!"
          />
          <StyledNewsLetterFormContainer padding="xs" direction="row" gap="1rem">
            <Input fullwidth placeholder="Your email address" noBorder />
            <Button>Subscribe</Button>
          </StyledNewsLetterFormContainer>
        </Container>
        <Line />
        <Container gap="3rem" direction="row">
          <Container sm={3.5} gap="2rem">
            <Image alt="Logo" shadow objectFit="contain" width="200px" src={Logo} />
            <Text>
              Strong auto is a Strong auto is a Strong auto is a Strong auto is a Strong auto is a auto is a Strong auto
              is a auto is a Strong auto is a
            </Text>
          </Container>
          <Container sm={3} gap="2rem">
            <Text type="sub" bold fontSize="sm">
              Find us
            </Text>
            <Text>
              27 Rainbow Rd
              <br />
              Los Angeles, CA
              <br />
              California 90017
            </Text>
            <SocialMedias gap="1.5rem" direction="row" preserveWhenXs>
              <FaFacebook onClick={() => goto('https://www.facebook.com')} />
              <FaInstagram />
              <FaTelegram />
              <FaLinkedin />
            </SocialMedias>
          </Container>
          <Container sm={3} gap="2rem">
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
          <Container sm={2.5} gap="2rem">
            <Text>Useful links:</Text>
            <Container gap="0.5rem">
              <Button size="md" maxContent themeType="link" onClick={() => navigate(Routes.INDEX)}>
                Home
              </Button>
              <Button size="md" maxContent themeType="link" onClick={() => navigate(Routes.SHOP)}>
                Shop
              </Button>
              <Button size="md" maxContent themeType="link" onClick={() => navigate(Routes.BLOG)}>
                Blog
              </Button>
              <Button size="md" maxContent themeType="link" onClick={() => navigate(Routes.BLOG)}>
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
