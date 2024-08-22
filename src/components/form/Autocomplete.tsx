import { css } from '@emotion/css';
import Button from 'components/Button';
import Transition, { TransitionHandle } from 'components/Transition';
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
  getCalcInputHeightCss,
} from 'components/form/Input.styled';
import { Size } from 'components/form/types';
import useInput from 'hooks/useInput';
import React, { useCallback, useRef } from 'react';
import { MdClear } from 'react-icons/md';
import { styled } from 'styled-components';
import { Validator } from 'validators';

const StyledOptionsWrapper = styled.div`
  z-index: 999;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  border-top: none;
  /* position: absolute; */
  width: 100%;
  border-bottom-left-radius: 4x;
  border-bottom-right-radius: 4px;
  border: 1px solid rgb(238, 238, 238);
  background-color: #fff;
  user-select: none;
  bottom: 0;
  /* transform: translateY(calc(100% + 1px)); */

  /* > * + * {
    border-top: 1px solid #dcdcdc;
  } */
`;

type StyledOptionProps = {
  size?: Size;
};

const StyledOption = styled.option<StyledOptionProps & { includeLabel: boolean }>`
  min-height: ${(props) => props.size && getCalcInputHeightCss(props.size, props.includeLabel)};
  font-size: inherit;
  padding: 7px;
  padding-left: 12px;
  color: black;
  display: flex;
  align-items: center;
  width: 100%;

  &:hover,
  &:active {
    /* background-color: #dcdcdc7d; */
    color: #075ebb;
  }
`;

export type AutocompleteOption = {
  label?: React.ReactNode;
  value: string;
};

type Props = Omit<React.ComponentProps<'input'>, keyof StyledInputProps> &
  StyledInputProps &
  StyledContainerProps & {
    label?: string;
    rightContainer?: React.ReactNode;
    validate?: Validator;
    options: AutocompleteOption[];
    clearButton?: boolean;
  };

const Autocomplete: React.FC<Props> = ({
  label,
  fullwidth,
  clearButton = true,
  rightContainer,
  validate,
  options,
  ...props
}) => {
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const rightContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<TransitionHandle>(null);

  const { state, changeValue, onChange, onBlur, onFocus } = useInput(
    props.defaultValue,
    props.onChange,
    props.onFocus,
    props.onBlur,
    validate
  );

  const handleClickOutsideEvent = useCallback((event: MouseEvent) => {
    const isClickInside = inputWrapperRef.current?.contains(event.target as Node);

    if (!isClickInside) {
      animationRef.current?.gotoInitialState();
      document.removeEventListener('click', handleClickOutsideEvent);
    }
  }, []);

  const events: {
    onChange: typeof onChange;
    onBlur: typeof onBlur;
    onFocus: typeof onFocus;
  } = {
    onChange,
    onBlur: (event) => {
      onBlur(event);
    },
    onFocus: (event) => {
      onFocus(event);
      animationRef.current?.gotoFinalState();
      document.addEventListener('click', handleClickOutsideEvent);
    },
  };

  const reset = () => {
    changeValue('');
  };

  const handleOnOptionClick = (option: AutocompleteOption) => {
    changeValue(option.value);
    animationRef.current?.gotoInitialState();
  };

  const filteredOptions = options.filter(
    (option) => !state.value || option.value.toLowerCase().startsWith(state.value.toLowerCase())
  );

  return (
    <StyledContainer fullwidth={fullwidth}>
      <InputWrapper ref={inputWrapperRef} styleConfig={{ gap: '1rem' }} label={label} size={props.size}>
        <StyledInput
          {...props}
          {...events}
          autoComplete="off"
          value={state.value}
          rightContainerWidth={rightContainerRef.current?.offsetWidth}
        />
        <Transition
          ref={animationRef}
          duration="100ms"
          transition={{
            initial: css`
              opacity: 0;
              overflow: hidden;
              max-height: 0;
            `,
            final: css`
              opacity: 1;
              overflow: scroll;
              max-height: 230px;
            `,
          }}
        >
          <StyledOptionsWrapper>
            {filteredOptions.map((option, index) => (
              <StyledOption
                key={index}
                size={props.size}
                onClick={() => handleOnOptionClick(option)}
                value={option.value}
                includeLabel={!!label}
              >
                {option.label ?? option.value}
              </StyledOption>
            ))}
          </StyledOptionsWrapper>
        </Transition>
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
          {clearButton && !!state.value && (
            <Button
              themeType="link"
              size={props.size === 'default' ? undefined : props.size}
              maxContent
              icon={<MdClear />}
              onClick={reset}
            />
          )}
          {rightContainer}
        </StyledRightContainer>
      </InputWrapper>
      {!state.valid && <div>{state.error}</div>}
    </StyledContainer>
  );
};

export default Autocomplete;
