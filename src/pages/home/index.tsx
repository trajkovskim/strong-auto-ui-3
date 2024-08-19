import BMWDriftSoilImage from 'assets/bwm-drift-soil.jpg';
import MasserattiMountainsImage from 'assets/masseratti-mountains.jpg';
import RentCarImage from 'assets/rent-car-image.jpg';

import Button from 'components/Button';
import Carousel from 'components/Carousel';
import Container from 'components/Container';
import Image from 'components/Image';
import List from 'components/List';
import MiniProductCard from 'components/card/MiniProductCard';
import { RibbonType } from 'components/card/types';
import Text from 'components/typography/Text';
import Title from 'components/typography/Title';
import { products } from 'pages/constants';
import BoxAnimation from 'components/BoxAnimation';
import TabButtonsGroup from 'pages/home/ButtonsGroup';
import FAQ from 'pages/home/Faq';
import HorizontalList from 'components/horizontalList/HorizontalList';
import ProductsSection from 'pages/home/ProductsSection';
import Reviews from 'pages/home/Reviews';
import SearchBox from 'pages/home/SearchBox';
import WhyChooseUs from 'pages/home/WhyChooseUs';
import {
  CarServiceServiceTile,
  CarouselWrapper,
  HomeWrapper,
  PopularMakesWrapper,
  StyledBuyCarImage,
  StyledRightImage,
  TowingServiceServiceTile,
  WhiteBackgroundContainer,
} from 'pages/home/index.styled';
import React from 'react';
import { BsArrowUpRight } from 'react-icons/bs';
import { HiArrowRight } from 'react-icons/hi';

