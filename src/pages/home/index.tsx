import BMWDriftSoilImage from 'assets/bwm-drift-soil.jpg';
import Logo from 'assets/logo.png';
import MasserattiMountainsImage from 'assets/masseratti-mountains.jpg';
import Button from 'components/Button';
import Carousel from 'components/Carousel';
import Container from 'components/Container';
import Image from 'components/Image';
import Line from 'components/Line';
import ListProductCard from 'components/ListProductCard';
import Navigation from 'components/Navigation';
import ProductCard from 'components/ProductCard';
import Autocomplete from 'components/form/Autocomplete';
import Text from 'components/typography/Text';
import Title from 'components/typography/Title';
import { products } from 'pages/constants';
import BodyTypes from 'pages/home/BodyTypes';
import TabButtonsGroup from 'pages/home/ButtonsGroup';
import CantFindVehicle from 'pages/home/CantFindVehicle';
import CarLot from 'pages/home/CarLot';
import FAQ from 'pages/home/Faq';
import HorizontalList from 'pages/home/HorizontalList';
import LatestBlogPosts from 'pages/home/LatestBlogPosts';
import Reviews from 'pages/home/Reviews';
import TowingService from 'pages/home/TowingService';
import WhyChooseUs from 'pages/home/WhyChooseUs';
import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { BsArrowUpRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'routes';
import styled from 'styled-components';
import theme from 'theme';

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

const SearchBoxWrapper = styled(Container)`
  color: black;
  background-color: white;
  border-radius: 30px;

  padding-left: ${theme.padding.md};
  padding-right: ${theme.padding.md};
`;

const StyledSearchButton = styled(Button)`
  white-space: nowrap;
  margin-left: auto;
`;

const PopularMakesWrapper = styled(Container)`
  background-color: #232323;
  color: #fff;
`;

const FinanceWrapper = styled(Container)`
  /* color: #fff; */
`;

const SearchContainer = styled(Container)`
  transform: translateY(-50%);
`;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const popularMakesProducts = products;

  return (
    <div>
      <StyledContainer preserveWhenXs>
        <Carousel minHeight="100%" maxHeight="100vh" absolute noCommands>
          <Image src={BMWDriftSoilImage} objectFit="cover" verticalCentered height="100%" />
          <Image src={MasserattiMountainsImage} objectFit="cover" verticalCentered height="100%" />
        </Carousel>
        <Container
          relative
          zIndex={999}
          direction="row"
          preserveWhenXs
          justifyContent="space-between"
          padding={{ top: 'sm', bottom: 'sm', left: 'md', right: 'md' }}
          alignItems="center"
        >
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
        <SearchContainer
          centered="vertical"
          gap="2rem"
          preserveWhenXs
          justifyContent="center"
          alignItems="center"
          alignSelf="center"
        >
          <Title textAlign="center" fontSize="3xl" bold title="Welcome to Strong AUTO" />
          <Text textAlign="center" fontSize="lg">
            Lookup cars for sale
          </Text>
          <Container padding="sm">
            <SearchBoxWrapper
              sm={12}
              md={11}
              lg={10}
              xl="700px"
              centered
              direction="row"
              gap="1rem"
              alignItems="center"
              wrap
              padding="sm"
            >
              <Container sm={12} md={4} lg={3}>
                <Autocomplete
                  noBorder
                  label="Select make"
                  placeholder="Any make"
                  size="lg"
                  options={[{ value: 'audi' }]}
                />
              </Container>
              <Container sm={12} md={4} lg={3}>
                <Autocomplete
                  noBorder
                  label="Select model"
                  placeholder="Any model"
                  size="lg"
                  options={[{ value: 'audi' }]}
                />
              </Container>
              <Container sm={12} md={4} lg={3}>
                <Autocomplete
                  noBorder
                  label="Select price"
                  placeholder="Any price"
                  size="lg"
                  options={[{ value: 'audi' }]}
                />
              </Container>
              <Container sm={12} lg={3} justifySelf="flex-end">
                <StyledSearchButton fullwidth maxContent size="lg" icon={<BiSearch />}>
                  Search cars
                </StyledSearchButton>
              </Container>
            </SearchBoxWrapper>
          </Container>
        </SearchContainer>
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
          {products.map((product) => (
            <ProductCard {...product} ribbon={product.state as any} key={product.id} />
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
      >
        <Title title="What we have in store for you" fontSize="2xl" />
        <Line />
        <Container itemsCentered padding={{ top: 'lg', bottom: 'lg', right: 'md', left: 'md' }}>
          <Container preserveWhenXs direction="row" justifyContent="space-between" gap="3rem">
            <FinanceWrapper xs="100px" sm="300px">
              <Text>Promotions</Text>
              <Text type="sub" fontSize="md">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industrys standard dummy text ever since the 1500s
              </Text>
            </FinanceWrapper>
            <FinanceWrapper xs="100px" sm="300px">
              <Text>Our services</Text>
              <Text type="sub" fontSize="md">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industrys standard dummy text ever since the 1500s
              </Text>
            </FinanceWrapper>
          </Container>
          <Image
            onClick={() => navigate(Routes.INDEX)}
            src={Logo}
            alt="Strong auto logo"
            width="200px"
            height="100%"
            objectFit="contain"
          />
          <Container preserveWhenXs direction="row" justifyContent="space-between" gap="3rem">
            <FinanceWrapper xs="100px" sm="300px">
              <Text>Parts center</Text>
              <Text type="sub" fontSize="md">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industrys standard dummy text ever since the 1500s
              </Text>
            </FinanceWrapper>
            <FinanceWrapper xs="100px" sm="300px">
              <Text>Parts center</Text>
              <Text type="sub" fontSize="md">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industrys standard dummy text ever since the 1500s
              </Text>
            </FinanceWrapper>
          </Container>
        </Container>
      </Container>
      <Container sm="1400px" centered padding={{ top: 'lg', bottom: 'lg', right: 'lg', left: 'lg' }} gap="2rem">
        <Title title="Services" fontSize="2xl" />
        <Line />
        <TowingService />
        <Line />
      </Container>
      <CantFindVehicle />
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
