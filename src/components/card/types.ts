import { Vehicle } from 'generated';

export type RibbonType = 'sold' | 'featured';

export type ProductProps = {
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
