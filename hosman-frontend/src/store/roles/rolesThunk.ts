import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_METHODS,
  ENDPOINT_PERMISSION_CREATE,
  ENDPOINT_PERMISSION_DELETE,
  ENDPOINT_PERMISSION_DETAILS,
  ENDPOINT_PERMISSION_EDIT,
  ENDPOINT_PERMISSION_LIST,
  makeNetworkCall,
} from 'src/network';

import type { ICreateRoles, IEditRoles, IRolesDetailsParams, IRolesListParams } from './types';

// Staff Permissions List
export const requestStaffRolesList = createAsyncThunk(
  'roles/staffRolesList',
  async (params: IRolesListParams) => {
    const response = await makeNetworkCall({
      method: API_METHODS.POST,
      url: ENDPOINT_PERMISSION_LIST,
      data: params,
    });
    return response?.data?.data;
  }
);

// Staff Permission Details
export const requestStaffRolesDetails = createAsyncThunk(
  'roles/staffRolesDetails',
  async (params: IRolesDetailsParams) => {
    const response = await makeNetworkCall({
      method: API_METHODS.GET,
      url: `${ENDPOINT_PERMISSION_DETAILS}${params.id}`,
    });
    return response?.data?.data;
  }
);

// Create Staff Role
export const requestCreateStaffRoles = createAsyncThunk(
  'roles/requestCreateStaffRoles',
  async (params: ICreateRoles) => {
    const response = await makeNetworkCall({
      method: API_METHODS.POST,
      url: ENDPOINT_PERMISSION_CREATE,
      data: params,
    });
    return response?.data?.data;
  }
);

// Edit Staff Role
export const requestEditStaffRoles = createAsyncThunk(
  'roles/requestEditStaffRoles',
  async (params: IEditRoles) => {
    const response = await makeNetworkCall({
      method: API_METHODS.PATCH,
      url: `${ENDPOINT_PERMISSION_EDIT}${params.id}`,
      data: {
        permissionName: params.permissionName,
        permissions: params.permissions,
      },
    });
    return response?.data?.data;
  }
);

// Delete Staff Role
export const requestDeleteStaffRoles = createAsyncThunk(
  'roles/requestDeleteStaffRoles',
  async (params: IRolesDetailsParams) => {
    const response = await makeNetworkCall({
      method: API_METHODS.DELETE,
      url: `${ENDPOINT_PERMISSION_DELETE}${params.id}`,
    });
    return response?.data?.data;
  }
);
