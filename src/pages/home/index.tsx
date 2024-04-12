import BMWDriftSoilImage from 'assets/bwm-drift-soil.jpg';
import CarServiceMechanicImage from 'assets/car-service-mechanic.jpg';
import RentCarImage from 'assets/rent-car-image.jpg';
import MasserattiMountainsImage from 'assets/masseratti-mountains.jpg';
import RoadImage from 'assets/road.jpg';
import TowTruckImage from 'assets/tow-truck.jpg';
import Button from 'components/Button';
import Carousel from 'components/Carousel';
import Container from 'components/Container';
import Image from 'components/Image';
import Line from 'components/Line';
import List from 'components/List';
import MiniProductCard from 'components/card/MiniProductCard';
import ProductCard from 'components/card/ProductCard';
import { RibbonType } from 'components/card/types';
import Header from 'components/navigation/Header';
import Text from 'components/typography/Text';
import Title from 'components/typography/Title';
import { products } from 'pages/constants';
import BodyTypes from 'pages/home/BodyTypes';
import TabButtonsGroup from 'pages/home/ButtonsGroup';
import FAQ from 'pages/home/Faq';
import HorizontalList from 'pages/home/HorizontalList';
import Reviews from 'pages/home/Reviews';
import SearchBox from 'pages/home/SearchBox';
import ServiceTile from 'pages/home/ServiceTile';
import WhyChooseUs from 'pages/home/WhyChooseUs';
import React, { useState } from 'react';
import { BsArrowUpRight } from 'react-icons/bs';
import { HiArrowRight } from 'react-icons/hi';
import styled from 'styled-components';

const HomeWrapper = styled(Container)`
  background-image: url(${RoadImage});
  background-repeat: no-repeat;
  background-size: cover;
  color: white;

  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.3;
    z-index: 2;
  }

  > * {
    z-index: 3;
  }
`;

const CarouselWrapper = styled(Container)`
  color: white;
  min-height: 600px;

  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.3;
    z-index: 2;
  }

  > * {
    z-index: 3;
  }
`;

const PopularMakesWrapper = styled(Container)`
  background-color: #232323;
  color: #fff;
`;

const WhiteBackgroundContainer = styled(Container)`
  background-color: white;
  color: black;
`;

const SearchContainer = styled(Container)`
  flex: 0.5 0 100%;
`;

const StyledBuyCarImage = styled(Image)`
  border-radius: 10px;
  clip-path: ellipse(67% 75% at 75% 66%);
`;

const StyledRentCarImage = styled(Image)`
  border-radius: 10px;
`;

const StyledCarPartsImage = styled(Image)`
  border-radius: 10px;
  clip-path: ellipse(67% 75% at 25% 66%);
`;

const TowingServiceServiceTile = styled(ServiceTile)`
  background-image: url(${TowTruckImage});
  background-size: cover;
  background-position: center center;
  transition: 0.5s;

  &:hover {
    scale: 1.1;
  }

  &::before {
    content: '';
    background-color: #000;
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    top: 0;
    left: 0;
  }

  & > * {
    z-index: 1;
  }
`;

const CarServiceServiceTile = styled(ServiceTile)`
  background-image: url(${CarServiceMechanicImage});
  background-size: cover;
  background-position: center center;
  transition: 0.5s;

  &::before {
    content: '';
    background-color: #000;
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    top: 0;
    left: 0;
  }

  &:hover {
    scale: 1.1;
  }

  & > * {
    z-index: 1;
  }
`;

