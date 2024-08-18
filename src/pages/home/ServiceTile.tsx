import React from 'react';
import Container from 'components/Container';
import Icon from 'components/Icon';
import Image from 'components/Image';
import Text from 'components/typography/Text';
import styled, { css } from 'styled-components';
import { createMedia } from 'utils';

type Props = React.ComponentProps<typeof Container> & {
  iconSrc?: string;
  title: React.ReactNode;
  description: React.ReactNode;
  titleDescriptionContainer?: React.ComponentProps<typeof Container>;
};

const Wrapper = styled(Container)`
  box-shadow: 0 0 16px -2px black;

  ${() =>
    createMedia(
      'xs',
      css`
        img {
          width: 30px;
        }
      `
    )}

  ${() =>
    createMedia(
      'sm',
      css`
        img {
          width: 35px;
        }
      `
    )}

  ${() =>
    createMedia(
      'md',
      css`
        img {
          width: 40px;
        }
      `
    )}
`;

const StyledTitle = styled(Text)`
  color: white;
`;

const ServiceTile: React.FC<Props> = (props) => {
  return (
    <Wrapper
      relative
      className={props.className}
      direction="row"
      padding={{ left: 'md', right: 'md', top: 'lg', bottom: 'lg' }}
      alignItems="flex-start"
      {...props}
    >
      {props.iconSrc && <Icon icon={<Image src={props.iconSrc} />} width="60px" />}
      <Container xs={12} gap="0.5rem" {...props.titleDescriptionContainer}>
        <StyledTitle textAlign="center" fontSize="2xl" bold>
          {props.title}
        </StyledTitle>
        {/* <StyledDescription fontSize="md">{props.description}</StyledDescription> */}
      </Container>
    </Wrapper>
  );
};

export default ServiceTile;
