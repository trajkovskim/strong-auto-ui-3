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
import { formatNumber } from 'utils';

const ProductCard: React.FC<Props> = (props) => {
  const price = (
    <PriceWrapper padding={{ left: 'lg', right: 'sm', top: 'sm', bottom: 'sm' }}>
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
    <Container preserveWhenXs>
      <Container
        direction="row"
        gap="1rem"
        padding={{ top: 'sm', left: 'md', bottom: 'sm' }}
        justifyContent="space-between"
      >
        <Container overflow="hidden" alignItems="center" padding={{ top: 'sm' }}>
          <Button maxContent themeType="link" onClick={props.onView} size="lg">
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
      <Line />
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

  const productAttributes = (
    <List gap="2px" xs={4}>
      {props.km && (
        <Container padding="sm" sm={12} direction="row" gap="0.3rem">
          <Text fontSize="md">{formatNumber(props.km)}km</Text>
          <StyledIcon size="lg" icon={<FaRoad />} />
        </Container>
      )}
      {props.fuelType && (
        <Container padding="sm" sm={12} direction="row" gap="0.3rem">
          <Text fontSize="md">{props.fuelType}</Text>
          <StyledIcon size="lg" icon={<BsFuelPumpFill />} />
        </Container>
      )}
      {props.transmission && (
        <Container padding="sm" sm={12} direction="row" gap="0.3rem">
          <Text fontSize="md">{props.transmission}</Text>
          <StyledIcon size="lg" icon={<TbManualGearbox />} />
        </Container>
      )}
    </List>
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
      xs={'calc(100% - 16px)'}
      sm={'calc(100% - 16px)'}
      md={'calc(50% - 16px)'}
      lg={'calc(33.33% - 16px)'}
      xl={'calc(25% - 16px)'}
      {...{ '2xl': 'calc(20% - 16px)' }}
      fullwidth={props.fullwidth}
      body={body}
      image={image}
      onImageContainer={onImageContainer}
      ribbon={props.ribbon && ribbons[props.ribbon]}
      onClick={props.onView}
      footer={productAttributes}
      bordered
    />
  );
};

export default ProductCard;
