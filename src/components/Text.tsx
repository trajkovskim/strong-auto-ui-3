import React from 'react';
import styled from 'styled-components';

type TextType = 'sub' | 'base' | 'primary';
type FontSize = 'sm' | 'md' | 'lg' | 'xl' | 'default';

type StyledTextProps = {
  type?: TextType;
  textAlign?: React.CSSProperties['textAlign'];
  fontSize?: FontSize;
  bold?: boolean;
};

const colors: Record<TextType, string> = {
  base: 'inherit',
  primary: '#000',
  sub: '#a5a5a5',
};

const fontSize: Record<FontSize, string> = {
  sm: '12px',
  md: '16px',
  lg: '20px',
  xl: '24px',
  default: 'inherit',
};

const StyledText = styled.span<StyledTextProps>`
  color: ${(props) => colors[props.type ?? 'base']};
  text-align: ${(props) => props.textAlign};

  font-size: ${(props) => fontSize[props.fontSize ?? 'default']};
  font-weight: ${(props) => props.bold && 'bold'};
  cursor: ${(props) => props.onClick && 'pointer'};
`;

type Props = React.ComponentProps<'span'> & React.PropsWithChildren & StyledTextProps;

const Text: React.FC<Props> = (props) => {
  return <StyledText {...props} />;
};

export default Text;
