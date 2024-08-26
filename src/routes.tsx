import StrongAutoApp from 'StrongAutoApp';
import { AboutUs, Contact, Home, Parts, Shop, TowingService, ViewDetails } from 'pages';
import { Layout } from 'components/layout';
import React from 'react';
import { Route } from 'react-router-dom';

export enum Routes {
  INDEX = '/',
  ANY_WITH_LAYOUT = '/',
  SHOP = '/shop',
  SHOP_VIEW_DETAILS = '/shop/:id',
  CONTACT = '/contact',
  ABOUT_US = '/about-us',
  SERVICES = '/services',
  TOWING_SERVICE = '/services/towing-service',
  PARTS = '/parts',
}

export type RouteOption = Omit<React.ComponentProps<typeof Route>, 'children'> & {
  children?: Record<string, RouteOption>;
};

export type RouteOptions = Record<string, RouteOption>;

const routes: RouteOptions = {
  [Routes.INDEX]: {
    element: <StrongAutoApp />,
    children: {
      [Routes.ANY_WITH_LAYOUT]: {
        element: <Layout />,
        children: {
          [Routes.INDEX]: {
            element: <Home />,
          },
          [Routes.SHOP]: {
            element: <Shop />,
          },
          [Routes.SHOP_VIEW_DETAILS]: {
            element: <ViewDetails />,
          },
          [Routes.SERVICES]: {
            element: <TowingService />,
          },
          [Routes.TOWING_SERVICE]: {
            element: <TowingService />,
          },
          [Routes.CONTACT]: {
            element: <Contact />,
          },
          [Routes.ABOUT_US]: {
            element: <AboutUs />,
          },
          [Routes.PARTS]: {
            element: <Parts />,
          },
        },
      },
    },
  },
};

export default routes;
