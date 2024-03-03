import { css } from '@emotion/css';
import Button from 'components/Button';
import Container from 'components/Container';
import Transition, { TransitionHandle } from 'components/Transition';
import React, { useCallback, useImperativeHandle, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MdClear } from 'react-icons/md';
import styled from 'styled-components';

const StyledSidebar = styled.div`
  max-width: 270px;
  width: 100%;
  height: 100%;
  background-color: white;
  max-width: 270px;
  overflow: auto;
  gap: 1rem;
  display: flex;
  flex-direction: column;
`;

const GrayedContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: #faf8f886;
  top: 0;
  left: 0;
  z-index: -1;
`;

type Props = React.PropsWithChildren & {
  onClose?: () => void;
};

export type SidebarHandle = {
  open: () => void;
  close: () => void;
  isOpen: () => boolean;
};

const Sidebar = React.forwardRef<SidebarHandle, Props>((props, ref) => {
  const portalsElement = document.getElementById('portals') as Element;
  const transitionRef = useRef<TransitionHandle>(null);
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const [shown, setShown] = useState<boolean>(false);

  const open: SidebarHandle['open'] = useCallback(() => {
    if (containerRef?.parentElement) {
      containerRef.parentElement.style.setProperty('z-index', '9998');
    }
    transitionRef.current?.gotoFinalState();
    setShown(true);
  }, [containerRef?.parentElement]);

  const close: SidebarHandle['close'] = useCallback(() => {
    if (containerRef?.parentElement) {
      containerRef.parentElement.style.setProperty('z-index', '-5');
    }

    transitionRef.current?.gotoInitialState();
    props.onClose && props.onClose();
    setShown(false);
  }, [containerRef?.parentElement, props]);

  const isOpen: SidebarHandle['isOpen'] = useCallback(() => shown, [shown]);

  useImperativeHandle(ref, () => ({ open, close, isOpen }));

  const handleClickOutsideEvent = useCallback(
    (event: MouseEvent) => {
      const isClickInside = containerRef?.contains(event.target as HTMLElement);
      if (!isClickInside) {
        close();
      }
    },
    [close, containerRef]
  );

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
            document.addEventListener('click', handleClickOutsideEvent);
          } else {
            document.removeEventListener('click', handleClickOutsideEvent);
          }
        }}
      >
        <GrayedContainer>
          <StyledSidebar ref={setContainerRef}>
            <Container alignItems="flex-end">
              <Button themeType="white" fullwidth size="md" icon={<MdClear />} onClick={close} />
            </Container>
            <div>{props.children}</div>
          </StyledSidebar>
        </GrayedContainer>
      </Transition>
    </>,
    portalsElement
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
