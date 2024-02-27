import Button from 'components/Button';
import Container from 'components/Container';
import React, { useState } from 'react';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  border-bottom: 1px solid #bdb9b976;

  > * {
    width: 100%;
  }
`;

type StyledButtonProps = {
  active?: boolean;
};

const StyledButton = styled(Button)<StyledButtonProps>`
  padding-bottom: 8px;
  border-bottom: 2px solid ${(props) => (props.active ? '#046af2' : 'transparent')};
  color: ${(props) => props.active && '#046af2'};
  transition: all 200ms;
  &:hover {
    border-bottom: 2px solid #046af2;
  }
`;

export type ButtonProps = {
  onClick?: () => void;
  label: string;
};

type Props = {
  onChange?: (button: ButtonProps, index: number) => void;
  buttons: ButtonProps[];
  defaultActive?: number;
};

const TabButtonsGroup: React.FC<Props> = (props) => {
  const [active, setActive] = useState(props.defaultActive ?? 0);

  return (
    <StyledContainer preserveWhenXs direction="row" alignItems="flex-start" gap="1rem">
      {props.buttons.map((button, index) => (
        <StyledButton
          key={index}
          size="md"
          themeType="link"
          active={active === index}
          onClick={() => {
            setActive(index);
            button.onClick && button.onClick();
            props.onChange && props.onChange(button, index);
          }}
        >
          {button.label}
        </StyledButton>
      ))}
    </StyledContainer>
  );
};

export default TabButtonsGroup;
