import StrongAutoApp from 'StrongAutoApp';
import { AboutUs, Blog, BlogViewPost, Contact, Home, Shop, ViewDetails } from 'pages';
import Layout from 'pages/Layout';
import React from 'react';
import { Route } from 'react-router-dom';

export enum Routes {
  INDEX = '',
  ANY_WITH_LAYOUT = '/',
  SHOP = '/shop',
  SHOP_VIEW_DETAILS = '/shop/:id',
  BLOG = '/blog',
  BLOG_VIEW_POST = '/blog/:id',
  CONTACT = '/contact',
  ABOUT_US = '/about-us',
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
          [Routes.SHOP_VIEW_DETAILS]: {
            element: <ViewDetails />,
          },
          [Routes.CONTACT]: {
            element: <Contact />,
          },
          [Routes.ABOUT_US]: {
            element: <AboutUs />,
          },
          [Routes.BLOG]: {
            element: <Blog />,
          },
          [Routes.BLOG_VIEW_POST]: {
            element: <BlogViewPost />,
          },
        },
      },
    },
  },
};

export default routes;
