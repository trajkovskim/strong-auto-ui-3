import Button from 'components/Button';
import Card from 'components/card/Card';
import { PriceWrapper, StyledBookmarkButton, StyledIcon, StyledImage } from 'components/card/Card.styled';
import { ribbons } from 'components/card/constants';
import { Props } from 'components/card/types';
import Carousel from 'components/Carousel';
import Container from 'components/Container';
import Line from 'components/Line';
import List from 'components/List';
import Text from 'components/typography/Text';
import React from 'react';
import { BsBookmark, BsBookmarkCheckFill, BsFuelPumpFill } from 'react-icons/bs';
import { FaRoad } from 'react-icons/fa';
import { TbManualGearbox } from 'react-icons/tb';
import styled from 'styled-components';
import { formatNumber } from 'utils';

const ImageWrapper = styled(Container)`
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

  &:hover {
    transform: translateY(-2px);
  }
`;

const ProductCard: React.FC<Props> = (props) => {
  const price = (
    <PriceWrapper padding={{ left: 'lg', right: 'sm', top: 'sm', bottom: 'sm' }} preserveWhenXs>
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
    <Container
      direction="row"
      gap="1rem"
      padding={{ top: 'sm', left: 'md', bottom: 'sm' }}
      justifyContent="space-between"
      alignItems="center"
      preserveWhenXs
    >
      <Container overflow="hidden" alignItems="center">
        <Button maxContent textAlign="left" themeType="link" onClick={props.onView} size="lg">
          <div>{props.title}</div>
          {props.summary && (
            <Text fontSize="md" title={props.summary}>
              {props.summary}
            </Text>
          )}
        </Button>
      </Container>
      <Container preserveWhenXs direction="row">
        {price}
      </Container>
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
    <>
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
    </>
  );

  const image = (
    <ImageWrapper>
      <Carousel noCommands minHeight="230px">
        {props.images?.map((image, index) => (
          <StyledImage key={index} shadow objectFit="cover" height="230px" src={image} />
        ))}
      </Carousel>
    </ImageWrapper>
  );

  return (
    <StyledCard
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
