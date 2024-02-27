import PoweredByGoogleImage from 'assets/powered_by_google.png';
import Carousel from 'components/Carousel';
import Container from 'components/Container';
import Icon from 'components/Icon';
import Image from 'components/Image';
import Line from 'components/Line';
import Text from 'components/typography/Text';
import { reviews } from 'pages/constants';
import React, { useMemo } from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import styled from 'styled-components';

const AvatarImage = styled(Image)`
  border-radius: 50%;
`;

const StarsWrapper = styled(Container)`
  color: #046af2;
`;

type ReviewProps = {
  review: (typeof reviews)[number];
};

const Review: React.FC<ReviewProps> = (props) => {
  const createdStars = useMemo(
    () => (
      <Container preserveWhenXs direction="row" gap="0.5rem">
        {new Array(5).fill(0).map((_, index) => {
          if (props.review.rating - index) {
            return <Icon icon={<BsStarFill />} width="18px" key={index} />;
          } else if (props.review.rating > 0 && props.review.rating < 1) {
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
    <Container key={props.review.id} gap="1rem" preserveWhenXs xs={9.8} md={8} centered alignSelf="center">
      <Container preserveWhenXs direction="row" gap="1rem" alignItems="center">
        <AvatarImage src={PoweredByGoogleImage} objectFit="contain" width="50px" height="50px" alt="avatar" />
        <Container gap="0.5rem">
          <Container>
            <Text fontSize="xl">{props.review.username}</Text>
            <Text type="sub" fontSize="sm">
              {props.review.creationDate.toUTCString()}
            </Text>
          </Container>
          <StarsWrapper>{createdStars}</StarsWrapper>
        </Container>
      </Container>
      <Text type="sub" fontSize="lg">
        {props.review.comment ??
          // eslint-disable-next-line max-len
          'No comment addedNo comment addedNo comment addedNo comment addedNo comment addedNo comment addedNo comment addedNo comment addedNo comment addedNo comment added'}
      </Text>
    </Container>
  );
};

const Reviews: React.FC = () => {
  return (
    <Container sm="1400px" gap="2rem" centered padding={{ left: 'md', right: 'md', top: 'lg', bottom: 'lg' }}>
      <Line />
      <Container>
        <Carousel minHeight="200px">
          {reviews.map((review) => {
            return <Review key={review.id} review={review} />;
          })}
        </Carousel>
      </Container>
      <Image src={PoweredByGoogleImage} height="20px" objectFit="contain" />
      <Line />
    </Container>
  );
};

export default Reviews;
