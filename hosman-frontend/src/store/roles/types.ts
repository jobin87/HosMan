export interface IRoomsAndCategoriesParams {
  roomNo: string;
  category: string;

}
  export interface IRoomDataParams {
    description?: string;
    rooms?: string;
    category?: string;
  }
 
export interface IRolesDetailsParams {
  id: string;
}

export interface ICreateRoles {
  staffId:string;
  staffName: string;
  Position: string[];
}

export interface IEditRoles {
  id: string;
  permissionName: string;
  permissions: string[];
}
