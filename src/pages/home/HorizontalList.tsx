import Button from 'components/Button';
import Container, { BreakpointsProps } from 'components/Container';
import React, { useCallback, useEffect, useRef } from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import styled from 'styled-components';
import { getElementWidth } from 'utils';

type HorizontalListWrapperProps = {
  centered?: boolean;
  maxWidth?: string;
  gap?: React.CSSProperties['gap'];
};

const HorizontalListWrapper = styled(Container)<HorizontalListWrapperProps>`
  margin-left: ${(props) => props.maxWidth && `calc((100% - ${props.maxWidth}) / 2)`};
  max-width: ${(props) => props.maxWidth && `calc(${props.maxWidth} + (100% - ${props.maxWidth}) / 2)`};

  @media (max-width: ${(props) => props.maxWidth}) {
    /* max-width: ${(props) => props.maxWidth}; */
    margin-left: 0;
  }
  /* transform: translateX(-100%); */
  /* margin-left: ${(props) => props.maxWidth && `calc((100% - ${props.maxWidth}) / 2 + ${props.maxWidth})`}; */
`;

const StyledArrowButton = styled(Button)`
  padding-left: 20px;
  padding-right: 20px;

  justify-content: center;
`;

const HorizontalListChildrenWrapper = styled(Container)`
  & > * {
    flex: 1 0 100%;
    height: 100%;

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

const HorizontalList: React.FC<Props> = ({ intervalMs = 5000, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseDown = useRef<boolean>(false);
  const mouseOver = useRef<boolean>(false);
  const previousTouch = useRef<number>();
  const interval = useRef<number>();
  const moving = useRef<boolean>(false);

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

  const handleIterval = useCallback(() => {
    if (mouseOver.current || !ref.current?.hasChildNodes) {
      return;
    }

    move(getButtonClickDeltaX());
  }, [move]);

  const resetInterval = useCallback(() => {
    clearInterval(interval.current);
    interval.current = setInterval(handleIterval, intervalMs);
  }, [handleIterval, intervalMs]);

  const getButtonClickDeltaX = () => {
    const firstChild = ref.current?.firstElementChild as HTMLElement;
    if (!firstChild) {
      return 0;
    }

    return getElementWidth(firstChild);
  };

  const fixScrollPosition = useCallback(() => {
    if (!ref.current) {
      return;
    }

    resetInterval();

    const scrollLeft = ref.current.scrollLeft;
    let sum1 = 0;
    for (const child of ref.current.children) {
      const childWidth = getElementWidth(child);

      if (sum1 + childWidth * 0.25 <= scrollLeft) {
        sum1 += childWidth;
      }
    }

    move(Math.min(sum1 - scrollLeft));
  }, [move, resetInterval]);

  useEffect(() => {
    if (!ref.current?.hasChildNodes) {
      return;
    }

    interval.current = setInterval(handleIterval, intervalMs);

    const handleScroll = () => scrollEventHandler(ref.current?.scrollLeft ?? 0, true);
    ref.current.addEventListener('scroll', handleScroll);

    const handleScrollEnd = () => (moving.current = false);
    ref.current?.addEventListener('scrollend', handleScrollEnd);

    let timeout = setTimeout(fixScrollPosition, 1000);
    window.addEventListener('resize', () => {
      clearTimeout(timeout);
      timeout = setTimeout(fixScrollPosition, 300);
    });

    return () => {
      clearInterval(interval.current);
      ref.current?.removeEventListener('scroll', handleScroll);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ref.current?.removeEventListener('scrollend', handleScrollEnd);
      clearTimeout(timeout);
    };
  }, [fixScrollPosition, handleIterval, intervalMs, scrollEventHandler]);

  const onBackButtonClick = () => {
    if (move(-getButtonClickDeltaX())) {
      resetInterval();
    }
  };

  const onForwardButtonClick = () => {
    if (move(getButtonClickDeltaX())) {
      resetInterval();
    }
  };

  const handleMouseUp = () => {
    mouseDown.current = false;
    moving.current = false;

    fixScrollPosition();
  };

  const handleMouseDown = () => {
    mouseDown.current = true;
    moving.current = true;
  };
  const handleMouseMove = (movementX: number) => {
    if (mouseDown.current) {
      move(-movementX, 'auto', true);
    }
  };

  const disableTouchMove = (event: TouchEvent) => {
    event.preventDefault();
  };

  const handleTouchStart = (touchStartPosition: number) => {
    window.addEventListener('touchmove', disableTouchMove, { passive: false });
    previousTouch.current = touchStartPosition;
    handleMouseDown();
  };

  const handleTouchEnd = () => {
    handleMouseUp();
    previousTouch.current = undefined;
    window.removeEventListener('touchmove', disableTouchMove);
  };

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
        onTouchMove={(event) => {
          event.preventDefault();
          if (previousTouch.current) {
            handleMouseMove(event.touches[0].pageX - previousTouch.current);
          }
          previousTouch.current = event.touches[0].pageX;
        }}
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
      <Container justifyContent="center" padding={{ right: 'md' }} preserveWhenXs direction="row" gap="1rem">
        <StyledArrowButton icon={<MdArrowBackIos />} themeType="ghost" onClick={onBackButtonClick} />
        <StyledArrowButton icon={<MdArrowForwardIos />} themeType="ghost" onClick={onForwardButtonClick} />
      </Container>
    </HorizontalListWrapper>
  );
};

export default HorizontalList;
