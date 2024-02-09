import FiatLogo from 'assets/fiat-logo.png';
import Logo from 'assets/logo.png';
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
import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { BsArrowUpRight } from 'react-icons/bs';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
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

const Tile = styled(Container)`
  border-radius: 10px;
  width: 100%;
  max-width: 250px;
  max-height: 200px;
`;

const StyledArrowButton = styled(Button)`
  padding-left: 20px;
  padding-right: 20px;
`;

const PopularMakesWrapper = styled(Container)`
  background-color: #232323;
  color: #fff;
`;

const HorizontalList = styled(Container)`
  > * {
    flex: 1 0 100%;
  }
`;

const Home: React.FC = () => {
  const navigate = useNavigate();

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

      <Container sm="1400px" centered gap="4rem" padding={{ top: 'xl', bottom: 'xl' }}>
        <Container direction="row" gap="1rem" alignItems="flex-end" justifyContent="space-between">
          <Title title="Browse by body work" fontSize="2xl" bold />
          <Button themeType="link" size="large">
            <Text fontSize="lg">View all</Text> <Icon icon={<BsArrowUpRight />} width="16px" />
          </Button>
        </Container>
        <Container direction="row" gap="1rem" justifyContent="space-between">
          <Tile textCentered padding="md" gap="1rem">
            <Image src={FiatLogo} alt="Fiat" objectFit="contain" width="200px" centered />
            <Text>SUV</Text>
          </Tile>
          <Tile textCentered padding="md" gap="1rem">
            <Image src={FiatLogo} alt="Fiat" objectFit="contain" width="200px" centered />
            <Text>SUV</Text>
          </Tile>
          <Tile textCentered padding="md" gap="1rem">
            <Image src={FiatLogo} alt="Fiat" objectFit="contain" width="200px" centered />
            <Text>SUV</Text>
          </Tile>
          <Tile textCentered padding="md" gap="1rem">
            <Image src={FiatLogo} alt="Fiat" objectFit="contain" width="200px" centered />
            <Text>SUV</Text>
          </Tile>
        </Container>
      </Container>

      <Container sm="1400px" centered gap="4rem" padding={{ top: 'xl', bottom: 'xl' }}>
        <Container direction="row" gap="1rem" alignItems="flex-end" justifyContent="space-between">
          <Title title="Explore All Vehicles" fontSize="2xl" bold />
          <Button themeType="link" size="large">
            <Text fontSize="lg">View all</Text> <Icon icon={<BsArrowUpRight />} width="16px" />
          </Button>
        </Container>
        <Line />
        <HorizontalList direction="row" gap="1rem">
          <ProductCard
            ribbon="sold"
            price={95000}
            title="Toyota Camry New"
            description="3.5D Power pulse Momentum 5dr RWD"
          />
          <ProductCard
            ribbon="sold"
            price={95000}
            title="Toyota Camry New"
            description="3.5D Power pulse Momentum 5dr RWD"
          />
          <ProductCard
            ribbon="sold"
            price={95000}
            title="Toyota Camry New"
            description="3.5D Power pulse Momentum 5dr RWD"
          />
          <ProductCard
            ribbon="sold"
            price={95000}
            title="Toyota Camry New"
            description="3.5D Power pulse Momentum 5dr RWD"
          />
          <ProductCard
            ribbon="sold"
            price={95000}
            title="Toyota Camry New"
            description="3.5D Power pulse Momentum 5dr RWD"
          />
          <ProductCard
            ribbon="sold"
            price={95000}
            title="Toyota Camry New"
            description="3.5D Power pulse Momentum 5dr RWD"
          />
          <ProductCard
            ribbon="sold"
            price={95000}
            title="Toyota Camry New"
            description="3.5D Power pulse Momentum 5dr RWD"
          />
          <ProductCard
            ribbon="sold"
            price={95000}
            title="Toyota Camry New"
            description="3.5D Power pulse Momentum 5dr RWD"
          />
        </HorizontalList>
        <Container preserveWhenXs direction="row" gap="1rem">
          <StyledArrowButton icon={<MdArrowBackIos />} themeType="ghost" />
          <StyledArrowButton icon={<MdArrowForwardIos />} themeType="ghost" />
        </Container>
      </Container>
      <PopularMakesWrapper padding={{ top: 'xl', bottom: 'xl' }}>
        <Container sm="1400px" centered gap="4rem" margin={{ left: '2xl' }}>
          <Container direction="row" gap="1rem" alignItems="flex-end" justifyContent="space-between">
            <Title title="Popular Makes" fontSize="2xl" bold />
            <Button themeType="link" size="large">
              <Text fontSize="lg">View all</Text> <Icon icon={<BsArrowUpRight />} width="16px" />
            </Button>
          </Container>
          <Line />
          <HorizontalList direction="row" gap="1rem">
            <ProductCard
              type="row"
              ribbon="sold"
              price={95000}
              title="Toyota Camry New"
              description="3.5D Power pulse Momentum 5dr RWD"
            />
            <ProductCard
              type="row"
              ribbon="sold"
              price={95000}
              title="Toyota Camry New"
              description="3.5D Power pulse Momentum 5dr RWD"
            />
            <ProductCard
              type="row"
              ribbon="sold"
              price={95000}
              title="Toyota Camry New"
              description="3.5D Power pulse Momentum 5dr RWD"
            />
            <ProductCard
              type="row"
              ribbon="sold"
              price={95000}
              title="Toyota Camry New"
              description="3.5D Power pulse Momentum 5dr RWD"
            />
          </HorizontalList>
          <Container preserveWhenXs xs={'max-content'} centered direction="row" gap="1rem">
            <StyledArrowButton icon={<MdArrowBackIos />} themeType="ghost" />
            <StyledArrowButton icon={<MdArrowForwardIos />} themeType="ghost" />
          </Container>
        </Container>
      </PopularMakesWrapper>
    </div>
  );
};

export default Home;
