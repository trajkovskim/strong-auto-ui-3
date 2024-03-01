import {
  InputWrapper,
  StyledBiErrorCircle,
  StyledContainer,
  StyledContainerProps,
  StyledGiCheckMark,
  StyledInput,
  StyledInputProps,
  StyledRightContainer,
  StyledSpinner,
} from 'components/form/Input.styled';
import useInput from 'hooks/useInput';
import React, { useRef } from 'react';
import { Validator } from 'validators';

type Props = Omit<React.ComponentProps<'input'>, keyof StyledInputProps> &
  StyledInputProps &
  StyledContainerProps & {
    label?: string;
    rightContainer?: React.ReactNode;
    validate?: Validator;
  };

const Input: React.FC<Props> = ({ label, fullwidth, rightContainer, validate, ...props }) => {
  const rightContainerRef = useRef<HTMLDivElement>(null);

  const { state, onChange, onBlur, onFocus } = useInput(
    props.defaultValue,
    props.onChange,
    props.onFocus,
    props.onBlur,
    validate
  );

  const events = { onChange, onBlur, onFocus };

  return (
    <>
      <StyledContainer fullwidth={fullwidth}>
        <InputWrapper gap="1rem" label={label} size={props.size}>
          <StyledInput
            {...props}
            {...events}
            value={state.value}
            rightContainerWidth={rightContainerRef.current?.offsetWidth}
          />
        </InputWrapper>
        <StyledRightContainer ref={rightContainerRef}>
          {state.dirty && validate && (
            <span>
              {state.validating ? (
                <StyledSpinner />
              ) : state.valid ? (
                <StyledGiCheckMark />
              ) : (
                <StyledBiErrorCircle title={state.error} />
              )}
            </span>
          )}
          {rightContainer}
        </StyledRightContainer>
      </StyledContainer>
      {!state.valid && <div>{state.error}</div>}
    </>
  );
};

export default Input;
