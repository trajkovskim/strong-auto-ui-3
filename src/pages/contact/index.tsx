import MapLocationImage from 'assets/map-location.jpg';
import BoxAnimation from 'components/BoxAnimation';
import Breadcrumb from 'components/Breadcrumb';
import Button from 'components/Button';
import Container from 'components/Container';
import Image from 'components/Image';
import List from 'components/List';
import { Input } from 'components/form';
import Textarea from 'components/form/Textarea';
import useSocialMedias from 'components/navigation/useSocialMedias';
import Text from 'components/typography/Text';
import Title from 'components/typography/Title';
import { EMAIL, OPEN_HOURS, TELEPHONE } from 'pages/constants';
import React from 'react';
import { BiPhoneCall } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';
import { call, goto, mailTo } from 'utils';

const Contact: React.FC = () => {
  const socialMedias = useSocialMedias();

  return (
    <Container styleConfig={{ gap: '2rem' }} lgStyle={{ gap: '10rem' }}>
      <Container
        xs="1400px"
        styleConfig={{ centered: true, gap: '2rem', padding: { top: 'xl', left: 'md', right: 'md' } }}
        lgStyle={{ gap: '3rem' }}
      >
        <Container
          styleConfig={{ gap: '1rem' }}
          lgStyle={{ gap: '4rem', direction: 'row', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Container xs={12} lg={4} lgStyle={{ order: 2 }}>
            <Breadcrumb />
          </Container>
          <Container xs={12} lg={8} lgStyle={{ order: 1 }}>
            <Title title="Lets get in touch!" fontSize="2xl" />
          </Container>
        </Container>

        <Container styleConfig={{ gap: '4rem', direction: 'row', wrap: true }}>
          <Container xs={12} lg={8} styleConfig={{ gap: '2rem' }}>
            <Title
              title="Give us a message and let us know"
              description="We will have a look at it and provide you with an answer as soon as possible"
              fontSize={{ title: 'xl', description: 'md' }}
              gap="1rem"
            />
            <Container styleConfig={{ gap: '1rem' }}>
              <List lg={2} gap="1rem">
                <Input size="lg" fullwidth placeholder="Your name" />
                <Input size="lg" fullwidth placeholder="Your email" />
                <Input size="lg" fullwidth placeholder="Your phone" />
                <Input size="lg" fullwidth placeholder="Subject" />
              </List>
              <Container>
                <Textarea size="lg" fullwidth rows={10} placeholder="Message" />
              </Container>
              <Container styleConfig={{ alignSelf: 'end' }}>
                <Button maxContent size="md">
                  Send message
                </Button>
              </Container>
            </Container>
          </Container>
          <Container xs={12} lg={4} styleConfig={{ gap: '3rem' }}>
            <Container styleConfig={{ gap: '1rem' }}>
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
              <Container styleConfig={{ gap: '0.2rem' }}>
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
              <Container styleConfig={{ gap: '0.2rem' }}>
                <Text fontSize="lg">Send us an email: </Text>
                {EMAIL}
              </Container>
            </Button>
            <Container styleConfig={{ gap: '1rem' }}>
              <Text fontSize="lg" bold>
                Social media
              </Text>
              <Container styleConfig={{ gap: '1rem', direction: 'row' }}>
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
            <Container styleConfig={{ gap: '1rem' }}>
              <Text fontSize="lg" bold>
                Open hours:
              </Text>
              <Text fontSize="md">{OPEN_HOURS}</Text>
            </Container>
          </Container>
        </Container>
      </Container>
      <Container xs={12}>
        <BoxAnimation>
          <Image height="600px" src={MapLocationImage} objectFit="cover" objectPosition="center center" alt="Map" />
        </BoxAnimation>
      </Container>
    </Container>
  );
};

export default Contact;
