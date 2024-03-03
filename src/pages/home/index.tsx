import BMWDriftSoilImage from 'assets/bwm-drift-soil.jpg';
import VehicleRentIcon from 'assets/icons/vehicle-rent-icon.svg';
import VehicleSearchIcon from 'assets/icons/vehicle-search-icon.svg';
import VehiclePartsIcon from 'assets/icons/vehicle-parts-icon.svg';
import MasserattiMountainsImage from 'assets/masseratti-mountains.jpg';
import RoadImage from 'assets/road.jpg';
import Button from 'components/Button';
import Carousel from 'components/Carousel';
import Container from 'components/Container';
import Image from 'components/Image';
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
import LatestBlogPosts from 'pages/home/LatestBlogPosts';
import Reviews from 'pages/home/Reviews';
import SearchBox from 'pages/home/SearchBox';
import ServiceTile from 'pages/home/ServiceTile';
import WhyChooseUs from 'pages/home/WhyChooseUs';
import React from 'react';
import { BsArrowUpRight } from 'react-icons/bs';
import styled from 'styled-components';
import TowTruckImage from 'assets/tow-truck.jpg';
import CarServiceMechanicImage from 'assets/car-service-mechanic.jpg';

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

const StyledContainer = styled(Container)`
  color: white;
  min-height: 100vh;

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

const CarouselWrapper = styled(Carousel)`
  z-index: 1;
`;

const BuyNewCarServiceTile = styled(ServiceTile)`
  background-color: #ffc400;
`;

const RentACarServiceTile = styled(ServiceTile)`
  background: linear-gradient(#f14f3f 0, #cb4335 100%);
`;

const CarPartsServiceTile = styled(ServiceTile)`
  background-color: #055285;
`;

const TowingServiceServiceTile = styled(ServiceTile)`
  background-image: url(${TowTruckImage});
  background-size: cover;
  background-position: center center;

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

const Home: React.FC = () => {
  const popularMakesProducts = products;

  return (
    <HomeWrapper>
      <StyledContainer preserveWhenXs>
        <Header transparent />
        <CarouselWrapper minHeight="100vh" absolute noCommands>
          <Image src={BMWDriftSoilImage} objectFit="cover" height="100%" />
          <Image src={MasserattiMountainsImage} objectFit="cover" height="100%" />
        </CarouselWrapper>

        <SearchContainer gap="2rem" preserveWhenXs justifyContent="center" alignItems="center" alignSelf="center">
          <Title textAlign="center" fontSize="3xl" bold title="Welcome to Strong AUTO" />
          <Text textAlign="center" fontSize="lg">
            Lookup cars for sale
          </Text>
          <SearchBox />
        </SearchContainer>
      </StyledContainer>

      <WhiteBackgroundContainer>
        <Container centered sm="1400px">
          <BodyTypes />
        </Container>
      </WhiteBackgroundContainer>

      <WhiteBackgroundContainer padding={{ top: 'lg', bottom: 'lg', left: 'md' }} gap="1rem">
        <Container sm="1400px" centered alignItems="center" gap="1rem" padding={{ right: 'md' }}>
          <Container preserveWhenXs gap="1rem" alignItems="center">
            <Title centered title="Explore All Vehicles" fontSize="2xl" bold />
            <Button themeType="link" size="lg" iconRight={<BsArrowUpRight />}>
              View all
            </Button>
          </Container>
          <TabButtonsGroup buttons={[{ label: 'Used' }, { label: 'Featured' }]} />
          <List gap="1rem" xs={1} md={2} lg={3} {...{ '2xl': 4 }}>
            {products.slice(0, 8).map((product) => (
              <ProductCard fullwidth {...product} ribbon={product.state as RibbonType} key={product.id} />
            ))}
          </List>
        </Container>
      </WhiteBackgroundContainer>

      <Container
        sm="1400px"
        centered
        padding={{ top: 'xl', bottom: 'xl', left: 'sm', right: 'sm' }}
        direction="row"
        justifyContent="center"
        gap="1rem"
        wrap
        preserveWhenXs
      >
        <BuyNewCarServiceTile
          iconSrc={VehicleSearchIcon}
          title="Buy new car?"
          description={'Our cars are with all requirements completed and all fees paid until registration'}
          preserveWhenXs
          sm={12}
          md={4}
        />
        <RentACarServiceTile
          iconSrc={VehicleRentIcon}
          title="Rent a car?"
          description={'Our cars are with all requirements completed and all fees paid until registration'}
          preserveWhenXs
          sm={12}
          md={4}
        />
        <CarPartsServiceTile
          iconSrc={VehiclePartsIcon}
          title="Looking for parts for your car?"
          description={'Our cars are with all requirements completed and all fees paid until registration'}
          preserveWhenXs
          sm={12}
          md={4}
        />
      </Container>
      <PopularMakesWrapper padding={{ top: 'lg', bottom: 'lg', left: 'md' }} gap="1rem">
        <Container sm="1400px" centered alignItems="center" gap="1rem" padding={{ right: 'md' }}>
          <Container preserveWhenXs gap="1rem" alignItems="center">
            <Title centered title="Popular Makes" fontSize="2xl" bold />
            <Button themeType="link" size="lg" iconRight={<BsArrowUpRight />}>
              View all
            </Button>
          </Container>
          <TabButtonsGroup buttons={[{ label: 'Audi' }, { label: 'BMW' }, { label: 'Toyota' }]} />
          <HorizontalList
            gap="2rem"
            chunkGap="1rem"
            chunkSize={{ xs: '100%', md: '50%', lg: '33.33%', xl: '25%' }}
            centered
          >
            {popularMakesProducts.map((product) => (
              <MiniProductCard {...product} ribbon={product.state as RibbonType} key={product.id} />
            ))}
          </HorizontalList>
        </Container>
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
        <LatestBlogPosts />
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
