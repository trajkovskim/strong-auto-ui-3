import {
  StyledBiErrorCircle,
  StyledContainer,
  StyledContainerProps,
  StyledGiCheckMark,
  StyledRightContainer,
  StyledSpinner,
} from 'components/form/Input.styled';
import useInput from 'hooks/useInput';
import React, { useRef } from 'react';
import { styled } from 'styled-components';
import { Validator } from 'validators';

type StyledInputProps = {
  rightContainerWidth?: number;
};

const StyledInput = styled.input<StyledInputProps>`
  box-sizing: border-box;
  width: 100%;
  height: 49px;
  padding: 7px;
  font-size: 18px;
  line-height: 20px;
  outline: none;
  border-radius: 0;
  border: 1px solid #dcdcdc;

  padding-right: ${(props) => `${props.rightContainerWidth}px`};

  &::placeholder {
    font-size: 18px;
  }

  &:focus {
    border-color: #cdcdcd;
    background-color: #fdfdfd;
  }
`;

type Props = React.ComponentProps<'input'> &
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
    <StyledContainer fullwidth={fullwidth}>
      <StyledInput
        {...props}
        {...events}
        rightContainerWidth={rightContainerRef.current?.offsetWidth}
        placeholder={label}
      />
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
      {!state.valid && <div>{state.error}</div>}
    </StyledContainer>
  );
};

export default Input;
