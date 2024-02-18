import Icon from 'components/Icon';
import Text from 'components/typography/Text';
import React from 'react';
import { css, styled } from 'styled-components';

type ThemeType = 'link' | 'link-colored' | 'default' | 'ghost' | 'delete' | 'success' | 'white';
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
  white: {
    'background-color': '#fff',
    'background-color-hover': '#fff',
    'background-color-active': '#fff',
    'box-shadow-focus': '#046bf257 0 0 0 3px',
    'box-shadow-active': 'rgba(20, 70, 32, 0.2) 0 1px 0 inset',
    border: '1px solid rgba(27, 31, 35, 0.15);',
    color: '#000',
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
  delete: {
    'background-color': 'transparent',
    'color-hover': 'red',
    'color-active': 'red',
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
    'padding-right': '10px',
    'padding-left': '10px',
  },
  'link-colored': {
    'background-color': 'transparent',
    color: '#046af2',
    'color-hover': '#075ebb',
    'color-active': '#255b9475',
    border: '0px',
    'border-radius': '0px',
    paddin: '0px',
  },
  success: {
    'background-color': 'transparent',
    color: '#08bb08',
    'color-hover': '#08ad08',
    'color-active': '#08a108',
    border: '0px',
    'border-radius': '0px',
    paddin: '0px',
  },
};

const sizes: Record<Size, Record<string, Partial<Record<ThemeType, string> | string>>> = {
  sm: {
    'max-width': '80px',
    height: { default: '38px', white: '38px', ghost: '30px' },
  },
  md: {
    'max-width': '100px',
    height: { default: '38px', white: '38px', ghost: '38px' },
  },
  lg: {
    'max-width': '120px',
    height: { default: '45px', white: '45px', ghost: '45px' },
  },
  xl: {
    'max-width': '120px',
    height: { default: '45px', white: '45px', ghost: '45px' },
  },
  '2xl': {
    'max-width': '120px',
    height: { default: '50px', white: '50px', ghost: '50px' },
  },
  '3xl': {
    'max-width': '120px',
    height: { default: '55px', white: '55px', ghost: '50px' },
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
    cursor: ${!!props.onClick && 'pointer'};
    position: relative;
    user-select: none;

    margin-left: ${centered && 'auto'};
    margin-right: ${centered && 'auto'};

    width: 100%;
    max-width: ${(maxContent && !fullwidth) || !sizes[size] ? 'max-content' : sizes[size]['max-width']};
    max-width: ${fullwidth && '100%'};
    height: ${sizes[size] && sizes[size]['height'][themeType]};
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

    return (
      <StyledButton
        ref={ref}
        textAlign={textAlign}
        {...defaultedProps}
        {...props}
        onClick={props.disabled ? undefined : props.onClick}
      >
        {icon && <Icon disabled={props.disabled} icon={icon} size={iconSize} />}
        {children && <Text fontSize={size}>{children}</Text>}
        {iconRight && <Icon disabled={props.disabled} icon={iconRight} size={iconSize} />}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';

export default Button;
