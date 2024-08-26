import { Container } from 'components/common';
import { StyledButton, StyledNavigationWrapper } from 'components/layout/Navigation.styled';
import { useNavigationOptions } from 'hooks';
import React from 'react';

const Navigation: React.FC = () => {
  const navOptions = useNavigationOptions();

  return (
    <StyledNavigationWrapper>
      <Container
        styleConfig={{
          direction: 'row',
          wrap: true,
          padding: 'md',
          justifyContent: 'flex-end',
        }}
      >
        {Object.values(navOptions).map((option) => (
          <Container key={option.label} xs={12} lg="max-content">
            <StyledButton
              padding="sm"
              themeType="link"
              size="md"
              iconSize="sm"
              maxContent
              icon={option.icon}
              active={option.active}
              onClick={option.navigate}
            >
              {option.label}
            </StyledButton>
          </Container>
        ))}
      </Container>
    </StyledNavigationWrapper>
  );
};

export default Navigation;
