import Spinner from 'components/Spinner';
import { Size } from 'components/form/types';
import { BiErrorCircle } from 'react-icons/bi';
import { GiCheckMark } from 'react-icons/gi';
import styled, { css } from 'styled-components';

export type StyledInputProps = {
  size?: Size;
  noBorder?: boolean;
};

export const size: Record<Size, string> = {
  small: '32px',
  medium: '39px',
  large: '49px',
};

export const fontSize: Record<Size, string> = {
  small: '12px',
  medium: '16px',
  large: '18px',
};

export const StyledInput = styled.input<StyledInputProps & { rightContainerWidth?: number }>`
  width: 100%;
  height: 100%;
  height: ${(props) => props.size && size[props.size]};
  padding: 7px;
  padding-left: 12px;
  font-size: ${(props) => props.size && fontSize[props.size]};
  line-height: 20px;
  outline: none;
  border: ${(props) => (props.noBorder ? 'none' : '1px solid #dcdcdc')};
  border-radius: 15px;

  padding-right: ${(props) => `${props.rightContainerWidth}px`};

  &::placeholder {
    font-size: ${(props) => props.size && fontSize[props.size]};
  }

  &:focus {
    border-color: #cdcdcd;
  }
`;

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
