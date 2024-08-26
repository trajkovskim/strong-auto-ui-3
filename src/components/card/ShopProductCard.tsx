import BoxAnimation from 'components/common/BoxAnimation';
import { CarouselHandle } from 'components/common/Carousel';
import Container from 'components/common/Container';
import List from 'components/common/List';
import BookmarkedButton from 'components/card/BookmarkedButton';
import Card from 'components/common/card/Card';
import { OnImageContainer, StyledCarousel, StyledIcon, StyledImage } from 'components/common/card/Card.styled';
import ProductCardPrice from 'components/card/ProductCardPrice';
import ProductTitle from 'components/card/ProductTitle';
import Ribbon from 'components/common/card/Ribbon';
import { ribbons } from 'components/card/constants';
import { ProductProps } from 'components/card/types';
import Text from 'components/common/typography/Text';
import { useTranslation } from 'hooks';
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

const ShopProductCard: React.FC<ProductProps> = (props) => {
  const t = useTranslation();
  const [, setImageCarouselRef] = useState<CarouselHandle | null>(null);

  const productCardTitlePrice = (
    <Container styleConfig={{ direction: 'row', justifyContent: 'space-between', alignItems: 'end' }}>
      <ProductTitle title={props.title} summary={props.summary} onView={props.onView} />
      <ProductCardPrice amount={props.amount} />
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
      <List gap="1rem" xs={4} justifyContent="start" elementWidth="auto" style={{ overflow: 'scroll' }}>
        {props.fuelType && (
          <Container styleConfig={{ direction: 'row', gap: '0.3rem', padding: { bottom: 'sm' } }}>
            <StyledIcon size="md" icon={<BsFuelPumpFill />} />
            <Text fontSize="md">{t(`vehicleFuelType.${props.fuelType}`)}</Text>
          </Container>
        )}
        {props.transmission && (
          <Container styleConfig={{ direction: 'row', gap: '0.3rem', padding: { bottom: 'sm' } }}>
            <StyledIcon size="md" icon={<TbManualGearbox />} />
            <Text fontSize="md">{t(`vehicleTransmission.${props.transmission}`)}</Text>
          </Container>
        )}
        {props.mileage && (
          <Container styleConfig={{ direction: 'row', gap: '0.3rem', padding: { bottom: 'sm' } }}>
            <StyledIcon size="md" icon={<FaRoad />} />
            <Text fontSize="md"> {t(`vehicleMileage`, { mileage: formatNumber(props.mileage) })}</Text>
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
        styleConfig={{ bordered: true }}
      />
    </BoxAnimation>
  );
};

export default ShopProductCard;
