import { css } from '@emotion/css';
import SUVBodyTypeImage from 'assets/SUV.png';
import Button from 'components/Button';
import Container from 'components/Container';
import Icon from 'components/Icon';
import Line from 'components/Line';
import Transition, { TransitionHandle } from 'components/Transition';
import Text from 'components/typography/Text';
import Title from 'components/typography/Title';
import BodyTypeTile from 'pages/home/BodyTypeTile';
import List from 'pages/home/List';
import React, { useEffect, useRef, useState } from 'react';
import { BsArrowUpRight } from 'react-icons/bs';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';

const BodyTypes: React.FC = () => {
  const transitionRef = useRef<TransitionHandle>(null);
  const [listRef, setListRef] = useState<HTMLDivElement | null>(null);
  const [finalMaxHeight, setFinalMaxHeight] = useState<number>(200);
  const [initialMaxHeight, setInitialMaxHeight] = useState<number>(200);

  useEffect(() => {
    if (!listRef) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      if (transitionRef.current?.isRunning()) {
        return;
      }

      setFinalMaxHeight(listRef.scrollHeight);

      const firstChild = listRef.firstElementChild as HTMLElement | undefined;
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
  }, [listRef]);

  const transition = {
    initial: css`
      overflow-y: hidden;
      max-height: ${initialMaxHeight}px;
    `,
    final: css`
      max-height: ${finalMaxHeight}px;
    `,
  };

  const bodyTypes = new Array(12).fill({ label: 'SUV', imageSrc: SUVBodyTypeImage }).map((x) => x);

  return (
    <Container centered gap="1rem" padding={{ top: 'lg', left: 'md', right: 'md' }}>
      <Container direction="row" gap="1rem" alignItems="flex-end" justifyContent="space-between">
        <Title title="Browse by body type" fontSize="2xl" bold />
        <Button themeType="link" size="large">
          <Text fontSize="lg">View all</Text> <Icon icon={<BsArrowUpRight />} width="16px" />
        </Button>
      </Container>
      <Line />
      <Transition ref={transitionRef} transition={transition} duration="700ms" timingFunction="ease-in-out">
        <List ref={setListRef} gap="1rem">
          {bodyTypes.map((bodyType, index) => (
            <BodyTypeTile key={index} {...bodyType} />
          ))}
        </List>
      </Transition>
      <Container centered>
        <Button maxContent themeType="link" onClick={() => transitionRef.current?.toggle()}>
          <div>Show more</div>
          <Icon icon={<MdKeyboardDoubleArrowDown />} width="25px" />
        </Button>
      </Container>
    </Container>
  );
};

export default BodyTypes;
