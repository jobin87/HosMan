export interface IReportListParams {
    reportId?: string;
    description: string;
    category: string;
  }
  export interface IReportDataParams {
    reportId?: string;

  }

  export interface IRoomsAndCategoriesParams {
    roomNo: string;
    category: string;

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
