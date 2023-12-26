/* eslint-disable react/prop-types */
import Container from 'components/Container';
import Text from 'components/Text';
import React, { useCallback, useState } from 'react';
import { GiCheckMark } from 'react-icons/gi';
import { styled } from 'styled-components';

type StyledInputProps = Pick<React.ComponentProps<'input'>, 'checked'>;

type StyledCheckboxContainerProps = StyledInputProps & {
  fullwidth?: boolean;
};

const StyledGiCheckMark = styled(GiCheckMark)<StyledInputProps>`
  width: 24px;
  height: 24px;
  color: ${(props) => props.checked && '#298e46'};
`;

const StyledCheckboxContainer = styled(Container)<StyledCheckboxContainerProps>`
  max-width: ${(props) => (props.fullwidth ? '100%' : '400px')};
  width: 100%;
  height: 49px;
  transition: all 200ms ease-in-out;
  border: 1px solid #dcdcdc;
  border-color: ${(props) => props.checked && '#298e46'};
  cursor: pointer;
  padding: 7px;
  border-radius: 1px;

  ${StyledGiCheckMark} {
    transition: all 200ms ease-in-out;
  }

  &:hover {
    border-color: #2c974b;
  }
`;

type Props = Omit<React.ComponentProps<'input'>, 'type'> &
  StyledCheckboxContainerProps & {
    label?: string;
  };

const StyledInput = styled.input`
  display: none;
`;

const Checkbox: React.FC<Props> = ({ label, ...props }) => {
  const [checked, setChecked] = useState(props.checked);

  const handleClick = useCallback(() => {
    setChecked((prev) => !prev);
  }, []);

  return (
    <StyledCheckboxContainer
      justifyContent="space-between"
      onClick={handleClick}
      checked={checked}
      preserveWhenXs
      direction="row"
      gap="5px"
      alignItems="center"
      userSelect="none"
    >
      <Text>{label}</Text>
      <StyledGiCheckMark checked={checked} />
      <StyledInput type="checkbox" {...props} checked={checked} />
    </StyledCheckboxContainer>
  );
};

export default Checkbox;
