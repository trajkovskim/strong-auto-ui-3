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

const TitleWrapper = styled(Container)`
  /* color: white; */
`;

const ContentContainer = styled(Container)`
  background-color: #fff;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
`;

const SidebarWrapper = styled(Container)`
  position: sticky;
  top: 100px;
`;

const Blog: React.FC = () => {
  const navigate = useNavigate();
  // const pageSize = 10;
  // const totalContentNumber = 34792;
  const [page] = useState<number>(8);
  const [totalPages] = useState<number>(8);

  return (
    <Container>
      <SearchContainerWrapper padding={{ top: 'xl', bottom: 'xl', left: 'md', right: 'md' }}>
        <SearchContainer sm="1500px" centered padding="sm" itemsCentered gap="1rem" direction="row">
          <Autocomplete options={[]} fullwidth placeholder="Search blog" size="lg" noBorder />
          <Button size="lg">Search</Button>
        </SearchContainer>
      </SearchContainerWrapper>
      <ContentContainer
        sm="1500px"
        direction="row"
        wrap
        centered
        padding={{ bottom: 'xl', left: 'md', right: 'md' }}
        gap="1rem"
      >
        <TitleWrapper sm="1500px" centered>
          <Container padding={{ top: 'lg' }}>
            <Text fontSize="sm">Home {'>'} Blog</Text>
            <Title title="Blog" fontSize="2xl" />
          </Container>
        </TitleWrapper>
        <Container sm={12} lg={9} xl={9.8} gap="1rem">
          <List sm={2} lg={3} xl={4} justifyContent="space-between" gap="1rem">
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
        <SidebarWrapper sm={12} lg={3} xl={2.2} gap="1rem">
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
        </SidebarWrapper>
      </ContentContainer>
    </Container>
  );
};

export default Blog;
