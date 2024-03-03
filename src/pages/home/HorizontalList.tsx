import Button from 'components/Button';
import Container, { BreakpointsProps } from 'components/Container';
import React, { useEffect, useRef } from 'react';
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
  let { current: mouseDown } = useRef<boolean>(false);
  let { current: mouseOver } = useRef<boolean>(false);
  let { current: previousTouch } = useRef<number>();
  let { current: interval } = useRef<number>();

  const handleIterval = () => {
    const listRef = ref.current;
    if (!listRef || !listRef.hasChildNodes) {
      return;
    }

    if (mouseOver) {
      return;
    }

    const deltaX = getButtonClickDeltaX() ?? 0;

    listRef.scrollTo({ left: listRef.scrollLeft + deltaX, behavior: 'smooth' });
  };

  useEffect(() => {
    const listRef = ref.current;
    if (!listRef || !listRef.hasChildNodes) {
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    interval = setInterval(handleIterval, intervalMs);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getButtonClickDeltaX = () => {
    const firstChild = ref.current?.firstElementChild as HTMLElement;
    if (!firstChild) {
      return;
    }

    return getElementWidth(firstChild);
  };

  const onBackButtonClick = () => {
    const listRef = ref.current;
    if (!listRef) {
      return;
    }

    const deltaX = -(getButtonClickDeltaX() ?? 0);

    clearInterval(interval);
    interval = setInterval(handleIterval, intervalMs);
    listRef.scrollTo({
      left: listRef.scrollLeft + deltaX,
      behavior: 'smooth',
    });
  };

  const onForwardButtonClick = () => {
    const listRef = ref.current;
    if (!listRef) {
      return;
    }

    const deltaX = getButtonClickDeltaX() ?? 0;

    clearInterval(interval);
    interval = setInterval(handleIterval, intervalMs);
    listRef.scrollTo({
      left: listRef.scrollLeft + deltaX,
      behavior: 'smooth',
    });
  };

  const handleMouseUp = () => (mouseDown = false);
  const handleMouseDown = () => (mouseDown = true);
  const handleMouseMove = (movementX: number) => {
    if (mouseDown) {
      const listRef = ref.current;
      listRef?.scrollTo({ left: listRef?.scrollLeft - movementX });
    }
  };

  const disableTouchMove = (event: TouchEvent) => {
    event.preventDefault();
  };

  const handleTouchStart = (touchStartPosition: number) => {
    window.addEventListener('touchmove', disableTouchMove, { passive: false });
    previousTouch = touchStartPosition;
    handleMouseDown();
  };

  const handleTouchEnd = () => {
    handleMouseUp();
    previousTouch = undefined;
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
          if (previousTouch) {
            handleMouseMove(event.touches[0].pageX - previousTouch);
          }
          previousTouch = event.touches[0].pageX;
        }}
        onMouseEnter={() => (mouseOver = true)}
        onMouseLeave={() => (mouseOver = false)}
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
