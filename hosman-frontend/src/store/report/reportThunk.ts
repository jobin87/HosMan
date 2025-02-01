import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_METHODS,
  ENDPOINT_PERMISSION_CREATE,
  ENDPOINT_PERMISSION_DELETE,
  ENDPOINT_PERMISSION_DETAILS,
  ENDPOINT_PERMISSION_EDIT,
  ENDPOINT_REPORT_LIST_GET,
  ENDPOINT_REPORT_LIST_POST,
  makeNetworkCall,
} from 'src/network';

import type { ICreateRoles, IEditRoles, IReportDataParams, IReportListParams, IRolesDetailsParams,  } from './types';


//create categories and allotrooms


// Staff Permissions List
export const addReportList = createAsyncThunk(
  'roles/staffRolesList',
  async (params: IReportListParams) => {
    const response = await makeNetworkCall({
      method: API_METHODS.POST,
      url: ENDPOINT_REPORT_LIST_POST,
      data: params,
    });
    console.log(response)
    return response?.data?.data;
  }
);
export const getReportList = createAsyncThunk(
  'roles/getReportList',
  async (params: IReportDataParams) => {
    const response = await makeNetworkCall({
      method: API_METHODS.GET,
      url: `${ENDPOINT_REPORT_LIST_GET}${params.reportId}`,
      data: params,
    });

    if (response && response.data.reportdata) {
      return response.data; // Return the data from the response
    } else {
      throw new Error('Failed to fetch report data'); // Handle errors gracefully
    }
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
    return response?.data?.reportdata;
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
