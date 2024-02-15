import Icon from 'components/Icon';
import { textFontSize } from 'components/typography/constants';
import React from 'react';
import { css, styled } from 'styled-components';

type ThemeType = 'link' | 'default' | 'ghost';
type Size = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

type StyledProps = {
  themeType?: ThemeType;
  size?: Size;
  bold?: boolean;
  maxContent?: boolean;
  centered?: boolean;
  fullwidth?: boolean;
  textAlign?: React.CSSProperties['textAlign'];
};

const themes: Record<ThemeType, Record<string, string>> = {
  default: {
    'background-color': '#046af2',
    'background-color-hover': '#075ebb',
    'background-color-active': '#255b9475',
    'box-shadow-focus': '#046bf257 0 0 0 3px',
    'box-shadow-active': 'rgba(20, 70, 32, 0.2) 0 1px 0 inset',
    border: '1px solid rgba(27, 31, 35, 0.15);',
    color: '#fff',
    paddin: '0px',
    'border-radius': '25px',
    'padding-right': '10px',
    'padding-left': '10px',
  },
  link: {
    'background-color': 'transparent',
    'color-hover': '#075ebb',
    'color-active': '#255b9475',
    border: '0px',
    'border-radius': '0px',
    paddin: '0px',
  },
  ghost: {
    'background-color': 'transparent',
    'background-color-hover': '#050B20',
    border: '1px solid rgba(58, 62, 66, 0.527);',
    'color-hover': '#fff',
    'color-active': '#fff',
    'border-radius': '25px',
  },
};

const sizes: Record<Size, Record<string, Partial<Record<ThemeType, string> | string>>> = {
  sm: {
    'font-size': textFontSize.sm,
    'max-width': '80px',
    height: { default: '38px', ghost: '30px' },
  },
  md: {
    'font-size': textFontSize.md,
    'max-width': '100px',
    height: { default: '38px', ghost: '38px' },
  },
  lg: {
    'font-size': textFontSize.lg,
    'max-width': '120px',
    height: { default: '45px', ghost: '45px' },
  },
  xl: {
    'font-size': textFontSize.xl,
    'max-width': '120px',
    height: { default: '45px', ghost: '45px' },
  },
  '2xl': {
    'font-size': textFontSize['2xl'],
    'max-width': '120px',
    height: { default: '50px', ghost: '50px' },
  },
  '3xl': {
    'font-size': textFontSize['3xl'],
    'max-width': '120px',
    height: { default: '55px', ghost: '50px' },
  },
};

const StyledButton = styled.button<StyledProps>`
  ${({
    themeType = 'default',
    size = 'sm',
    maxContent = false,
    centered = false,
    fullwidth = false,
    textAlign,
    ...props
  }) => css`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    padding-top: ${themes[themeType]['padding-top']};
    padding-right: ${themes[themeType]['padding-right']};
    padding-bottom: ${themes[themeType]['padding-bottom']};
    padding-left: ${themes[themeType]['padding-left']};

    background-color: ${themes[themeType]['background-color']};
    border-radius: ${themes[themeType]['border-radius']};
    color: ${themes[themeType]['color'] ?? 'inherit'};
    font-weight: ${props.bold && 'bold'};
    text-align: ${textAlign};

    transition: all 200ms ease-in-out;
    cursor: pointer;
    position: relative;
    user-select: none;

    margin-left: ${centered && 'auto'};
    margin-right: ${centered && 'auto'};

    width: 100%;
    max-width: ${(maxContent && !fullwidth) || !sizes[size] ? 'max-content' : sizes[size]['max-width']};
    max-width: ${fullwidth && '100%'};
    height: ${sizes[size] && sizes[size]['height'][themeType]};
    font-size: ${sizes[size] && sizes[size]['font-size']};
    border: ${themes[themeType]['border']};

    &:focus {
      box-shadow: ${themes[themeType]['box-shadow-focus']};
    }

    &:hover {
      background-color: ${themes[themeType]['background-color-hover']};
      color: ${themes[themeType]['color-hover']};
    }

    &:active {
      color: ${themes[themeType]['color-hover']};
      background-color: ${themes[themeType]['background-color-active']};
      box-shadow: ${themes[themeType]['box-shadow-active']};
    }
  `}
`;

type Props = StyledProps &
  React.ComponentProps<'button'> & {
    icon?: React.ReactNode;
    iconRight?: React.ReactNode;
    iconSize?: Size;
  };

const Button = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      themeType = 'default',
      size = 'sm',
      iconSize = size,
      maxContent = false,
      centered = false,
      fullwidth = false,
      textAlign = 'left',
      children,
      icon,
      iconRight,
      ...props
    },
    ref
  ) => {
    const defaultedProps = { themeType, size, maxContent, centered, fullwidth };

    const iconWidth = textFontSize[iconSize] ? textFontSize[iconSize] : '15px';

    return (
      <StyledButton ref={ref} textAlign={textAlign} {...defaultedProps} {...props}>
        {icon && <Icon icon={icon} width={iconWidth} />}
        {children && <span>{children}</span>}
        {iconRight && <Icon icon={iconRight} width={iconWidth} />}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';

export default Button;
