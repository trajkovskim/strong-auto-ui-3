import StrongAutoApp from 'StrongAutoApp1';
import { Home, Shop } from 'pages';
import React from 'react';
import { Route } from 'react-router-dom';

export enum Routes {
  INDEX = '/strong-auto-1',
  SHOP = '/strong-auto-1/shop',
  CONTACT = '/strong-auto-1/contact',
  MY_CART = '/strong-auto-1/my-cart',
}

export enum Routes2 {
  INDEX = '/strong-auto-2',
  SHOP = '/strong-auto-2/shop',
  CONTACT = '/strong-auto-2/contact',
  MY_CART = '/strong-auto-2/my-cart',
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
  [Routes2.INDEX]: {
    element: <Home />,
    children: {
      [Routes2.SHOP]: {
        element: <Shop />,
      },
      [Routes2.CONTACT]: {
        element: <Shop />,
      },
      [Routes2.MY_CART]: {
        element: <Shop />,
      },
    },
  },
};

export default routes;
