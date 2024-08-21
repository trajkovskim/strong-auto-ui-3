import { fontSize, inputSize } from 'components/form/Input.styled';
import { Size } from 'components/form/types';
import { textFontSizeMobile, textFontSizeTablet } from 'components/typography/constants';
import styled, { css } from 'styled-components';
import { createMedia } from 'utils';

type StyledInputProps = {
  size?: Size;
  rightContainerWidth?: number;
};

export const StyledSelect = styled.select<StyledInputProps>`
  ${({ size = 'sm', ...props }) => css`
    background: inherit;
    box-sizing: border-box;
    width: 100%;
    height: ${inputSize[size]};
    /* padding: 0 7px; */
    display: inline-block;
    font-size: ${fontSize[size]};
    line-height: 20px;
    /* background-color: #f6f6f6; */
    border: none;
    outline: none;

    padding-right: ${props.rightContainerWidth}px;

    ${() =>
      createMedia(
        'xs',
        css`
          font-size: ${textFontSizeMobile[size ?? 'default']};
        `
      )};
    ${() =>
      createMedia(
        'sm',
        css`
          font-size: ${textFontSizeMobile[size ?? 'default']};
        `
      )};
    ${() =>
      createMedia(
        'md',
        css`
          font-size: ${textFontSizeTablet[size ?? 'default']};
        `
      )};
    ${() => createMedia('lg')};
    ${() => createMedia('xl')};
    ${() => createMedia('2xl')};
  `}
`;

export const StyledOption = styled.option<{ size?: Size }>`
  ${({ size = 'sm' }) => css`
    height: ${inputSize[size]};
    background-color: #fff;
  `};
`;
