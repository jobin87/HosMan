export interface IReportListParams {
    reportId?: string;
    description: string;
    category: string;
    priority: string;
    dateReported: string;
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
