export interface IRoomsAndCategoriesParams {
  roomNo: string;
  category: string;

}
  export interface IReportDataParams {
    rooms?: string;
    category?: string;
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
