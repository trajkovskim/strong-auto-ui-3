import Container from 'components/Container';
import Image from 'components/Image';
import Text from 'components/typography/Text';
import Title from 'components/typography/Title';
import { blogPosts } from 'pages/constants';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MasserattiMountainsImage from 'assets/masseratti-mountains.jpg';
import styled from 'styled-components';
import { BiShare } from 'react-icons/bi';
import Button from 'components/Button';
import Line from 'components/Line';
import LatestBlogPosts from 'pages/home/LatestBlogPosts';
import { MdArrowBackIos, MdArrowForwardIos, MdFavorite } from 'react-icons/md';

const StyledImageWrapper = styled.div`
  border-radius: 15px;
  overflow: hidden;
`;

const BlogViewPost: React.FC = () => {
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState<(typeof blogPosts)[number]>();

  useEffect(() => {
    const found = blogPosts.find((blogPost) => blogPost.id.toString() === id);
    setBlogPost(found);
  }, [id]);

  if (!blogPost) {
    return <div />;
  }

  return (
    <Container sm="1400px" centered padding={{ top: 'lg', bottom: 'xl', left: 'md', right: 'md' }} gap="2rem">
      <Container justifyContent="space-between" direction="row" gap="1rem" alignItems="flex-end">
        <div>
          <Title fontSize={'2xl'} title={blogPost.title} />
          <Text fontSize="md" type="sub">
            {blogPost.creationDate.toUTCString()}
          </Text>
        </div>
        <Container direction="row" gap="1rem">
          <Button themeType="link" icon={<BiShare />} maxContent size="xl">
            Share
          </Button>
          <Button themeType="link" icon={<MdFavorite />} maxContent size="lg">
            Favorite
          </Button>
        </Container>
      </Container>
      <StyledImageWrapper>
        <Image src={MasserattiMountainsImage} height="500px" objectFit="cover" objectPosition="center bottom" />
      </StyledImageWrapper>
      <Container sm="800px" centered>
        {blogPost.markdown ?? blogPost.summary}
        <Container padding={{ top: 'lg', bottom: 'lg' }} gap="3rem">
          <Line />
          <Button themeType="link" icon={<BiShare />} maxContent size="xl">
            Share
          </Button>
          <Line />
        </Container>
        <Container direction="row" justifyContent="space-between">
          <Button maxContent size="lg" themeType="link" icon={<MdArrowBackIos />} onClick={() => undefined}>
            <Text>Previous post</Text>
          </Button>
          <Button maxContent iconRight={<MdArrowForwardIos />} size="lg" themeType="link" onClick={() => undefined}>
            <Text>Next post</Text>
          </Button>
        </Container>
      </Container>
      <LatestBlogPosts />
    </Container>
  );
};

export default BlogViewPost;
