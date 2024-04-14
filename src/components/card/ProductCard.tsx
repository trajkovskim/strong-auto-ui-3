import Button from 'components/Button';
import Card from 'components/card/Card';
import {
  PriceWrapper,
  StyledBookmarkButton,
  StyledCarousel,
  StyledIcon,
  StyledImage,
} from 'components/card/Card.styled';
import { ribbons } from 'components/card/constants';
import { Props } from 'components/card/types';
import Container from 'components/Container';
import Line from 'components/Line';
import List from 'components/List';
import Text from 'components/typography/Text';
import React, { useState } from 'react';
import { BsBookmark, BsBookmarkCheckFill, BsFuelPumpFill } from 'react-icons/bs';
import { FaRoad } from 'react-icons/fa';
import { TbManualGearbox } from 'react-icons/tb';
import styled from 'styled-components';
import { formatNumber } from 'utils';

const ImageWrapper = styled(Container)`
  height: 100%;
  max-height: 600px;
  &::after {
    content: '';
    position: absolute;
    display: inline-block;
    bottom: -1px;
    width: 100%;
    height: 2.25rem;
    background: -webkit-gradient(linear, left top, left bottom, from(hsla(0, 0%, 100%, 0)), to(#fff));
    background: linear-gradient(hsla(0, 0%, 100%, 0), #fff);
  }
`;

const StyledCard = styled(Card)`
  transition: all 200ms;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  .carousel_change-options {
    z-index: 3;
  }

  &:hover {
    transform: translateY(-2px);
  }
`;

const StyledFooter = styled.div<{ visibleFooter: boolean }>``;

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

const ProductCard: React.FC<Props> = (props) => {
  const [visibleFooter, setVisibleFooter] = useState(false);

  const handleVisibleFooter = () => {
    setVisibleFooter(true);
  };

  const handleVisibleFooterHide = () => {
    setVisibleFooter(false);
  };

  const price = (
    <>
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
    </>
  );

  const body = (
    <Container
      minHeight="80px"
      maxHeight="80px"
      direction="row"
      gap="1rem"
      padding={{ top: 'sm', left: 'md', bottom: 'sm' }}
      justifyContent="space-between"
      alignItems="center"
      preserveWhenXs
    >
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
      <PriceWrapper padding={{ left: 'lg', right: 'sm', top: 'sm', bottom: 'sm' }} preserveWhenXs>
        {price}
      </PriceWrapper>
    </Container>
  );

  const onImageContainer = (
    <>
      <StyledBookmarkButton
        themeType="white"
        icon={props.bookmarked ? <BsBookmarkCheckFill /> : <BsBookmark />}
        size="sm"
        onClick={(event) => {
          event.stopPropagation();
        }}
      />
    </>
  );

  const footer = (
    <StyledFooter visibleFooter={visibleFooter}>
      <Line />
      <List
        gap="2px"
        xs={4}
        overflow="auto"
        justifyContent="space-between"
        padding={{ bottom: 'xs', top: 'xs', left: 'md', right: 'md' }}
      >
        {props.km && (
          <Container preserveWhenXs padding="sm" sm={12} direction="row" gap="0.3rem">
            <Text fontSize="md">{formatNumber(props.km)}km</Text>
            <StyledIcon size="lg" icon={<FaRoad />} />
          </Container>
        )}
        {props.fuelType && (
          <Container preserveWhenXs padding="sm" sm={12} direction="row" gap="0.3rem">
            <Text fontSize="md">{props.fuelType}</Text>
            <StyledIcon size="lg" icon={<BsFuelPumpFill />} />
          </Container>
        )}
        {props.transmission && (
          <Container preserveWhenXs padding="sm" sm={12} direction="row" gap="0.3rem">
            <Text fontSize="md">{props.transmission}</Text>
            <StyledIcon size="lg" icon={<TbManualGearbox />} />
          </Container>
        )}
      </List>
    </StyledFooter>
  );

  const image = (
    <ImageWrapper>
      <StyledCarousel noArrows>
        {props.images?.map((image, index) => (
          <StyledImage key={index} shadow objectFit="cover" height="100%" src={image} />
        ))}
      </StyledCarousel>
    </ImageWrapper>
  );

  return (
    <StyledCard
      onMouseEnter={handleVisibleFooter}
      onMouseLeave={handleVisibleFooterHide}
      fullwidth={props.fullwidth}
      body={body}
      image={image}
      onImageContainer={onImageContainer}
      ribbon={props.ribbon && ribbons[props.ribbon]}
      onClick={props.onView}
      footer={footer}
      bordered
    />
  );
};

export default ProductCard;
