import Button from 'components/Button';
import Container, { ContainerBreakpointsProps } from 'components/Container';
import React, { TouchEventHandler, useCallback, useEffect, useRef } from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import styled, { css } from 'styled-components';
import { getElementWidth } from 'utils';

type HorizontalListWrapperProps = {
  centered?: boolean;
  maxWidth?: string;
  gap?: React.CSSProperties['gap'];
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

const HorizontalListWrapper = styled(Container)<HorizontalListWrapperProps>`
  margin-left: ${(props) => props.maxWidth && `calc((100% - ${props.maxWidth}) / 2)`};
  max-width: ${(props) => props.maxWidth && `calc(${props.maxWidth} + (100% - ${props.maxWidth}) / 2)`};
  width: 100%;

  @media (max-width: ${(props) => props.maxWidth}) {
    /* max-width: ${(props) => props.maxWidth}; */
    margin-left: 0;
  }
  /* transform: translateX(-100%); */
  /* margin-left: ${(props) => props.maxWidth && `calc((100% - ${props.maxWidth}) / 2 + ${props.maxWidth})`}; */

  position: relative;

  & > ${StyledLeftArrowButton}, & > ${StyledRightArrowButton} {
    opacity: 0;
  }

  &:hover > ${StyledLeftArrowButton}, &:hover > ${StyledRightArrowButton} {
    opacity: 1;
  }
`;

const HorizontalListChildrenWrapper = styled(Container)`
  & > * {
    flex: 1 0 100%;
    min-height: 100%;
    width: 100%;

    user-select: none;

    border-left: ${(props) => `calc(${props.gap} / 2)`} solid transparent;
    border-right: ${(props) => `calc(${props.gap} / 2)`} solid transparent;
  }

  & > *:last-child {
    border-right: ${(props) => props.gap} solid transparent;
  }

  & > *:first-child {
    border-left: 0;
  }

  gap: 0;

  overflow-x: hidden;
`;

type Props = React.PropsWithChildren &
  HorizontalListWrapperProps & {
    intervalMs?: number;
    chunkSize?: ContainerBreakpointsProps;
    chunkGap?: React.CSSProperties['gap'];
  };

enum DragDirection {
  LEFT = 'left',
  RIGHT = 'right',
}

const overlapPercentToNextItem = 0.1;

const percentByDirection = {
  [DragDirection.LEFT]: overlapPercentToNextItem,
  [DragDirection.RIGHT]: 1 - overlapPercentToNextItem,
};

const HorizontalList: React.FC<Props> = ({ intervalMs = 5000, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseDown = useRef<boolean>(false);
  const mouseOver = useRef<boolean>(false);
  const previousTouch = useRef<number>();
  const interval = useRef<number>();
  const moving = useRef<boolean>(false);
  const dragDirection = useRef<DragDirection>(DragDirection.LEFT);

  const scrollEventHandler = useCallback((listScrollLeft: number, scroll: boolean): boolean => {
    const listRef = ref.current;
    if (!listRef || !listRef.firstElementChild || !listRef.lastElementChild) {
      return false;
    }

    const firstChild = listRef.firstElementChild as HTMLElement;
    const lastChild = listRef.lastElementChild as HTMLElement;
    const maxScrollLeft = listRef.scrollWidth - listRef.offsetWidth;

    if (listScrollLeft <= getElementWidth(firstChild)) {
      listRef.removeChild(lastChild);
      listRef.prepend(lastChild);
      scroll && listRef.scrollTo({ left: listScrollLeft + lastChild.offsetWidth });

      return true;
    } else if (listScrollLeft >= maxScrollLeft - getElementWidth(lastChild)) {
      listRef.removeChild(firstChild);
      listRef.append(firstChild);
      scroll && listRef.scrollTo({ left: listScrollLeft - firstChild.offsetWidth });

      return true;
    }

    return false;
  }, []);

  const handleScrollEnd = useCallback(() => {
    moving.current = false;
  }, []);

  const move = useCallback(
    (deltaX: number, behavior: ScrollBehavior = 'smooth', force = false) => {
      if (moving.current && !force) {
        return false;
      }

      if (!force) {
        scrollEventHandler(ref.current?.scrollLeft ?? 0, true);

        moving.current = true;
      }

      ref.current?.scrollTo({
        left: ref.current.scrollLeft + deltaX,
        behavior,
      });

      if (force) {
        return force;
      }

      if (behavior === 'smooth') {
        ref.current?.addEventListener('scrollend', handleScrollEnd, { once: true });
      } else {
        moving.current = false;
      }

      return moving.current;
    },
    [handleScrollEnd, scrollEventHandler]
  );

  const getButtonClickDeltaX = useCallback(() => {
    const firstChild = ref.current?.firstElementChild as HTMLElement;
    if (!firstChild) {
      return 0;
    }

    return getElementWidth(firstChild);
  }, []);

  const handleInterval = useCallback(() => {
    if (mouseOver.current || !ref.current?.hasChildNodes) {
      return;
    }

    move(getButtonClickDeltaX());
  }, [getButtonClickDeltaX, move]);

  const resetInterval = useCallback(() => {
    clearInterval(interval.current);
    interval.current = setInterval(handleInterval, intervalMs);
  }, [handleInterval, intervalMs]);

  const fixScrollPosition = useCallback(() => {
    if (!ref.current) {
      return;
    }

    resetInterval();

    const scrollLeft = ref.current.scrollLeft;

    let sum = 0;
    for (const child of ref.current.children) {
      const childWidth = getElementWidth(child);

      if (sum + childWidth * percentByDirection[dragDirection.current] > scrollLeft) {
        move(sum - scrollLeft);
        break;
      }

      sum += childWidth;
    }
  }, [move, resetInterval]);

  useEffect(() => {
    const listRef = ref.current;
    if (!listRef?.hasChildNodes) {
      return;
    }

    interval.current = setInterval(handleInterval, intervalMs);

    let timeout = setTimeout(fixScrollPosition, 1000);
    window.addEventListener('resize', () => {
      clearTimeout(timeout);
      timeout = setTimeout(fixScrollPosition, 300);
    });

    return () => {
      clearInterval(interval.current);
      clearTimeout(timeout);
    };
  }, [fixScrollPosition, handleInterval, intervalMs, scrollEventHandler]);

  // Arrow controlls handlers
  const onBackButtonClick = useCallback(() => {
    if (!ref.current?.scrollLeft || moving.current) {
      return;
    }

    const deltaX = -getButtonClickDeltaX();
    if (scrollEventHandler(ref.current?.scrollLeft + deltaX, false)) {
      move(-deltaX, 'auto', true);
    }

    if (move(deltaX, 'smooth')) {
      resetInterval();
    }
  }, [getButtonClickDeltaX, move, resetInterval, scrollEventHandler]);

  const onForwardButtonClick = useCallback(() => {
    if (!ref.current?.scrollLeft || moving.current) {
      return;
    }

    const deltaX = getButtonClickDeltaX();
    if (scrollEventHandler(ref.current?.scrollLeft + deltaX, false)) {
      move(-deltaX, 'auto', true);
    }

    if (move(deltaX, 'smooth')) {
      resetInterval();
    }
  }, [getButtonClickDeltaX, move, resetInterval, scrollEventHandler]);

  // Mouse event handlers
  const handleScroll = useCallback(() => scrollEventHandler(ref.current?.scrollLeft ?? 0, true), [scrollEventHandler]);

  const handleMouseUp = useCallback(() => {
    mouseDown.current = false;
    moving.current = false;

    ref.current?.removeEventListener('scroll', handleScroll);

    fixScrollPosition();
  }, [fixScrollPosition, handleScroll]);

  const handleMouseDown = useCallback(() => {
    mouseDown.current = true;
    moving.current = true;

    ref.current?.addEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleMouseMove = useCallback(
    (movementX: number) => {
      if (mouseDown.current) {
        dragDirection.current = movementX < 0 ? DragDirection.LEFT : DragDirection.RIGHT;
        move(-movementX, 'auto', true);
      }
    },
    [move]
  );

  // Touch event handlers
  const handleTouchStart = useCallback(
    (touchStartPosition: number) => {
      ref.current?.style.setProperty('touch-action', 'pan-x');
      previousTouch.current = touchStartPosition;
      handleMouseDown();
    },
    [handleMouseDown]
  );

  const handleTouchEnd = useCallback(() => {
    handleMouseUp();
    previousTouch.current = undefined;
    ref.current?.style.setProperty('touch-action', 'pan-x');
  }, [handleMouseUp]);

  const handleTouchMove: TouchEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault();
      if (previousTouch.current) {
        handleMouseMove(event.touches[0].pageX - previousTouch.current);
      }
      previousTouch.current = event.touches[0].pageX;
    },
    [handleMouseMove]
  );

  return (
    <HorizontalListWrapper gap={props.gap} centered={props.centered} maxWidth={props.maxWidth}>
      <HorizontalListChildrenWrapper
        preserveWhenXs
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
        onTouchStart={(event) => {
          handleTouchStart(event.touches[0].pageX);
        }}
        onTouchEnd={handleTouchEnd}
        onMouseMove={(event) => handleMouseMove(event.movementX)}
        onTouchMove={handleTouchMove}
        onMouseEnter={() => (mouseOver.current = true)}
        onMouseLeave={() => (mouseOver.current = false)}
        ref={ref}
        direction="row"
        gap={props.chunkGap}
      >
        {React.Children.map(props.children, (child, index) => {
          return (
            <Container {...props.chunkSize} preserveWhenXs key={index}>
              {child}
            </Container>
          );
        })}
      </HorizontalListChildrenWrapper>
      <StyledLeftArrowButton
        icon={<MdArrowBackIos />}
        maxContent
        iconSize="lg"
        themeType="ghost"
        onClick={onBackButtonClick}
      />
      <StyledRightArrowButton
        icon={<MdArrowForwardIos />}
        maxContent
        iconSize="lg"
        themeType="ghost"
        onClick={onForwardButtonClick}
      />
    </HorizontalListWrapper>
  );
};

const memoHorizontalList = React.memo(HorizontalList);

export default memoHorizontalList;
