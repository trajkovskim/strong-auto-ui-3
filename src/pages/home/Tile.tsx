import Container from 'components/Container';
import Icon from 'components/Icon';
import Image from 'components/Image';
import Text from 'components/Text';
import React from 'react';
import { MdOutlineStarPurple500 } from 'react-icons/md';
import styled from 'styled-components';

const StyledTile = styled.div`
  box-sizing: border-box;
  box-shadow: 0px 1px 6px 3px rgba(35, 35, 35, 0.08);
  border-radius: 0.625rem;
  padding: 1.5rem;
`;

type Props = React.ComponentProps<'div'> & {
  imageSrc?: string;
  title?: string;
  rating?: number;
  price?: number;
};

const StyledStarIcon = styled(Icon)`
  margin-bottom: -5px;
  svg {
    fill: #046af2;
  }
`;

const Tile: React.FC<Props> = ({ imageSrc, title, rating, price, ...props }) => {
  return (
    <StyledTile {...props}>
      <Container direction="row" gap="1rem">
        <Image src={imageSrc} objectFit="contain" width="120px" verticalCentered />
        <Container gap="0.3rem">
          <Text>{title}</Text>
          <Container direction="row">
            {new Array(3).fill(0).map((_, index) => (
              <StyledStarIcon key={index} icon={<MdOutlineStarPurple500 />} width="25px" />
            ))}
          </Container>
          <Text fontSize="lg">${price?.toFixed(2)}</Text>
        </Container>
      </Container>
    </StyledTile>
  );
};

export default Tile;
