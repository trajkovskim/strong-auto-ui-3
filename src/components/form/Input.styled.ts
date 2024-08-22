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

export const fontSize: Record<FontSize, string> = {
  sm: textFontSize.sm,
  md: textFontSize.sm,
  lg: textFontSize.md,
  xl: textFontSize.md,
  '2xl': textFontSize.lg,
  '3xl': textFontSize.xl,
  default: 'inherit',
};

export const inputSize: Record<Size, string> = {
  sm: `calc(${textFontSize.sm} + 25px)`,
  md: `calc(${textFontSize.md} + 30px)`,
  lg: `calc(${textFontSize.lg} + 35px)`,
  xl: `calc(${textFontSize.xl} + 40px)`,
  '2xl': `calc(${textFontSize['2xl']} + 45px)`,
  '3xl': `calc(${textFontSize['2xl']} + 50px)`,
  default: 'auto',
};

export const getCalcInputHeightCss = (size: FontSize, includeLabelSize = false) =>
  includeLabelSize ? `calc(${inputSize[size]} + ${fontSize[size]} / 2)` : inputSize[size];

type StyledInputWithRightContainerProps = StyledInputProps & { rightContainerWidth?: number };

const inputCss = css<StyledInputWithRightContainerProps>`
  width: 100%;
  padding: 10px;
  font-size: inherit;
  line-height: 20px;
  outline: none;
  border: ${(props) => (props.noBorder ? 'none' : '1px solid rgb(238, 238, 238)')};
  border-radius: 4px;

  padding-right: ${(props) => `${props.rightContainerWidth}px`};
  transition: 100ms all;

  &::placeholder {
    font-size: inherit;
  }

  &:focus {
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    /* border: 1px solid black; */
  }
`;

export const StyledInput = styled.input<StyledInputWithRightContainerProps>`
  ${inputCss}
  height: 100%;
  padding-left: 10px;
`;

export const StyledTextarea = styled.textarea<StyledInputWithRightContainerProps>`
  ${inputCss}
  padding-left: 8px;
`;

export const InputWrapper = styled(Container)<{ label?: string; size?: FontSize }>`
  height: ${(props) => props.size && getCalcInputHeightCss(props.size, false)};
  font-size: ${(props) => props.size && fontSize[props.size]};
  position: relative;

  ${(props) =>
    props.label &&
    css`
      height: ${props.size && getCalcInputHeightCss(props.size, true)};
      > input,
      textarea {
        padding-top: ${props.size && `calc(${props.size && fontSize[props.size]} + 10px)`};
      }

      &::before {
        content: '${props.label}';
        pointer-events: none;
        top: 5px;
        left: 10px;
        font-size: ${props.size && `calc(${fontSize[props.size]} - ${fontSize[props.size]} / 4.5)`};
        position: absolute;
      }
    `}
`;

export const TextareaWrapper = styled(InputWrapper)`
  height: unset !important;
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
