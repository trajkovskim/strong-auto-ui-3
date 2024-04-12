import Button from 'components/Button';
import Container, { BreakpointsProps } from 'components/Container';
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
    chunkSize?: BreakpointsProps;
    chunkGap?: React.CSSProperties['gap'];
  };

enum DragDirection {
  LEFT = 'left',
  RIGHT = 'right',
}

const percentByDirection = {
  [DragDirection.LEFT]: 0.25,
  [DragDirection.RIGHT]: 0.75,
};

const HorizontalList: React.FC<Props> = ({ intervalMs = 5000, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseDown = useRef<boolean>(false);
  const mouseOver = useRef<boolean>(false);
  const previousTouch = useRef<number>();
  const interval = useRef<number>();
  const moving = useRef<boolean>(false);
  const dragDirection = useRef<DragDirection>(DragDirection.LEFT);

  const scrollEventHandler = useCallback((listScrollLeft: number, scroll: boolean) => {
    const listRef = ref.current;
    if (!listRef || !listRef.firstElementChild || !listRef.lastElementChild) {
      return;
    }

    const firstChild = listRef.firstElementChild as HTMLElement;
    const lastChild = listRef.lastElementChild as HTMLElement;
    const maxScrollLeft = listRef.scrollWidth - listRef.offsetWidth;

    if (listScrollLeft <= getElementWidth(firstChild)) {
      listRef.removeChild(lastChild);
      listRef.prepend(lastChild);
      scroll && listRef.scrollTo({ left: listScrollLeft + lastChild.offsetWidth });
    } else if (listScrollLeft >= maxScrollLeft - getElementWidth(lastChild)) {
      listRef.removeChild(firstChild);
      listRef.append(firstChild);
      scroll && listRef.scrollTo({ left: listScrollLeft - firstChild.offsetWidth });
    }
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

      return moving.current || force;
    },
    [scrollEventHandler]
  );

  const getButtonClickDeltaX = useCallback(() => {
    const firstChild = ref.current?.firstElementChild as HTMLElement;
    if (!firstChild) {
      return 0;
    }

    return getElementWidth(firstChild);
  }, []);

  const handleIterval = useCallback(() => {
    if (mouseOver.current || !ref.current?.hasChildNodes) {
      return;
    }

    move(getButtonClickDeltaX());
  }, [getButtonClickDeltaX, move]);

  const resetInterval = useCallback(() => {
    clearInterval(interval.current);
    interval.current = setInterval(handleIterval, intervalMs);
  }, [handleIterval, intervalMs]);

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

    interval.current = setInterval(handleIterval, intervalMs);

    const handleScroll = () => scrollEventHandler(ref.current?.scrollLeft ?? 0, true);
    listRef.addEventListener('scroll', handleScroll);

    const handleScrollEnd = () => {
      moving.current = false;
    };
    listRef?.addEventListener('scrollend', handleScrollEnd);

    let timeout = setTimeout(fixScrollPosition, 1000);
    window.addEventListener('resize', () => {
      clearTimeout(timeout);
      timeout = setTimeout(fixScrollPosition, 300);
    });

    return () => {
      clearInterval(interval.current);
      listRef?.removeEventListener('scroll', handleScroll);
      listRef?.removeEventListener('scrollend', handleScrollEnd);
      clearTimeout(timeout);
    };
  }, [fixScrollPosition, handleIterval, intervalMs, scrollEventHandler]);

  // Arrow controlls handlers
  const onBackButtonClick = useCallback(() => {
    if (move(-getButtonClickDeltaX())) {
      resetInterval();
    }
  }, [getButtonClickDeltaX, move, resetInterval]);

  const onForwardButtonClick = useCallback(() => {
    if (move(getButtonClickDeltaX())) {
      resetInterval();
    }
  }, [getButtonClickDeltaX, move, resetInterval]);

  // Mouse event handlers
  const handleMouseUp = useCallback(() => {
    mouseDown.current = false;
    moving.current = false;

    fixScrollPosition();
  }, [fixScrollPosition]);

  const handleMouseDown = useCallback(() => {
    mouseDown.current = true;
    moving.current = true;
  }, []);

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
