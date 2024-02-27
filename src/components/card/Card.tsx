import Container from 'components/Container';
import { Ribbon } from 'components/card/Card.styled';
import { RibbonProps } from 'components/card/types';
import Text from 'components/typography/Text';
import React from 'react';
import styled from 'styled-components';

type StyledCardProps = {
  fullwidth?: boolean;
};

const StyledCard = styled(Container)<StyledCardProps>`
  background: white;
  color: black;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  width: 100%;

  max-width: ${(props) => props.fullwidth && '100%'};

  cursor: ${(props) => !!props.onClick && 'pointer'};
`;

const StyledBodyWrapper = styled(Container)`
  width: 100%;
  max-width: 100%;
  overflow: hidden;
`;

const OnImageContainer = styled(Container)`
  position: absolute;
  width: 100%;
  height: 100%;
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
      rounded={{ topLeft: true, topRight: true }}
      {...props}
      direction="column"
    >
      <Container preserveWhenXs direction={props.direction}>
        <Container relative>
          {image}
          {ribbon && (
            <Ribbon
              preserveWhenXs
              rounded
              padding={{ left: 'md', right: 'md', top: 'xs', bottom: 'xs' }}
              background={ribbon?.background}
              color={ribbon?.color}
            >
              <Text bold fontSize="md">
                {ribbon?.label}
              </Text>
            </Ribbon>
          )}
          <OnImageContainer>{onImageContainer}</OnImageContainer>
        </Container>
        <StyledBodyWrapper>{body}</StyledBodyWrapper>
      </Container>
      <Container sm={12}>{footer}</Container>
    </StyledCard>
  );
};

export default Card;
