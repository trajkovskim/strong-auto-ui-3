import { css } from '@emotion/css';
import Transition, { TransitionHandle } from 'components/Transition';
import { StyledOption, StyledOptionsWrapper } from 'components/form/Autocomplete.styled';
import { StyledContainer, StyledFormFieldContainer, StyledInput } from 'components/form/Input.styled';
import FormFieldRightContainer from 'components/form/RightContainer';
import useForm from 'components/form/hooks/useForm';
import { AutocompleteOption, FormFieldProps } from 'components/form/types';
import { parseInputValue } from 'components/form/utils';
import useInput from 'hooks/useInput';
import React, { useCallback, useRef, useState } from 'react';

type Props = FormFieldProps<'input'> & {
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
  const inputRef = useRef<HTMLInputElement>(null);
  const rightContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<TransitionHandle>(null);
  const [search, setSearch] = useState<string>();

  const { change, getValue } = useForm();
  const name = props.name as string;
  const value = getValue(name);

  if ((!search || !search.length) && inputRef.current) {
    inputRef.current.value = '';
  }

  const { state, changeValue, onChange, onBlur, onFocus } = useInput(
    props.defaultValue,
    props.onChange,
    props.onFocus,
    props.onBlur,
    validate
  );

  const filteredOptions = options.filter(
    (option) =>
      !search ||
      option.label?.toString().toLowerCase().startsWith(search.toLowerCase()) ||
      option.value?.toString().toLowerCase().startsWith(search.toLowerCase())
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
    onChange: (event) => {
      onChange(event);
      setSearch(event.target.value);
      if (filteredOptions.length === 1) {
        change(name, filteredOptions[0].value);
      } else if (!filteredOptions.length) {
        change(name, parseInputValue(event.target));
      }

      if (!event.target.value.length) {
        change(name, undefined);
        setSearch(undefined);
      }
    },
    onBlur,
    onFocus: (event) => {
      onFocus(event);
      animationRef.current?.gotoFinalState();
      document.addEventListener('click', handleClickOutsideEvent);
    },
  };

  const clear = () => {
    setSearch(undefined);
    change(name, undefined);
  };

  const handleOnOptionClick = (option: AutocompleteOption) => {
    change(name, option.value);
    changeValue(option.value);
    setSearch(option.label?.toString() ?? option.value);
    animationRef.current?.gotoInitialState();
  };

  const rightContainerProps = {
    state,
    rightContainer,
    clearButton,
    validate: !!validate,
    size: props.size,
    onClear: clear,
    value: value?.toString(),
  };

  return (
    <StyledContainer fullwidth={fullwidth}>
      <StyledFormFieldContainer ref={inputWrapperRef} label={label} size={props.size}>
        <StyledInput
          {...props}
          {...events}
          {...{ value: search }}
          autoComplete="off"
          rightContainerWidth={rightContainerRef.current?.offsetWidth}
          ref={inputRef}
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
          {!!filteredOptions.length && (
            <StyledOptionsWrapper>
              {filteredOptions.map((option) => (
                <StyledOption
                  key={option.value}
                  size={props.size}
                  onClick={() => handleOnOptionClick(option)}
                  includeLabel={!!label}
                >
                  {option.label ?? option.value}
                </StyledOption>
              ))}
            </StyledOptionsWrapper>
          )}
        </Transition>
        <FormFieldRightContainer ref={rightContainerRef} {...rightContainerProps} />
      </StyledFormFieldContainer>
      {!state.valid && <div>{state.error}</div>}
    </StyledContainer>
  );
};

export default Autocomplete;
