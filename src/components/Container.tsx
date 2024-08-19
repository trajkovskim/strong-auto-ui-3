import React from 'react';
import styled, { css } from 'styled-components';
import theme, { Breakpoints } from 'theme';
import { createMedia } from 'utils';

export type ContainerBreakpointsProps = {
  [key in Breakpoints]?: string | number;
};

export type Sides<T> = {
  top?: T;
  bottom?: T;
  left?: T;
  right?: T;
};

export type Edges<T> = {
  topLeft?: T;
  topRight?: T;
  bottomLeft?: T;
  bottomRight?: T;
};

type StyledContainerProps = ContainerBreakpointsProps & {
  margin?: Breakpoints | Sides<Breakpoints>;
  padding?: Breakpoints | Sides<Breakpoints>;
  direction?: React.CSSProperties['flexDirection'];
  alignItems?: React.CSSProperties['alignItems'];
  alignSelf?: React.CSSProperties['alignSelf'];
  justifySelf?: React.CSSProperties['justifySelf'];
  justifyContent?: React.CSSProperties['justifyContent'];
  textAlign?: React.CSSProperties['textAlign'];
  userSelect?: React.CSSProperties['userSelect'];
  gap?: React.CSSProperties['gap'];
  wrap?: boolean;
  centered?: boolean | 'vertical' | 'horizontal';
  itemsCentered?: boolean;
  textCentered?: boolean;
  bordered?: boolean | Sides<boolean>;
  rounded?: boolean | Edges<boolean>;
  parentGap?: React.CSSProperties['gap'];
  preserveWhenXs?: boolean;
  relative?: boolean;
  absolute?: boolean;
  zIndex?: number;
  overflow?: React.CSSProperties['overflow'];
  minHeight?: React.CSSProperties['minHeight'];
  maxHeight?: React.CSSProperties['maxHeight'];
};

const MAX_COLUMNS = 12;

const calculateColumnPercentage = (breakpoint: number) => {
  return (breakpoint * 100) / MAX_COLUMNS + '%';
};

const createMediaQ = (props: StyledContainerProps, breakpoint: Breakpoints, csss?: string) => {
  const gap = props[breakpoint] !== MAX_COLUMNS ? props.parentGap ?? '0rem' : '0rem';

  return createMedia(
    breakpoint,
    css`
      display: ${typeof props[breakpoint] === 'number' && props[breakpoint] === 0 && 'none'};

      width: ${typeof props[breakpoint] === 'string' && `calc(100% - ${gap})`};
      max-width: ${typeof props[breakpoint] === 'string' && props[breakpoint]};

      width: ${typeof props[breakpoint] === 'number' &&
      `calc(${calculateColumnPercentage(props[breakpoint] as number)} - ${gap})`};
      ${csss};
    `
  );
};

export const createPaddingProperty = (padding?: Sides<Breakpoints> | Breakpoints) => css`
  padding: ${typeof padding === 'string' && theme.padding[padding]};

  ${typeof padding === 'object' &&
  css`
    padding-top: ${padding.top && theme.padding[padding.top]};
    padding-bottom: ${padding.bottom && theme.padding[padding.bottom]};
    padding-left: ${padding.left && theme.padding[padding.left]};
    padding-right: ${padding.right && theme.padding[padding.right]};
  `}
`;

export const createMarginProperty = (margin?: Sides<Breakpoints> | Breakpoints) => css`
  margin: ${typeof margin === 'string' && theme.padding[margin]};

  ${typeof margin === 'object' &&
  css`
    margin-top: ${margin.top && theme.padding[margin.top]};
    margin-bottom: ${margin.bottom && theme.padding[margin.bottom]};
    margin-left: ${margin.left && theme.padding[margin.left]};
    margin-right: ${margin.right && theme.padding[margin.right]};
  `}
`;

export const createBorderProperty = (bordered?: Sides<boolean> | boolean) => css`
  --border: 1px solid #eee;
  border: ${typeof bordered === 'boolean' && bordered && 'var(--border)'};
  ${typeof bordered == 'object' &&
  css`
    border-top: ${bordered.top && 'var(--border)'};
    border-left: ${bordered.left && 'var(--border)'};
    border-bottom: ${bordered.bottom && 'var(--border)'};
    border-right: ${bordered.right && 'var(--border)'};
  `}
`;

