import {
  StyledBiErrorCircle,
  StyledContainer,
  StyledContainerProps,
  StyledGiCheckMark,
  StyledRightContainer,
  StyledSpinner,
  fontSize,
  inputSize,
} from 'components/form/Input.styled';
import type { DropdownOption, Size } from 'components/form/types';
import useInput from 'hooks/useInput';
import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import { Validator } from 'validators';

type StyledInputProps = {
  size?: Size;
  rightContainerWidth?: number;
};

const StyledSelect = styled.select<StyledInputProps>`
  ${({ size = 'sm', ...props }) => css`
    box-sizing: border-box;
    width: 100%;
    height: ${inputSize[size]};
    padding: 0 7px;
    font-size: ${fontSize[size]};
    line-height: 20px;
    background-color: #fff;
    border: none;
    outline: none;

    padding-right: ${props.rightContainerWidth}px;
  `}
`;

const StyledOption = styled.option<{ size?: Size }>`
  ${({ size = 'sm' }) => css`
    font-size: ${fontSize[size]};
    height: ${inputSize[size]};
    background-color: #fff;
  `};
`;

type Props = Omit<React.ComponentProps<'select'>, 'size'> &
  StyledContainerProps & {
    rightContainer?: React.ReactNode;
    validate?: Validator;
    size?: Size;
    options: DropdownOption[];
  };

const Dropdown: React.FC<Props> = ({ fullwidth, rightContainer, validate, size, ...props }) => {
  const rightContainerRef = useRef<HTMLDivElement>(null);
  const rightContainerWidth = rightContainerRef.current?.offsetWidth;

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
      <StyledSelect {...props} {...events} size={size} rightContainerWidth={rightContainerWidth}>
        {props.options.map((option) => (
          <StyledOption size={size} key={option.value} value={option.value}>
            {option.label ?? option.value}
          </StyledOption>
        ))}
      </StyledSelect>
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

export default Dropdown;
