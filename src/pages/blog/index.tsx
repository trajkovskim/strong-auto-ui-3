import BlogPostCard from 'components/BlogPostCard';
import Button from 'components/Button';
import Container from 'components/Container';
import Line from 'components/Line';
import List from 'components/List';
import Autocomplete from 'components/form/Autocomplete';
import Text from 'components/typography/Text';
import { blogPosts } from 'pages/constants';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'routes';

const Blog: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container sm="1500px" centered padding={{ top: 'xl', bottom: 'xl' }} gap="1rem">
      {/* <Title title="Welcome to the Strong AUTO blog" fontSize="2xl" /> */}
      <Container direction="row" gap="1rem">
        <Container sm={10.5} gap="1rem">
          <Autocomplete options={[]} fullwidth placeholder="Search blog" />
          <List justifyContent="space-between" gap="2rem">
            {blogPosts.map((blogPost) => (
              <BlogPostCard key={blogPost.id} blogPost={blogPost} />
            ))}
          </List>
        </Container>
        <Container sm={2} gap="1rem">
          <Text fontSize="xl">Previous posts</Text>
          {blogPosts.map((blogPost) => (
            <Container key={blogPost.id} gap="1rem">
              <Button
                themeType="link"
                onClick={() => navigate(Routes.BLOG_VIEW_POST.replace(':id', blogPost.id.toString()))}
                maxContent
                size="lg"
              >
                {blogPost.title}
                <Text fontSize="sm">{blogPost.summary.slice(0, 90)}... </Text>
              </Button>
              <Line />
            </Container>
          ))}
        </Container>
      </Container>
    </Container>
  );
};

export default Blog;
