import Container from 'components/Container';
import Spinner from 'components/Spinner';
import { Size } from 'components/form/types';
import { textFontSize } from 'components/typography/constants';
import { FontSize } from 'components/typography/types';
import { BiErrorCircle } from 'react-icons/bi';
import { GiCheckMark } from 'react-icons/gi';
import styled, { css } from 'styled-components';

export type StyledInputProps = {
  size?: Size;
  noBorder?: boolean;
};

export const fontSize: Record<FontSize, string> = textFontSize;

export const inputSize: Record<Size, string> = {
  sm: `calc(${fontSize.sm} + 25px)`,
  md: `calc(${fontSize.md} + 30px)`,
  lg: `calc(${fontSize.lg} + 35px)`,
  xl: `calc(${fontSize.xl} + 40px)`,
  '2xl': `calc(${fontSize['2xl']} + 45px)`,
  '3xl': `calc(${fontSize['2xl']} + 50px)`,
  default: 'auto',
};

export const getCalcInputHeightCss = (size: FontSize) => `calc(${inputSize[size]} + ${fontSize[size]} / 2)`;

export const InputWrapper = styled(Container)<{ label?: string; size?: FontSize }>`
  height: 100%;
  position: relative;

  ${(props) =>
    props.label &&
    css`
      > input {
        padding-top: ${props.size && `calc(${props.size && fontSize[props.size]} + 5px)`};
        height: ${props.size && getCalcInputHeightCss(props.size)};
        line-height: ${props.size && `calc(${inputSize[props.size]} + ${fontSize[props.size]})`};
      }
    `}

  &::before {
    content: '${(props) => props.label}';
    pointer-events: none;
    top: 5px;
    left: 10px;
    font-size: ${(props) => props.size && `calc(${textFontSize[props.size]} - ${textFontSize[props.size]} / 3.5)`};
    position: absolute;
  }
`;

export const TextareaWrapper = styled(InputWrapper)``;

export const StyledInput = styled.input<StyledInputProps & { rightContainerWidth?: number }>`
  width: 100%;
  height: 100%;
  height: ${(props) => props.size && inputSize[props.size]};
  padding: 10px;
  padding-left: 10px;
  font-size: ${(props) => props.size && fontSize[props.size]};
  line-height: 20px;
  outline: none;
  border: ${(props) => (props.noBorder ? 'none' : '1px solid rgb(238, 238, 238)')};
  border-radius: 4px;

  padding-right: ${(props) => `${props.rightContainerWidth}px`};

  &::placeholder {
    font-size: ${(props) => props.size && fontSize['sm']};
  }

  transition: 100ms all;

  &:focus {
    box-shadow: 0 3px 3px rgb(0 0 0 / 0.2);
    /* border: 1px solid black; */
  }
`;

export const StyledTextarea = styled.textarea<StyledInputProps & { rightContainerWidth?: number }>`
  width: 100%;
  height: 100%;
  /* height: ${(props) => props.size && inputSize[props.size]}; */
  padding: 10px;
  padding-left: 10px;
  font-size: ${(props) => props.size && fontSize[props.size]};
  line-height: 20px;
  outline: none;
  border: ${(props) => (props.noBorder ? 'none' : '1px solid rgb(238, 238, 238)')};
  border-radius: 4px;

  padding-right: ${(props) => `${props.rightContainerWidth}px`};

  &::placeholder {
    font-size: ${(props) => props.size && fontSize[props.size]};
  }

  transition: 100ms all;

  &:focus {
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    /* border: 1px solid black; */
  }
`;

export const StyledRightContainer = styled.span`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  display: flex;
  padding-right: 5px;
  align-items: center;
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
  /* position: relative; */
  width: 100%;
  max-width: ${(props) => (props.fullwidth ? '100%' : 'max-content')};
`;
