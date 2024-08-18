import Button from 'components/Button';
import BookmarkedButton from 'components/card/BookmarkedButton';
import Card from 'components/card/Card';
import { PriceWrapper, StyledCarousel, StyledImage } from 'components/card/Card.styled';
import { ribbons } from 'components/card/constants';
import { Props } from 'components/card/types';
import Container from 'components/Container';
import Text from 'components/typography/Text';
import BoxAnimation from 'components/BoxAnimation';
import React from 'react';
import styled from 'styled-components';
import theme from 'theme';
import { formatNumber } from 'utils';

const BodyWrapper = styled(Container)`
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  right: 0;
  box-shadow: inset 0px -31px 50px -6px black;
`;

const StyledCard = styled(Card)`
  transition: all 200ms;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);

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
    <PriceWrapper padding={{ left: 'lg', right: 'sm' }} preserveWhenXs>
      {props.price?.totalPromo && (
        <Container preserveWhenXs alignItems="flex-end" gap="0.3rem">
          <Text fontSize="md" textDecoration="line-through">
            ${formatNumber(props.price.total)}
          </Text>{' '}
          <Text fontSize="lg" bold>
            ${formatNumber(props.price.totalPromo)}
          </Text>
        </Container>
      )}
      {!props.price?.totalPromo && (
        <Container alignItems="flex-end" preserveWhenXs>
          <Text fontSize="lg" bold>
            ${formatNumber(props.price.total)}
          </Text>
        </Container>
      )}
    </PriceWrapper>
  );

  const body = (
    <BodyWrapper
      preserveWhenXs
      direction="row"
      gap="1rem"
      padding="md"
      justifyContent="space-between"
      alignItems="flex-end"
    >
      <Container overflow="hidden" padding={{ top: 'sm' }}>
        <Button maxContent themeType="link" onClick={props.onView} size="lg">
          <div>{props.title}</div>
        </Button>
      </Container>
      <Container preserveWhenXs direction="row">
        {price}
      </Container>
    </BodyWrapper>
  );

  const onImageContainer = (
    <>
      <BookmarkedButton
        bookmarked={props.bookmarked}
        onClick={(event) => {
          event.stopPropagation();
        }}
      />
      {body}
    </>
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
        ribbon={props.ribbon && ribbons[props.ribbon]}
        onClick={props.onView}
      />
    </BoxAnimation>
  );
};

export default MiniProductCard;
