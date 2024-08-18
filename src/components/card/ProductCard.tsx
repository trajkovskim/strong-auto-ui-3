import Button from 'components/Button';
import { CarouselHandle } from 'components/Carousel';
import Container from 'components/Container';
import BookmarkedButton from 'components/card/BookmarkedButton';
import Card from 'components/card/Card';
import { PriceWrapper, StyledCarousel, StyledImage } from 'components/card/Card.styled';
import { ribbons } from 'components/card/constants';
import { Props } from 'components/card/types';
import Text from 'components/typography/Text';
import BoxAnimation from 'pages/home/BoxAnimation';
import React, { useState } from 'react';
import styled from 'styled-components';
import theme from 'theme';
import { formatNumber } from 'utils';

const ImageWrapper = styled(Container)`
  height: 100%;
  max-height: 600px;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -webkit-box-shadow: inset 0px -36px 60px -20px black;
    -moz-box-shadow: inset 0px -36px 60px -20px black;
    box-shadow: inset 0px -36px 60px -20px black;
    overflow: hidden;
  }
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

const BodyTitleWrapper = styled(Container)`
  button {
    display: block;
  }

  span {
    white-space: nowrap;
    display: block;
    text-overflow: ellipsis;
  }
`;

const BodyWrapper = styled(Container)`
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  right: 0;
`;

const ProductCard: React.FC<Props> = (props) => {
  const [imageCarouselRef, setImageCarouselRef] = useState<CarouselHandle | null>(null);

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
      <Container xs={12} preserveWhenXs direction="row" alignItems="end">
        <BodyTitleWrapper overflow="hidden">
          <Button maxContent textAlign="left" themeType="link" onClick={props.onView} size="lg">
            <Text>{props.title}</Text>
            {props.summary && (
              <Text fontSize="md" title={props.summary}>
                {props.summary}
              </Text>
            )}
          </Button>
        </BodyTitleWrapper>
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
    <ImageWrapper>
      <StyledCarousel noChangeOptions noArrows ref={setImageCarouselRef}>
        {props.images?.map((image, index) => (
          <StyledImage key={index} shadow objectFit="cover" height="450px" src={image} />
        ))}
      </StyledCarousel>
    </ImageWrapper>
  );

  // const footer = (
  //   <Container alignItems="center">
  //     <CarouselChangeOptions carousel={imageCarouselRef} />
  //   </Container>
  // );
  // const footer = (
  //   <StyledFooter>
  //     <Line />
  //     <List
  //       gap="2px"
  //       xs={4}
  //       overflow="auto"
  //       justifyContent="space-between"
  //       padding={{ bottom: 'xs', top: 'xs', left: 'md', right: 'md' }}
  //     >
  //       {props.km && (
  //         <Container preserveWhenXs padding="sm" sm={12} direction="row" gap="0.3rem">
  //           <Text fontSize="md">{formatNumber(props.km)}km</Text>
  //           <StyledIcon size="lg" icon={<FaRoad />} />
  //         </Container>
  //       )}
  //       {props.fuelType && (
  //         <Container preserveWhenXs padding="sm" sm={12} direction="row" gap="0.3rem">
  //           <Text fontSize="md">{props.fuelType}</Text>
  //           <StyledIcon size="lg" icon={<BsFuelPumpFill />} />
  //         </Container>
  //       )}
  //       {props.transmission && (
  //         <Container preserveWhenXs padding="sm" sm={12} direction="row" gap="0.3rem">
  //           <Text fontSize="md">{props.transmission}</Text>
  //           <StyledIcon size="lg" icon={<TbManualGearbox />} />
  //         </Container>
  //       )}
  //     </List>
  //   </StyledFooter>
  // );

  return (
    <BoxAnimation>
      <StyledCard
        fullwidth={props.fullwidth}
        // body={body}
        image={image}
        onImageContainer={onImageContainer}
        ribbon={props.ribbon && ribbons[props.ribbon]}
        onClick={props.onView}
        // footer={footer}
        bordered
      />
    </BoxAnimation>
  );
};

export default ProductCard;
