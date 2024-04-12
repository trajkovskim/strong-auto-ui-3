import SUVBodyTypeImage from 'assets/SUV.png';
import Container from 'components/Container';
import BodyTypeTile from 'pages/home/BodyTypeTile';
import React, { TouchEventHandler, useCallback, useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled(Container)`
  overflow: auto;
`;

const HorizontalList = styled(Container)`
  > * {
    flex: 1 0 100%;
  }
`;

const BodyTypes: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseDown = useRef<boolean>(false);
  const mouseOver = useRef<boolean>(false);
  const previousTouch = useRef<number>();
  const moving = useRef<boolean>(false);

  const bodyTypes = new Array(11).fill({ label: 'SUV', imageSrc: SUVBodyTypeImage }).map((x) => x);

  const bodyTypesRow1 = bodyTypes.slice(0, Math.ceil(bodyTypes.length / 2));
  const bodyTypesRow2 = bodyTypes.slice(Math.ceil(bodyTypes.length / 2));

  const move = useCallback((deltaX: number, behavior: ScrollBehavior = 'smooth', force = false) => {
    if (moving.current && !force) {
      return false;
    }

    if (!force) {
      moving.current = true;
    }

    ref.current?.scrollTo({
      left: ref.current.scrollLeft + deltaX,
      behavior,
    });

    return moving.current || force;
  }, []);

  const handleMove = useCallback(
    (movementX: number) => {
      if (mouseDown.current) {
        move(-movementX, 'auto', true);
      }
    },
    [move]
  );

  // Mouse event handlers
  const handleMouseUp = useCallback(() => {
    mouseDown.current = false;
    moving.current = false;
  }, []);

  const handleMouseDown = useCallback(() => {
    mouseDown.current = true;
    moving.current = true;
  }, []);

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
        handleMove(event.touches[0].pageX - previousTouch.current);
      }
      previousTouch.current = event.touches[0].pageX;
    },
    [handleMove]
  );

  return (
    <Wrapper
      xs={12}
      ref={ref}
      preserveWhenXs
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      onTouchStart={(event) => handleTouchStart(event.touches[0].pageX)}
      onTouchEnd={handleTouchEnd}
      onMouseMove={(event) => handleMove(event.movementX)}
      onTouchMove={handleTouchMove}
      onMouseEnter={() => (mouseOver.current = true)}
      onMouseLeave={() => (mouseOver.current = false)}
      padding={{ top: 'md', bottom: 'md' }}
      gap="1rem"
    >
      <HorizontalList preserveWhenXs sm={12} gap="1rem" direction="row">
        {bodyTypesRow1.map((bodyType, index) => (
          <BodyTypeTile key={index} {...bodyType} />
        ))}
      </HorizontalList>
      <HorizontalList preserveWhenXs sm={12} gap="1rem" direction="row">
        {bodyTypesRow2.map((bodyType, index) => (
          <BodyTypeTile key={index} {...bodyType} />
        ))}
      </HorizontalList>
    </Wrapper>
  );
};

export default BodyTypes;