export const createBorderRadiusProperty = (rounded?: Edges<boolean> | boolean) => css`
  --border-radius: 15px;
  border-radius: ${typeof rounded === 'boolean' && rounded && 'var(--border-radius)'};
  ${typeof rounded == 'object' &&
  css`
    border-top-left-radius: ${rounded.topLeft && 'var(--border-radius)'};
    border-top-right-radius: ${rounded.topRight && 'var(--border-radius)'};
    border-bottom-left-radius: ${rounded.bottomLeft && 'var(--border-radius)'};
    border-bottom-right-radius: ${rounded.bottomRight && 'var(--border-radius)'};
  `}
`;

const StyledContainer = styled.div<StyledContainerProps>`
  min-height: ${(props) => props.minHeight};
  max-height: ${(props) => props.maxHeight};
  box-sizing: border-box;
  display: flex;
  position: ${(props) => props.relative && 'relative'};
  position: ${(props) => props.absolute && 'absolute'};

  z-index: ${(props) => props.zIndex && `${props.zIndex} !important`};

  overflow: ${(props) => props.overflow};

  ${(props) => createPaddingProperty(props.padding)}
  ${(props) => createMarginProperty(props.margin)}
  ${(props) => createBorderRadiusProperty(props.rounded)}
  ${(props) => createBorderProperty(props.bordered)};

  margin-top: ${(props) => props.centered !== 'horizontal' && !!props.centered && 'auto'};
  margin-bottom: ${(props) => props.centered !== 'horizontal' && !!props.centered && 'auto'};
  margin-left: ${(props) => props.centered !== 'vertical' && !!props.centered && 'auto'};
  margin-right: ${(props) => props.centered !== 'vertical' && !!props.centered && 'auto'};

  user-select: ${(props) => props.userSelect};

  gap: ${(props) => props.gap};

  flex-direction: ${(props) => props.direction ?? 'column'};
  flex-wrap: ${(props) => props.wrap && 'wrap'};

  align-items: ${(props) => props.alignItems};
  align-items: ${(props) => props.itemsCentered && 'center'};

  align-self: ${(props) => props.alignSelf};
  justify-self: ${(props) => props.justifySelf};

  justify-content: ${(props) => props.justifyContent};
  justify-content: ${(props) => props.itemsCentered && 'center'};

  text-align: ${(props) => props.textAlign};
  text-align: ${(props) => props.textCentered && 'center'};

  ${(props) =>
    !props.preserveWhenXs &&
    css`
      @media (max-width: ${theme.breakpoints.maxWidth.sm}) {
        flex-direction: column !important;
        width: 100% !important;
        padding: ${props.padding && theme.padding.sm};
        margin: 0 auto;
        justify-content: center !important;
      }
    `}

  ${(props) => createMediaQ(props, 'xs')};
  ${(props) => createMediaQ(props, 'sm')};
  ${(props) => createMediaQ(props, 'md')};
  ${(props) => createMediaQ(props, 'lg')};
  ${(props) => createMediaQ(props, 'xl')};
  ${(props) => createMediaQ(props, '2xl')};
  ${(props) => createMediaQ(props, '3xl')};
`;

type Props = React.PropsWithRef<
  React.PropsWithChildren<React.ComponentProps<'div'> & Omit<StyledContainerProps, 'breakpoints' | 'childrenCount'>>
>;

const Container = React.forwardRef<HTMLDivElement, Props>(({ children, ...props }, ref) => {
  props.sm = props.sm ?? props.xs;
  props.md = props.md ?? props.sm;
  props.lg = props.lg ?? props.md;
  props.xl = props.xl ?? props.lg;
  props['2xl'] = props['2xl'] ?? props.xl;
  props['3xl'] = props['3xl'] ?? props['2xl'];

  const childProps =
    props.direction?.startsWith('row') && props.wrap
      ? { parentGap: parseFloat(props.gap?.toString() ?? '0') / 2 + 'rem' }
      : undefined;

  return (
    <StyledContainer ref={ref} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return React.cloneElement<any>(child, childProps);
        }

        return child;
      })}
    </StyledContainer>
  );
});

Container.displayName = 'Container';

export default Container;
