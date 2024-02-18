import { css } from '@emotion/css';
import BMWDriftSoilImage from 'assets/bwm-drift-soil.jpg';
import Logo from 'assets/logo.png';
import MasserattiMountainsImage from 'assets/masseratti-mountains.jpg';
import RoadImage from 'assets/road.jpg';
import Button from 'components/Button';
import Carousel from 'components/Carousel';
import Container from 'components/Container';
import Image from 'components/Image';
import Line from 'components/Line';
import List from 'components/List';
import ListProductCard from 'components/ListProductCard';
import ProductCard from 'components/ProductCard';
import Transition, { TransitionHandle } from 'components/Transition';
import Autocomplete from 'components/form/Autocomplete';
import MobileNavigation from 'components/navigation/MobileNavigation';
import Navigation from 'components/navigation/Navigation';
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
import WhyChooseUs from 'pages/home/WhyChooseUs';
import React, { useRef } from 'react';
import { BiSearch } from 'react-icons/bi';
import { BsArrowUpRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'routes';
import styled from 'styled-components';
import theme from 'theme';

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
  /* flex-grow: 1; */

  @media (max-width: ${theme.breakpoints.maxWidth.sm}) {
    transform: translateY(0);
  }
`;

const WhiteBackgroundContainer = styled(Container)`
  background-color: white;
  color: black;
`;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const popularMakesProducts = products;
  const transitionRef = useRef<TransitionHandle>(null);

  return (
    <HomeWrapper>
      <StyledContainer preserveWhenXs>
        <Carousel minHeight="100%" maxHeight="100vh" absolute noCommands>
          <Image src={BMWDriftSoilImage} objectFit="cover" verticalCentered height="100%" />
          <Image src={MasserattiMountainsImage} objectFit="cover" verticalCentered height="100%" />
        </Carousel>
        <Transition
          ref={transitionRef}
          duration="200ms"
          transition={{
            final: css`
              background-color: white;
              color: black;
            `,
          }}
        >
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
            <Container xs={0} lg="max-content">
              <Navigation />
            </Container>
            <Container xs="max-content" lg={0} preserveWhenXs>
              <MobileNavigation onClick={() => transitionRef.current?.toggle()} />
            </Container>
          </Container>
        </Transition>
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
          <Container padding="sm" itemsCentered gap="0.5rem">
            <TabButtonsGroup buttons={[{ label: 'Simple', defaultActive: true }, { label: 'Advanced' }]} />
            <SearchBoxWrapper
              sm={12}
              md={11}
              lg={10}
              direction="row"
              xl="700px"
              centered
              gap="1rem"
              alignItems="center"
              padding="sm"
            >
              <Container sm={12} md={9}>
                <Autocomplete
                  noBorder
                  placeholder="Search cars"
                  fullwidth
                  label="Search"
                  size="md"
                  options={[{ value: 'audi' }]}
                />
              </Container>
              <Container sm={12} md={3} lg="max-content" justifySelf="flex-end">
                <StyledSearchButton fullwidth maxContent size="lg" icon={<BiSearch />}>
                  Search cars
                </StyledSearchButton>
              </Container>
            </SearchBoxWrapper>
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
          <TabButtonsGroup buttons={[{ label: 'Used', defaultActive: true }, { label: 'Featured' }]} />
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
          <TabButtonsGroup buttons={[{ label: 'Audi', defaultActive: true }, { label: 'BMW' }, { label: 'Toyota' }]} />
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
      <CantFindVehicle />
      <CarLot />
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
