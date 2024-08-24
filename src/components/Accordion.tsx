import { css } from '@emotion/css';
import Button from 'components/Button';
import Container from 'components/Container';
import Transition, { TransitionHandle } from 'components/Transition';
import React, { useEffect, useRef, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import styled from 'styled-components';
import { getElementHeight } from 'utils';

const StyledButton = styled(Button)`
  justify-content: space-between;
`;

type Props = React.PropsWithChildren & {
  header: React.ReactNode;
  defaultState?: 'open' | 'closed';
};

const Accordion: React.FC<Props> = ({ defaultState = 'closed', children, ...props }) => {
  const transitionRef = useRef<TransitionHandle>(null);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (defaultState === 'open') {
      transitionRef.current?.gotoFinalState();
    }
  }, [defaultState]);

  return (
    <Container styleConfig={{ padding: { left: 'md', right: 'md', bottom: 'sm', top: 'sm' } }}>
      <StyledButton
        themeType="link"
        iconRight={<BiPlus />}
        size="lg"
        fullwidth
        onClick={() => {
          if (transitionRef.current?.isInFinalState()) {
            containerRef?.style.setProperty('overflow', 'hidden');
          }
          transitionRef.current?.toggle();
        }}
      >
        {props.header}
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
            padding-top: 1rem;
            max-height: calc(
              ${Math.max(containerRef?.scrollHeight ?? 0, containerRef?.children.item(0)?.scrollHeight ?? 0)}px
            );
          `,
        }}
        onTransitionEnd={() => {
          if (transitionRef.current?.isInFinalState()) {
            containerRef?.style.setProperty('overflow', 'visible');
          }
        }}
      >
        <Container ref={setContainerRef}>{children}</Container>
      </Transition>
    </Container>
  );
};

export default Accordion;
