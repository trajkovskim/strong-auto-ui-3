import Button from 'components/Button';
import Container from 'components/Container';
import React, { useEffect, useState } from 'react';
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

type ButtonProps = {
  onClick?: () => void;
  label: string;
  defaultActive?: boolean;
};

type Props = {
  buttons: ButtonProps[];
};

const TabButtonsGroup: React.FC<Props> = (props) => {
  const defaultActiveIndex = props.buttons.findIndex((button) => button.defaultActive);
  const [active, setActive] = useState<number | undefined>(defaultActiveIndex);

  useEffect(() => {
    if (defaultActiveIndex === -1) {
      return;
    }

    const activeButton = props.buttons[defaultActiveIndex];
    activeButton.onClick && activeButton.onClick();
  }, [defaultActiveIndex, props.buttons]);

  return (
    <StyledContainer preserveWhenXs direction="row" alignItems="flex-start" gap="1rem">
      {props.buttons.map((button, index) => (
        <StyledButton
          key={index}
          size={'medium'}
          themeType="link"
          active={active === index}
          onClick={() => {
            setActive(index);
            button.onClick && button.onClick();
          }}
        >
          {button.label}
        </StyledButton>
      ))}
    </StyledContainer>
  );
};

export default TabButtonsGroup;
