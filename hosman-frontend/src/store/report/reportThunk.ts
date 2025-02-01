import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_METHODS,
  ENDPOINT_PERMISSION_DELETE,
  ENDPOINT_PERMISSION_DETAILS,
  ENDPOINT_PERMISSION_EDIT,
  ENDPOINT_REPORT_LIST_GET,
  ENDPOINT_REPORT_LIST_POST,
  makeNetworkCall,
} from 'src/network';

import type {  IEditRoles, IReportDataParams, IReportListParams, IRolesDetailsParams,  } from './types';


//create categories and allotrooms


// Staff Permissions List
export const addReportList = createAsyncThunk(
  'roles/addReportList',
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
    
    // Check if response is not null or undefined
    if (!response || !response.data) {
      throw new Error('Failed to fetch report data');
    }
    if (response && response.data) {
      console.log("response:::::::", response);
      return response.data; // Return the data from the response
    } else {
      throw new Error('Response or response data is null');
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
