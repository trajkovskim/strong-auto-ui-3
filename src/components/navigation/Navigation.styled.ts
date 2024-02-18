import Container from 'components/Container';
import styled from 'styled-components';

export const StyledNavigationWrapper = styled.nav`
  position: relative;
  z-index: 999;
`;

export const MobileContainer = styled(Container)`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  transform: translateY(100%);
  color: black;
  background: white;
  z-index: 999;
`;

export const StyledButton = styled.div<{ active?: boolean }>`
  display: flex;
  justify-content: center;

  padding: 10px 20px;
  cursor: pointer;

  transition: all 200ms;
  user-select: none;

  border-bottom: 1px solid transparent;

  border-bottom-color: ${(props) => (props.active ? 'white' : 'transparent')};

  &:hover {
    border-bottom-color: white;
  }
`;
