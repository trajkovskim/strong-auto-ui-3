import CarServiceMechanicImage from 'assets/car-service-mechanic.jpg';
import RoadImage from 'assets/road.jpg';
import TowTruckImage from 'assets/tow-truck.jpg';
import Container from 'components/Container';
import Image from 'components/Image';
import ServiceTile from 'pages/home/ServiceTile';
import styled from 'styled-components';
import theme from 'theme';

export const HomeWrapper = styled(Container)`
  background-image: url(${RoadImage});
  background-repeat: no-repeat;
  background-size: cover;
  color: white;

  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.3;
    z-index: 2;
  }

  > * {
    z-index: 3;
  }
`;

export const CarouselWrapper = styled(Container)`
  color: white;

  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.5;
    z-index: 2;
  }

  > * {
    z-index: 3;
  }
`;

export const PopularMakesWrapper = styled(Container)`
  background-color: #232323;
  color: #fff;
`;

export const WhiteBackgroundContainer = styled(Container)`
  background-color: white;
  color: black;
`;

export const StyledBuyCarImage = styled(Image)`
  border-bottom-right-radius: 150px;
  box-shadow: 0px 35px 5px -17px #a3a3a3, 18px 57px 16px -17px #b8b8b8;
  /* clip-path: ellipse(67% 75% at 75% 66%); */
`;

export const StyledRightImage = styled(Image)`
  border-bottom-left-radius: 150px;
  border-top-left-radius: 150px;
  box-shadow: 0px 35px 5px -17px #a3a3a3, 18px 57px 16px -17px #b8b8b8;
  /* clip-path: ellipse(67% 75% at 75% 66%); */
`;

export const TowingServiceServiceTile = styled(ServiceTile)`
  background-image: url(${TowTruckImage});
  background-size: cover;
  background-position: center center;
  transition: 200ms;
  height: 300px;

  &::before {
    content: '';
    background-color: #000;
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    top: 0;
    left: 0;
  }

  & > * {
    z-index: 1;
  }
`;

export const CarServiceServiceTile = styled(ServiceTile)`
  background-image: url(${CarServiceMechanicImage});
  background-size: cover;
  background-position: center center;
  transition: 200ms;
  height: 300px;

  &::before {
    content: '';
    background-color: #000;
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    top: 0;
    left: 0;
  }

  & > * {
    z-index: 1;
  }
`;

export const BuyingACarImageContainer = styled(Container)<{ left?: boolean }>`
  min-height: 499px;
  max-width: 800px;
  width: 100%;
  z-index: -1;
  position: absolute;
  right: ${(props) => props.left && '0'};

  &::before {
    content: '';
    background-color: #fff;
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.6;
    top: 0;
    left: 0;
    z-index: 1;

    border-bottom-right-radius: ${(props) => !props.left && '150px'};

    border-bottom-left-radius: ${(props) => props.left && '150px'};
    border-top-left-radius: ${(props) => props.left && '150px'};
  }
`;

export const BuyingACarTextContainer = styled(Container)<{ left?: boolean }>`
  @media (min-width: ${theme.breakpoints.minWidth.xl}) {
    position: relative;
    left: ${(props) => !props.left && '150px'};

    right: ${(props) => props.left && '150px'};
  }
`;
