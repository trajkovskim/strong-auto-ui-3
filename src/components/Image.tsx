import React from 'react';
import { styled } from 'styled-components';

type StyledImageProps = {
  centered?: boolean;
  objectFit?: React.CSSProperties['objectFit'];
  shadow?: boolean;
};

const StyledImage = styled.img<StyledImageProps & { pointer?: boolean }>`
  display: block;
  object-fit: ${(props) => props.objectFit && 'contain'};

  filter: ${(props) => props.shadow && 'drop-shadow(0 0 0.05rem #aaa5a5)'};

  user-select: none;
  max-width: ${(props) => props.width};
  height: ${(props) => props.height};

  width: 100%;

  margin-left: ${(props) => props.centered && 'auto'};
  margin-right: ${(props) => props.centered && 'auto'};
  cursor: ${(props) => props.pointer && 'pointer'};
`;

export type Props = React.ComponentProps<'img'> & StyledImageProps;

const Image: React.FC<Props> = (props) => {
  return <StyledImage pointer={!!props.onClick} {...props} />;
};

export default Image;
