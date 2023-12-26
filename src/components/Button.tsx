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
};

const themes: Record<ThemeType, Record<string, string>> = {
  default: {
    'background-color': '#2ea44f',
    'background-color-hover': '#2c974b',
    'background-color-active': '#298e46',
    'box-shadow-focus': 'rgba(46, 164, 79, 0.4) 0 0 0 3px',
    'box-shadow-active': 'rgba(20, 70, 32, 0.2) 0 1px 0 inset',
    border: '1px solid rgba(27, 31, 35, 0.15);',
    color: '#fff',
    'border-radius': '6px',
  },
  link: {
    'background-color': 'transparent',
    'color-hover': '#3888dd',
    'color-active': '#298e46',
    border: '0px',
    'border-radius': '0px',
  },
  ghost: {
    'background-color': 'transparent',
    'background-color-hover': '#2c974b',
    border: '1px solid rgba(27, 31, 35, 0.15);',
    color: '#000',
    'color-hover': '#fff',
    'color-active': '#fff',
    'border-radius': '0px',
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
  ${({ themeType = 'default', size = 'small', maxContent = false, ...props }) => css`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    padding: 8px;
    background-color: ${themes[themeType]['background-color']};
    border-radius: ${themes[themeType]['border-radius']};
    color: ${themes[themeType]['color']};
    font-weight: ${props.bold && 'bold'};

    transition: all 200ms ease-in-out;
    cursor: pointer;
    z-index: 1;
    user-select: none;

    width: 100%;
    max-width: ${maxContent ? 'max-content' : sizes[size]['max-width']};
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
    <div>
      <StyledButton ref={ref} themeType={themeType} {...props}>
        {icon && <Icon icon={icon} width="15px" />}
        <span>{children}</span>
      </StyledButton>
    </div>
  );
});

Button.displayName = 'Button';

export default Button;
