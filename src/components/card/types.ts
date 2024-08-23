import { Vehicle } from 'generated';

export type RibbonProps = {
  label: React.ReactNode;
  background: React.CSSProperties['background'];
  color?: React.CSSProperties['color'];
};

export type RibbonType = 'sold' | 'featured';

export type StyledRibbonProps = Omit<RibbonProps, 'label'>;

export type Props = {
  rating?: number;
  title: Vehicle['title'];
  summary?: Vehicle['summary'];
  amount: Vehicle['amount'];
  bookmarked?: boolean;
  images?: Vehicle['images'];
  onView?: () => void;
  inCart?: boolean;
  ribbon?: RibbonType;
  fullwidth?: boolean;
  mileage?: Vehicle['mileage'];
  fuelType?: Vehicle['fuelType'];
  year?: Vehicle['year'];
  transmission?: Vehicle['transmission'];
};
