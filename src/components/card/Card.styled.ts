import Container from 'components/Container';
import Image from 'components/Image';
import List from 'components/List';
import { StyledRibbonProps } from 'components/card/types';
import styled from 'styled-components';

export const StyledImage = styled(Image)`
  transition: all 200ms;
  &:hover {
    transform: scale(1.02);
  }

  width: ${(props) => props.width};
`;

export const Ribbon = styled(Container)<StyledRibbonProps>`
  top: 10px;
  left: 10px;
  position: absolute;
  background: ${(props) => props.background};
  color: ${(props) => props.color};
  user-select: none;
`;

export const StyledOnImageContainer = styled(Container)`
  position: absolute;
  width: 35px;
  align-items: center;
  height: 35px;
  top: 10px;
  right: 20px;
`;

export const Wrapper = styled(List)`
  background-color: #eee;
`;

export const Attribute = styled(Container)``;
