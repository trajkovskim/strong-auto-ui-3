import StrongAutoApp from 'StrongAutoApp';
import { Home, Shop } from 'pages';
import Layout from 'pages/Layout';
import React from 'react';
import { Route } from 'react-router-dom';

export enum Routes {
  INDEX = '',
  ANY_WITH_LAYOUT = '/',
  SHOP = '/shop',
  CONTACT = '/contact',
  MY_CART = '/my-cart',
}

export type RouteOption = Omit<React.ComponentProps<typeof Route>, 'children'> & {
  children?: Record<string, RouteOption>;
};

export type RouteOptions = Record<string, RouteOption>;

const routes: RouteOptions = {
  [Routes.INDEX]: {
    element: <StrongAutoApp />,
    children: {
      [Routes.INDEX]: {
        element: <Home />,
      },
      [Routes.ANY_WITH_LAYOUT]: {
        element: <Layout />,
        children: {
          [Routes.SHOP]: {
            element: <Shop />,
          },
          [Routes.CONTACT]: {
            element: <Shop />,
          },
          [Routes.MY_CART]: {
            element: <Shop />,
          },
        },
      },
    },
  },
};

export default routes;
