import { css } from '@emotion/css';
import SUVBodyTypeImage from 'assets/SUV.png';
import Button from 'components/Button';
import Container from 'components/Container';
import Icon from 'components/Icon';
import Line from 'components/Line';
import List from 'components/List';
import Transition, { TransitionHandle, ComponentState } from 'components/Transition';
import Title from 'components/typography/Title';
import BodyTypeTile from 'pages/home/BodyTypeTile';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BsArrowUpRight } from 'react-icons/bs';
import { MdKeyboardDoubleArrowDown, MdKeyboardDoubleArrowUp } from 'react-icons/md';

const BodyTypes: React.FC = () => {
  const transitionRef = useRef<TransitionHandle>(null);
  const [listRef, setListRef] = useState<HTMLDivElement | null>(null);
  const [finalMaxHeight, setFinalMaxHeight] = useState<number>(200);
  const [initialMaxHeight, setInitialMaxHeight] = useState<number>(200);
  const [state, setState] = useState<ComponentState>();

  useEffect(() => {
    if (!listRef) {
      return;
    }

    const resizeObserver = new ResizeObserver(([listRefEntry]: ResizeObserverEntry[]) => {
      if (transitionRef.current?.isRunning()) {
        return;
      }

      setFinalMaxHeight((prev) => Math.max(listRefEntry.target.scrollHeight, prev));

      const firstChild = listRefEntry.target.firstElementChild as HTMLElement | undefined;
      if (firstChild) {
        const styles = window.getComputedStyle(listRef);
        const gap = parseInt(styles.gap);
        const paddingTop = parseInt(styles.paddingTop);

        setInitialMaxHeight(firstChild.offsetHeight + gap / 2 + paddingTop);
      }
    });

    resizeObserver.observe(listRef);

    return () => {
      resizeObserver.disconnect();
    };
  }, [finalMaxHeight, initialMaxHeight, listRef]);

  const transition = useMemo(() => {
    return {
      initial: css`
        overflow-y: hidden;
        max-height: ${initialMaxHeight}px;
      `,
      final: css`
        max-height: ${finalMaxHeight}px !important;
      `,
    };
  }, [finalMaxHeight, initialMaxHeight]);

  const handleShowMore = () => {
    setFinalMaxHeight((prev) => Math.max(listRef?.scrollHeight as number, prev));
    transitionRef.current?.toggle();
  };

  const bodyTypes = new Array(12).fill({ label: 'SUV', imageSrc: SUVBodyTypeImage }).map((x) => x);

  return (
    <Container alignItems="center" gap="2rem" padding={{ top: 'lg', left: 'md', right: 'md' }}>
      <Container gap="1rem" alignItems="center">
        <Title centered title="Browse by body type" fontSize="2xl" bold />
        <Button themeType="link" size="lg" iconRight={<BsArrowUpRight />}>
          View all
        </Button>
      </Container>
      <Line />
      <Transition
        ref={transitionRef}
        onTransitionEnd={() => {
          setState(transitionRef.current?.componentState);
        }}
        transition={transition}
        duration="700ms"
        timingFunction="ease-in-out"
      >
        <List
          padding={{ top: 'sm', left: 'md', right: 'md' }}
          ref={setListRef}
          xs={2}
          sm={3}
          md={4}
          lg={5}
          xl={6}
          {...{ '2xl': 7 }}
          gap="1rem"
        >
          {bodyTypes.map((bodyType, index) => (
            <BodyTypeTile key={index} {...bodyType} />
          ))}
        </List>
      </Transition>
      <Container centered alignItems="center">
        <Button textAlign="center" maxContent themeType="link" onClick={handleShowMore}>
          {state !== ComponentState.INITIAL ? (
            <>
              <Icon icon={<MdKeyboardDoubleArrowUp />} width="30px" />
              <div style={{ fontSize: '17px' }}>Hide</div>
            </>
          ) : (
            <>
              <div style={{ fontSize: '18px' }}>Show more</div>
              <Icon icon={<MdKeyboardDoubleArrowDown />} width="30px" />
            </>
          )}
        </Button>
      </Container>
    </Container>
  );
};

export default BodyTypes;
