import React from 'react';
import styled from 'styled-components';
import theme from 'theme';

type StyledListProps = {
  gap: React.CSSProperties['gap'];
};

const StyledList = styled.div<StyledListProps>`
  display: grid;
  grid-template: auto / repeat(5, auto);
  gap: ${(props) => props.gap};
  justify-content: space-between;
  padding: ${theme.padding.md};

  @media (max-width: ${theme.breakpoints.maxWidth.lg}) {
    grid-template: auto / repeat(3, auto);
  }

  @media (max-width: ${theme.breakpoints.maxWidth.md}) {
    grid-template: auto / repeat(2, auto);
  }

  @media (max-width: ${theme.breakpoints.maxWidth.xs}) {
    grid-template: auto / repeat(1, auto);
  }
`;

type Props = React.PropsWithChildren & StyledListProps & React.ComponentProps<'div'>;

const List = React.forwardRef<HTMLDivElement, Props>(({ gap, ...props }, ref) => {
  return (
    <StyledList gap={gap} ref={ref} {...props}>
      {props.children}
    </StyledList>
  );
});

List.displayName = 'List';

export default List;
