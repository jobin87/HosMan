export interface IRolesListParams {
  page: number;
  limit: number;
  permissionName?: string;
}

export interface IRolesDetailsParams {
  id: string;
}

export interface ICreateRoles {
  permissionName: string;
  permissions: string[];
}

export interface IEditRoles {
  id: string;
  permissionName: string;
  permissions: string[];
}
