import ProductCard from 'components/ProductCard';
import React from 'react';
import Logo from 'assets/logo.png';
import styled from 'styled-components';
import Container from 'components/Container';

const StyledList = styled.div`
  display: grid;
  grid-template: auto / repeat(5, auto);
  gap: 1rem;
`;

const Home: React.FC = () => {
  return (
    <Container sm="1400px" centered padding="lg">
      <StyledList>
        <ProductCard price={12.5} title="Clutch kit BMW 1 Series" onAddToCart={() => undefined} imageSrc={Logo} />
        <ProductCard price={12.5} title="Clutch kit BMW 1 Series" onAddToCart={() => undefined} imageSrc={Logo} />
        <ProductCard price={12.5} title="Clutch kit BMW 1 Series" onAddToCart={() => undefined} imageSrc={Logo} />
        <ProductCard price={12.5} title="Clutch kit BMW 1 Series" onAddToCart={() => undefined} imageSrc={Logo} />
      </StyledList>
    </Container>
  );
};

export default Home;
