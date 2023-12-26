import { ImSpinner2 } from 'react-icons/im';
import styled from 'styled-components';

const StyledSpinner = styled(ImSpinner2)`
  @keyframes rotate {
    from {
      rotate: 0;
    }

    to {
      rotate: 360deg;
    }
  }

  width: 30px;
  height: 30px;

  animation-name: rotate;
  animation-duration: 1000ms;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;

export default StyledSpinner;
