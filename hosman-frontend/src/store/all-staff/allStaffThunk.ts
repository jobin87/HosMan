import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_METHODS,
  ENDPOINT_STAFF_GET,
  ENDPOINT_STAFF_MANAGEMENT_CREATE,
  ENDPOINT_STAFF_MANAGEMENT_DELETE,
  ENDPOINT_STAFF_MANAGEMENT_EDIT,
  ENDPOINT_STAFF_CREATE,
  ENDPOINT_TREATMENT_ALL_DELETE,
  ENDPOINT_TREATMENT_DELETE,
  ENDPOINT_TREATMENT_GET,
  ENDPOINT_TREATMENT_UPDATE,
  makeNetworkCall,
  ENDPOINT_TREATMENT_ADD,
} from 'src/network';

import type {  IAllStaffCreateTypes, IAllStaffEditTypes, ITreatmentTypes, staffTypes } from './types';

// Staff Permissions List
// export const requestAllStaffList = createAsyncThunk('all-staff/allStaffList', async () => {
//   const response = await makeNetworkCall({
//     method: API_METHODS.GET,
//     url: ENDPOINT_DOCTOR_LIST,
//   });
//   return response?.data?.data;
// });


export const createNewStaff = createAsyncThunk('addDoctor',
    async(params:staffTypes)=>{
      const response = await makeNetworkCall({
        method: API_METHODS.POST,
        url:ENDPOINT_STAFF_CREATE,
        data:params
      })
      console.log("response:",response)
    return response?.data
    }
)

export const requestAllStaffList = createAsyncThunk(
  "all-staff/allStaffList",
  async () => {
    try {
      const response = await makeNetworkCall({
        method: API_METHODS.GET,
        url: ENDPOINT_STAFF_GET,
      });

      console.log("Full API Response:", response);

      if (!response?.data) {
        throw new Error("No data received from API");
      }

      console.log("Staff Data:", response?.data);
      return response?.data ?? []; // ✅ Ensure it never returns `undefined`
    } catch (error) {
      console.error("Error fetching staff list:", error);
      throw error;
    }
  }
);




//add treatment
export const requestAddTreatment= createAsyncThunk(
  'treatment/requestAddTreatment',
  async (params:ITreatmentTypes)=>{const response = await makeNetworkCall({
    method: API_METHODS.POST,
    url: ENDPOINT_TREATMENT_ADD,
    data: params,
  })
  console.log(response ,"response:")
  return response?.data
}
)
export const requestGetTreatment = createAsyncThunk(
  'treatment/getTreatment',
  async (params: { treatmentId: string }) => {
    const url = params.treatmentId ? `${ENDPOINT_TREATMENT_GET}${params.treatmentId}` : ENDPOINT_TREATMENT_GET;
    const response = await makeNetworkCall({
      method: API_METHODS.GET,
      url,
      data: params,
    });
    
    console.log(response);
    return response?.data?.treatmentData;
  }
);
export const updateTreatment = createAsyncThunk(
  "treatment/updateTreatment",
  async (params: { treatmentId: string }) => {
    const url = `${ENDPOINT_TREATMENT_UPDATE}${params.treatmentId}`;
    
    const { treatmentId, ...updates } = params; // Extracting the treatmentId from params
    console.log("aswerfedaseraf",treatmentId)

    const response = await makeNetworkCall({
      method: API_METHODS.PATCH,
      url,
      data: updates,  // Send only the updated fields
    });

    console.log("Updated treatment response:", response);
    return response?.data;
  }
);



export const deleteTreatmentById= createAsyncThunk(
  'treatment/deleteTreatmentById',
  async (params:{treatmentID:string})=>{const response = await makeNetworkCall({
    method: API_METHODS.DELETE,
    url: `${ENDPOINT_TREATMENT_DELETE}${params.treatmentID}`,
  })
  console.log("ressss:",response)
  return response?.data?.data
}
)

export const deleteAllTreatments= createAsyncThunk(
  'treatment/deleteTreatmentById',
  async ()=>{const response = await makeNetworkCall({
    method: API_METHODS.DELETE,
    url: ENDPOINT_TREATMENT_ALL_DELETE,
  })
  console.log("ressss:",response)
  return response?.data?.data
}
)

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
