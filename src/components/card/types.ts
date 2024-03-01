import { products } from 'pages/constants';

export type RibbonProps = {
  label: React.ReactNode;
  background: React.CSSProperties['background'];
  color?: React.CSSProperties['color'];
};

export type RibbonType = 'sold' | 'featured';

export type StyledRibbonProps = Omit<RibbonProps, 'label'>;

export type Props = {
  rating?: number;
  title: (typeof products)[number]['title'];
  summary?: (typeof products)[number]['summary'];
  price: (typeof products)[number]['price'];
  bookmarked?: boolean;
  images?: (typeof products)[number]['images'];
  onView?: () => void;
  inCart?: boolean;
  ribbon?: RibbonType;
  fullwidth?: boolean;
  km?: (typeof products)[number]['km'];
  fuelType?: (typeof products)[number]['fuelType'];
  transmission?: (typeof products)[number]['transmission'];
};
