import { StyledText, StyledTextProps } from 'components/typography/Text.styled';
import React from 'react';

type Props = React.ComponentProps<'span'> & React.PropsWithChildren & StyledTextProps;
const Text = React.forwardRef<HTMLSpanElement | HTMLLabelElement, Props>((props, ref) => {
  return <StyledText ref={ref} {...props} />;
});

Text.displayName = 'Text';

export default Text;
