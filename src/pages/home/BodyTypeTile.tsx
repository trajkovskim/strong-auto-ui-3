import React from 'react';

import Container from 'components/Container';
import styled from 'styled-components';
import Text from 'components/typography/Text';
import Image from 'components/Image';

const Tile = styled(Container)`
  border-radius: 10px;
  width: 100%;
  border: 1px solid transparent;
  cursor: pointer;

  transition: all 200ms;

  &:hover {
    border-color: #eee;
    /* transform: scale(1.05); */
  }

  user-select: none;
`;

type Props = {
  label: string;
  imageSrc?: React.ComponentProps<'img'>['src'];
  inStock: number;
  onClick?: () => void;
};

const BodyTypeTile: React.FC<Props> = (props) => {
  return (
    <Tile textCentered padding="md" gap="0.5rem" onClick={props.onClick} alignItems="center">
      <Image src={props.imageSrc} alt={props.label} objectFit="contain" centered />
      <Container>
        <Text fontSize="md">{props.label}</Text>
        <Text fontSize="sm" type="sub">
          {props.inStock} available
        </Text>
      </Container>
    </Tile>
  );
};

export default BodyTypeTile;
