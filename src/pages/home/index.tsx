import Logo from 'assets/logo.png';
import Button from 'components/Button';
import Container from 'components/Container';
import Image from 'components/Image';
import Line from 'components/Line';
import Navigation from 'components/Navigation';
import ProductCard from 'components/ProductCard';
import Autocomplete from 'components/form/Autocomplete';
import Text from 'components/typography/Text';
import Title from 'components/typography/Title';
import { products } from 'pages/constants';
import LatestBlogPosts from 'pages/home/LatestBlogPosts';
import BodyTypes from 'pages/home/BodyTypes';
import TabButtonsGroup from 'pages/home/ButtonsGroup';
import CarLot from 'pages/home/CarLot';
import HorizontalList from 'pages/home/HorizontalList';
import TowingService from 'pages/home/TowingService';
import WhyChooseUs from 'pages/home/WhyChooseUs';
import React, { useRef } from 'react';
import { BiSearch } from 'react-icons/bi';
import { BsArrowUpRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'routes';
import styled from 'styled-components';
import theme from 'theme';
import BMWDriftSoilImage from 'assets/bwm-drift-soil.jpg';
import MasserattiMountainsImage from 'assets/masseratti-mountains.jpg';
import Carousel, { CarouselHandle } from 'components/Carousel';
import Reviews from 'pages/home/Reviews';
import FAQ from 'pages/home/Faq';
import { MdArrowForwardIos } from 'react-icons/md';

const StyledContainer = styled(Container)`
  background: url(${BMWDriftSoilImage});
  background-position: center center;
  background-size: 100%;
  height: 100vh;
  color: white;

  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.3;
  }

  > * {
    z-index: 1;
  }
`;

const SearchBoxWrapper = styled(Container)`
  background-color: white;
  border-radius: 30px;
  height: 60px;

  padding-left: ${theme.padding.md};
  padding-right: ${theme.padding.md};

  > *:first-child {
    width: 100%;

    > * {
      height: 100%;
    }
  }
`;

const StyledSearchButton = styled(Button)`
  height: 100%;
  flex-grow: 3;
  white-space: nowrap;
`;

const PopularMakesWrapper = styled(Container)`
  background-color: #232323;
  color: #fff;
`;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const popularMakesProducts = products;

  const carouselServicesRef = useRef<CarouselHandle>(null);

  return (
    <div>
      <StyledContainer gap="2rem" relative>
        <Carousel minHeight="100vh" maxHeight="100vh" absolute noCommands>
          <Image src={BMWDriftSoilImage} objectFit="cover" verticalCentered height="100%" />
          <Image src={MasserattiMountainsImage} objectFit="cover" verticalCentered height="100%" />
        </Carousel>
        <Container direction="row" justifyContent="space-between" alignItems="center">
          <Image
            onClick={() => navigate(Routes.INDEX)}
            src={Logo}
            alt="Strong auto logo"
            width="170px"
            height="100%"
            objectFit="contain"
          />
          <Navigation />
        </Container>
        <Container itemsCentered gap="0.5rem" alignSelf="center">
          <Title textAlign="center" fontSize="3xl" bold title="Welcome to Strong AUTO" />
          {/* <Title textAlign="center" fontSize="3xl" bold title="Pick your car" /> */}
          <Text textAlign="center" fontSize="lg">
            Lookup cars for sale
          </Text>
        </Container>
        <SearchBoxWrapper
          preserveWhenXs
          direction="row"
          padding="sm"
          gap={'1rem'}
          centered
          sm={12}
          md={12}
          lg={10}
          xl="800px"
        >
          <Container preserveWhenXs direction="row" gap="1rem" alignItems="center" justifyContent="flex-start">
            <Autocomplete noBorder placeholder="Any make" options={[{ value: 'audi' }]} />
            <Line type="vertical" />
            <Autocomplete noBorder placeholder="Any model" options={[{ value: 'audi' }]} />
            <Line type="vertical" />
            <Autocomplete noBorder placeholder="Any price" options={[{ value: 'audi' }]} />
          </Container>
          <StyledSearchButton maxContent size="md" icon={<BiSearch />}>
            Search cars
          </StyledSearchButton>
        </SearchBoxWrapper>
      </StyledContainer>

      <BodyTypes />

      <Container padding={{ top: 'lg', bottom: 'lg', left: 'md' }} gap="1rem">
        <Container sm="1400px" centered gap="1rem" padding={{ right: 'md' }}>
          <Container preserveWhenXs direction="row" gap="1rem" alignItems="flex-end" justifyContent="space-between">
            <Title title="Explore All Vehicles" fontSize="2xl" bold />
            <Button themeType="link" size="lg" iconRight={<BsArrowUpRight />}>
              View all
            </Button>
          </Container>
          <TabButtonsGroup buttons={[{ label: 'Used', defaultActive: true }, { label: 'Featured' }]} />
        </Container>
        <HorizontalList maxWidth="1400px" centered>
          {products.map((product, index) => (
            <ProductCard {...product} key={index} />
          ))}
        </HorizontalList>
      </Container>
      <PopularMakesWrapper padding={{ top: 'lg', bottom: 'lg', left: 'md' }} gap="1rem">
        <Container sm="1400px" centered gap="1rem" padding={{ right: 'md' }}>
          <Container preserveWhenXs direction="row" gap="1rem" alignItems="flex-end" justifyContent="space-between">
            <Title title="Popular Makes" fontSize="2xl" bold />
            <Button themeType="link" size="lg" iconRight={<BsArrowUpRight />}>
              View all
            </Button>
          </Container>
          <TabButtonsGroup buttons={[{ label: 'Audi', defaultActive: true }, { label: 'BMW' }, { label: 'Toyota' }]} />
        </Container>
        <HorizontalList maxWidth="1400px" centered>
          {popularMakesProducts.map((product, index) => (
            <ProductCard type="row" {...product} key={index} />
          ))}
        </HorizontalList>
      </PopularMakesWrapper>
      <Container
        sm="1400px"
        centered
        padding={{ top: 'lg', bottom: 'lg', right: 'lg', left: 'lg' }}
        bordered
        rounded
        margin={{ top: 'lg', bottom: 'lg' }}
      >
        <Title title="Services" fontSize="2xl" />
        <Container padding={{ top: 'xl', bottom: 'xl' }}>
          <Carousel ref={carouselServicesRef} noCommands>
            <TowingService />
          </Carousel>
        </Container>
        <Container alignSelf="flex-end" justifySelf="flex-end">
          <Button maxContent themeType="link" iconRight={<MdArrowForwardIos />} size="lg">
            Next
          </Button>
        </Container>
        {/* <CantFindVehicle /> */}

        {/* <Container sm={12} md={12} lg={6} xl={7}></Container>
        <Container sm={12} md={12} lg={6} xl={5}></Container>
        <Container sm={12} md={12} lg={12} xl={12}></Container> */}
      </Container>
      <CarLot />
      <Container padding={{ top: 'lg', bottom: 'lg', left: 'md', right: 'md' }} gap="1rem" centered sm="1400px">
        <WhyChooseUs />
      </Container>
      <LatestBlogPosts />
      <Reviews />
      <FAQ />
    </div>
  );
};

export default Home;
