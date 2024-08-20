import BoxAnimation from 'components/BoxAnimation';
import Container from 'components/Container';
import Icon from 'components/Icon';
import Text from 'components/typography/Text';
import Title from 'components/typography/Title';
import React from 'react';
import { VscWorkspaceTrusted } from 'react-icons/vsc';
import styled from 'styled-components';
import CarLot from 'assets/car-lot.jpg';
import Image from 'components/Image';

const StyledIcon = styled(Icon)`
  width: max-content;
`;

const Wrapper = styled(Container)`
  background-color: #232323;
  color: #fff;
`;

const StyledCarLotImage = styled(Image)`
  border-top-left-radius: 150px;
  border-bottom-left-radius: 150px;
`;

const WhyChooseUs: React.FC = () => {
  return (
    <Wrapper>
      <Container
        minHeight="430px"
        padding={{ top: '2xl', bottom: '2xl', left: 'md', right: 'md' }}
        gap="3rem"
        direction="row"
        wrap
        justifyContent="end"
      >
        <Container xs={12} lg={5} xl={4.5} gap="2rem">
          <Title
            title="Why choose our services"
            description="Strong auto is the most enticing, creative, modern and multipurpose auto dealer."
            gap="1rem"
            fontSize={{ title: 'xl', description: 'md' }}
          />
          <BoxAnimation>
            <Container gap="2rem" direction="row">
              <Container xs="max-content">
                <StyledIcon size="xl" icon={<VscWorkspaceTrusted />} />
              </Container>
              <Container gap="1rem">
                <Text bold fontSize="lg">
                  Trusted Car Dealership
                </Text>
                <Text fontSize="md">
                  It is a long established fact that a reader will be distracted by the readable content of a page when
                  looking at its layout.
                </Text>
              </Container>
            </Container>
          </BoxAnimation>
          <BoxAnimation>
            <Container gap="2rem" direction="row">
              <Container xs="max-content">
                <StyledIcon size="xl" icon={<VscWorkspaceTrusted />} />
              </Container>
              <Container gap="1rem">
                <Text bold fontSize="lg">
                  Trusted Car Dealership
                </Text>
                <Text fontSize="md">
                  It is a long established fact that a reader will be distracted by the readable content of a page when
                  looking at its layout.
                </Text>
              </Container>
            </Container>
          </BoxAnimation>
          <BoxAnimation>
            <Container gap="2rem" direction="row">
              <Container xs="max-content">
                <StyledIcon size="xl" icon={<VscWorkspaceTrusted />} />
              </Container>
              <Container gap="1rem">
                <Text bold fontSize="lg">
                  Trusted Car Dealership
                </Text>
                <Text fontSize="md">
                  It is a long established fact that a reader will be distracted by the readable content of a page when
                  looking at its layout.
                </Text>
              </Container>
            </Container>
          </BoxAnimation>
          <BoxAnimation>
            <Container gap="2rem" direction="row">
              <Container xs="max-content">
                <StyledIcon size="xl" icon={<VscWorkspaceTrusted />} />
              </Container>
              <Container gap="1rem">
                <Text bold fontSize="lg">
                  Trusted Car Dealership
                </Text>
                <Text fontSize="md">
                  It is a long established fact that a reader will be distracted by the readable content of a page when
                  looking at its layout.
                </Text>
              </Container>
            </Container>
          </BoxAnimation>
        </Container>
        <Container xs={12} lg={7} xl={6}>
          <BoxAnimation fullheight>
            <StyledCarLotImage src={CarLot} height="100%" width="100%" objectFit="cover" />
          </BoxAnimation>
        </Container>
      </Container>
    </Wrapper>
  );
};

export default WhyChooseUs;
