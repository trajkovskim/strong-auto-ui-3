import Button from 'components/Button';
import Card from 'components/card/Card';
import { StyledBookmarkButton, StyledImage } from 'components/card/Card.styled';
import { ribbons } from 'components/card/constants';
import { Props } from 'components/card/types';
import Carousel from 'components/Carousel';
import Container from 'components/Container';
import Text from 'components/typography/Text';
import React from 'react';
import { BsBookmark, BsBookmarkCheckFill } from 'react-icons/bs';
import styled from 'styled-components';
import { formatNumber } from 'utils';

const PriceWrapper = styled(Container)`
  background-color: #055285;
  color: white;
  transform: skew(10px);
  clip-path: polygon(10% 0, 0 100%, 100% 100%, 100% 0);
`;

const BodyWrapper = styled(Container)`
  position: absolute;
  width: 100%;
  height: 100%;
  color: white;
  bottom: 0;
  right: 0;
  box-shadow: inset 0px -31px 50px -6px black;
`;

const MiniProductCard: React.FC<Props> = (props) => {
  const price = (
    <PriceWrapper
      padding={{ left: 'lg', right: 'sm', top: 'sm', bottom: 'sm' }}
      alignItems="flex-end"
      justifyContent="flex-end"
    >
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
      padding={{ top: 'sm', left: 'sm' }}
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
      <StyledBookmarkButton
        themeType="white"
        icon={props.bookmarked ? <BsBookmarkCheckFill /> : <BsBookmark />}
        size="sm"
      />
      {body}
    </>
  );

  const image = (
    <Carousel noCommands minHeight="230px">
      {props.images?.map((image, index) => (
        <StyledImage key={index} shadow objectFit="cover" height="230px" src={image} />
      ))}
    </Carousel>
  );

  return (
    <Card
      fullwidth={props.fullwidth}
      image={image}
      onImageContainer={onImageContainer}
      ribbon={props.ribbon && ribbons[props.ribbon]}
      onClick={props.onView}
    />
  );
};

export default MiniProductCard;
