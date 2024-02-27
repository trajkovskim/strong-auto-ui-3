import Container from 'components/Container';
import Text from 'components/typography/Text';
import styled from 'styled-components';

export const StyledNavigationWrapper = styled.nav`
  position: relative;
`;

export const MobileContainer = styled(Container)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  color: black;
  height: 100vh;
  z-index: 100;
  background-color: rgba(35, 35, 35, 0.95);
  color: #fff;
`;

export const StyledButton = styled(Text)<{ active?: boolean }>`
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
