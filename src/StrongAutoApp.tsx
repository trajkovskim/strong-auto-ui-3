import Button from 'components/Button';
import Footer from 'components/Footer';
import ApplicationContextProvider from 'context';
import React, { useEffect } from 'react';
import { BsArrowUp } from 'react-icons/bs';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { scrollToTop } from 'utils';

const StyledLayout = styled.div`
  height: 100%;
  background-color: white;
`;

const BackToTopButton = styled(Button)`
  border-radius: 50%;
  width: 55px;
  height: 55px;
  position: fixed;
  bottom: 10px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

const StrongAutoApp: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    setTimeout(scrollToTop, 0);
  }, [location]);

  return (
    <ApplicationContextProvider>
      <div>
        <StyledLayout>
          <main>
            <Outlet />
          </main>
          <Footer />
        </StyledLayout>
        <BackToTopButton iconSize="lg" icon={<BsArrowUp />} onClick={scrollToTop} />
      </div>
    </ApplicationContextProvider>
  );
};

export default StrongAutoApp;
