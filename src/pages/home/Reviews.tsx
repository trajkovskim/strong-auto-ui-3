import Carousel from 'components/Carousel';
import Container from 'components/Container';
import Icon from 'components/Icon';
import Line from 'components/Line';
import Text from 'components/typography/Text';
import { reviews } from 'pages/constants';
import React, { useMemo } from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import styled from 'styled-components';

const StarsWrapper = styled(Container)`
  color: #232323;
`;

type ReviewProps = {
  review: (typeof reviews)[number];
};

const Review: React.FC<ReviewProps> = (props) => {
  const createdStars = useMemo(
    () => (
      <Container direction="row" gap="0.5rem">
        {new Array(5).fill(0).map((_, index) => {
          const remainingRating = props.review.rating - index;

          if (remainingRating >= 1) {
            return <Icon icon={<BsStarFill />} width="18px" key={index} />;
          } else if (remainingRating > 0 && remainingRating < 1) {
            return <Icon icon={<BsStarHalf />} width="18px" key={index} />;
          } else {
            return <Icon icon={<BsStar />} width="18px" key={index} />;
          }
        })}
      </Container>
    ),
    [props.review.rating]
  );

  return (
    <Container key={props.review.id} gap="3rem" direction="row" centered>
      <Container gap="1rem">
        <Container>
          <Text fontSize="lg" bold>
            {props.review.username}
          </Text>
          <Text fontSize="sm">{props.review.creationDate.toUTCString()}</Text>
        </Container>
        <Container gap="0.5rem">
          <StarsWrapper sm="max-content">{createdStars}</StarsWrapper>
          <Text fontSize="sm">{props.review.rating}-star rating</Text>
        </Container>
      </Container>
      <Container gap="1rem">
        <Text fontSize="lg" bold>
          {props.review.comment ??
            // eslint-disable-next-line max-len
            'Wanted to say how amazing my experience was at [CarShop]. We did everything online, and the truck was delivered to my door... Awesome!'}
        </Text>
        <Text>via {props.review.platform}</Text>
      </Container>
    </Container>
  );
};

const Wrapper = styled(Container)`
  /* background-color: #1c72c5; */
  /* color: white; */
`;

const StyledLine = styled(Line)`
  border-color: #232323;
  border-width: 4px;
  border-image: none;
`;

const Reviews: React.FC = () => {
  return (
    <Wrapper sm={12} gap="4rem" centered>
      <Container sm="1400px" padding={{ left: 'md', right: 'md', top: '3xl', bottom: '2xl' }} centered>
        <Carousel noArrows noChangeOptions>
          {reviews.map((review) => {
            return <Review key={review.id} review={review} />;
          })}
        </Carousel>
      </Container>
      <StyledLine />
    </Wrapper>
  );
};

export default Reviews;
