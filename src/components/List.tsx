import React from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import theme from 'theme';

export enum ListView {
  GRID = 'grid',
  LIST = 'list',
}

type StyledListProps = {
  gap?: React.CSSProperties['gap'];
  justifyContent?: React.CSSProperties['justifyContent'];
  view?: ListView;
  childrenCount: number;
};

const StyledList = styled.div<StyledListProps>`
  display: grid;
  gap: ${(props) => props.gap};
  justify-content: ${(props) => (props.view === ListView.GRID && props.justifyContent) ?? 'space-evenly'};

  grid-template: auto / ${(props) =>
      props.view === ListView.LIST ? 'auto' : `repeat(${props.childrenCount > 5 ? 5 : props.childrenCount}, auto)`};

  ${(props) =>
    props.view === ListView.GRID &&
    css`
      @media (max-width: ${theme.breakpoints.maxWidth['2xl']}) {
        grid-template: auto / repeat(${props.childrenCount > 3 ? 3 : props.childrenCount}, auto);
      }

      @media (max-width: ${theme.breakpoints.maxWidth.lg}) {
        grid-template: auto / repeat(${props.childrenCount > 2 ? 2 : props.childrenCount}, auto);
      }

      @media (max-width: ${theme.breakpoints.maxWidth.sm}) {
        grid-template: auto / repeat(1, auto);
      }
    `}
`;

type Props = React.PropsWithChildren & Omit<StyledListProps, 'childrenCount'> & React.ComponentProps<'div'>;

const List = React.forwardRef<HTMLDivElement, Props>(({ gap, view = ListView.GRID, ...props }, ref) => {
  const childrenCount = React.Children.count(props.children);

  return (
    <StyledList view={view} childrenCount={childrenCount} gap={gap} ref={ref} {...props}>
      {props.children}
    </StyledList>
  );
});

List.displayName = 'List';

export default List;
