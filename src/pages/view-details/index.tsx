import Container from 'components/Container';
import Text from 'components/typography/Text';
import Title from 'components/typography/Title';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  background-color: #fff;
`;

const ViewDetails: React.FC = () => {
  const { id } = useParams();

  return (
    <Container padding={{ left: 'md', right: 'md', bottom: 'md' }} gap="1rem">
      <StyledContainer padding="md">
        <Text>Home / View details / {id}</Text>
        <Title title="View details" fontSize="xl" bold />
      </StyledContainer>
    </Container>
  );
};

export default ViewDetails;
