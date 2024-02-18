import Button from 'components/Button';
import Footer from 'components/Footer';
import ApplicationContextProvider from 'context';
import React from 'react';
import { BsArrowUp } from 'react-icons/bs';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const StyledLayout = styled.div`
  height: 100%;
  background-color: white;
  /* overflow-x: hidden; */
`;

const BackToTopButton = styled(Button)`
  border-radius: 50%;
  width: 35px;
  height: 35px;
  position: fixed;
  bottom: 10px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const StrongAutoApp: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <ApplicationContextProvider>
      <div>
        <StyledLayout>
          <main>
            <Outlet />
          </main>
          <Footer />
        </StyledLayout>
        <BackToTopButton icon={<BsArrowUp />} onClick={scrollToTop} />
      </div>
    </ApplicationContextProvider>
  );
};

export default StrongAutoApp;
