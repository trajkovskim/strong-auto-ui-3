import ProductCard from 'components/ProductCard';
import React, { useCallback } from 'react';
import Logo from 'assets/logo.png';
import styled from 'styled-components';
import Container from 'components/Container';
import Title from 'components/Title';
import Line from 'components/Line';
import Tile from 'pages/home/Tile';

const StyledList = styled.div`
  display: grid;
  grid-template: auto / repeat(5, auto);
  gap: 1rem;
`;

const Home: React.FC = () => {
  const handleAddToCart = useCallback((id: number) => {
    console.log(id);
  }, []);
  const handleRemoveFromCart = useCallback((id: number) => {
    console.log(id);
  }, []);

  return (
    <Container sm="1400px" centered padding="lg">
      <Container padding={{ bottom: 'lg', top: 'lg' }} gap="1rem">
        <Title title="DEALS" bold />
        <Line />
        <StyledList>
          <ProductCard
            price={12.5}
            title="Clutch kit BMW 1 Series"
            onAddToCart={() => handleAddToCart(0)}
            onRemoveFromCart={() => handleRemoveFromCart(0)}
            imageSrc={Logo}
          />
          <ProductCard
            price={12.5}
            title="Clutch kit BMW 1 Series"
            onAddToCart={() => handleAddToCart(0)}
            onRemoveFromCart={() => handleRemoveFromCart(0)}
            imageSrc={Logo}
          />
          <ProductCard
            price={12.5}
            title="Clutch kit BMW 1 Series"
            onAddToCart={() => handleAddToCart(0)}
            onRemoveFromCart={() => handleRemoveFromCart(0)}
            imageSrc={Logo}
          />
          <ProductCard
            price={12.5}
            title="Clutch kit BMW 1 Series"
            onAddToCart={() => handleAddToCart(0)}
            onRemoveFromCart={() => handleRemoveFromCart(0)}
            imageSrc={Logo}
          />
        </StyledList>
      </Container>
      <Container direction="row" padding={{ bottom: 'lg', top: 'lg' }} gap="2rem">
        <Container sm={4} gap="1.5rem">
          <Title title="RECENT PRODUCTS" bold />
          <Line />
          <Tile title="BMW 1 Series" price={12.5} imageSrc={Logo} />
          <Tile title="BMW 1 Series" price={12.5} imageSrc={Logo} />
          <Tile title="BMW 1 Series" price={12.5} imageSrc={Logo} />
        </Container>
        <Container sm={4} gap="1.5rem">
          <Title title="FEATURED PRODUCTS" bold />
          <Line />
          <Tile title="BMW 1 Series" price={12.5} imageSrc={Logo} />
          <Tile title="BMW 1 Series" price={12.5} imageSrc={Logo} />
          <Tile title="BMW 1 Series" price={12.5} imageSrc={Logo} />
        </Container>
        <Container sm={4} gap="1.5rem">
          <Title title="BEST SELLERS" bold />
          <Line />
          <Tile title="BMW 1 Series" price={12.5} imageSrc={Logo} />
          <Tile title="BMW 1 Series" price={12.5} imageSrc={Logo} />
          <Tile title="BMW 1 Series" price={12.5} imageSrc={Logo} />
        </Container>
      </Container>
    </Container>
  );
};

export default Home;
