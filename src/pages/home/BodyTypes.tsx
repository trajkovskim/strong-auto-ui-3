import List from 'components/List';
import { HorizontalListModel, createHorizontalListHandlers } from 'components/horizontalList/horizontalListUtils';
import { bodyTypes } from 'pages/constants';
import BodyTypeTile from 'pages/home/BodyTypeTile';
import React, { useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled(List)`
  overflow-x: scroll;
  position: relative;
`;

const BodyTypes: React.FC = () => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const horizontalList = useRef<HorizontalListModel>();
  const horizontalListHandlers = useMemo(() => createHorizontalListHandlers(ref, horizontalList, false), [ref]);

  return (
    <Wrapper
      xs={7}
      elementWidth="300px"
      ref={setRef}
      onMouseUp={() => horizontalListHandlers?.mouseUpHandler()}
      onMouseDown={() => horizontalListHandlers?.mouseDownHandler()}
      onTouchStart={(event) => horizontalListHandlers?.touchStartHandler(event)}
      onTouchEnd={() => horizontalListHandlers?.touchEndHandler()}
      onMouseMove={(event) => horizontalListHandlers?.mouseMoveHandler(event)}
      onTouchMove={(event) => horizontalListHandlers?.touchMoveHandler(event)}
      onMouseEnter={() => horizontalListHandlers?.mouseEnterHandler()}
      onMouseLeave={() => horizontalListHandlers?.mouseLeaveHandler()}
      padding={{ top: 'md', bottom: 'md' }}
      gap="1rem"
    >
      {bodyTypes.map((bodyType) => (
        <BodyTypeTile key={bodyType.id} {...bodyType} />
      ))}
    </Wrapper>
  );
};

export default BodyTypes;
