import { StyledLabel, StyledTextProps } from 'components/typography/Text.styled';
import React from 'react';

type Props = React.ComponentProps<'label'> & React.PropsWithChildren & StyledTextProps;
const Label = React.forwardRef<HTMLLabelElement, Props>((props, ref) => {
  return <StyledLabel ref={ref} {...props} />;
});

Label.displayName = 'Label';

export default Label;
