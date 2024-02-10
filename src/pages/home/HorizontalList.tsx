import Button from 'components/Button';
import Container from 'components/Container';
import React, { useEffect, useRef } from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import styled from 'styled-components';

const HorizontalListWrapper = styled(Container)`
  max-width: calc(1400px + (100% - 1400px) / 2);
  margin-left: auto;
`;

const StyledArrowButton = styled(Button)`
  padding-left: 20px;
  padding-right: 20px;
`;

const HorizontalListChildrenWrapper = styled(Container)`
  > * {
    flex: 1 0 100%;
    user-select: none;
  }

  overflow-x: hidden;
`;

type Props = React.PropsWithChildren;

const HorizontalList: React.FC<Props> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseDown = useRef<boolean>(false);
  const mouseOver = useRef<boolean>(false);

  useEffect(() => {
    const listRef = ref.current;
    if (!listRef || !listRef.hasChildNodes) {
      return;
    }

    // Init
    const lastChild = listRef.lastElementChild;
    lastChild && listRef.removeChild(lastChild);
    lastChild && listRef.prepend(lastChild);
    listRef.scrollTo({ left: lastChild?.clientWidth });

    const interval = setInterval(() => {
      const firstChild = listRef.firstElementChild;
      const secondChild = firstChild?.nextElementSibling;
      const listScrollLeft = listRef.scrollLeft;

      if (!firstChild || !secondChild) {
        return;
      }

      const randomNumber1 = Math.random() * 100;
      const randomNumber2 = Math.random() * 100;

      listRef.scrollTo({
        left:
          listScrollLeft +
          (randomNumber2 % 2) * -1 * (firstChild?.clientWidth + (randomNumber1 % 2) * secondChild?.clientWidth),
        behavior: 'smooth',
      });
    }, 10000);

    const scrollEventHandler = () => {
      const firstChild = listRef.firstElementChild;
      const lastChild = listRef.lastElementChild;
      const listScrollLeft = listRef.scrollLeft;

      const maxScrollLeft = listRef.scrollWidth - listRef.clientWidth;

      if (firstChild && lastChild && listScrollLeft && listScrollLeft <= firstChild?.clientWidth / 2) {
        listRef.removeChild(lastChild);
        listRef.prepend(lastChild);
        listRef.scrollTo({ left: lastChild?.clientWidth + listScrollLeft });
      } else if (firstChild && lastChild && listScrollLeft >= maxScrollLeft - lastChild.clientWidth) {
        listRef.removeChild(firstChild);
        listRef.append(firstChild);
        listRef.scrollTo({ left: listScrollLeft - firstChild?.clientWidth });
      }
    };

    listRef?.addEventListener('scroll', scrollEventHandler);

    return () => {
      clearInterval(interval);
      listRef?.removeEventListener('scroll', scrollEventHandler);
    };
  }, []);

  const onBackButtonClick = () => {
    const listRef = ref.current;

    if (!listRef) {
      return;
    }

    const firstChild = listRef.firstElementChild;
    const secondChild = firstChild?.nextElementSibling;
    const listScrollLeft = listRef.scrollLeft;

    if (!firstChild || !secondChild) {
      return;
    }

    listRef.scrollTo({
      left: listScrollLeft - (firstChild?.clientWidth + secondChild?.clientWidth),
      behavior: 'smooth',
    });
  };

  const onForwardButtonClick = () => {
    const listRef = ref.current;

    if (!listRef) {
      return;
    }

    const firstChild = listRef.firstElementChild;
    const secondChild = firstChild?.nextElementSibling;
    const listScrollLeft = listRef.scrollLeft;

    if (!firstChild || !secondChild) {
      return;
    }

    listRef.scrollTo({
      left: listScrollLeft + firstChild?.clientWidth + secondChild?.clientWidth,
      behavior: 'smooth',
    });
  };

  return (
    <HorizontalListWrapper gap="2rem">
      <HorizontalListChildrenWrapper
        onMouseUp={() => (mouseDown.current = false)}
        onMouseDown={() => (mouseDown.current = true)}
        onMouseMove={(event) => {
          if (mouseDown.current) {
            const listRef = ref.current;
            listRef?.scrollTo({ left: listRef?.scrollLeft - event.movementX });
          }
        }}
        onMouseEnter={() => (mouseOver.current = true)}
        onMouseLeave={() => (mouseOver.current = false)}
        ref={ref}
        direction="row"
        gap="1rem"
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
