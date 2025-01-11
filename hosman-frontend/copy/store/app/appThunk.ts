import { createAsyncThunk } from '@reduxjs/toolkit';
import { STORAGE_KEY } from 'src/guard/permissions';
import {
  API_METHODS,
  ENDPOINT_ADMIN_LOGIN,
  ENDPOINT_ADMIN_USER_DETAILS,
  ENDPOINT_ADMIN_USER_NOTIFICATION_SETTINGS,
  ENDPOINT_ADMIN_USER_UPDATE_PASSWORD,
  ENDPOINT_ADMIN_USER_UPDATE_PROFILE,
  ENDPOINT_DOCUMENT_CREATE,
  ENDPOINT_DOCUMENT_LIST,
  ENDPOINT_DOCUMENT_UPDATE,
  ENDPOINT_FORGOT_PASSWORD,
  ENDPOINT_RESET_PASSWORD,
  ENDPOINT_SELLER_ONBOARDING_REGISTRATION,
  ENDPOINT_UPDATE_PASSWORD,
  makeNetworkCall,
} from 'src/network';
import { paths } from 'src/routes/paths';
import { persistor } from '..';
import { requestSellerOnboardingStatus } from '../sellers/sellersThunk';
import { setUserLoggedOut } from './appReducer';
import type {
  docUrlUpdateProps,
  fileListRequestProps,
  IDocumentUpdateProps,
  IForgetPassword,
  IResetPassword,
  SellerRegistrationParams,
  SignInParams,
} from './types';

// Sign in action
export const requestSignInWithPassword = createAsyncThunk(
  'app/signInWithPassword',
  async (params: SignInParams) => {
    const response = await makeNetworkCall({
      method: API_METHODS.POST,
      url: ENDPOINT_ADMIN_LOGIN,
      data: params,
    });

    const { userLogged } = response?.data?.data;

    if (userLogged) {
      return response?.data?.data;
    }

    throw new Error('Something went wrong!');
  }
);

// Seller Registration
export const requestSellerRegistration = createAsyncThunk(
  'app/registerSeller',
  async (data: SellerRegistrationParams) => {
    const response = await makeNetworkCall({
      method: API_METHODS.POST,
      url: ENDPOINT_SELLER_ONBOARDING_REGISTRATION,
      data,
    });
    return response?.data?.data;
  }
);

// Sign out action
export const requestSignOut = createAsyncThunk(
  'app/signOut',
  async (onClose: (() => void) | undefined = () => {}, { dispatch }) => {
    dispatch(setUserLoggedOut());
    await persistor.purge();
    sessionStorage.removeItem(STORAGE_KEY);
    onClose();
    window.location.href = paths.auth.signIn;
  }
);

// Forgot Password
export const requestForgetPassword = createAsyncThunk(
  'app/requestForgetPassword',
  async (data: IForgetPassword) => {
    const response = await makeNetworkCall({
      method: API_METHODS.POST,
      url: ENDPOINT_FORGOT_PASSWORD,
      data,
    });
    return response?.data?.data;
  }
);

// Reset Password
export const requestResetPassword = createAsyncThunk(
  'app/requestResetPassword',
  async (data: IResetPassword) => {
    const response = await makeNetworkCall({
      method: API_METHODS.POST,
      url: ENDPOINT_RESET_PASSWORD,
      data,
    });
    return response?.data?.data;
  }
);

// Change Default Password
export const changeDefaultPassword = createAsyncThunk(
  'app/changeDefaultPassword',
  async ({ Password }: { Password: string }) => {
    try {
      const response = await makeNetworkCall({
        method: API_METHODS.POST,
        url: ENDPOINT_UPDATE_PASSWORD,
        data: { newPassword: Password },
      });
      return response?.data?.data?.defaultPasswordUpdated;
    } catch (error) {
      console.error('Error during default password update in:', error);
      throw error;
    }
  }
);

