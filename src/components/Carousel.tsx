import { css as emitionCss } from '@emotion/css';
import Transition, { TransitionHandle } from 'components/Transition';
import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import styled, { css } from 'styled-components';

type StyledCarouselProps = {
  minHeight?: string;
  maxHeight?: string;
  absolute?: boolean;
  className?: React.ComponentProps<'div'>['className'];
};

const StyledCarousel = styled.div<StyledCarouselProps>`
  display: grid;
  width: 100%;
  overflow: hidden;
  min-height: ${(props) => props.minHeight};
  max-height: ${(props) => props.maxHeight};
  position: ${(props) => (props.absolute ? 'absolute' : 'relative')};
  user-select: none;
`;

const arrowCss = css`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  transition: all 200ms ease-in-out;
  filter: drop-shadow(0 0 0.1rem #aaa5a5);
  user-select: none;

  &:hover {
    filter: drop-shadow(0 0 0.15rem #aaa5a5);
  }
`;

const StyledMdArrowBackIos = styled(MdArrowBackIos)`
  ${arrowCss};
  left: 10px;

  &:hover {
    left: 9px;
  }
`;

const StyledMdArrowForwardIos = styled(MdArrowForwardIos)`
  ${arrowCss};
  right: 10px;

  &:hover {
    right: 9px;
  }
`;

const StyledCarouselItem = styled.div`
  width: 100%;
  height: 100%;
  grid-row-start: 1;
  grid-column-start: 1;
`;

type Props = React.PropsWithChildren &
  StyledCarouselProps & {
    ms?: number;
    noCommands?: boolean;
  };

export type CarouselHandle = {
  next: () => void;
  prev: () => void;
};

const Carousel = React.forwardRef<CarouselHandle, Props>(({ ms = 10000, noCommands = false, ...props }, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [minHeight, setMinHeight] = useState(0);

  const children = React.Children.toArray(props.children);

  const childrenRefs = useRef<(HTMLDivElement | null)[]>(new Array(children.length).fill(null));
  const transitionRefs = useRef<(TransitionHandle | null)[]>(new Array(children.length).fill(null));

  const getPrevIndex = useCallback(
    (currentIndex: number) => (currentIndex === 0 ? children.length - 1 : currentIndex - 1),
    [children.length]
  );

  const getAfterIndex = useCallback((currentIndex: number) => (currentIndex + 1) % children.length, [children.length]);

  const updateZIndex = useCallback((index: number, value: string | number) => {
    childrenRefs.current[index]?.style?.setProperty('z-index', value.toString());
  }, []);

  const handleOnBackward = useCallback(() => {
    setCurrentIndex(getPrevIndex);
  }, [getPrevIndex]);

  const handleOnForward = useCallback(() => {
    setCurrentIndex(getAfterIndex);
  }, [getAfterIndex]);

  useEffect(() => {
    transitionRefs.current.forEach((ref, index) => {
      if (index === currentIndex) {
        updateZIndex(index, 0);
        ref?.gotoFinalState();
        return;
      }
      ref?.gotoInitialState();
    });
  }, [currentIndex, updateZIndex]);

  useEffect(() => {
    const interval = setInterval(handleOnBackward, ms);

    return () => {
      clearInterval(interval);
    };
  }, [handleOnBackward, currentIndex, ms]);

  useImperativeHandle(ref, () => ({
    next: handleOnForward,
    prev: handleOnBackward,
  }));

  return (
    <StyledCarousel
      className={props.className}
      minHeight={props.minHeight ?? `${minHeight}px`}
      maxHeight={props.maxHeight}
      absolute={props.absolute}
    >
      {children.map((child, index) => (
        <Transition
          key={index}
          ref={(ref) => (transitionRefs.current[index] = ref)}
          property="opacity"
          transition={{
            initial: emitionCss`
                opacity: 0;
              `,
            final: emitionCss`
                opacity: 1;
              `,
          }}
          onTransitionEnd={() => {
            const ref = transitionRefs.current[index];

            if (ref?.isInInitialState()) {
              updateZIndex(index, -1);
            }
          }}
        >
          <StyledCarouselItem style={{ zIndex: '-1' }} ref={(ref) => (childrenRefs.current[index] = ref)}>
            {child}
          </StyledCarouselItem>
        </Transition>
      ))}
      {!noCommands && <StyledMdArrowForwardIos onClick={handleOnForward} />}
      {!noCommands && <StyledMdArrowBackIos onClick={handleOnBackward} />}
    </StyledCarousel>
  );
});

Carousel.displayName = 'Carousel';

export default Carousel;
