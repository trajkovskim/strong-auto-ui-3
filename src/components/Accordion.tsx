import { css } from '@emotion/css';
import Button from 'components/Button';
import Container from 'components/Container';
import Transition, { TransitionHandle } from 'components/Transition';
import React, { useRef, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  justify-content: space-between;
`;

type Props = React.PropsWithChildren & {
  title: React.ReactNode;
};

const Accordion: React.FC<Props> = ({ children, ...props }) => {
  const transitionRef = useRef<TransitionHandle>(null);
  const [containerRef, setContainerRef] = useState<HTMLSpanElement | null>(null);

  return (
    <Container gap="0.3rem" padding={{ left: 'md', right: 'md', bottom: 'sm', top: 'sm' }}>
      <StyledButton
        themeType="link"
        iconRight={<BiPlus />}
        size="lg"
        fullwidth
        onClick={() => transitionRef.current?.toggle()}
      >
        {props.title}
      </StyledButton>
      <Transition
        ref={transitionRef}
        duration="200ms"
        timingFunction="ease-in-out"
        transition={{
          initial: css`
            overflow: hidden;
            max-height: 0;
          `,
          final: css`
            max-height: ${containerRef?.scrollHeight}px;
          `,
        }}
      >
        <Container ref={setContainerRef}>{children}</Container>
      </Transition>
    </Container>
  );
};

export default Accordion;
