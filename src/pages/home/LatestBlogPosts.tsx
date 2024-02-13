import Button from 'components/Button';
import Container from 'components/Container';
import Icon from 'components/Icon';
import Line from 'components/Line';
import List from 'components/List';
import Text from 'components/typography/Text';
import Title from 'components/typography/Title';
import { blogPosts } from 'pages/constants';
import BlogPostCard from 'components/BlogPostCard';
import React from 'react';
import { BsArrowUpRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'routes';

const LatestBlogPosts: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container padding={{ top: 'xl', bottom: 'lg', left: 'md', right: 'md' }} sm="1400px" gap="1rem" centered>
      <Container preserveWhenXs direction="row" gap="1rem" alignItems="flex-end" justifyContent="space-between">
        <Title fontSize="2xl" title="Latest Blog Posts" />
        <Button themeType="link" size="lg" onClick={() => navigate(Routes.BLOG)}>
          <Text fontSize="lg">Goto blog</Text> <Icon icon={<BsArrowUpRight />} width="16px" />
        </Button>
      </Container>
      <Line />
      <List justifyContent="flex-start">
        {blogPosts.map((blogPost) => (
          <BlogPostCard key={blogPost.id} blogPost={blogPost} />
        ))}
      </List>
    </Container>
  );
};

export default LatestBlogPosts;
