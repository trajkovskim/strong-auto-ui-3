import Container from 'components/Container';
import { RibbonProps, StyledRibbonProps } from 'components/card/types';
import Text from 'components/typography/Text';
import React from 'react';
import styled from 'styled-components';

type Props = RibbonProps & {
  className?: string;
};

const StyledRibbon = styled(Container)<StyledRibbonProps>`
  background: ${(props) => props.background};
  color: ${(props) => props.color};
  user-select: none;
`;

const Ribbon: React.FC<Props> = ({ className, ...props }) => {
  return (
    <StyledRibbon
      className={className}
      preserveWhenXs
      rounded
      padding={{ left: 'md', right: 'md', top: 'xs', bottom: 'xs' }}
      background={props.background}
      color={props.color}
    >
      <Text bold fontSize="sm">
        {props.label}
      </Text>
    </StyledRibbon>
  );
};

export default Ribbon;
