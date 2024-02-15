import BlogPostCard from 'components/BlogPostCard';
import Container from 'components/Container';
import List from 'components/List';
import Title from 'components/typography/Title';
import { blogPosts } from 'pages/constants';
import React from 'react';

const Blog: React.FC = () => {
  return (
    <Container sm="1400px" centered padding={{ top: 'xl', bottom: 'xl' }} gap="1rem">
      <Title title="Welcome to the Strong Auto blog" fontSize="2xl" />
      <List justifyContent="space-between" gap="2rem">
        {blogPosts.map((blogPost) => (
          <BlogPostCard key={blogPost.id} blogPost={blogPost} />
        ))}
      </List>
    </Container>
  );
};

export default Blog;
