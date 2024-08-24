import Container from 'components/Container';
import { checkboxSize } from 'components/form/constants';
import { FormFieldValue } from 'components/form/FormProvider';
import useForm from 'components/form/hooks/useForm';
import { StyledFormFieldContainer, StyledInput } from 'components/form/Input.styled';
import { parseCheckboxValue } from 'components/form/utils';
import Label from 'components/typography/Label';
import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';

const CheckboxWrapper = styled(StyledFormFieldContainer)`
  width: ${(props) => props.size && checkboxSize[props.size]};
  height: ${(props) => props.size && checkboxSize[props.size]};

  &:has(> input:checked) + label {
    transition: 100ms all;
    color: #075ebb;
  }
`;

type Props = React.ComponentProps<typeof StyledInput> & {
  label?: string;
};

const Checkbox: React.FC<Props> = ({ label, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { change } = useForm();
  const name = props.name as string;

  const handleClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, []);

  const events: {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
  } = {
    onChange: (event) => {
      props.onChange && props.onChange(event);
      change(name, parseCheckboxValue(event.target) as FormFieldValue);
    },
  };

  const id = `${props.name}_${props.value}`;
  return (
    <Container styleConfig={{ gap: '0.5rem', direction: 'row', alignItems: 'center', userSelect: 'none' }}>
      <CheckboxWrapper size={props.size}>
        <StyledInput id={id} ref={inputRef} type="checkbox" {...props} {...events} />
      </CheckboxWrapper>
      <Label nowrap fontSize={props.size} onClick={handleClick}>
        {label}
      </Label>
    </Container>
  );
};

export default Checkbox;
