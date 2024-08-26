import { css } from '@emotion/css';
import { Container, Transition, TransitionHandle } from 'components/common';
import React, { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const StyledSidebar = styled(Container)`
  width: 100%;
  height: 100%;
  background-color: white;
  overflow: auto;
`;

const GrayedContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100dvh;
  background-color: #faf8f886;
  top: 0;
  left: 0;
  z-index: 9998;
`;

type Props = React.PropsWithChildren &
  React.ComponentProps<typeof Container> & {
    onClose?: () => void;
    open: boolean;
  };

const Sidebar: React.FC<Props> = ({ open, onClose, children, ...props }) => {
  const portalsElement = document.getElementById('portals') as Element;
  const transitionRef = useRef<TransitionHandle>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const interval = useRef<number>(0);

  const close = useCallback(() => {
    transitionRef.current?.gotoInitialState();
  }, []);

  const handleClickOutsideEvent = useCallback(
    (event: MouseEvent) => {
      const isClickInside = containerRef.current?.contains(event.target as Node);
      if (!isClickInside) {
        close();
        document.removeEventListener('click', handleClickOutsideEvent, { capture: true });
      }
    },
    [close]
  );

  useEffect(() => {
    let interval: number;

    if (open) {
      transitionRef.current?.gotoFinalState();
      document.addEventListener('click', handleClickOutsideEvent, { capture: true });
    } else {
      close();
    }

    return () => {
      clearInterval(interval);
    };
  }, [close, handleClickOutsideEvent, onClose, open]);

  if (!open) {
    return null;
  }

  return createPortal(
    <>
      <Transition
        ref={transitionRef}
        duration="300ms"
        timingFunction="ease-in-out"
        transition={{
          initial: css`
            opacity: 0;
          `,
          final: css`
            opacity: 1;
          `,
        }}
        onTransitionEnd={() => {
          clearInterval(interval.current);

          if (!transitionRef.current?.isInInitialState()) {
            return;
          }

          interval.current = setInterval(() => {
            if (transitionRef.current?.isInInitialState() && transitionRef.current.isFinished()) {
              onClose && onClose();
              clearInterval(interval.current);
            }
          }, 20);
        }}
      >
        <GrayedContainer>
          <StyledSidebar {...props} ref={containerRef}>
            {children}
          </StyledSidebar>
        </GrayedContainer>
      </Transition>
    </>,
    portalsElement
  );
};

Sidebar.displayName = 'Sidebar';

export default Sidebar;
