import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_METHODS,
  ENDPOINT_PATIENT_GET,
  ENDPOINT_PATIENT_POST,
  makeNetworkCall,
} from 'src/network';

import type { IPatientParams } from './types';

// Sellers List
export const requestAddPatientList = createAsyncThunk(
  'patients/requestAddPatientList',
  async (params: IPatientParams) => {
    const response = await makeNetworkCall({
      method: API_METHODS.POST,
      url: ENDPOINT_PATIENT_POST,
      data: params,
    });
    return response?.data;
  }
);
export const requestGetPatient = createAsyncThunk(
  'patients/requestGetPatientList',
  async (params: IPatientParams) => {
    const response = await makeNetworkCall({
      method: API_METHODS.GET,
      url: ENDPOINT_PATIENT_GET,
      data: params,
    });
    console.log("getpatient:::",response?.data?.patientsdata)
    return response?.data?.patientsdata;
  }
);



// // Sellers List Count
// export const requestSellersListCount = createAsyncThunk(
//   'sellers/requestSellersListCount',
//   async () => {
//     const response = await makeNetworkCall({
//       method: API_METHODS.GET,
//       url: ENDPOINT_SELLERS_LIST_COUNT,
//     });
//     return response?.data?.data;
//   }
// );

// // Sellers List Count
// export const requestSellersDetails = createAsyncThunk(
//   'sellers/requestSellersDetails',
//   async (params: string) => {
//     const response = await makeNetworkCall({
//       method: API_METHODS.GET,
//       url: `${ENDPOINT_SELLERS_DETAILS}${params}`,
//     });
//     return response?.data?.data;
//   }
// );

// // Sellers Registration Approval
// export const requestSellersRegistrationApproval = createAsyncThunk(
//   'sellers/requestSellersRegistrationApproval',
//   async (params: ISellersRegistrationApprovalParams, { dispatch }): Promise<boolean | any> => {
//     const response = await makeNetworkCall({
//       method: API_METHODS.POST,
//       url: ENDPOINT_SELLERS_REGISTRATION_APPROVAL,
//       data: params,
//     });
//     if (response?.data?.data?.statusUpdated) {
//       dispatch(requestSellersList({ page: 1, limit: 10, status: 'ALL', search: '' }));
//       dispatch(requestSellerOnboardingStatus(params?.sellerId));
//     }
//     return response?.data?.data;
//   }
// );

// // Sellers Onboarding Status
// export const requestSellerOnboardingStatus = createAsyncThunk(
//   'sellers/requestSellerOnboardingStatus',
//   async (params?: string) => {
//     const response = await makeNetworkCall({
//       method: API_METHODS.GET,
//       url: `${ENDPOINT_SELLER_ONBOARDING_STATUS}${params}`,
//     });
//     return response?.data?.data;
//   }
// );

// // Sellers Onboarding Questions
// export const requestSellerOnboardingUpdateQuestion = createAsyncThunk(
//   'sellers/requestSellerOnboardingUpdateQuestion',
//   async (params: {
//     sellerId: string;
//     questions: {
//       key: string;
//       label: string;
//       answer: string;
//     }[];
//   }) => {
//     const response = await makeNetworkCall({
//       method: API_METHODS.POST,
//       url: ENDPOINT_SELLER_ONBOARDING_UPDATE_QUESTION,
//       data: params,
//     });
//     return response?.data?.data;
//   }
// );

// // Sellers Onboarding Details
// export const requestSellerOnboardingUpdateDetails = createAsyncThunk(
//   'sellers/requestSellerOnboardingUpdateDetails',
//   async (params: {
//     sellerName: string;
//     address: string;
//     state: string;
//     zipcode: string;
//     country: string | null;
//     contactPerson: string;
//   }) => {
//     const response = await makeNetworkCall({
//       method: API_METHODS.PATCH,
//       url: ENDPOINT_SELLER_ONBOARDING_UPDATE_DETAILS,
//       data: params,
//     });
//     return response?.data?.data;
//   }
// );

// // Sellers Onboarding Storename
// export const requestSellerOnboardingUpdateStorename = createAsyncThunk(
//   'sellers/requestSellerOnboardingUpdateStorename',
//   async (params: { storeName: string; storeLogo: string }) => {
//     const response = await makeNetworkCall({
//       method: API_METHODS.PATCH,
//       url: ENDPOINT_SELLER_ONBOARDING_UPDATE_STORENAME,
//       data: params,
//     });
//     return response?.data?.data;
//   }
// );

// // Sellers Onboarding Address
// export const requestSellerOnboardingUpdateAddress = createAsyncThunk(
//   'sellers/requestSellerOnboardingUpdateAddress',
//   async (params: ISellerOnboardingAddressUpdateParams) => {
//     const response = await makeNetworkCall({
//       method: API_METHODS.PATCH,
//       url: ENDPOINT_SELLER_UPDATE_ADDRESS,
//       data: params,
//     });
//     return response?.data?.data;
//   }
// );

// // Sellers Onboarding Bank
// export const requestSellerOnboardingUpdateBank = createAsyncThunk(
//   'sellers/requestSellerOnboardingUpdateBank',
//   async (params: {
//     iban: string;
//     accountNumber: string;
//     swiftCode: string;
//     bankName: string;
//     branchName: string;
//   }) => {
//     const response = await makeNetworkCall({
//       method: API_METHODS.PATCH,
//       url: ENDPOINT_SELLER_UPDATE_BANK,
//       data: params,
//     });
//     return response?.data?.data;
//   }
// );

// // Sellers Onboarding Bank
// export const requestSellerOnboardingSubmitForRegistration = createAsyncThunk(
//   'sellers/requestSellerOnboardingSubmitForRegistration',
//   async () => {
//     const response = await makeNetworkCall({
//       method: API_METHODS.POST,
//       url: ENDPOINT_SELLER_ONBOARDING_REGISTRATION_SUBMIT,
//     });
//     return response?.data?.data;
//   }
// );
