import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_METHODS,
  ENDPOINT_DOCTOR_ADD,
  ENDPOINT_DOCTOR_LIST,
  ENDPOINT_STAFF_MANAGEMENT_CREATE,
  ENDPOINT_STAFF_MANAGEMENT_DELETE,
  ENDPOINT_STAFF_MANAGEMENT_DETAILS,
  ENDPOINT_STAFF_MANAGEMENT_EDIT,
  makeNetworkCall,
} from 'src/network';

import type { IAllStaffCreateTypes, IAllStaffEditTypes } from './types';

// Staff Permissions List
// export const requestAllStaffList = createAsyncThunk('all-staff/allStaffList', async () => {
//   const response = await makeNetworkCall({
//     method: API_METHODS.GET,
//     url: ENDPOINT_DOCTOR_LIST,
//   });
//   return response?.data?.data;
// });

export const addDoctor = createAsyncThunk('addDoctor',
  async()=>{
    const response = await makeNetworkCall({
      method: API_METHODS.POST,
      url:ENDPOINT_DOCTOR_ADD,
    })
    console.log(response)
  return response?.data?.doctorsdata
  }

)
export const requestAllDoctorsList = createAsyncThunk('all-staff/alldoctorsList', async (doctorId: string) => {
  const response = await makeNetworkCall({
    method: API_METHODS.GET,
    url: ENDPOINT_DOCTOR_LIST,
  });
  console.log(response)
  return response?.data?.doctorsdata
});

// Staff Permission Details
export const requestAllStaffDetails = createAsyncThunk(
  'all-staff/allStaffDetails',
  async (params: any) => {
    const response = await makeNetworkCall({
      method: API_METHODS.GET,
      url: `${ENDPOINT_STAFF_MANAGEMENT_DETAILS}${params.staffId}`,
    });
    return response?.data;
  }
);

// Create Staff
export const requestCreateAllStaff = createAsyncThunk(
  'all-staff/requestCreateAllStaff',
  async (params: IAllStaffCreateTypes) => {
    const response = await makeNetworkCall({
      method: API_METHODS.POST,
      url: ENDPOINT_STAFF_MANAGEMENT_CREATE,
      data: params,
    });
    return response?.data?.data;
  }
);

// Edit Staff
export const requestEditAllStaff = createAsyncThunk(
  'all-staff/requestEditAllStaff',
  async (params: IAllStaffEditTypes) => {
    const response = await makeNetworkCall({
      method: API_METHODS.PATCH,
      url: `${ENDPOINT_STAFF_MANAGEMENT_EDIT}${params.staffId}`,
      data: {
        name: params.name,
        countryCode: params.countryCode,
        phone: params.phone,
        permissionId: params.permissionId,
      },
    });
    return response?.data?.data;
  }
);

// Delete Staff
export const requestDeleteAllStaff = createAsyncThunk(
  'all-staff/requestDeleteAllStaff',
  async (params: { staffId: string }) => {
    const response = await makeNetworkCall({
      method: API_METHODS.DELETE,
      url: `${ENDPOINT_STAFF_MANAGEMENT_DELETE}${params.staffId}`,
    });
    return response?.data?.data;
  }
);
