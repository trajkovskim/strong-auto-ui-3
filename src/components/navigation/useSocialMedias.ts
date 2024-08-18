import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTelegram } from 'react-icons/fa';

enum SocialMedia {
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
  TELEGRAM = 'telegram',
  LINKEDIN = 'linkedin',
}

const useSocialMedias = () => {
  return [
    {
      type: SocialMedia.FACEBOOK,
      icon: React.createElement(FaFacebook),
      href: 'https://www.facebook.com',
    },
    {
      type: SocialMedia.INSTAGRAM,
      icon: React.createElement(FaInstagram),
      href: 'https://www.facebook.com',
    },
    {
      type: SocialMedia.TELEGRAM,
      icon: React.createElement(FaTelegram),
      href: 'https://www.facebook.com',
    },
    {
      type: SocialMedia.LINKEDIN,
      icon: React.createElement(FaLinkedin),
      href: 'https://www.facebook.com',
    },
  ];
};

export default useSocialMedias;
