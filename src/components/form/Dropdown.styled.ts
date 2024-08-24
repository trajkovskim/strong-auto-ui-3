import { inputSize } from 'components/form/constants';
import { inputCss, StyledInputWithRightContainerProps } from 'components/form/Input.styled';
import { Size } from 'components/form/types';
import styled from 'styled-components';

export const StyledSelect = styled.select<StyledInputWithRightContainerProps>`
  ${inputCss}
  background: inherit;
`;

export const StyledOption = styled.option<{ size?: Size }>`
  height: ${(props) => props.size && inputSize[props.size]};
  background-color: #fff;
`;
