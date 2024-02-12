import Container from 'components/Container';
import Input from 'components/form/Input';
import Text from 'components/typography/Text';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

const StyledInput = styled(Input)`
  width: max-content;
  height: max-content;
`;

type Props = React.ComponentProps<typeof Input>;

const Checkbox: React.FC<Props> = ({ label, ...props }) => {
  const [checked, setChecked] = useState(props.checked);

  const handleClick = useCallback(() => {
    setChecked((prev) => !prev);
  }, []);

  return (
    <Container onClick={handleClick} preserveWhenXs direction="row" gap="5px" alignItems="center" userSelect="none">
      <StyledInput type="checkbox" {...props} checked={checked} ref={undefined} />
      <Text nowrap>{label}</Text>
    </Container>
  );
};

export default Checkbox;
