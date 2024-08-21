import { StyledOption, StyledSelect } from 'components/form/Dropdown.styled';
import {
  StyledBiErrorCircle,
  StyledContainer,
  StyledContainerProps,
  StyledGiCheckMark,
  StyledRightContainer,
  StyledSpinner,
} from 'components/form/Input.styled';
import type { DropdownOption, Size } from 'components/form/types';
import Text from 'components/typography/Text';
import useInput from 'hooks/useInput';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { Validator } from 'validators';

type Props = Omit<React.ComponentProps<'select'>, 'size'> &
  StyledContainerProps & {
    rightContainer?: React.ReactNode;
    validate?: Validator;
    size?: Size;
    options: DropdownOption[];
    label?: string;
  };

const DropdownWrapper = styled(StyledContainer)`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledLabel = styled(Text)`
  white-space: nowrap;
`;

const Dropdown: React.FC<Props> = ({ fullwidth, rightContainer, validate, size, ...props }) => {
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
    <DropdownWrapper fullwidth={fullwidth}>
      {props.label && <StyledLabel fontSize={size}>{props.label}</StyledLabel>}
      <StyledSelect {...props} {...events} size={size} rightContainerWidth={rightContainerRef.current?.offsetWidth}>
        {props.options.map((option) => (
          <StyledOption key={option.value} value={option.value}>
            <Text fontSize={size}>{option.label ?? option.value}</Text>
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
    </DropdownWrapper>
  );
};

export default Dropdown;
