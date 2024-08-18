import { useTranslation } from 'hooks';
import React from 'react';
import { FaCar, FaHome, FaInfoCircle } from 'react-icons/fa';
import { MdOutlinePhoneIphone } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import { Routes } from 'routes';

type NavigationOption = {
  label: string;
  navigate: () => void;
  active: boolean;
  icon: React.ReactElement;
};

const useNavigationOptions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const t = useTranslation('nav');

  const options: Record<string, NavigationOption> = {
    [Routes.INDEX]: {
      label: t('home'),
      navigate: () => navigate(Routes.INDEX),
      active: location.pathname === Routes.INDEX,
      icon: React.createElement(FaHome),
    },
    [Routes.SHOP]: {
      label: t('shop'),
      navigate: () => navigate(Routes.SHOP),
      active: location.pathname === Routes.SHOP,
      icon: React.createElement(FaCar),
    },
    [Routes.ABOUT_US]: {
      label: t('aboutUs'),
      navigate: () => navigate(Routes.ABOUT_US),
      active: location.pathname === Routes.ABOUT_US,
      icon: React.createElement(FaInfoCircle),
    },

    [Routes.CONTACT]: {
      label: t('contact'),
      navigate: () => navigate(Routes.CONTACT),
      active: location.pathname === Routes.CONTACT,
      icon: React.createElement(MdOutlinePhoneIphone),
    },
  };

  return options;
};
export default useNavigationOptions;
