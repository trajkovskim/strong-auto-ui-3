import Container from 'components/Container';
import Icon from 'components/Icon';
import Image from 'components/Image';
import Text from 'components/typography/Text';
import React from 'react';
import { BsSpeedometer } from 'react-icons/bs';
import styled from 'styled-components';
import { formatNumber } from 'utils';

const StyledTile = styled.div`
  background-color: #fff;
  border: 1px solid #eee;
  padding: 1.5rem;
  position: relative;

  &:hover {
    border-color: #ccc;
  }
`;

type Props = React.ComponentProps<'div'> & {
  imageSrc?: string;
  title?: string;
  price?: number;
};

const StyledTileWrapper = styled(Container)`
  overflow: hidden;
`;

const Tile: React.FC<Props> = ({ imageSrc, title, price, ...props }) => {
  return (
    <StyledTileWrapper padding="xs">
      <StyledTile {...props}>
        <Container direction="row" gap="1rem">
          <Image src={imageSrc} objectFit="contain" width="120px" verticalCentered />
          <Container gap="0.3rem">
            <Text fontSize="lg">{title}</Text>
            <Container direction="row" gap="3px">
              <Icon icon={<BsSpeedometer />} width="15px" /> <Text>{formatNumber(200000)}km</Text>
            </Container>
            <Text fontSize="lg">${price?.toFixed(2)}</Text>
          </Container>
        </Container>
      </StyledTile>
    </StyledTileWrapper>
  );
};

export default Tile;
