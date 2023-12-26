import styled, { css } from 'styled-components';

const Line = styled.div<{
  type?: 'horizontal' | 'vertical';
  height?: string;
  width?: string;
}>`
  margin: auto;

  ${(props) =>
    (props.type === 'horizontal' || !props.type) &&
    css`
      border-bottom: 1px solid #ccc;
      width: 100%;
      max-width: ${props.width ?? '100%'};
    `}

  ${(props) =>
    props.type === 'vertical' &&
    css`
      border-right: 1px solid #ccc;
      min-height: ${props.height ?? '100%'};
    `}
`;

export default Line;
