import Button from 'components/Button';
import BookmarkedButton from 'components/card/BookmarkedButton';
import Card from 'components/card/Card';
import { OnImageContainer, PriceWrapper, StyledCarousel, StyledImage } from 'components/card/Card.styled';
import { ribbons } from 'components/card/constants';
import { Props } from 'components/card/types';
import Container from 'components/Container';
import Text from 'components/typography/Text';
import BoxAnimation from 'components/BoxAnimation';
import React from 'react';
import styled from 'styled-components';
import theme from 'theme';
import { formatNumber } from 'utils';
import Ribbon from 'components/card/Ribbon';

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

  color: white;

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

const MiniProductCard: React.FC<Props> = (props) => {
  const price = (
    <PriceWrapper styleConfig={{ padding: { left: 'lg', right: 'sm' } }}>
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
    <Container styleConfig={{ direction: 'row', gap: '1rem', justifyContent: 'space-between', alignItems: 'flex-end' }}>
      <Container styleConfig={{ overflow: 'hidden', padding: { top: 'sm' } }}>
        <Button size="lg" maxContent themeType="link" onClick={props.onView}>
          <div>{props.title}</div>
        </Button>
      </Container>
      <Container styleConfig={{ direction: 'row' }}>{price}</Container>
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
      {productCardTitlePrice}
    </OnImageContainer>
  );
  const image = (
    <StyledCarousel noChangeOptions>
      {props.images?.map((image, index) => (
        <StyledImage key={index} shadow objectFit="cover" src={image} />
      ))}
    </StyledCarousel>
  );

  return (
    <BoxAnimation fullheight>
      <StyledCard
        fullwidth={props.fullwidth}
        image={image}
        onImageContainer={onImageContainer}
        onClick={props.onView}
      />
    </BoxAnimation>
  );
};

export default MiniProductCard;
