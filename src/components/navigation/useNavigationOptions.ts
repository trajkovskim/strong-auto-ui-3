import { useTranslation } from 'hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { Routes } from 'routes';

type NavigationOption = {
  label: string;
  navigate: () => void;
  active: boolean;
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
    },
    [Routes.SHOP]: {
      label: t('shop'),
      navigate: () => navigate(Routes.SHOP),
      active: location.pathname === Routes.SHOP,
    },
    [Routes.BLOG]: {
      label: t('blog'),
      navigate: () => navigate(Routes.BLOG),
      active: location.pathname === Routes.BLOG,
    },
    [Routes.ABOUT_US]: {
      label: t('aboutUs'),
      navigate: () => navigate(Routes.ABOUT_US),
      active: location.pathname === Routes.ABOUT_US,
    },

    [Routes.CONTACT]: {
      label: t('contact'),
      navigate: () => navigate(Routes.CONTACT),
      active: location.pathname === Routes.CONTACT,
    },
  };

  return options;
};
export default useNavigationOptions;
