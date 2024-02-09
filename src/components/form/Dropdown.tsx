import {
  StyledBiErrorCircle,
  StyledContainer,
  StyledContainerProps,
  StyledGiCheckMark,
  StyledRightContainer,
  StyledSpinner,
} from 'components/form/Input.styled';
import type { DropdownOption, Size } from 'components/form/types';
import useInput from 'hooks/useInput';
import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import { Validator } from 'validators';
import { SlArrowDown } from 'react-icons/sl';
import Icon from 'components/Icon';

const sizes: Record<Size, Record<string, string>> = {
  small: {
    'font-size': '12px',
    height: '30px',
  },
  medium: {
    'font-size': '14px',
    height: '39.5px',
  },
  large: {
    'font-size': '16px',
    height: '49px',
  },
};

type StyledInputProps = {
  size?: Size;
  rightContainerWidth?: number;
};

const StyledSelect = styled.select<StyledInputProps>`
  ${({ size = 'small', ...props }) => css`
    box-sizing: border-box;
    width: 100%;
    height: ${sizes[size]['height']};
    padding: 0 7px;
    font-size: ${sizes[size]['font-size']};
    line-height: 20px;
    border-radius: 0;
    background-color: #fff;
    border: none;
    outline: none;

    padding-right: ${props.rightContainerWidth}px;
  `}
`;

const StyledOption = styled.option<{ size?: Size }>`
  ${({ size = 'small' }) => css`
    font-size: ${sizes[size]['font-size']};
    height: ${sizes[size]['height']};
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
