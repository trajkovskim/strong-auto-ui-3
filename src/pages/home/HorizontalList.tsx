import Button from 'components/Button';
import Container from 'components/Container';
import React, { useCallback, useEffect, useRef } from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import styled from 'styled-components';

type HorizontalListWrapperProps = {
  centered?: boolean;
  maxWidth?: string;
};

const HorizontalListWrapper = styled(Container)<HorizontalListWrapperProps>`
  margin-left: ${(props) => props.maxWidth && `calc((100% - ${props.maxWidth}) / 2)`};

  @media (max-width: ${(props) => props.maxWidth}) {
    max-width: ${(props) => props.maxWidth};
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
  > * {
    flex: 1 0 100%;
    user-select: none;
  }

  overflow-x: hidden;
`;

type Props = React.PropsWithChildren & HorizontalListWrapperProps;

const HorizontalList: React.FC<Props> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  let { current: mouseDown } = useRef<boolean>(false);
  let { current: mouseOver } = useRef<boolean>(false);
  let { current: previousTouch } = useRef<number>();

  const scrollEventHandler = useCallback((listScrollLeft: number, scroll: boolean) => {
    const listRef = ref.current;
    if (!listRef || !listRef.firstElementChild || !listRef.lastElementChild) {
      return;
    }

    const firstChild = listRef.firstElementChild as HTMLElement;
    const lastChild = listRef.lastElementChild as HTMLElement;
    const maxScrollLeft = listRef.scrollWidth - listRef.offsetWidth;

    if (listScrollLeft <= firstChild?.offsetWidth + 20) {
      listRef.removeChild(lastChild);
      listRef.prepend(lastChild);
      scroll && listRef.scrollTo({ left: lastChild?.offsetWidth + listScrollLeft });
    } else if (listScrollLeft >= maxScrollLeft - lastChild.offsetWidth) {
      listRef.removeChild(firstChild);
      listRef.append(firstChild);
      scroll && listRef.scrollTo({ left: listScrollLeft - (firstChild?.offsetWidth + 16) });
    }
  }, []);

  useEffect(() => {
    const listRef = ref.current;
    if (!listRef || !listRef.hasChildNodes) {
      return;
    }

    // Init
    const lastChild = listRef.lastElementChild as HTMLElement | undefined;
    lastChild && listRef.removeChild(lastChild);
    lastChild && listRef.prepend(lastChild);
    listRef.scrollTo({ left: lastChild?.offsetWidth });

    const interval = setInterval(() => {
      if (mouseOver) {
        return;
      }

      const deltaX = getButtonClickDeltaX() ?? 0;

      listRef.scrollTo({ left: listRef.scrollLeft + deltaX, behavior: 'smooth' });
    }, 3000);

    const handleScroll = () => scrollEventHandler(listRef.scrollLeft, true);
    listRef?.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      listRef?.removeEventListener('scroll', handleScroll);
    };
  }, [mouseOver, scrollEventHandler]);

  const getButtonClickDeltaX = () => {
    const firstChild = ref.current?.firstElementChild as HTMLElement;
    if (!firstChild) {
      return;
    }

    return firstChild?.offsetWidth + 16;
  };

  const onBackButtonClick = () => {
    const listRef = ref.current;
    if (!listRef) {
      return;
    }

    const deltaX = -(getButtonClickDeltaX() ?? 0);

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

  const handleTouchStart = (touchStartPosition: number) => {
    previousTouch = touchStartPosition;
    handleMouseDown();
  };

  const handleTouchEnd = () => {
    handleMouseUp();
    previousTouch = undefined;
  };

  return (
    <HorizontalListWrapper gap="2rem" centered={props.centered} maxWidth={props.maxWidth}>
      <HorizontalListChildrenWrapper
        preserveWhenXs
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
        onTouchStart={(event) => handleTouchStart(event.touches[0].pageX)}
        onTouchEnd={handleTouchEnd}
        onMouseMove={(event) => handleMouseMove(event.movementX)}
        onTouchMove={(event) => {
          if (previousTouch) {
            handleMouseMove(event.touches[0].pageX - previousTouch);
          }
          previousTouch = event.touches[0].pageX;
        }}
        onMouseEnter={() => (mouseOver = true)}
        onMouseLeave={() => (mouseOver = false)}
        ref={ref}
        direction="row"
        gap="16px"
      >
        {props.children}
      </HorizontalListChildrenWrapper>
      <Container preserveWhenXs direction="row" gap="1rem">
        <StyledArrowButton icon={<MdArrowBackIos />} themeType="ghost" onClick={onBackButtonClick} />
        <StyledArrowButton icon={<MdArrowForwardIos />} themeType="ghost" onClick={onForwardButtonClick} />
      </Container>
    </HorizontalListWrapper>
  );
};

export default HorizontalList;
