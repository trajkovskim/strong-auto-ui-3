import { css } from '@emotion/css';
import Transition, { TransitionHandle } from 'components/Transition';
import React, { useCallback, useImperativeHandle, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MdClear } from 'react-icons/md';
import styled from 'styled-components';

const StyledSidebar = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: white;
  max-width: 270px;
  top: 0;
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
    transitionRef.current?.gotoFinalState();
    setShown(true);
  }, []);

  const close: SidebarHandle['close'] = useCallback(() => {
    transitionRef.current?.gotoInitialState();
    props.onClose && props.onClose();
    setShown(false);
  }, [props]);

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
    <Transition
      ref={transitionRef}
      duration="300ms"
      timingFunction="ease-in-out"
      transition={{
        initial: css`
          max-width: 0;
          overflow: hidden;
        `,
        final: css`
          max-width: 270px;
          overflow-y: auto;
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
      <StyledSidebar ref={setContainerRef}>
        <div onClick={close}>
          <MdClear />
        </div>
        <div>{props.children}</div>
      </StyledSidebar>
    </Transition>,
    portalsElement
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
