import { sellerTypes } from 'src/assets/data/seller-types';

import type { ApplyFilterProps } from './types';

export function getSellerType(sellerType?: string) {
  const option = sellerTypes.filter((type) => type.value.includes(sellerType ?? 'none'));
  return option;
}

export function applyFilter({ inputData, query }: ApplyFilterProps) {
  if (!query) return inputData;

  const lowerCaseQuery = query.toLowerCase();

  return inputData?.filter((item) => item.label.toLowerCase().includes(lowerCaseQuery));
}
