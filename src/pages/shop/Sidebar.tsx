import { css } from '@emotion/css';
import Container from 'components/Container';
import Transition, { TransitionHandle } from 'components/Transition';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  height: 100vh;
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
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);

  const close = useCallback(() => {
    transitionRef.current?.gotoInitialState();
  }, []);

  const handleClickOutsideEvent = useCallback(
    (event: MouseEvent) => {
      const isClickInside = containerRef?.contains(event.target as Node);
      console.log(isClickInside);
      if (!isClickInside) {
        close();
      }
    },
    [close, containerRef]
  );

  if (!open) {
    document.removeEventListener('click', handleClickOutsideEvent, { capture: true });
    return null;
  }

  if (open) {
    transitionRef.current?.gotoFinalState();
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
          if (transitionRef.current?.isInFinalState()) {
            document.addEventListener('click', handleClickOutsideEvent, { capture: true });
          } else {
            document.removeEventListener('click', handleClickOutsideEvent, { capture: true });
            onClose && onClose();
          }
        }}
      >
        <GrayedContainer>
          <StyledSidebar {...props} ref={setContainerRef}>
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
