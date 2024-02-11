import Icon from 'components/Icon';
import React from 'react';
import { css, styled } from 'styled-components';

type ThemeType = 'link' | 'default' | 'ghost';
type Size = 'small' | 'medium' | 'large';

type StyledProps = {
  themeType?: ThemeType;
  size?: Size;
  bold?: boolean;
  maxContent?: boolean;
  centered?: boolean;
  fullwidth?: boolean;
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
    'border-radius': '25px',
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
    'background-color-hover': '#046af2',
    border: '1px solid rgba(58, 62, 66, 0.527);',
    'color-hover': '#fff',
    'color-active': '#fff',
    'border-radius': '25px',
  },
};

const sizes: Record<Size, Record<string, Partial<Record<ThemeType, string> | string>>> = {
  small: {
    'font-size': '12px',
    'max-width': '80px',
    height: { default: '38px', ghost: '30px' },
  },
  medium: {
    'font-size': '14px',
    'max-width': '100px',
    height: { default: '38px', ghost: '38px' },
  },
  large: {
    'font-size': '16px',
    'max-width': '120px',
    height: { default: '45px', ghost: '45px' },
  },
};

const StyledButton = styled.button<StyledProps>`
  ${({
    themeType = 'default',
    size = 'small',
    maxContent = false,
    centered = false,
    fullwidth = false,
    ...props
  }) => css`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    padding: ${themes[themeType]['padding']};
    background-color: ${themes[themeType]['background-color']};
    border-radius: ${themes[themeType]['border-radius']};
    color: ${themes[themeType]['color'] ?? 'inherit'};
    font-weight: ${props.bold && 'bold'};
    text-align: center;

    transition: all 200ms ease-in-out;
    cursor: pointer;
    position: relative;
    user-select: none;

    margin-left: ${centered && 'auto'};
    margin-right: ${centered && 'auto'};

    width: 100%;
    max-width: ${maxContent ? 'max-content' : sizes[size]['max-width']};
    max-width: ${fullwidth ? '100%' : sizes[size]['max-width']};
    height: ${sizes[size]['height'][themeType]};
    font-size: ${sizes[size]['font-size']};
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
  };

const Button = React.forwardRef<HTMLButtonElement, Props>(({ themeType, children, icon, ...props }, ref) => {
  return (
    <StyledButton ref={ref} themeType={themeType} {...props}>
      {icon && <Icon icon={icon} width="15px" />}
      {children && <span>{children}</span>}
    </StyledButton>
  );
});

Button.displayName = 'Button';

export default Button;
