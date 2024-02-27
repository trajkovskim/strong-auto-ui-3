import Button from 'components/Button';
import Card from 'components/card/Card';
import { Attribute, StyledImage, StyledOnImageContainer, Wrapper } from 'components/card/Card.styled';
import { ribbons } from 'components/card/constants';
import { RibbonType } from 'components/card/types';
import Carousel from 'components/Carousel';
import Container from 'components/Container';
import Icon from 'components/Icon';
import Line from 'components/Line';
import Text from 'components/typography/Text';
import React from 'react';
import { BsBookmark, BsBookmarkCheckFill, BsFuelPumpFill, BsSpeedometer } from 'react-icons/bs';
import { TbManualGearbox } from 'react-icons/tb';
import styled from 'styled-components';
import { formatNumber } from 'utils';

type Props = {
  rating?: number;
  title: string;
  description?: string;
  price: {
    total: number;
    totalPromo: number;
    saving: number;
  };
  bookmarked?: boolean;
  images?: string[];
  onView?: () => void;
  inCart?: boolean;
  ribbon?: RibbonType;
  fullwidth?: boolean;
};

const StyledLine = styled(Line)`
  border-color: gray;
`;

const StyledDescription = styled(Text)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const StyledIcon = styled(Icon)`
  color: #a5a5a5;
`;

const ProductCard: React.FC<Props> = (props) => {
  const price = (
    <Container xs={12} padding={{ top: 'sm' }} preserveWhenXs direction="row">
      {props.price?.totalPromo && (
        <Container direction="row" preserveWhenXs alignItems="center" gap="0.3rem">
          <Text fontSize="md" textDecoration="line-through">
            ${formatNumber(props.price.total)}
          </Text>{' '}
          <Text fontSize="lg" bold>
            ${formatNumber(props.price.totalPromo)}
          </Text>
        </Container>
      )}
      {!props.price?.totalPromo && (
        <Container>
          <Text fontSize="lg" bold>
            {formatNumber(props.price.total)}
          </Text>
        </Container>
      )}
    </Container>
  );

  const body = (
    <Container padding={{ top: 'sm', bottom: 'sm', left: 'sm', right: 'sm' }} preserveWhenXs>
      <Button maxContent themeType="link" onClick={props.onView} size="lg">
        <div>{props.title}</div>
        <StyledDescription fontSize="md" title={props.description}>
          {props.description}
        </StyledDescription>
      </Button>
      <StyledLine />
      {price}
    </Container>
  );

  const onImageContainer = (
    <>
      <StyledOnImageContainer preserveWhenXs>
        <Button themeType="white" icon={props.bookmarked ? <BsBookmarkCheckFill /> : <BsBookmark />} size="sm" />
      </StyledOnImageContainer>
    </>
  );

  const productAttributes = (
    <Wrapper gap="2px" xs={3}>
      <Attribute padding="sm" sm={12} direction="row" gap="0.3rem">
        <StyledIcon size="lg" icon={<BsSpeedometer />} />
        <Text fontSize="md">{formatNumber(200000)}km</Text>
      </Attribute>
      <Attribute padding="sm" sm={12} direction="row" gap="0.3rem">
        <StyledIcon size="lg" icon={<BsFuelPumpFill />} />
        <Text fontSize="md">Petrol</Text>
      </Attribute>
      <Attribute padding="sm" sm={12} direction="row" gap="0.3rem">
        <StyledIcon size="lg" icon={<TbManualGearbox />} />
        <Text fontSize="md">Manual</Text>
      </Attribute>
    </Wrapper>
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
