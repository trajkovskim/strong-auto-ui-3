export enum SortBy {
  UNSORTED = 'UNSORTED',
  PRICE_ASC = 'PRICE_ASC',
  PRICE_DESC = 'PRICE_DESC',
  ID_ASC = 'ID_ASC',
  ID_DESC = 'ID_DESC',
}

export const pageSizes = [10, 20, 40, 60, 100];

export const priceOptions = [
  {
    value: '0-3000',
  },
  { value: '3000-10000' },
  { value: '10000-20000' },
  { value: '20000-50000' },
  { value: '50000-100000' },
  { value: '100000-any' },
];
