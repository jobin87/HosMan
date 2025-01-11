import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_METHODS,
  ENDPOINT_SELLERS_DETAILS,
  ENDPOINT_SELLERS_LIST,
  ENDPOINT_SELLERS_LIST_COUNT,
  ENDPOINT_SELLERS_REGISTRATION_APPROVAL,
  ENDPOINT_SELLER_ONBOARDING_REGISTRATION_SUBMIT,
  ENDPOINT_SELLER_ONBOARDING_STATUS,
  ENDPOINT_SELLER_ONBOARDING_UPDATE_DETAILS,
  ENDPOINT_SELLER_ONBOARDING_UPDATE_QUESTION,
  ENDPOINT_SELLER_ONBOARDING_UPDATE_STORENAME,
  ENDPOINT_SELLER_UPDATE_ADDRESS,
  ENDPOINT_SELLER_UPDATE_BANK,
  makeNetworkCall,
} from 'src/network';

import type {
  ISellerOnboardingAddressUpdateParams,
  ISellersListParams,
  ISellersRegistrationApprovalParams,
} from './types';

// Sellers List
export const requestSellersList = createAsyncThunk(
  'sellers/requestSellersList',
  async (params: ISellersListParams) => {
    const response = await makeNetworkCall({
      method: API_METHODS.POST,
      url: ENDPOINT_SELLERS_LIST,
      data: params,
    });
    return response?.data?.data;
  }
);

// Sellers List Count
export const requestSellersListCount = createAsyncThunk(
  'sellers/requestSellersListCount',
  async () => {
    const response = await makeNetworkCall({
      method: API_METHODS.GET,
      url: ENDPOINT_SELLERS_LIST_COUNT,
    });
    return response?.data?.data;
  }
);

// Sellers List Count
export const requestSellersDetails = createAsyncThunk(
  'sellers/requestSellersDetails',
  async (params: string) => {
    const response = await makeNetworkCall({
      method: API_METHODS.GET,
      url: `${ENDPOINT_SELLERS_DETAILS}${params}`,
    });
    return response?.data?.data;
  }
);

// Sellers Registration Approval
export const requestSellersRegistrationApproval = createAsyncThunk(
  'sellers/requestSellersRegistrationApproval',
  async (params: ISellersRegistrationApprovalParams, { dispatch }): Promise<boolean | any> => {
    const response = await makeNetworkCall({
      method: API_METHODS.POST,
      url: ENDPOINT_SELLERS_REGISTRATION_APPROVAL,
      data: params,
    });
    if (response?.data?.data?.statusUpdated) {
      dispatch(requestSellersList({ page: 1, limit: 10, status: 'ALL', search: '' }));
      dispatch(requestSellerOnboardingStatus(params?.sellerId));
    }
    return response?.data?.data;
  }
);

// Sellers Onboarding Status
export const requestSellerOnboardingStatus = createAsyncThunk(
  'sellers/requestSellerOnboardingStatus',
  async (params?: string) => {
    const response = await makeNetworkCall({
      method: API_METHODS.GET,
      url: `${ENDPOINT_SELLER_ONBOARDING_STATUS}${params}`,
    });
    return response?.data?.data;
  }
);

// Sellers Onboarding Questions
export const requestSellerOnboardingUpdateQuestion = createAsyncThunk(
  'sellers/requestSellerOnboardingUpdateQuestion',
  async (params: {
    sellerId: string;
    questions: {
      key: string;
      label: string;
      answer: string;
    }[];
  }) => {
    const response = await makeNetworkCall({
      method: API_METHODS.POST,
      url: ENDPOINT_SELLER_ONBOARDING_UPDATE_QUESTION,
      data: params,
    });
    return response?.data?.data;
  }
);

// Sellers Onboarding Details
export const requestSellerOnboardingUpdateDetails = createAsyncThunk(
  'sellers/requestSellerOnboardingUpdateDetails',
  async (params: {
    sellerName: string;
    address: string;
    state: string;
    zipcode: string;
    country: string | null;
    contactPerson: string;
  }) => {
    const response = await makeNetworkCall({
      method: API_METHODS.PATCH,
      url: ENDPOINT_SELLER_ONBOARDING_UPDATE_DETAILS,
      data: params,
    });
    return response?.data?.data;
  }
);

// Sellers Onboarding Storename
export const requestSellerOnboardingUpdateStorename = createAsyncThunk(
  'sellers/requestSellerOnboardingUpdateStorename',
  async (params: { storeName: string; storeLogo: string }) => {
    const response = await makeNetworkCall({
      method: API_METHODS.PATCH,
      url: ENDPOINT_SELLER_ONBOARDING_UPDATE_STORENAME,
      data: params,
    });
    return response?.data?.data;
  }
);

// Sellers Onboarding Address
export const requestSellerOnboardingUpdateAddress = createAsyncThunk(
  'sellers/requestSellerOnboardingUpdateAddress',
  async (params: ISellerOnboardingAddressUpdateParams) => {
    const response = await makeNetworkCall({
      method: API_METHODS.PATCH,
      url: ENDPOINT_SELLER_UPDATE_ADDRESS,
      data: params,
    });
    return response?.data?.data;
  }
);

// Sellers Onboarding Bank
export const requestSellerOnboardingUpdateBank = createAsyncThunk(
  'sellers/requestSellerOnboardingUpdateBank',
  async (params: {
    iban: string;
    accountNumber: string;
    swiftCode: string;
    bankName: string;
    branchName: string;
  }) => {
    const response = await makeNetworkCall({
      method: API_METHODS.PATCH,
      url: ENDPOINT_SELLER_UPDATE_BANK,
      data: params,
    });
    return response?.data?.data;
  }
);

// Sellers Onboarding Bank
export const requestSellerOnboardingSubmitForRegistration = createAsyncThunk(
  'sellers/requestSellerOnboardingSubmitForRegistration',
  async () => {
    const response = await makeNetworkCall({
      method: API_METHODS.POST,
      url: ENDPOINT_SELLER_ONBOARDING_REGISTRATION_SUBMIT,
    });
    return response?.data?.data;
  }
);
