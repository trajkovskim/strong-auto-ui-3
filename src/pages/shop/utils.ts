import { TranslationFunction } from 'hooks/useTranslation';
import { pageSizes, SortBy } from 'pages/shop/constants';

export const convertSortByToOptions = (t: TranslationFunction) =>
  Object.values(SortBy).map((sortBy) => ({
    value: sortBy,
    label: t(`strongauto.inventory.pagination.sortByInput.${sortBy}`),
  }));

export const convertPageSizeToOptions = (t: TranslationFunction) =>
  pageSizes.map((pageSize) => ({
    value: pageSize.toString(),
    label: t(`strongauto.inventory.pagination.resultSizeInput.${pageSize}`),
  }));
