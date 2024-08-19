import Image from 'components/Image';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'routes';
import Logo from 'assets/logo.png';

const LogoImage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Image
      onClick={() => navigate(Routes.INDEX)}
      src={Logo}
      alt="Strong auto logo"
      width="170px"
      height="100%"
      objectFit="contain"
    />
  );
};

export default LogoImage;
