import Container from 'components/Container';
import { RibbonProps, StyledRibbonProps } from 'components/card/types';
import Text from 'components/typography/Text';
import { useTranslation } from 'hooks';
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
  const t = useTranslation();
  return (
    <StyledRibbon
      className={className}
      styleConfig={{
        rounded: true,
        padding: { left: 'md', right: 'md', top: 'xs', bottom: 'xs' },
        justifyContent: 'center',
      }}
      background={props.background}
      color={props.color}
      xs="max-content"
    >
      {props.label && (
        <Text bold fontSize="sm">
          {t(props.label)}
        </Text>
      )}
    </StyledRibbon>
  );
};

export default Ribbon;
