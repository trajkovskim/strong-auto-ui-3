import Container from 'components/Container';
import { StyledRibbon } from 'components/card/Card.styled';
import { RibbonProps } from 'components/card/types';
import React from 'react';
import styled from 'styled-components';

type StyledCardProps = {
  fullwidth?: boolean;
};

const StyledCard = styled(Container)<StyledCardProps>`
  box-sizing: border-box;
  background: white;
  color: black;

  height: 100%;
  max-width: ${(props) => props.fullwidth && '100%'};

  cursor: ${(props) => !!props.onClick && 'pointer'};
  overflow: hidden;

  & > *:first-child {
    max-height: 600px;
    flex: 1 0 0;
  }
`;

type Props = StyledCardProps & {
  footer?: React.ReactNode;
  image?: React.ReactNode;
  onImageContainer?: React.ReactNode;
  body?: React.ReactNode;
  ribbon?: RibbonProps;
} & React.ComponentProps<typeof Container>;

const Card: React.FC<Props> = ({ footer, image, onImageContainer, body, ribbon, ...props }) => {
  return (
    <StyledCard
      preserveWhenXs
      fullwidth={props.fullwidth}
      alignItems="stretch"
      justifyContent="space-between"
      {...props}
      direction={props.direction}
    >
      <Container relative>
        {image}
        {ribbon && <StyledRibbon {...ribbon} />}
        {onImageContainer}
      </Container>
      {body && <Container overflow="hidden">{body}</Container>}
      {footer && <Container sm={12}>{footer}</Container>}
    </StyledCard>
  );
};

export default Card;
