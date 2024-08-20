import Carousel from 'components/Carousel';
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
  height: ${(props) => props.height ?? '100%'};
`;

export const StyledRibbon = styled(Ribbon)``;

export const StyledIcon = styled(Icon)`
  color: #a5a5a5;
`;

export const PriceWrapper = styled(Container)`
  /* background-color: #055285;
  color: white;
  transform: skew(10px);
  clip-path: polygon(10% 0, 0 100%, 100% 100%, 100% 0);
  align-items: flex-end;
  justify-content: flex-end; */
`;

export const StyledCarousel = styled(Carousel)`
  height: 100%;
  max-height: 600px;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: inset 0px -31px 50px -6px black;

    /* -webkit-box-shadow: inset 0px -36px 60px -20px black;
    -moz-box-shadow: inset 0px -36px 60px -20px black;
    box-shadow: inset 0px -36px 60px -20px black; */
    overflow: hidden;
  }
`;

export const OnImageContainer = styled(Container)`
  position: absolute;
  width: 100%;
  height: 100%;
`;
