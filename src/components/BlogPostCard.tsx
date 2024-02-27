import Container from 'components/Container';
import Image from 'components/Image';
import Text from 'components/typography/Text';
import { blogPosts } from 'pages/constants';
import React from 'react';
import ToyotaCamryImage from 'assets/toyota-camry.jpg';
import styled from 'styled-components';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'routes';

type Props = {
  blogPost: (typeof blogPosts)[number];
};

const StyledContainer = styled(Container)`
  border-radius: 15px 15px 0 0;
  overflow: hidden;
  height: 100%;
`;

const StyledText = styled(Text)`
  text-overflow: ellipsis;
`;

const StyledButton = styled(Button)`
  text-decoration: underline;
`;

const BlogPostCard: React.FC<Props> = (props) => {
  const navigate = useNavigate();

  const handleReadMore = () => navigate(Routes.BLOG_VIEW_POST.replace(':id', props.blogPost.id.toString()));

  return (
    <StyledContainer sm={12} gap="1rem">
      <Image src={ToyotaCamryImage} alt={props.blogPost.title} objectFit="cover" height="200px" />
      <Container gap="0.5rem">
        <Container>
          <Text fontSize="xl">{props.blogPost.title}</Text>
          <Text type="sub" fontSize="sm">
            {props.blogPost.creationDate.toUTCString()}
          </Text>
        </Container>
        <StyledText fontSize="lg">
          {props.blogPost.summary.slice(0, 90)}...{' '}
          <StyledButton themeType="link" onClick={handleReadMore}>
            Read mode
          </StyledButton>
        </StyledText>
      </Container>
    </StyledContainer>
  );
};

export default BlogPostCard;
