import { StyledText, StyledTextProps } from 'components/common/typography/Text.styled';
import React from 'react';

type Props = React.ComponentProps<'span'> & React.PropsWithChildren & StyledTextProps;
const Text = React.forwardRef<HTMLSpanElement | HTMLLabelElement, Props>((props, ref) => {
  return <StyledText ref={ref} {...props} hasOnClick={!!props.onClick} />;
});

Text.displayName = 'Text';

export default React.memo(Text);
