import { css as emitionCss } from '@emotion/css';
import Container from 'components/Container';
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

const SmallCircle = styled.div<{ fill?: boolean }>`
  width: 9px;
  height: 9px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  border: 1px solid #eee;

  transition: all 200ms;

  background-color: ${(props) => props.fill && '#eee'};
`;

const ChangerWrapper = styled(Container)`
  position: absolute;
  bottom: 10px;
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
  next: (index?: number) => void;
  prev: () => void;
};

const Carousel = React.forwardRef<CarouselHandle, Props>(({ ms = 10000, noCommands = false, ...props }, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const handleChange = useCallback(
    (prevIndex: number, nextIndex: number) => {
      updateZIndex(prevIndex, -1);
      transitionRefs.current[prevIndex]?.gotoInitialState();
      updateZIndex(nextIndex, 0);
      transitionRefs.current[nextIndex]?.gotoFinalState();
    },
    [updateZIndex]
  );

  const handleOnBackward = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = getPrevIndex(prevIndex);

      handleChange(prevIndex, nextIndex);

      return nextIndex;
    });
  }, [getPrevIndex, handleChange]);

  const handleOnForward = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = getAfterIndex(prevIndex);

      handleChange(prevIndex, nextIndex);

      return nextIndex;
    });
  }, [getAfterIndex, handleChange]);

  useEffect(() => {
    transitionRefs.current[0]?.gotoFinalState();
  }, []);

  useEffect(() => {
    const interval = setInterval(handleOnBackward, ms);

    return () => {
      clearInterval(interval);
    };
  }, [handleOnBackward, currentIndex, ms]);

  useImperativeHandle(ref, () => ({
    next: (nextIndex?: number) => {
      if (nextIndex === undefined || nextIndex === null) {
        handleOnForward();
      } else {
        setCurrentIndex((prevIndex) => {
          handleChange(prevIndex, nextIndex);
          return nextIndex;
        });
      }
    },
    prev: handleOnBackward,
  }));

  return (
    <StyledCarousel
      className={props.className}
      minHeight={props.minHeight}
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
        >
          <StyledCarouselItem>{child}</StyledCarouselItem>
        </Transition>
      ))}
      <ChangerWrapper direction="row" gap="0.5rem" preserveWhenXs sm={12} justifyContent="center">
        {children.map((_, index) => (
          <SmallCircle fill={currentIndex === index} key={index} />
        ))}
      </ChangerWrapper>
      {!noCommands && <StyledMdArrowForwardIos onClick={handleOnForward} />}
      {!noCommands && <StyledMdArrowBackIos onClick={handleOnBackward} />}
    </StyledCarousel>
  );
});

Carousel.displayName = 'Carousel';

export default Carousel;
