import BMWDriftSoilImage from 'assets/bwm-drift-soil.jpg';
import MasserattiMountainsImage from 'assets/masseratti-mountains.jpg';
import RoadImage from 'assets/road.jpg';
import Button from 'components/Button';
import Carousel from 'components/Carousel';
import Container from 'components/Container';
import Image from 'components/Image';
import Line from 'components/Line';
import List from 'components/List';
import ListProductCard from 'components/card/ListProductCard';
import ProductCard from 'components/card/ProductCard';
import { TransitionHandle } from 'components/Transition';
import Header from 'components/navigation/Header';
import Text from 'components/typography/Text';
import Title from 'components/typography/Title';
import { products } from 'pages/constants';
import BodyTypes from 'pages/home/BodyTypes';
import TabButtonsGroup from 'pages/home/ButtonsGroup';
import CantFindVehicle from 'pages/home/CantFindVehicle';
import FAQ from 'pages/home/Faq';
import HorizontalList from 'pages/home/HorizontalList';
import LatestBlogPosts from 'pages/home/LatestBlogPosts';
import Reviews from 'pages/home/Reviews';
import SearchBox from 'pages/home/SearchBox';
import WhyChooseUs from 'pages/home/WhyChooseUs';
import React, { useRef } from 'react';
import { BsArrowUpRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
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

const FinanceWrapper = styled(Container)`
  /* color: #fff; */
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

const Home: React.FC = () => {
  const popularMakesProducts = products;

  return (
    <HomeWrapper>
      <StyledContainer preserveWhenXs>
        <Header transparent />
        <CarouselWrapper minHeight="100%" maxHeight="100vh" absolute noCommands>
          <Image src={BMWDriftSoilImage} objectFit="cover" verticalCentered height="100%" />
          <Image src={MasserattiMountainsImage} objectFit="cover" verticalCentered height="100%" />
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
        <BodyTypes />
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
        </Container>
        <HorizontalList maxWidth="100%" centered>
          {products.map((product) => (
            <ProductCard {...product} ribbon={product.state as any} key={product.id} />
          ))}
        </HorizontalList>
      </WhiteBackgroundContainer>

      <PopularMakesWrapper padding={{ top: 'lg', bottom: 'lg', left: 'md' }} gap="1rem">
        <Container sm="1400px" centered alignItems="center" gap="1rem" padding={{ right: 'md' }}>
          <Container preserveWhenXs gap="1rem" alignItems="center">
            <Title centered title="Popular Makes" fontSize="2xl" bold />
            <Button themeType="link" size="lg" iconRight={<BsArrowUpRight />}>
              View all
            </Button>
          </Container>
          <TabButtonsGroup buttons={[{ label: 'Audi' }, { label: 'BMW' }, { label: 'Toyota' }]} />
        </Container>
        <HorizontalList maxWidth="100%" centered>
          {popularMakesProducts.map((product) => (
            <ListProductCard {...product} ribbon={product.state as any} key={product.id} />
          ))}
        </HorizontalList>
      </PopularMakesWrapper>

      <Container
        sm="1400px"
        centered
        itemsCentered
        padding={{ top: 'lg', bottom: 'lg', right: 'lg', left: 'lg' }}
        gap="2rem"
        style={{ minHeight: '100vh' }}
      >
        <Title title="What we have in store for you" fontSize="2xl" />
        <Line />
        <Container itemsCentered padding={{ top: 'lg', bottom: 'lg', right: 'md', left: 'md' }} gap="1rem">
          <List xs={2} gap="3rem">
            <FinanceWrapper xs="100px" sm="300px" gap="1rem">
              <Text fontSize="lg">Promotions</Text>
              <Text bold fontSize="md">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industrys standard dummy text ever since the 1500s
              </Text>
              <Button themeType="white" maxContent size="md">
                Promotions
              </Button>
            </FinanceWrapper>
            <FinanceWrapper xs="100px" sm="300px" gap="1rem">
              <Text fontSize="lg">Our services</Text>
              <Text bold fontSize="md">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industrys standard dummy text ever since the 1500s
              </Text>
              <Button themeType="white" maxContent size="md">
                Services
              </Button>
            </FinanceWrapper>
            {/* <Image
            onClick={() => navigate(Routes.INDEX)}
            src={Logo}
            alt="Strong auto logo"
            width="200px"
            height="100%"
            objectFit="contain"
          /> */}
            <FinanceWrapper xs="100px" sm="300px" gap="1rem">
              <Text fontSize="lg">Parts center</Text>
              <Text bold fontSize="md">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industrys standard dummy text ever since the 1500s
              </Text>
              <Button themeType="white" maxContent size="md">
                Go to parts
              </Button>
            </FinanceWrapper>
            <FinanceWrapper xs="100px" sm="300px" gap="1rem">
              <Text fontSize="lg">Parts center</Text>
              <Text bold fontSize="md">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industrys standard dummy text ever since the 1500s
              </Text>
              <Button themeType="white" maxContent size="md">
                Go to parts
              </Button>
            </FinanceWrapper>
          </List>
        </Container>
      </Container>
      {/* <Container sm="1400px" centered padding={{ top: 'lg', bottom: 'lg', right: 'lg', left: 'lg' }} gap="2rem">
        <Title title="Services" fontSize="2xl" />
        <Line />
        <TowingService />
        <Line />
      </Container> */}
      <Line />
      <CantFindVehicle />
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
