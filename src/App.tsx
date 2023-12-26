import React from 'react';
import ApplicationContextProvider from 'context';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from 'components/Header';
import Navigation from 'components/Navigation';
import routes from 'routes';
import Footer from 'components/Footer';

const StyledLayout = styled.div`
  height: 100%;
`;

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ApplicationContextProvider>
        <div>
          <StyledLayout>
            <Header />
            <Navigation />
            <main>
              <Routes>
                {Object.entries(routes).map(([route, options]) => (
                  <Route key={route} path={route} element={options.element} />
                ))}
              </Routes>
            </main>
            <Footer />
          </StyledLayout>
        </div>
      </ApplicationContextProvider>
    </BrowserRouter>
  );
};

export default App;
