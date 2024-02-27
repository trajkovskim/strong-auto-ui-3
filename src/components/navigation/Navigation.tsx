import Container from 'components/Container';
import { StyledButton, StyledNavigationWrapper } from 'components/navigation/Navigation.styled';
import useNavigationOptions from 'components/navigation/useNavigationOptions';
import React from 'react';

const Navigation: React.FC = () => {
  const navOptions = useNavigationOptions();

  const navigation = (
    <StyledNavigationWrapper>
      <Container direction="row" wrap padding="md" justifyContent="flex-end">
        {Object.values(navOptions).map((option) => (
          <Container key={option.label} sm={12} lg="max-content">
            <StyledButton fontSize="md" active={option.active} onClick={option.navigate}>
              {option.label}
            </StyledButton>
          </Container>
        ))}
      </Container>
    </StyledNavigationWrapper>
  );

  return <div>{navigation}</div>;
};

export default Navigation;