// Upload Document
export const getAllUserDocuments = createAsyncThunk(
  'app/getDocuments',
  async (params: fileListRequestProps) => {
    try {
      const response = await makeNetworkCall({
        method: API_METHODS.POST,
        url: ENDPOINT_DOCUMENT_LIST,
        data: params,
      });
      return response?.data?.data?.documents;
    } catch (error) {
      console.error('Error during fetching all documents in:', error);
      throw error;
    }
  }
);

export const uploadPresignedUrl = createAsyncThunk(
  'app/uploadDocument',
  async (params: docUrlUpdateProps, { dispatch }): Promise<boolean | undefined> => {
    try {
      const response = await makeNetworkCall({
        method: API_METHODS.POST,
        url: ENDPOINT_DOCUMENT_CREATE,
        data: [params],
      });

      const Files: any = await dispatch(requestSellerOnboardingStatus(params?.ownerId));
      if (Files?.length > 0) {
        return response?.data?.documentAdded;
      }
    } catch (error) {
      console.error('Error during sending document-url in:', error);
      throw error;
    }
  }
);

// Document Update
export const requestDocumentUpdate = createAsyncThunk(
  'document/requestDocumentUpdate',
  async (params: IDocumentUpdateProps, { dispatch }): Promise<boolean | undefined> => {
    try {
      const response = await makeNetworkCall({
        method: API_METHODS.PATCH,
        url: `${ENDPOINT_DOCUMENT_UPDATE}${params.id}`,
        data: {
          comment: params?.comment,
          status: params?.status,
          docName: params?.docName,
          docSize: params?.docSize,
          lock: params?.lock,
        },
      });
      dispatch(requestSellerOnboardingStatus(params?.sellerId));
      return response?.data?.data;
    } catch (error) {
      console.error('Error during sending document-url in:', error);
      throw error;
    }
  }
);

// -----------------------------------------------------------------------

// Get details
export const requestUserDetails = createAsyncThunk('user/requestUserDetails', async () => {
  try {
    const response = await makeNetworkCall({
      method: API_METHODS.GET,
      url: ENDPOINT_ADMIN_USER_DETAILS,
    });
    return response?.data?.data;
  } catch (error) {
    console.log('error No user Details', error);
  }
});

// Update Noification Settings
export const updateUserNotificationSettings = createAsyncThunk(
  'user/updateUserNotificationSettings',
  async (params: {
    newsAndAnnouncementsEnabled?: boolean;
    weeklyUpdatesEnabled?: boolean;
    generalNotificationsEnabled?: boolean;
    sellerNotificationsEnabled?: boolean;
    kaartxUpdatesEnabled?: boolean;
    browserNotificationsEnabled?: boolean;
  }) => {
    try {
      const response = await makeNetworkCall({
        method: API_METHODS.PATCH,
        url: ENDPOINT_ADMIN_USER_NOTIFICATION_SETTINGS,
        data: params,
      });
      return response?.data?.data;
    } catch (error) {
      console.log('error No user Details', error);
    }
  }
);

// Update User Profile
export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (params: {
    countryCode: string;
    name: string;
    phone: string;
    profileImage: string;
    userId: string;
  }) => {
    try {
      const response = await makeNetworkCall({
        method: API_METHODS.PATCH,
        url: ENDPOINT_ADMIN_USER_UPDATE_PROFILE,
        data: params,
      });
      return response?.data?.data;
    } catch (error) {
      console.log('error No user Details updated', error);
    }
  }
);

// Update User Password
export const updateUserPassword = createAsyncThunk(
  'user/updateUserPassword',
  async (params: { currentPassword: string; newPassword: string }) => {
    try {
      const response = await makeNetworkCall({
        method: API_METHODS.PATCH,
        url: ENDPOINT_ADMIN_USER_UPDATE_PASSWORD,
        data: params,
      });
      return response?.data?.data;
    } catch (error) {
      console.log('error No user Details updated', error);
    }
  }
);
