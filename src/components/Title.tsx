import Container from 'components/Container';
import React from 'react';
import { css, styled } from 'styled-components';

type StyledTitleProps = {
  centered?: boolean;
  line?: boolean;
};

export const StyledTitle = styled.span<StyledTitleProps>`
  font-size: 150%;
  padding-top: 5px;
  padding-bottom: 0.5rem;
  position: relative;

  ${(props) =>
    props.line &&
    css`
      &::before {
        content: '';
        position: absolute;
        width: 40%;
        bottom: 0;
        border-bottom: 2px solid #dcdcdc;
        left: ${props.centered && '50%'};
        transform: translateX(${props.centered ? '-50%' : '0'});
      }
    `}
`;

type Props = StyledTitleProps & {
  title: string;
  description?: string;
  gap?: string;
};

const Title: React.FC<Props> = (props) => {
  return (
    <Container
      direction="column"
      gap={props.gap ?? '0.5rem'}
      itemsCentered={props.centered}
      textCentered={props.centered}
      centered={props.centered}
    >
      <StyledTitle line={props.line} centered={props.centered}>
        {props.title}
      </StyledTitle>
      {props.description && <Container xs={'500px'}>{props.description}</Container>}
    </Container>
  );
};

export default Title;
