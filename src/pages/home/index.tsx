import BMWDriftSoilImage from 'assets/bwm-drift-soil.jpg';
import MasserattiMountainsImage from 'assets/masseratti-mountains.jpg';

import BoxAnimation from 'components/BoxAnimation';
import Button from 'components/Button';
import Carousel from 'components/Carousel';
import Container from 'components/Container';
import Image from 'components/Image';
import Title from 'components/typography/Title';
import BuyingACar from 'pages/home/BuyingACar';
import FAQ from 'pages/home/Faq';
import NewsLetterSubscription from 'pages/home/NewsLetterSubscription';
import PopularMakes from 'pages/home/PopularMakes';
import ProductsSection from 'pages/home/ProductsSection';
import Reviews from 'pages/home/Reviews';
import SearchBox from 'pages/home/SearchBox';
import Services from 'pages/home/Services';
import WhyChooseUs from 'pages/home/WhyChooseUs';
import { CarouselWrapper, HomeWrapper, WhiteBackgroundContainer } from 'pages/home/index.styled';
import React from 'react';

const Home: React.FC = () => {
  return (
    <HomeWrapper styleConfig={{ gap: '2rem', padding: { bottom: '2xl' } }} lgStyle={{ gap: '9rem' }}>
      <CarouselWrapper styleConfig={{ minHeight: '800px', maxHeight: '100vh' }}>
        <Carousel absolute minHeight="800px" maxHeight="100vh" noChangeOptions noArrows>
          <Image src={BMWDriftSoilImage} objectFit="cover" objectPosition="center" height="100%" />
          <Image src={MasserattiMountainsImage} objectFit="cover" objectPosition="center" height="100%" />
        </Carousel>
        <Container styleConfig={{ gap: '3rem', padding: { top: 'xl', bottom: 'xl', left: 'md', right: 'md' } }}>
          <BoxAnimation>
            <Container xs="600px" styleConfig={{ centered: true, itemsCentered: true }}>
              <Title
                fontSize={{ title: '3xl', description: 'xl' }}
                bold
                title="Welcome to Strong AUTO"
                centered
                gap="2rem"
                description="Checkout the cars that we have in our inventory"
              />
            </Container>
          </BoxAnimation>
          <BoxAnimation>
            <Container xs="600px" styleConfig={{ direction: 'row', gap: '1rem', centered: true, itemsCentered: true }}>
              <Button maxContent size="lg" padding="md">
                Get to the Inventory
              </Button>
              <Button maxContent size="lg" themeType="ghost" padding="md">
                Scroll down
              </Button>
            </Container>
          </BoxAnimation>
        </Container>
      </CarouselWrapper>

      <WhiteBackgroundContainer>
        <Container
          xs="1400px"
          styleConfig={{
            gap: '2rem',
            direction: 'row',
            wrap: true,
            centered: true,
            itemsCentered: true,
            // padding: { top: 'xl', bottom: 'xl' },
          }}
        >
          <BoxAnimation>
            <SearchBox />
          </BoxAnimation>
        </Container>
      </WhiteBackgroundContainer>

      <ProductsSection />

      <BuyingACar />

      <PopularMakes />

      <Services />
      {/* <CantFindVehicle /> */}
      {/* <CarLot /> */}

      <WhyChooseUs />
      <Reviews />
      <WhiteBackgroundContainer>
        <BoxAnimation>
          <NewsLetterSubscription />
        </BoxAnimation>
      </WhiteBackgroundContainer>
      <WhiteBackgroundContainer>
        <BoxAnimation>
          <FAQ />
        </BoxAnimation>
      </WhiteBackgroundContainer>
    </HomeWrapper>
  );
};

export default Home;
