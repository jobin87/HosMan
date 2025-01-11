import type { IDateValue } from './common';

// ----------------------------------------------------------------------

export type IPermissionsTableFilters = {
  page: number;
  limit: number;
};

export type IPermissions = {
  id: string;
  createdAt: IDateValue;
  updatedAt: IDateValue;
  permissionName: string;
  permissions: string[];
};
