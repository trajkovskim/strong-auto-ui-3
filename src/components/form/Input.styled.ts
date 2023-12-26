import styled, { css } from 'styled-components';
import { GiCheckMark } from 'react-icons/gi';
import { BiErrorCircle } from 'react-icons/bi';
import Spinner from 'components/Spinner';

export const StyledRightContainer = styled.span`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
`;

export const iconCss = css`
  user-select: none;
  width: 35px;
  padding: 0 7.5px;
  height: 100%;
`;

export const StyledGiCheckMark = styled(GiCheckMark)`
  ${iconCss}
  color: green;
`;

export const StyledBiErrorCircle = styled(BiErrorCircle)`
  ${iconCss}
  color: red;
`;

export const StyledSpinner = styled(Spinner)`
  ${iconCss}
`;

export type StyledContainerProps = {
  fullwidth?: boolean;
};

export const StyledContainer = styled.div<StyledContainerProps>`
  position: relative;
  width: 100%;
  max-width: ${(props) => (props.fullwidth ? '100%' : '400px')};
`;
