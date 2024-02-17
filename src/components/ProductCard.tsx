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

const StyledOnImageContainer = styled(Container)`
  position: absolute;
  width: 35px;
  align-items: center;
  height: 35px;
  top: 10px;
  right: 20px;
`;

const ProductCard: React.FC<Props> = (props) => {
  const body = (
    <div>
      <Container
        preserveWhenXs
        padding={{ top: 'sm', bottom: 'sm' }}
        direction="row"
        justifyContent="space-between"
        gap="10px"
      >
        <Container alignItems="center" justifyContent="center" gap="3px">
          <StyledIcon icon={<BsSpeedometer />} width="27px" />
          <Text fontSize="md">{formatNumber(200000)}km</Text>
        </Container>
        <Container alignItems="center" justifyContent="center" gap="3px">
          <StyledIcon icon={<BsSpeedometer />} width="27px" />
          <Text fontSize="md">Petrol</Text>
        </Container>
        <Container alignItems="center" justifyContent="center" gap="3px">
          <StyledIcon icon={<BsSpeedometer />} width="27px" />
          <Text fontSize="md">Manual</Text>
        </Container>
      </Container>
      <StyledLine />
    </div>
  );

  const footer = (
    <Container xs={12} preserveWhenXs direction="row" justifyContent="space-between">
      {props.price?.totalPromo && (
        <Container>
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
      <Container alignSelf="flex-end" xs="max-content">
        <Button themeType="link-colored" size="md" onClick={props.onView} iconRight={<BsArrowUpRight />}>
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
      <Button themeType="default" icon={props.bookmarked ? <BsFillBookmarkFill /> : <BsBookmark />} size="sm" />
    </StyledOnImageContainer>
  );

  return (
    <Card
      fullwidth={props.fullwidth}
      type="column"
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

export default ProductCard;
