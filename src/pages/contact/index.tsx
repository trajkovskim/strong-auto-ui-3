import MapLocationImage from 'assets/map-location.jpg';
import BoxAnimation from 'components/BoxAnimation';
import Button from 'components/Button';
import Container from 'components/Container';
import Image from 'components/Image';
import List from 'components/List';
import { Input } from 'components/form';
import Textarea from 'components/form/Textarea';
import useSocialMedias from 'components/navigation/useSocialMedias';
import Text from 'components/typography/Text';
import Title from 'components/typography/Title';
import { EMAIL, TELEPHONE } from 'pages/constants';
import React from 'react';
import { BiPhoneCall } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';
import { call, goto, mailTo } from 'utils';

const Contact: React.FC = () => {
  const socialMedias = useSocialMedias();

  return (
    <Container gap="10rem">
      <Container xs="1400px" centered padding={{ top: 'xl', bottom: 'xl', left: 'md', right: 'md' }} gap="3rem">
        <Container>
          <Title title="Lets get in touch!" fontSize="2xl" />
        </Container>

        <Container gap="4rem" direction="row" wrap>
          <Container xs={12} lg={7} gap="2rem">
            <Title
              title="Give us a message to let us know"
              description="We will have a look at it and provide you with an answer as soon as possible"
              fontSize={{ title: 'xl', description: 'md' }}
              gap="1rem"
            />
            <Container gap="1rem">
              <List lg={2} gap="1rem">
                <Input fullwidth placeholder="Your name" />
                <Input fullwidth placeholder="Your email" />
                <Input fullwidth placeholder="Your phone" />
                <Input fullwidth placeholder="Subject" />
              </List>
              <Container>
                <Textarea fullwidth rows={10} placeholder="Message" />
              </Container>
              <Container alignSelf="end">
                <Button maxContent size="md">
                  Send message
                </Button>
              </Container>
            </Container>
          </Container>
          <Container xs={12} lg={5} gap="3rem">
            <Container gap="1rem">
              <Text fontSize="xl" bold>
                Location
              </Text>
              <Text fontSize="md">
                15 Somewhere in strumica
                <br />
                North Macedonia, MK
                <br />
                Strumica 2400
              </Text>
            </Container>
            <Button
              themeType="link"
              maxContent
              icon={<BiPhoneCall />}
              size="md"
              iconSize="lg"
              onClick={() => call(TELEPHONE)}
            >
              <Container gap="0.2rem">
                <Text fontSize="lg">Call us: </Text>
                {TELEPHONE}
              </Container>
            </Button>
            <Button
              themeType="link"
              maxContent
              icon={<MdEmail />}
              size="md"
              iconSize="lg"
              onClick={() => mailTo(EMAIL)}
            >
              <Container gap="0.2rem">
                <Text fontSize="lg">Send us an email: </Text>
                {EMAIL}
              </Container>
            </Button>
            <Container gap="0.5rem">
              <Text fontSize="lg" bold>
                Social media
              </Text>
              <Container direction="row" gap="1rem">
                {socialMedias.map((socialMedia) => (
                  <Button
                    key={socialMedia.type}
                    themeType="link"
                    maxContent
                    icon={socialMedia.icon}
                    size="lg"
                    iconSize="lg"
                    onClick={() => goto(socialMedia.href)}
                  />
                ))}
              </Container>
            </Container>
            <Container gap="1rem">
              <Text fontSize="lg" bold>
                Open hours:
              </Text>
              <Text fontSize="md">Monday - Sunday: 08:00 - 20:00</Text>
            </Container>
          </Container>
        </Container>
      </Container>
      <Container sm={12}>
        <BoxAnimation>
          <Image height="600px" src={MapLocationImage} objectFit="cover" objectPosition="center center" alt="Map" />
        </BoxAnimation>
      </Container>
    </Container>
  );
};

export default Contact;
