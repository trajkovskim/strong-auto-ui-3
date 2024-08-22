import Container from 'components/Container';
import HorizontalList from 'components/horizontalList/HorizontalList';
import { bodyTypes } from 'pages/constants';
import BodyTypeTile from 'pages/home/BodyTypeTile';
import React from 'react';

const BodyTypes: React.FC = () => {
  return (
    <HorizontalList chunkGap="1rem" chunkSize={{ xs: '300px' }}>
      {new Array(Math.floor(bodyTypes.length / 2)).fill(0).map((_, index) => (
        <Container key={`${bodyTypes[2 * index].id}_${bodyTypes[2 * index + 1].id}`} styleConfig={{ gap: '1rem' }}>
          <BodyTypeTile {...bodyTypes[2 * index]} />
          <BodyTypeTile {...bodyTypes[2 * index + 1]} />
        </Container>
      ))}
      {!!(bodyTypes.length % 2) && (
        <Container>
          <BodyTypeTile {...bodyTypes[bodyTypes.length - 1]} />
        </Container>
      )}
    </HorizontalList>
  );
};

export default BodyTypes;
