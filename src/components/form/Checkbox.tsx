import Container from 'components/Container';
import Input from 'components/form/Input';
import Text from 'components/typography/Text';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

const StyledInput = styled(Input)`
  /* width: max-content;
  height: max-content; */
`;

type StyledLabelProps = {
  checked?: boolean;
};

const StyledLabel = styled(Text)<StyledLabelProps>`
  transition: 100ms all;
  color: ${(props) => props.checked && '#075ebb'};
`;

type Props = React.ComponentProps<typeof Input>;

const Checkbox: React.FC<Props> = ({ label, ...props }) => {
  const [checked, setChecked] = useState(props.checked);

  const handleClick = useCallback(() => {
    setChecked((prev) => !prev);
  }, []);

  return (
    <Container onClick={handleClick} direction="row" gap="5px" alignItems="center" userSelect="none">
      <StyledInput type="checkbox" {...props} checked={checked} size={undefined} ref={undefined} />
      <StyledLabel checked={checked} nowrap fontSize={props.size}>
        {label}
      </StyledLabel>
    </Container>
  );
};

export default Checkbox;
