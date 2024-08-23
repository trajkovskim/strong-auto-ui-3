import Container from 'components/Container';
import { StyledInput } from 'components/form/Input.styled';
import { triggerChange } from 'components/form/utils';
import Label from 'components/typography/Label';
import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';

const StyledCheckbox = styled(StyledInput)`
  width: max-content;
  height: max-content;
`;

type StyledLabelProps = {
  checked?: boolean;
};

const StyledLabel = styled(Label)<StyledLabelProps>`
  transition: 100ms all;
  color: ${(props) => props.checked && '#075ebb'};
`;

type Props = React.ComponentProps<typeof StyledCheckbox> & {
  label?: string;
};

const Checkbox: React.FC<Props> = ({ label, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [checked, setChecked] = useState<boolean>(!!props.checked);

  const handleClick = useCallback(() => {
    if (inputRef.current) {
      setChecked(!inputRef.current.checked);
      inputRef.current.click();
    }
  }, []);

  const events: {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
  } = {
    onChange: (event) => {
      setChecked(event.target.checked);
    },
  };

  const id = `${props.name}_${props.value}`;
  return (
    <Container styleConfig={{ gap: '5px', direction: 'row', alignItems: 'center', userSelect: 'none' }}>
      <StyledCheckbox id={id} ref={inputRef} type="checkbox" {...props} {...events} />
      <StyledLabel nowrap fontSize={props.size} checked={checked} onClick={handleClick}>
        {label}
      </StyledLabel>
    </Container>
  );
};

export default Checkbox;
