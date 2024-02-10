import SUVBodyTypeImage from 'assets/SUV.png';
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
import BodyTypeTile from 'pages/home/BodyTypeTile';
import TabButtonsGroup from 'pages/home/ButtonsGroup';
import CarLot from 'pages/home/CarLot';
import HorizontalList from 'pages/home/HorizontalList';
import OtherServices from 'pages/home/OtherServices';
import WhyChooseUs from 'pages/home/WhyChooseUs';
import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { BsArrowUpRight } from 'react-icons/bs';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';
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

  const bodyTypes = new Array(4).fill({ label: 'SUV', imageSrc: SUVBodyTypeImage }).map((x) => x);

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
            Find cars for sale and for rent near you
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

      <Container sm="1400px" centered gap="2rem" padding={{ top: 'lg', bottom: 'lg' }}>
        <Container direction="row" gap="1rem" alignItems="flex-end" justifyContent="space-between">
          <Title title="Browse by body type" fontSize="2xl" bold />
        </Container>
        <Container direction="row" gap="1rem" justifyContent="space-between">
          {bodyTypes.map((bodyType, index) => (
            <BodyTypeTile key={index} {...bodyType} />
          ))}
        </Container>
        <Container centered>
          <Button maxContent themeType="link">
            <div>Show more</div>
            <Icon icon={<MdKeyboardDoubleArrowDown />} width="25px" />
          </Button>
        </Container>
      </Container>

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
      <Line />
      <CarLot />
      <WhyChooseUs />
    </div>
  );
};

export default Home;
