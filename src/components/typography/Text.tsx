import { Breakpoints } from 'components/Container';
import { textFontSize, textFontSizeMobile, textFontSizeTablet } from 'components/typography/constants';
import { FontSize, TextType } from 'components/typography/types';
import React from 'react';
import styled, { css } from 'styled-components';
import theme from 'theme';

type StyledTextProps = {
  type?: TextType;
  textAlign?: React.CSSProperties['textAlign'];
  textDecoration?: React.CSSProperties['textDecoration'];
  fontSize?: FontSize;
  bold?: boolean;
  maxContent?: boolean;
  nowrap?: boolean;
};

const colors: Record<TextType, string> = {
  base: 'inherit',
  primary: '#000',
  sub: '#a5a5a5',
};

const createMedia = (props: StyledTextProps, breakpoint: Breakpoints, csss?: ReturnType<typeof css>) => {
  const minWidth = `(min-width: ${theme.breakpoints.minWidth[breakpoint]})`;
  const maxWidth = breakpoint !== '2xl' ? `and (max-width: ${theme.breakpoints.maxWidth[breakpoint]})` : '';

  return css`
    @media ${minWidth}${maxWidth} {
      ${csss};
    }
  `;
};

const StyledText = styled.span<StyledTextProps>`
  display: inline-block;
  color: ${(props) => colors[props.type ?? 'base']};
  text-align: ${(props) => props.textAlign};
  width: ${(props) => props.maxContent && 'max-content'};

  font-size: ${(props) => textFontSize[props.fontSize ?? 'default']};
  font-weight: ${(props) => props.bold && 'bold'};
  cursor: ${(props) => props.onClick && 'pointer'};
  white-space: ${(props) => props.nowrap && 'nowrap'};
  text-decoration: ${(props) => props.textDecoration};

  ${(props) =>
    createMedia(
      props,
      'xs',
      css`
        font-size: ${textFontSizeMobile[props.fontSize ?? 'default']};
      `
    )};
  ${(props) =>
    createMedia(
      props,
      'sm',
      css`
        font-size: ${textFontSizeMobile[props.fontSize ?? 'default']};
      `
    )};
  ${(props) =>
    createMedia(
      props,
      'md',
      css`
        font-size: ${textFontSizeTablet[props.fontSize ?? 'default']};
      `
    )};
  ${(props) => createMedia(props, 'lg')};
  ${(props) => createMedia(props, 'xl')};
  ${(props) => createMedia(props, '2xl')};
`;

type Props = React.ComponentProps<'span'> & React.PropsWithChildren & StyledTextProps;

const Text = React.forwardRef<HTMLSpanElement, Props>((props, ref) => {
  return <StyledText ref={ref} {...props} />;
});

Text.displayName = 'Text';

export default Text;
