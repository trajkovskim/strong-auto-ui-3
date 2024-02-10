import CarSideViewToLeftImage from 'assets/car-side-view-to-left.png';
import CarSideViewToRightImage from 'assets/car-side-view-to-right.png';
import Logo from 'assets/logo.png';
import ToyotaCamryImage from 'assets/toyota-camry.jpg';
import Button from 'components/Button';
import Container from 'components/Container';
import Icon from 'components/Icon';
import Image from 'components/Image';
import Line from 'components/Line';
import Navigation from 'components/Navigation';
import ProductCard from 'components/ProductCard';
import Autocomplete from 'components/form/Autocomplete';
import Text from 'components/typography/Text';
import Title from 'components/typography/Title';
import BodyTypes from 'pages/home/BodyTypes';
import TabButtonsGroup from 'pages/home/ButtonsGroup';
import CarLot from 'pages/home/CarLot';
import HorizontalList from 'pages/home/HorizontalList';
import OtherServices from 'pages/home/OtherServices';
import WhyChooseUs from 'pages/home/WhyChooseUs';
import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { BsArrowUpRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'routes';
import styled from 'styled-components';
import theme from 'theme';

const StyledContainer = styled(Container)`
  background: url('https://demoapus1.com/boxcar/wp-content/uploads/2023/10/slider1.jpg');
  background-position: center center;
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
  width: 500px;
  flex-grow: 2;
  white-space: nowrap;
`;

const PopularMakesWrapper = styled(Container)`
  background-color: #232323;
  color: #fff;
`;

const StyledImage1 = styled(Image)`
  position: relative;
  left: -200px;
`;

const StyledImage2 = styled(Image)`
  position: relative;
  right: -200px;
`;

const CantFindVehicleContainer = styled(Container)`
  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.1;
  }

  > * {
    z-index: 1;
  }
`;

const Home: React.FC = () => {
  const navigate = useNavigate();

  const exploreAllVehiclesProducts = [
    {
      imageSrc: ToyotaCamryImage,
      ribbon: 'sold',
      price: 95000,
      title: 'Toyota Camry New 0',
      description: '3.5D Power pulse Momentum 5dr RWD',
    },
    {
      imageSrc: ToyotaCamryImage,
      ribbon: 'sold',
      price: 90000,
      title: 'Toyota Camry New 1',
      description: '3.5D Power pulse Momentum 5dr RWD',
    },
    {
      imageSrc: ToyotaCamryImage,
      ribbon: 'sold',
      price: 90000,
      title: 'Toyota Camry New 2',
      description: '3.5D Power pulse Momentum 5dr RWD',
    },
    {
      imageSrc: ToyotaCamryImage,
      ribbon: 'sold',
      price: 90000,
      title: 'Toyota Camry New 3',
      description: '3.5D Power pulse Momentum 5dr RWD',
    },
    {
      imageSrc: ToyotaCamryImage,
      ribbon: 'sold',
      price: 90000,
      title: 'Toyota Camry New 4',
      description: '3.5D Power pulse Momentum 5dr RWD',
    },
    {
      imageSrc: ToyotaCamryImage,
      ribbon: 'sold',
      price: 90000,
      title: 'Toyota Camry New 5',
      description: '3.5D Power pulse Momentum 5dr RWD',
    },
    {
      imageSrc: ToyotaCamryImage,
      ribbon: 'sold',
      price: 90000,
      title: 'Toyota Camry New 6',
      description: '3.5D Power pulse Momentum 5dr RWD',
    },
    {
      imageSrc: ToyotaCamryImage,
      ribbon: 'sold',
      price: 90000,
      title: 'Toyota Camry New 7',
      description: '3.5D Power pulse Momentum 5dr RWD',
    },
    {
      imageSrc: ToyotaCamryImage,
      ribbon: 'sold',
      price: 90000,
      title: 'Toyota Camry New 8',
      description: '3.5D Power pulse Momentum 5dr RWD',
    },
    {
      imageSrc: ToyotaCamryImage,
      ribbon: 'sold',
      price: 90000,
      title: 'Toyota Camry New 9',
      description: '3.5D Power pulse Momentum 5dr RWD',
    },
    {
      imageSrc: ToyotaCamryImage,
      ribbon: 'sold',
      price: 90000,
      title: 'Toyota Camry New 10',
      description: '3.5D Power pulse Momentum 5dr RWD',
    },
  ];

  const popularMakesProducts = exploreAllVehiclesProducts;

  return (
    <div>
      <StyledContainer gap="2rem">
        <Container direction="row" justifyContent="space-between">
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
        <Container itemsCentered alignSelf="center">
          <Text textAlign="center" fontSize="lg">
            Find cars for sale
          </Text>
          <Title textAlign="center" fontSize="3xl" bold title="Find Your Perfect Car" />
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
          <StyledSearchButton size="large" icon={<BiSearch />}>
            Search cars
          </StyledSearchButton>
        </SearchBoxWrapper>
      </StyledContainer>

      <BodyTypes />

      <Container padding={{ top: 'lg', bottom: 'xl' }} gap="2rem">
        <Container sm="1400px" centered gap="2rem">
          <Container direction="row" gap="1rem" alignItems="flex-end" justifyContent="space-between">
            <Title title="Explore All Vehicles" fontSize="2xl" bold />
            <Button themeType="link" size="large">
              <Text fontSize="lg">View all</Text> <Icon icon={<BsArrowUpRight />} width="16px" />
            </Button>
          </Container>
          <TabButtonsGroup buttons={[{ label: 'Used', defaultActive: true }, { label: 'Featured' }]} />
        </Container>
        <HorizontalList>
          {exploreAllVehiclesProducts.map((product, index) => (
            <ProductCard {...product} key={index} />
          ))}
        </HorizontalList>
      </Container>
      <PopularMakesWrapper padding={{ top: 'xl', bottom: 'xl' }} gap="2rem">
        <Container sm="1400px" centered gap="2rem">
          <Container direction="row" gap="1rem" alignItems="flex-end" justifyContent="space-between">
            <Title title="Popular Makes" fontSize="2xl" bold />
            <Button themeType="link" size="large">
              <Text fontSize="lg">View all</Text> <Icon icon={<BsArrowUpRight />} width="16px" />
            </Button>
          </Container>
          <TabButtonsGroup buttons={[{ label: 'Audi', defaultActive: true }, { label: 'BMW' }, { label: 'Toyota' }]} />
        </Container>
        <HorizontalList>
          {popularMakesProducts.map((product, index) => (
            <ProductCard type="row" {...product} key={index} />
          ))}
        </HorizontalList>
      </PopularMakesWrapper>
      <OtherServices />
      <CantFindVehicleContainer
        direction="row"
        padding={{ top: 'xl', bottom: 'xl' }}
        alignItems="center"
        gap="1rem"
        relative
      >
        <StyledImage1 src={CarSideViewToRightImage} objectFit="cover" width="100%" />
        <Container sm="600px" itemsCentered centered gap="2rem">
          <Title
            centered
            title="Can't find the car you are looking for?"
            description="Reach out to us and we will help you looking"
            gap="1rem"
            fontSize="xl"
          />
          <Button size="large" maxContent>
            Know more
          </Button>
        </Container>
        <StyledImage2 src={CarSideViewToLeftImage} objectFit="cover" width="100%" />
      </CantFindVehicleContainer>
      <Line />
      <CarLot />
      <WhyChooseUs />
    </div>
  );
};

export default Home;
