import { css } from '@emotion/css';
import Button from 'components/common/Button';
import Container from 'components/common/Container';
import Transition, { TransitionHandle } from 'components/common/Transition';
import React, { useEffect, useRef } from 'react';
import { BiPlus } from 'react-icons/bi';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  justify-content: space-between;
`;

type Props = React.PropsWithChildren & {
  header: React.ReactNode;
  defaultState?: 'open' | 'closed';
};

const Accordion: React.FC<Props> = ({ defaultState = 'closed', children, ...props }) => {
  const transitionRef = useRef<TransitionHandle>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultState === 'open') {
      transitionRef.current?.gotoFinalState();
    }
  }, [defaultState]);

  return (
    <>
      <StyledButton
        themeType="link"
        iconRight={<BiPlus />}
        size="lg"
        fullwidth
        onClick={() => {
          if (transitionRef.current?.isInFinalState()) {
            containerRef.current?.style.setProperty('overflow', 'hidden');
            containerRef.current?.style.removeProperty('max-height');
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
            padding-top: 0.5rem;
            max-height: ${Math.max(
              containerRef.current?.scrollHeight ?? 0,
              containerRef.current?.children.item(0)?.scrollHeight ?? 0
            )}px;
          `,
        }}
        onTransitionEnd={() => {
          if (transitionRef.current?.isInFinalState()) {
            containerRef.current?.style.setProperty('overflow', 'visible');
            containerRef.current?.style.setProperty('max-height', 'fit-content');
          }
        }}
      >
        <Container ref={containerRef}>{children}</Container>
      </Transition>
    </>
  );
};

export default Accordion;
