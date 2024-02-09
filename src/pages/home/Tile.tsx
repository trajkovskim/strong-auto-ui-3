import { Ribbon, RibbonProps } from 'components/Card';
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

type RibbonType = 'sold' | 'featured' | 'recent';

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
  recent: {
    background: 'linear-gradient(#9ef13f 0, #6ccb35 100%)',
    color: '#fff',
    label: 'RECENT',
  },
};

type Props = React.ComponentProps<'div'> & {
  imageSrc?: string;
  title?: string;
  rating?: number;
  price?: number;
  ribbon?: RibbonType;
};

const StyledTileWrapper = styled(Container)`
  overflow: hidden;
`;

const Tile: React.FC<Props> = ({ imageSrc, title, rating, price, ribbon, ...props }) => {
  return (
    <StyledTileWrapper preserveWhenXs padding="xs">
      <StyledTile {...props}>
        <Container preserveWhenXs direction="row" gap="1rem">
          {ribbon && <Ribbon {...ribbons[ribbon]}>{ribbons[ribbon].label}</Ribbon>}
          <Image src={imageSrc} objectFit="contain" width="120px" verticalCentered />
          <Container gap="0.3rem">
            <Text fontSize="lg">{title}</Text>
            <Container preserveWhenXs direction="row" gap="3px">
              <Icon icon={<BsSpeedometer />} width="15px" /> <Text>{formatNumber(200000)}km</Text>
            </Container>
            <Text fontSize="sm" type="sub">
              Petrol | 2000 CC | Manual
            </Text>
            <Text fontSize="lg">${price?.toFixed(2)}</Text>
          </Container>
        </Container>
      </StyledTile>
    </StyledTileWrapper>
  );
};

export default Tile;
