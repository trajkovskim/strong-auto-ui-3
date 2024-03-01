import Button from 'components/Button';
import Container from 'components/Container';
import Icon from 'components/Icon';
import Image from 'components/Image';
import Ribbon from 'components/card/Ribbon';
import styled from 'styled-components';

export const StyledImage = styled(Image)`
  transition: all 200ms;
  &:hover {
    transform: scale(1.02);
  }

  width: ${(props) => props.width};
`;

export const StyledRibbon = styled(Ribbon)`
  top: 10px;
  left: 10px;
  position: absolute;
`;

export const StyledBookmarkButton = styled(Button)`
  position: absolute;
  width: 35px;
  align-items: center;
  height: 35px;
  top: 10px;
  right: 20px;
  z-index: 2;
`;

export const StyledIcon = styled(Icon)`
  color: #a5a5a5;
`;

export const PriceWrapper = styled(Container)`
  background-color: #055285;
  color: white;
  transform: skew(10px);
  clip-path: polygon(10% 0, 0 100%, 100% 100%, 100% 0);
  height: 100%;
  align-items: flex-end;
  justify-content: flex-end;
`;
