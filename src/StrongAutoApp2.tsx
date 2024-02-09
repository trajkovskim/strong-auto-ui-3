import Footer from 'components/Footer';
import Header from 'components/Header';
import Navigation from 'components/Navigation';
import ApplicationContextProvider from 'context';
import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const StyledLayout = styled.div`
  height: 100%;
  background-color: #f5f7f9;
`;

const StrongAutoApp: React.FC = () => {
  return (
    <ApplicationContextProvider>
      <div>
        <StyledLayout>
          <Header />
          <Navigation />
          <main>
            <Outlet />
          </main>
          <Footer />
        </StyledLayout>
      </div>
    </ApplicationContextProvider>
  );
};

export default StrongAutoApp;
