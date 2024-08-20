import Button from 'components/Button';
import Container from 'components/Container';
import Image from 'components/Image';
import Text from 'components/typography/Text';
import Title from 'components/typography/Title';
import React from 'react';
import { BiPhoneCall } from 'react-icons/bi';
import { FaFacebook, FaInstagram, FaLinkedin, FaTelegram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { call, goto, mailTo } from 'utils';
import MapLocationImage from 'assets/map-location.jpg';
import BoxAnimation from 'components/BoxAnimation';

const Contact: React.FC = () => {
  return (
    <Container sm={'1400px'} centered padding={{ top: 'xl', bottom: 'xl', left: 'md', right: 'md' }}>
      <Container direction="row" justifyContent="space-between" gap="1rem">
        <Container sm={6.0}>
          <BoxAnimation>
            <Image height={'450px'} src={MapLocationImage} objectFit="cover" objectPosition="center center" alt="Map" />
          </BoxAnimation>
        </Container>
        <Container sm={5.5} gap="1rem" justifyContent="center">
          <Title title="Give us a contact" fontSize="2xl" />
          <Text fontSize="lg">Location</Text>
          <Text>
            15 Somewhere in strumica
            <br />
            North Macedonia, MK
            <br />
            Strumica 2400
          </Text>
          <Container gap="0.3rem">
            <Button
              themeType="link"
              maxContent
              icon={<BiPhoneCall />}
              size="lg"
              iconSize="3xl"
              onClick={() => call('+38977648648')}
            >
              +38977648648
            </Button>
            <Button
              themeType="link"
              maxContent
              icon={<MdEmail />}
              size="lg"
              iconSize="3xl"
              onClick={() => mailTo('vane.stamenov@gmail.com')}
            >
              vane.stamenov@gmail.com
            </Button>
          </Container>
          <Container gap="0.5rem">
            <Text fontSize="lg">Social media</Text>
            <Container direction="row" gap="1rem">
              <Button
                themeType="link"
                maxContent
                icon={<FaFacebook />}
                size="lg"
                iconSize="3xl"
                onClick={() => goto('https://www.facebook.com')}
              />
              <Button
                themeType="link"
                maxContent
                icon={<FaInstagram />}
                size="lg"
                iconSize="3xl"
                onClick={() => goto('https://www.facebook.com')}
              />
              <Button
                themeType="link"
                maxContent
                icon={<FaTelegram />}
                size="lg"
                iconSize="3xl"
                onClick={() => goto('https://www.facebook.com')}
              />
              <Button
                themeType="link"
                maxContent
                icon={<FaLinkedin />}
                size="lg"
                iconSize="3xl"
                onClick={() => goto('https://www.facebook.com')}
              />
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default Contact;
