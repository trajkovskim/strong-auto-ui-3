import React from 'react';

import Container from 'components/Container';
import styled from 'styled-components';
import Text from 'components/typography/Text';
import Image from 'components/Image';

const Tile = styled(Container)`
  border-radius: 10px;
  width: 100%;
  max-width: 250px;
  border: 1px solid transparent;
  cursor: pointer;

  transition: all 200ms;

  &:hover {
    border-color: #eee;
    /* transform: scale(1.05); */
  }
`;

type Props = {
  label: string;
  imageSrc?: React.ComponentProps<'img'>['src'];
  onClick?: () => void;
};

const BodyTypeTile: React.FC<Props> = (props) => {
  return (
    <Tile textCentered padding="md" gap="1rem" onClick={props.onClick}>
      <Image src={props.imageSrc} alt={props.label} objectFit="contain" width="200px" centered />
      <Text>{props.label}</Text>
    </Tile>
  );
};

export default BodyTypeTile;
