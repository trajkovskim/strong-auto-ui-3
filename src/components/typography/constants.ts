import { FontSize } from 'components/typography/types';

export const titleFontSize: Record<FontSize, string> = {
  sm: '20px',
  md: '24px',
  lg: '28px',
  xl: '32px',
  '2xl': '40px',
  '3xl': '60px',
  default: 'inherit',
};

export const titleFontSizeMobile: Record<FontSize, string> = {
  sm: '16px',
  md: '20px',
  lg: '24px',
  xl: '28px',
  '2xl': '30px',
  '3xl': '40px',
  default: 'inherit',
};

export const titleFontSizeTablet: Record<FontSize, string> = titleFontSizeMobile;

export const textFontSize: Record<FontSize, string> = {
  sm: '12px',
  md: '14px',
  lg: '18px',
  xl: '22px',
  '2xl': '26px',
  '3xl': '32px',
  default: 'inherit',
};

export const textFontSizeMobile: Record<FontSize, string> = {
  sm: '10px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '22px',
  '3xl': '26px',
  default: 'inherit',
};

export const textFontSizeTablet: Record<FontSize, string> = textFontSizeMobile;
