import BoxAnimation from 'components/BoxAnimation';
import Button from 'components/Button';
import { CarouselHandle } from 'components/Carousel';
import Container from 'components/Container';
import List from 'components/List';
import BookmarkedButton from 'components/card/BookmarkedButton';
import Card from 'components/card/Card';
import { OnImageContainer, PriceWrapper, StyledCarousel, StyledIcon, StyledImage } from 'components/card/Card.styled';
import Ribbon from 'components/card/Ribbon';
import { ribbons } from 'components/card/constants';
import { Props } from 'components/card/types';
import Text from 'components/typography/Text';
import React, { useState } from 'react';
import { BsFuelPumpFill } from 'react-icons/bs';
import { FaRoad } from 'react-icons/fa';
import { TbManualGearbox } from 'react-icons/tb';
import styled from 'styled-components';
import theme from 'theme';
import { formatNumber } from 'utils';

const StyledCard = styled(Card)`
  transition: all 200ms;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);

  & > *:first-child {
    max-height: 600px;
    flex: 1 0 0;
  }

  position: relative;

  cursor: pointer;

  .carousel_change-options {
    z-index: 3;
  }

  .carousel_change-options > *::before {
    border-color: ${theme.productCard.carouselChangeOptionsBorder} !important;
  }

  .carousel_change-option_active::before {
    background-color: ${theme.productCard.carouselChangeOptionsFillColor} !important;
    border-color: ${theme.productCard.carouselChangeOptionsFillBorder} !important;
  }

  &:hover {
    color: #075ebb;

    .carousel_change-options > *::before {
      border-color: ${theme.productCard.carouselChangeOptionsBorderHover} !important;
    }

    .carousel_change-option_active::before {
      background-color: ${theme.productCard.carouselChangeOptionsFillColorHover} !important;
      border-color: ${theme.productCard.carouselChangeOptionsFillBorderHover} !important;
    }
  }
`;

const ProductCardTitleWrapper = styled(Container)`
  button {
    overflow: hidden;
  }

  span {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const ShopProductCard: React.FC<Props> = (props) => {
  const [imageCarouselRef, setImageCarouselRef] = useState<CarouselHandle | null>(null);

  const price = (
    <PriceWrapper>
      {props.price?.totalPromo && (
        <Container styleConfig={{ alignItems: 'end', gap: '0.3rem' }}>
          <Text fontSize="md" textDecoration="line-through">
            ${formatNumber(props.price.total)}
          </Text>
          <Text fontSize="lg" bold>
            ${formatNumber(props.price.totalPromo)}
          </Text>
        </Container>
      )}
      {!props.price?.totalPromo && (
        <Container styleConfig={{ alignItems: 'end' }}>
          <Text fontSize="lg" bold>
            ${formatNumber(props.price.total)}
          </Text>
        </Container>
      )}
    </PriceWrapper>
  );

  const productCardTitlePrice = (
    <Container styleConfig={{ gap: '1rem', direction: 'row', justifyContent: 'space-between', alignItems: 'end' }}>
      <ProductCardTitleWrapper styleConfig={{ overflow: 'hidden' }}>
        <Button fullwidth textAlign="left" themeType="link" onClick={props.onView} size="lg">
          {props.title}
          {props.summary && (
            <Text fontSize="md" title={props.summary}>
              {props.summary}
            </Text>
          )}
        </Button>
      </ProductCardTitleWrapper>
      {price}
    </Container>
  );

  const onImageContainer = (
    <OnImageContainer styleConfig={{ justifyContent: 'space-between', padding: 'md' }}>
      <Container styleConfig={{ direction: 'row', justifyContent: 'space-between', gap: '1rem' }}>
        {props.ribbon && <Ribbon {...ribbons[props.ribbon]} />}
        <BookmarkedButton
          bookmarked={props.bookmarked}
          onClick={(event) => {
            event.stopPropagation();
          }}
        />
      </Container>
    </OnImageContainer>
  );

  const image = (
    <StyledCarousel noChangeOptions noArrows ref={setImageCarouselRef}>
      {props.images?.map((image, index) => (
        <StyledImage key={index} shadow objectFit="cover" height="400px" src={image} />
      ))}
    </StyledCarousel>
  );

  const body = (
    <Container styleConfig={{ gap: '1rem', relative: true, padding: 'md' }}>
      {productCardTitlePrice}
      <List gap="2rem" xs={4} justifyContent="start" elementWidth="auto" style={{ overflow: 'scroll' }}>
        {props.fuelType && (
          <Container styleConfig={{ direction: 'row', gap: '0.3rem', padding: { bottom: 'sm' } }}>
            <StyledIcon size="md" icon={<BsFuelPumpFill />} />
            <Text fontSize="md">{props.fuelType}</Text>
          </Container>
        )}
        {props.transmission && (
          <Container styleConfig={{ direction: 'row', gap: '0.3rem', padding: { bottom: 'sm' } }}>
            <StyledIcon size="md" icon={<TbManualGearbox />} />
            <Text fontSize="md">{props.transmission}</Text>
          </Container>
        )}
        {props.km && (
          <Container styleConfig={{ direction: 'row', gap: '0.3rem', padding: { bottom: 'sm' } }}>
            <StyledIcon size="md" icon={<FaRoad />} />
            <Text fontSize="md">{formatNumber(props.km)}km</Text>
          </Container>
        )}
      </List>
    </Container>
  );

  return (
    <BoxAnimation fullwidth>
      <StyledCard
        fullwidth={props.fullwidth}
        body={body}
        image={image}
        onImageContainer={onImageContainer}
        onClick={props.onView}
        // footer={footer}
        styleConfig={{ bordered: true }}
      />
    </BoxAnimation>
  );
};

export default ShopProductCard;
