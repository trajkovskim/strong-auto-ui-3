import Button from 'components/Button';
import Card, { RibbonProps } from 'components/Card';
import Container from 'components/Container';
import Icon from 'components/Icon';
import Line from 'components/Line';
import Text from 'components/typography/Text';
import React from 'react';
import { BsArrowUpRight, BsBookmark, BsFillBookmarkFill, BsSpeedometer } from 'react-icons/bs';
import styled from 'styled-components';
import { formatNumber } from 'utils';

type RibbonType = 'sold' | 'featured';

const ribbons: Record<RibbonType, RibbonProps> = {
  sold: {
    background: 'linear-gradient(#f14f3f 0, #cb4335 100%)',
    color: '#fff',
    label: 'Sold',
  },
  featured: {
    background: 'linear-gradient(#54f13f 0, #5fcb35 100%)',
    color: '#fff',
    label: 'Featured',
  },
};

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
  imageSrc?: string;
  onView?: () => void;
  inCart?: boolean;
  ribbon?: RibbonType;
  fullwidth?: boolean;
};

const StyledDescription = styled(Text)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const StyledIcon = styled(Icon)`
  color: #a5a5a5;
`;

const StyledOnImageContainer = styled(Container)`
  position: absolute;
  width: 35px;
  align-items: center;
  height: 35px;
  top: 10px;
  right: 20px;
`;

const ListProductCard: React.FC<Props> = (props) => {
  const body = (
    <Container padding={{ top: 'sm', bottom: 'sm' }} wrap direction="row" gap="1rem">
      <Container preserveWhenXs direction="row" gap="3px">
        <StyledIcon icon={<BsSpeedometer />} width="27px" />
        <Container>
          <Text type="sub" fontSize="sm">
            Mileage
          </Text>
          <Text fontSize="md">{formatNumber(200000)}km</Text>
        </Container>
      </Container>
      <Container preserveWhenXs direction="row" gap="3px">
        <StyledIcon icon={<BsSpeedometer />} width="27px" />
        <Container>
          <Text type="sub" fontSize="sm">
            Fuel type
          </Text>
          <Text fontSize="md">Petrol</Text>
        </Container>
      </Container>
      <Container preserveWhenXs direction="row" gap="3px">
        <StyledIcon icon={<BsSpeedometer />} width="27px" />
        <Container>
          <Text type="sub" fontSize="sm">
            Transmission
          </Text>
          <Text fontSize="md">Manual</Text>
        </Container>
      </Container>
    </Container>
  );

  const footer = (
    <Container direction="row" justifyContent="space-between" gap="0.5rem">
      {props.price?.totalPromo && (
        <Container direction="row" gap="0.5rem" alignItems="flex-end">
          <Text fontSize="md" textDecoration="line-through">
            ${formatNumber(props.price.total)}
          </Text>
          <Text fontSize="lg" bold>
            ${formatNumber(props.price.totalPromo)}
          </Text>
        </Container>
      )}
      {!props.price?.totalPromo && (
        <div>
          <Text fontSize="lg" bold>
            ${formatNumber(props.price.total)}
          </Text>
        </div>
      )}
      <Container direction="row" alignItems="flex-end">
        <Button maxContent themeType="link-colored" size="md" onClick={props.onView} iconRight={<BsArrowUpRight />}>
          View
        </Button>
      </Container>
    </Container>
  );

  const description = (
    <StyledDescription fontSize="md" title={props.description}>
      {props.description}
    </StyledDescription>
  );

  const onImageContainer = (
    <StyledOnImageContainer preserveWhenXs>
      <Button themeType="white" icon={props.bookmarked ? <BsFillBookmarkFill /> : <BsBookmark />} size="sm" />
    </StyledOnImageContainer>
  );

  return (
    <Card
      fullwidth={props.fullwidth}
      type="row"
      body={body}
      footer={footer}
      imageSrc={props.imageSrc}
      onImageContainer={onImageContainer}
      title={<Text fontSize="lg">{props.title}</Text>}
      description={description}
      ribbon={props.ribbon && ribbons[props.ribbon]}
    />
  );
};

export default ListProductCard;
