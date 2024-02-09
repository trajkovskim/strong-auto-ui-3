import React from 'react';
import styled, { css } from 'styled-components';
import theme from 'theme';

export type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

type Sides = {
  top?: Breakpoints;
  bottom?: Breakpoints;
  left?: Breakpoints;
  right?: Breakpoints;
};

type StyledContainerProps = {
  [key in Breakpoints]?: string | number;
} & {
  margin?: Breakpoints | Sides;
  padding?: Breakpoints | Sides;
  direction?: React.CSSProperties['flexDirection'];
  alignItems?: React.CSSProperties['alignItems'];
  alignSelf?: React.CSSProperties['alignSelf'];
  justifySelf?: React.CSSProperties['justifySelf'];
  justifyContent?: React.CSSProperties['justifyContent'];
  textAlign?: React.CSSProperties['textAlign'];
  userSelect?: React.CSSProperties['userSelect'];
  gap?: React.CSSProperties['gap'];
  wrap?: boolean;
  centered?: boolean;
  itemsCentered?: boolean;
  textCentered?: boolean;
  bordered?: boolean;
  parentGap?: React.CSSProperties['gap'];
  preserveWhenXs?: boolean;
  relative?: boolean;
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
  display: flex;
  position: ${(props) => props.relative && 'relative'};

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

  margin-left: ${(props) => props.centered && 'auto'};
  margin-right: ${(props) => props.centered && 'auto'};

  user-select: ${(props) => props.userSelect};

  gap: ${(props) => props.gap};

  border: ${(props) => props.bordered && '1px solid black'};

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
  React.PropsWithChildren<React.ComponentProps<'div'> & Omit<StyledContainerProps, 'breakpoints'>>
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
