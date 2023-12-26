import { Contact, Home, Shop } from 'pages';
import React from 'react';
import { Route } from 'react-router-dom';

export enum Routes {
  INDEX = '/',
  HOME = '/home',
  SHOP = '/shop',
  CONTACT = '/contact',
  MY_CART = '/my-cart',
}

type RouteOptions = Record<Routes, React.ComponentProps<typeof Route>>;

const routes: RouteOptions = {
  [Routes.INDEX]: { element: <Home /> },
  [Routes.HOME]: { element: <Home /> },
  [Routes.SHOP]: { element: <Shop /> },
  [Routes.CONTACT]: { element: <Contact /> },
  [Routes.MY_CART]: { element: <Home /> },
};

export default routes;
