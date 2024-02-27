import React from 'react';
import styled, { css } from 'styled-components';
import theme from 'theme';

export type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

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

type StyledContainerProps = {
  [key in Breakpoints]?: string | number;
} & {
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
  zIndex?: number;
};

const MAX_COLUMNS = 12;

const calculateColumnPercentage = (breakpoint: number) => {
  return (breakpoint * 100) / MAX_COLUMNS + '%';
};

const createMedia = (props: StyledContainerProps, breakpoint: Breakpoints, csss?: string) => {
  const minWidth = `(min-width: ${theme.breakpoints.minWidth[breakpoint]})`;
  const maxWidth = breakpoint !== '2xl' ? `and (max-width: ${theme.breakpoints.maxWidth[breakpoint]})` : '';

  const gap = props.parentGap ?? '0rem';

  return css`
    @media ${minWidth}${maxWidth} {
      display: ${typeof props[breakpoint] === 'number' && props[breakpoint] === 0 && 'none'};
      width: ${typeof props[breakpoint] === 'string' && `calc(100% - ${gap})`};
      max-width: ${typeof props[breakpoint] === 'string' && props[breakpoint]};
      width: ${typeof props[breakpoint] === 'number' &&
      `calc(${calculateColumnPercentage(props[breakpoint] as number)} - ${gap})`};
      ${csss};
    }
  `;
};

const StyledContainer = styled.div<StyledContainerProps>`
  box-sizing: border-box;
  display: flex;
  position: ${(props) => props.relative && 'relative'};

  z-index: ${(props) => props.zIndex && `${props.zIndex} !important`};

  padding: ${(props) => typeof props.padding === 'string' && theme.padding[props.padding]};
  ${(props) =>
    typeof props.padding === 'object' &&
    css`
      padding-top: ${props.padding.top && theme.padding[props.padding.top]};
      padding-bottom: ${props.padding.bottom && theme.padding[props.padding.bottom]};
      padding-left: ${props.padding.left && theme.padding[props.padding.left]};
      padding-right: ${props.padding.right && theme.padding[props.padding.right]};
    `}

  margin: ${(props) => typeof props.margin === 'string' && theme.padding[props.margin]};
  ${(props) =>
    typeof props.margin == 'object' &&
    css`
      margin-top: ${props.margin.top && theme.padding[props.margin.top]};
      margin-bottom: ${props.margin.bottom && theme.padding[props.margin.bottom]};
      margin-left: ${props.margin.left && theme.padding[props.margin.left]};
      margin-right: ${props.margin.right && theme.padding[props.margin.right]};
    `}

  --border-radius: 15px;
  border-radius: ${(props) => typeof props.rounded === 'boolean' && props.rounded && 'var(--border-radius)'};
  ${(props) =>
    typeof props.rounded == 'object' &&
    css`
      border-top-left-radius: ${props.rounded.topLeft && 'var(--border-radius)'};
      border-top-right-radius: ${props.rounded.topRight && 'var(--border-radius)'};
      border-bottom-left-radius: ${props.rounded.bottomLeft && 'var(--border-radius)'};
      border-bottom-right-radius: ${props.rounded.bottomRight && 'var(--border-radius)'};
    `}

  --border: 1px solid #eee;
  border: ${(props) => typeof props.bordered === 'boolean' && props.bordered && 'var(--border)'};
  ${(props) =>
    typeof props.bordered == 'object' &&
    css`
      border-top: ${props.bordered.top && 'var(--border)'};
      border-left: ${props.bordered.left && 'var(--border)'};
      border-bottom: ${props.bordered.bottom && 'var(--border)'};
      border-right: ${props.bordered.right && 'var(--border)'};
    `}

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

  ${(props) => createMedia(props, 'xs')};
  ${(props) => createMedia(props, 'sm')};
  ${(props) => createMedia(props, 'md')};
  ${(props) => createMedia(props, 'lg')};
  ${(props) => createMedia(props, 'xl')};
  ${(props) => createMedia(props, '2xl')};
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

  return (
    <StyledContainer ref={ref} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return React.cloneElement<any>(child, { parentGap: props.gap });
        }

        return child;
      })}
    </StyledContainer>
  );
});

Container.displayName = 'Container';

export default Container;
