import { css as emitionCss } from '@emotion/css';
import Button from 'components/Button';
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

const arrowCss = css`
  height: 5.25rem;
  width: 2.125rem;

  justify-content: center;

  position: absolute;

  top: 50%;
  transform: translateY(-50%);

  background-color: rgba(57, 65, 68, 0.5);
  &:hover {
    background-color: #394144;
  }
`;

const StyledLeftArrowButton = styled(Button)`
  ${arrowCss};
  left: 0;

  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
`;

const StyledRightArrowButton = styled(Button)`
  ${arrowCss};
  right: 0;
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
`;

const StyledCarousel = styled.div<StyledCarouselProps>`
  display: grid;
  width: 100%;
  overflow: hidden;
  min-height: ${(props) => props.minHeight};
  max-height: ${(props) => props.maxHeight};
  position: ${(props) => (props.absolute ? 'absolute' : 'relative')};
  user-select: none;

  & > ${StyledLeftArrowButton}, & > ${StyledRightArrowButton} {
    opacity: 0;
  }

  &:hover > ${StyledLeftArrowButton}, &:hover > ${StyledRightArrowButton} {
    opacity: 1;
  }
`;

const SmallCircle = styled.div<{ fill?: boolean }>`
  width: 9px;
  height: 9px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  border: 1px solid #000;

  transition: all 200ms;

  background-color: ${(props) => props.fill && '#000'};
`;

const ChangerWrapper = styled(Container)`
  position: absolute;
  bottom: 10px;

  transform: translate(-50%);
  left: 50%;
`;

const StyledCarouselItem = styled.div<{
  absolute?: boolean;
}>`
  width: 100%;
  height: 100%;
  grid-row-start: 1;
  grid-column-start: 1;

  position: ${(props) => props.absolute && 'absolute'};
`;

type Props = React.PropsWithChildren &
  StyledCarouselProps & {
    ms?: number;
    noArrows?: boolean;
    noChangeOptions?: boolean;
  };

export type CarouselHandle = {
  next: (index?: number) => void;
  prev: () => void;
};

const Carousel = React.forwardRef<CarouselHandle, Props>(
  ({ ms = 10000, noArrows: noArrows = false, noChangeOptions = false, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const children = React.Children.toArray(props.children);

    const childrenRefs = useRef<(HTMLDivElement | null)[]>(new Array(children.length).fill(null));
    const transitionRefs = useRef<(TransitionHandle | null)[]>(new Array(children.length).fill(null));

    const getPrevIndex = useCallback(
      (currentIndex: number) => (currentIndex === 0 ? children.length - 1 : currentIndex - 1),
      [children.length]
    );

    const getAfterIndex = useCallback(
      (currentIndex: number) => (currentIndex + 1) % children.length,
      [children.length]
    );

    const updateZIndex = useCallback((index: number, value: string | number) => {
      childrenRefs.current[index]?.style?.setProperty('z-index', value.toString());
    }, []);

    const change = useCallback(
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

        change(prevIndex, nextIndex);

        return nextIndex;
      });
    }, [getPrevIndex, change]);

    const handleOnForward = useCallback(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = getAfterIndex(prevIndex);

        change(prevIndex, nextIndex);

        return nextIndex;
      });
    }, [getAfterIndex, change]);

    useEffect(() => {
      transitionRefs.current[0]?.gotoFinalState();
    }, []);

    useEffect(() => {
      const interval = setInterval(handleOnBackward, ms);

      return () => {
        clearInterval(interval);
      };
    }, [handleOnBackward, currentIndex, ms]);

    const handleChange = (nextIndex?: number) => {
      if (nextIndex === undefined || nextIndex === null) {
        handleOnForward();
      } else {
        setCurrentIndex((prevIndex) => {
          change(prevIndex, nextIndex);
          return nextIndex;
        });
      }
    };

    useImperativeHandle(ref, () => ({
      next: handleChange,
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
            <StyledCarouselItem absolute={props.absolute}>{child}</StyledCarouselItem>
          </Transition>
        ))}
        {!noChangeOptions && children.length > 1 && (
          <ChangerWrapper
            className="carousel_change-options"
            direction="row"
            gap="0.5rem"
            padding="sm"
            preserveWhenXs
            sm={'max-content'}
            justifyContent="center"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            {children.map((_, index) => (
              <SmallCircle
                fill={currentIndex === index}
                key={index}
                onClick={(event) => {
                  event.stopPropagation();
                  handleChange(index);
                }}
              />
            ))}
          </ChangerWrapper>
        )}
        {!noArrows && (
          <>
            <StyledLeftArrowButton
              icon={<MdArrowBackIos />}
              maxContent
              iconSize="lg"
              themeType="ghost"
              onClick={handleOnBackward}
            />
            <StyledRightArrowButton
              icon={<MdArrowForwardIos />}
              maxContent
              iconSize="lg"
              themeType="ghost"
              onClick={handleOnForward}
            />
          </>
        )}
      </StyledCarousel>
    );
  }
);

Carousel.displayName = 'Carousel';

export default Carousel;
