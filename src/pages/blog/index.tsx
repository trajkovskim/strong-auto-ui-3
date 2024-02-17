import BlogPostCard from 'components/BlogPostCard';
import Button from 'components/Button';
import Container from 'components/Container';
import Line from 'components/Line';
import List from 'components/List';
import Autocomplete from 'components/form/Autocomplete';
import Text from 'components/typography/Text';
import Title from 'components/typography/Title';
import { blogPosts } from 'pages/constants';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'routes';
import styled from 'styled-components';

const SearchContainerWrapper = styled(Container)`
  background-color: #232323;
`;

const SearchContainer = styled(Container)`
  background-color: #fff;
  border-radius: 35px;
`;

const BlogWrapper = styled(Container)`
  background-color: #232323;
`;

const TitleWrapper = styled(Container)`
  color: white;
`;

const ContentContainer = styled(Container)`
  background-color: #fff;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
`;

const Blog: React.FC = () => {
  const navigate = useNavigate();
  const pageSize = 10;
  const totalContentNumber = 34792;
  const [page, setPage] = useState<number>(8);
  const [totalPages, setTotalPages] = useState<number>(8);

  return (
    <BlogWrapper>
      <SearchContainerWrapper padding={{ top: 'xl', bottom: 'xl' }}>
        <SearchContainer sm="1500px" centered padding="sm" itemsCentered gap="1rem" direction="row">
          <Autocomplete options={[]} fullwidth placeholder="Search" size="lg" noBorder />
          <Button>Search</Button>
        </SearchContainer>
        <TitleWrapper sm="1500px" centered>
          <Container padding={{ top: 'lg' }}>
            <Text fontSize="sm">Home {'>'} Blog</Text>
            <Title title="Blog" fontSize="2xl" />
          </Container>
        </TitleWrapper>
      </SearchContainerWrapper>
      <ContentContainer>
        <Container sm="1500px" centered padding={{ bottom: 'xl', top: 'xl' }} gap="0.3rem">
          <Container direction="row" gap="2rem">
            <Container sm={10.5} gap="1rem">
              <List justifyContent="space-between" gap="2rem">
                {blogPosts.map((blogPost) => (
                  <BlogPostCard key={blogPost.id} blogPost={blogPost} />
                ))}
              </List>
              {page === totalPages && (
                <Container centered>
                  <Text fontSize="sm" type="sub">
                    All results displayed
                  </Text>
                </Container>
              )}
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
      </ContentContainer>
    </BlogWrapper>
  );
};

export default Blog;
