import Card from 'components/Card';
import Container from 'components/Container';
import Icon from 'components/Icon';
import Text from 'components/Text';
import React from 'react';
import { BsCartCheck, BsCartPlus } from 'react-icons/bs';
import styled from 'styled-components';
import { MdOutlineStarPurple500 } from 'react-icons/md';

type Props = {
  rating?: number;
  title: string;
  price: number;
  imageSrc?: string;
  onAddToCart?: () => void;
  onRemoveFromCart?: () => void;
  inCart?: boolean;
};

const StyledIcon = styled(Icon)`
  svg {
    transition: all 100ms;

    &:hover {
      fill: #046af2;
    }
  }
`;

const StyledStarIcon = styled(Icon)`
  margin-bottom: -5px;
  svg {
    fill: #046af2;
  }
`;

const ProductCard: React.FC<Props> = (props) => {
  const body = (
    <>
      <Container direction="row">
        {new Array(3).fill(0).map((_, index) => (
          <StyledStarIcon key={index} icon={<MdOutlineStarPurple500 />} width="25px" />
        ))}
      </Container>
    </>
  );

  const footer = (
    <Container direction="row" justifyContent="space-between" alignItems="flex-end">
      <Text type="primary" fontSize="xl">
        ${props.price.toFixed(2)}
      </Text>
      {props.inCart ? (
        <StyledIcon icon={<BsCartCheck />} width="30px" onClick={props.onRemoveFromCart} />
      ) : (
        <StyledIcon icon={<BsCartPlus />} width="30px" onClick={props.onAddToCart} />
      )}
    </Container>
  );

  return <Card body={body} footer={footer} imageSrc={props.imageSrc} title={props.title} />;
};

export default ProductCard;
