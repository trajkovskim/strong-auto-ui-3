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
};

const StyledList = styled.div<StyledListProps>`
  display: grid;
  gap: ${(props) => props.gap};
  justify-content: ${(props) => props.justifyContent ?? 'space-evenly'};

  grid-template: auto / ${(props) => (props.view === ListView.LIST ? 'auto' : ' repeat(5, auto)')};

  ${(props) =>
    props.view === ListView.GRID &&
    css`
      @media (max-width: ${theme.breakpoints.maxWidth.lg}) {
        grid-template: auto / repeat(3, auto);
      }

      @media (max-width: ${theme.breakpoints.maxWidth.md}) {
        grid-template: auto / repeat(2, auto);
      }

      @media (max-width: ${theme.breakpoints.maxWidth.xs}) {
        grid-template: auto / repeat(1, auto);
      }
    `}
`;

type Props = React.PropsWithChildren & StyledListProps & React.ComponentProps<'div'>;

const List = React.forwardRef<HTMLDivElement, Props>(({ gap, view = ListView.GRID, ...props }, ref) => {
  return (
    <StyledList view={view} gap={gap} ref={ref} {...props}>
      {props.children}
    </StyledList>
  );
});

List.displayName = 'List';

export default List;
