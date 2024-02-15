import Button from 'components/Button';
import Card, { RibbonProps } from 'components/Card';
import Container from 'components/Container';
import Icon from 'components/Icon';
import Line from 'components/Line';
import Text from 'components/typography/Text';
import React from 'react';
import { BsArrowUpRight, BsSpeedometer } from 'react-icons/bs';
import styled from 'styled-components';
import { formatNumber } from 'utils';

type RibbonType = 'sold' | 'featured';

const ribbons: Record<RibbonType, RibbonProps> = {
  sold: {
    background: 'linear-gradient(#f14f3f 0, #cb4335 100%)',
    color: '#fff',
    label: 'SOLD',
  },
  featured: {
    background: 'linear-gradient(#f14f3f 0, #cb4335 100%)',
    color: '#fff',
    label: 'FEATURED',
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
  imageSrc?: string;
  onView?: () => void;
  inCart?: boolean;
  ribbon?: RibbonType;
  type?: 'column' | 'row';
};

const StyledLine = styled(Line)`
  border-color: gray;
`;

const StyledDescription = styled(Text)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ProductCard: React.FC<Props> = ({ type = 'column', ...props }) => {
  const body = (
    <div>
      <StyledLine />
      <Container
        padding={{ top: 'sm', bottom: 'sm' }}
        direction={type === 'row' ? 'column' : 'row'}
        justifyContent="space-between"
        gap="10px"
      >
        <Container
          direction={type}
          alignItems={type === 'column' ? 'center' : undefined}
          justifyContent={type === 'column' ? 'center' : undefined}
          gap="3px"
        >
          <Icon icon={<BsSpeedometer />} width="27px" />
          <Text fontSize="md">{formatNumber(200000)}km</Text>
        </Container>
        <Container
          direction={type}
          alignItems={type === 'column' ? 'center' : undefined}
          justifyContent={type === 'column' ? 'center' : undefined}
          gap="3px"
        >
          <Icon icon={<BsSpeedometer />} width="27px" />
          <Text fontSize="md">Petrol</Text>
        </Container>
        <Container
          direction={type}
          alignItems={type === 'column' ? 'center' : undefined}
          justifyContent={type === 'column' ? 'center' : undefined}
          gap="3px"
        >
          <Icon icon={<BsSpeedometer />} width="27px" />
          <Text fontSize="md">Manual</Text>
        </Container>
      </Container>
      {type === 'column' && <StyledLine />}
    </div>
  );

  const footer = (
    <Container direction="row" justifyContent="space-between" alignItems="center">
      {props.price?.totalPromo && (
        <div>
          <Text fontSize="md" textDecoration="line-through">
            {formatNumber(props.price.total)}
          </Text>{' '}
          <Text fontSize="lg" bold>
            {formatNumber(props.price.totalPromo)}
          </Text>
        </div>
      )}
      {!props.price?.totalPromo && (
        <div>
          <Text fontSize="lg" bold>
            {formatNumber(props.price.total)}
          </Text>
        </div>
      )}
      <Container direction="row" alignItems="flex-end">
        <Button themeType="link" size="md" onClick={props.onView} iconRight={<BsArrowUpRight />}>
          View details
        </Button>
      </Container>
    </Container>
  );

  const description = (
    <StyledDescription fontSize="md" title={props.description}>
      {props.description}
    </StyledDescription>
  );

  return (
    <Card
      type={type}
      body={body}
      footer={footer}
      imageSrc={props.imageSrc}
      title={<Text fontSize="lg">{props.title}</Text>}
      description={description}
    />
  );
};

export default ProductCard;