const Home: React.FC = () => {
  const popularMakesProducts = products;
  const [exploreVehiclesActiveTab, setExploreVehiclesActiveTab] = useState<number>(0);

  return (
    <HomeWrapper>
      <Header />
      <CarouselWrapper preserveWhenXs>
        <Carousel minHeight="600px" absolute noArrows noChangeOptions>
          <Image src={BMWDriftSoilImage} objectFit="cover" objectPosition="bottom" height="100%" />
          <Image src={MasserattiMountainsImage} objectFit="cover" objectPosition="bottom" height="100%" />
        </Carousel>

        <SearchContainer gap="2rem" preserveWhenXs justifyContent="center" alignItems="center" alignSelf="center">
          <Title textAlign="center" fontSize="3xl" bold title="Welcome to Strong AUTO" />
          <Text textAlign="center" fontSize="lg">
            Lookup cars for sale
          </Text>
          <SearchBox />
        </SearchContainer>
      </CarouselWrapper>
      {/* 
      <WhiteBackgroundContainer>
        <Container centered sm="1400px">
          <BodyTypes />
        </Container>
      </WhiteBackgroundContainer> */}

      <WhiteBackgroundContainer padding={{ top: 'lg', bottom: 'lg', left: 'md' }} gap="1rem">
        <Container sm="1400px" centered alignItems="center" gap="1rem" padding={{ right: 'md' }}>
          <Container
            sm={12}
            preserveWhenXs
            gap="1rem"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Container preserveWhenXs xs={0} md={2} />
            <Container sm={12} alignItems="center">
              <Title title="Explore vehicles" fontSize="2xl" bold />
            </Container>
            <Container sm="max-content" md={2}>
              <Button themeType="link" size="lg" iconRight={<BsArrowUpRight />}>
                View all
              </Button>
            </Container>
          </Container>
          <Line />

          <TabButtonsGroup
            buttons={[{ label: 'Featured' }, { label: 'Body' }]}
            onChange={(_, index) => setExploreVehiclesActiveTab(index)}
            defaultActive={exploreVehiclesActiveTab}
          />
          {exploreVehiclesActiveTab === 0 && (
            <List gap="1rem" xs={1} md={2} lg={3} justifyContent="space-between">
              {products.slice(0, 6).map((product) => (
                <ProductCard fullwidth {...product} ribbon={product.state as RibbonType} key={product.id} />
              ))}
            </List>
          )}
          {exploreVehiclesActiveTab === 1 && <BodyTypes />}
        </Container>
      </WhiteBackgroundContainer>

      <WhiteBackgroundContainer
        padding={{ top: 'lg', bottom: 'lg' }}
        centered
        direction="row"
        justifyContent="center"
        wrap
        preserveWhenXs
        sm={12}
      >
        <Container sm={12} md={4} justifyContent="space-between" alignItems="center">
          <Container sm={12} padding={{ bottom: 'lg' }}>
            <StyledBuyCarImage shadow src={RentCarImage} />
          </Container>
          <Container sm={12} padding={{ left: 'md' }}>
            <Text fontSize="xl" bold>
              Buying a car?
            </Text>
            <Button size="lg" iconRight={<HiArrowRight />} maxContent themeType="link">
              Visit our cars shop
            </Button>
          </Container>
        </Container>
        <Container
          bordered={{ left: true, right: true }}
          padding={{ left: 'md', right: 'md' }}
          sm={12}
          md={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Container sm={12} padding={{ bottom: 'lg' }}>
            <StyledRentCarImage shadow src={RentCarImage} />
          </Container>
          <Container sm={12} padding={{ left: 'md' }}>
            <Text fontSize="xl" bold>
              Looking for car to rent?
            </Text>
            <Button size="lg" iconRight={<HiArrowRight />} maxContent themeType="link">
              Check out our cars for rent
            </Button>
          </Container>
        </Container>
        <Container sm={12} md={4} justifyContent="space-between" alignItems="center">
          <Container sm={12} padding={{ bottom: 'lg' }}>
            <StyledCarPartsImage shadow src={RentCarImage} />
          </Container>
          <Container sm={12} padding={{ left: 'md' }}>
            <Text fontSize="xl" bold>
              Looking for parts for your car?
            </Text>
            <Button size="lg" iconRight={<HiArrowRight />} maxContent themeType="link">
              Visit our parts shop
            </Button>
          </Container>
        </Container>
      </WhiteBackgroundContainer>
      <PopularMakesWrapper sm={12} padding={{ top: 'xl', bottom: 'xl' }} gap="1rem">
        <Container sm={12} centered alignItems="center" gap="1rem" padding={{ right: 'md' }}>
          <Container
            sm={12}
            preserveWhenXs
            gap="1rem"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Container preserveWhenXs xs={0} md={2} />
            <Container sm={12} alignItems="center">
              <Title title="Popular Makes" fontSize="2xl" bold />
            </Container>
            <Container sm="max-content" md={2}>
              <Button themeType="link" size="lg" iconRight={<BsArrowUpRight />}>
                View all
              </Button>
            </Container>
          </Container>
          <TabButtonsGroup buttons={[{ label: 'Audi' }, { label: 'BMW' }, { label: 'Toyota' }]} />
        </Container>
        <HorizontalList gap="2rem" chunkGap="1rem" chunkSize={{ xs: '100%', md: '50%', lg: '40%', xl: '30%' }} centered>
          {popularMakesProducts.map((product) => (
            <MiniProductCard {...product} ribbon={product.state as RibbonType} key={product.id} />
          ))}
        </HorizontalList>
      </PopularMakesWrapper>
      <Container
        sm="1400px"
        centered
        itemsCentered
        padding={{ top: 'xl', bottom: 'xl', right: 'lg', left: 'lg' }}
        gap="2rem"
      >
        {/* <Container preserveWhenXs gap="1rem" alignItems="center">
          <Title title="Our services" fontSize="2xl" />
          <Button themeType="link" size="lg" iconRight={<BsArrowUpRight />}>
            View all
          </Button>
        </Container> */}
        <Container
          itemsCentered
          padding={{ top: 'xl', bottom: 'xl', right: 'md', left: 'md' }}
          gap="1rem"
          justifyContent="center"
          preserveWhenXs
        >
          <List xs={1} md={2} gap="3rem" elementWidth="1fr">
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
          </List>
        </Container>
      </Container>
      {/* <CantFindVehicle /> */}
      {/* <CarLot /> */}
      <WhiteBackgroundContainer>
        <WhyChooseUs />
      </WhiteBackgroundContainer>
      <WhiteBackgroundContainer>
        <Reviews />
      </WhiteBackgroundContainer>
      <WhiteBackgroundContainer>
        <FAQ />
      </WhiteBackgroundContainer>
    </HomeWrapper>
  );
};

export default Home;