const Home: React.FC = () => {
  const popularMakesProducts = products;

  return (
    <HomeWrapper>
      <CarouselWrapper minHeight="800px" maxHeight="100vh" preserveWhenXs>
        <Carousel absolute minHeight="800px" maxHeight="100vh" noChangeOptions noArrows>
          <Image src={BMWDriftSoilImage} objectFit="cover" objectPosition="center" height="100%" />
          <Image src={MasserattiMountainsImage} objectFit="cover" objectPosition="center" height="100%" />
        </Carousel>
        <Container preserveWhenXs gap="3rem" padding={{ top: 'xl', bottom: 'xl', left: 'md', right: 'md' }}>
          <BoxAnimation>
            <Container xs="600px" preserveWhenXs centered itemsCentered>
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
            <Container xs="600px" preserveWhenXs direction="row" gap="1rem" centered itemsCentered>
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

      <WhiteBackgroundContainer sm={12} preserveWhenXs>
        <BoxAnimation threshold={0.2}>
          <Container
            sm="1400px"
            gap="2rem"
            direction="row"
            wrap
            preserveWhenXs
            centered
            itemsCentered
            padding={{ top: 'xl', bottom: 'xl', left: 'md', right: 'md' }}
          >
            <Container sm={12} md={5} itemsCentered>
              <SearchBox />
            </Container>
            <Container sm={12} md={7} gap="1rem" preserveWhenXs>
              <Text fontSize="xl">Lookup cars for sale</Text>
              <Text fontSize="lg">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                into electronic typesetting, remaining essentially unchanged.
              </Text>
            </Container>
          </Container>
        </BoxAnimation>
      </WhiteBackgroundContainer>

      <ProductsSection />

      <WhiteBackgroundContainer padding={{ top: 'xl', bottom: '2xl' }} preserveWhenXs sm={12} gap="10rem">
        <BoxAnimation threshold={0.2}>
          <Container
            direction="row"
            wrap
            minHeight="530px"
            padding={{ bottom: 'lg', right: 'md', left: 'md' }}
            gap="3.5rem"
            preserveWhenXs
          >
            <Container sm={12} lg={7} xl={5.5} preserveWhenXs>
              <StyledBuyCarImage height="500px" objectFit="cover" shadow src={RentCarImage} />
            </Container>
            <Container sm={12} lg={5} xl={5} gap="1rem" preserveWhenXs>
              <Title fontSize="2xl" bold title="Buying a car?" textAlign="right" />
              <Text fontSize="lg" textAlign="right">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                into electronic typesetting, remaining essentially unchanged.
              </Text>
              <Container sm={12} alignItems="flex-end">
                <Button size="xl" iconRight={<HiArrowRight />} maxContent themeType="link">
                  Visit our cars shop
                </Button>
              </Container>
            </Container>
          </Container>
        </BoxAnimation>
        <BoxAnimation threshold={0.2}>
          <Container
            justifyContent="flex-end"
            direction="row"
            wrap
            minHeight="530px"
            padding={{ bottom: 'lg', right: 'md', left: 'md' }}
            gap="3.5rem"
            preserveWhenXs
          >
            <Container xs={12} lg={5} xl={5} gap="1rem" preserveWhenXs>
              <Title fontSize="2xl" bold title="Buying a car?" />
              <Text fontSize="lg">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                into electronic typesetting, remaining essentially unchanged.
              </Text>
              <Container sm={12}>
                <Button size="xl" iconRight={<HiArrowRight />} maxContent themeType="link">
                  Visit our cars shop
                </Button>
              </Container>
            </Container>
            <Container xs={12} lg={7} xl={5.5} preserveWhenXs>
              <StyledRightImage objectFit="cover" shadow src={RentCarImage} />
            </Container>
          </Container>
        </BoxAnimation>
      </WhiteBackgroundContainer>
      <PopularMakesWrapper sm={12}>
        <BoxAnimation threshold={0.2}>
          <Container preserveWhenXs padding={{ top: 'xl', bottom: '2xl' }} gap="4rem">
            <Container sm={12} centered alignItems="center" gap="3rem" padding={{ right: 'md' }}>
              <Container
                xs={12}
                preserveWhenXs
                gap="1rem"
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Container preserveWhenXs xs={0} md={2} />
                <Container xs={12} preserveWhenXs alignItems="center">
                  <Title title="Popular Makes" fontSize="2xl" bold />
                </Container>
                <Container xs="max-content" md={2}>
                  <Button themeType="link" maxContent size="lg" iconRight={<BsArrowUpRight />}>
                    View all
                  </Button>
                </Container>
              </Container>
              <TabButtonsGroup buttons={[{ label: 'Audi' }, { label: 'BMW' }, { label: 'Toyota' }]} />
            </Container>
            <HorizontalList
              gap="2rem"
              chunkGap="1rem"
              chunkSize={{ xs: '100%', md: '50%', lg: '40%', xl: '30%' }}
              centered
            >
              {popularMakesProducts.map((product) => (
                <MiniProductCard {...product} ribbon={product.state as RibbonType} key={product.id} />
              ))}
            </HorizontalList>
          </Container>
        </BoxAnimation>
      </PopularMakesWrapper>
      <WhiteBackgroundContainer preserveWhenXs>
        <Container
          sm="1400px"
          preserveWhenXs
          centered
          itemsCentered
          padding={{ top: '2xl', bottom: 'xl', left: 'md', right: 'md' }}
        >
          <List xs={1} sm={2} lg={4} gap="2rem" justifyContent="center" elementWidth="1fr">
            <BoxAnimation duration="250ms">
              <CarServiceServiceTile
                titleDescriptionContainer={{ gap: '1rem' }}
                title="CAR SERVICE"
                description={`mply dummy text of the printing 
              and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever 
              It has survived not only five centuries, but`}
                padding="lg"
                preserveWhenXs
                xs={'100%'}
              />
            </BoxAnimation>
            <BoxAnimation duration="500ms">
              <TowingServiceServiceTile
                titleDescriptionContainer={{ gap: '1rem' }}
                title="FAST AND INEXPENSIVE TOWING SERVICES"
                description={`
            When it is not possible to fix a vehicle on-site, we utilise our extensive
            network of local providers across Europe to deliver a professional and reliable towing service.`}
                padding="lg"
                preserveWhenXs
                xs={'100%'}
              />
            </BoxAnimation>
            <BoxAnimation duration="750ms">
              <CarServiceServiceTile
                titleDescriptionContainer={{ gap: '1rem' }}
                title="CAR SERVICE"
                description={`mply dummy text of the printing 
              and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever 
              It has survived not only five centuries, but`}
                padding="lg"
                preserveWhenXs
                xs={'100%'}
              />
            </BoxAnimation>
            <BoxAnimation duration="1s">
              <TowingServiceServiceTile
                titleDescriptionContainer={{ gap: '1rem' }}
                title="FAST AND INEXPENSIVE TOWING SERVICES"
                description={`
            When it is not possible to fix a vehicle on-site, we utilise our extensive
            network of local providers across Europe to deliver a professional and reliable towing service.`}
                padding="lg"
                preserveWhenXs
                xs={'100%'}
              />
            </BoxAnimation>
          </List>
        </Container>
      </WhiteBackgroundContainer>
      {/* <CantFindVehicle /> */}
      {/* <CarLot /> */}
      <WhiteBackgroundContainer>
        <BoxAnimation>
          <WhyChooseUs />
        </BoxAnimation>
      </WhiteBackgroundContainer>
      <WhiteBackgroundContainer>
        <BoxAnimation>
          <Reviews />
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
