import { createAsyncThunk } from '@reduxjs/toolkit';
import { STORAGE_KEY } from 'src/guard/permissions';
import {
  API_METHODS,
  ENDPOINT_ADMIN_LOGIN,
  ENDPOINT_ADMIN_USER_DETAILS,
  ENDPOINT_ADMIN_USER_NOTIFICATION_SETTINGS,
  ENDPOINT_ADMIN_USER_UPDATE_PASSWORD,
  ENDPOINT_ADMIN_USER_UPDATE_PROFILE,
  ENDPOINT_FORGOT_PASSWORD,
  ENDPOINT_PROFILE_UPDATE,
  ENDPOINT_RESET_PASSWORD,
  ENDPOINT_SESSION,
  ENDPOINT_UPDATE_PASSWORD,
  ENDPOINT_USER_ONBOARDING_REGISTRATION,
  makeNetworkCall,
} from 'src/network';
import { paths } from 'src/routes/paths';
import { persistor, RootState } from '..';
// import { requestSellerOnboardingStatus } from '../patient/patientThunk';
import { setUserLoggedOut } from './appReducer';
import type {
 
  IForgetPassword,
  IResetPassword,
   ISessionUpdateProps,
   SignInParams,
UserRegistrationParams,
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
    console.log(response)
    const {userLogged} = response?.data;

    if (userLogged) {
      return response?.data;
    }
    console.log(userLogged)

    throw new Error('Something went wrong!');

  }
);
export const requestProfilePhoto = createAsyncThunk(
  "app/requestProfilePhoto",
  async  ({ file }: { file: File }) => {
    const formData = new FormData();
    formData.append("profileImage", file);
    const response = await makeNetworkCall({
      method: API_METHODS.PATCH,
      url: ENDPOINT_PROFILE_UPDATE,
      data: formData,
      extraHeaders: { "Content-Type": "multipart/form-data" }, // ✅ Correct header
    });

    console.log(response);

    const { userLogged } = response?.data;

    if (userLogged) {
      return response?.data;
    }

    console.log(userLogged);
    throw new Error("Something went wrong!");
  }
);

// User Registration
export const requestUserRegistration = createAsyncThunk(
  'app/registerSeller',
  async (data: UserRegistrationParams) => {
    const response = await makeNetworkCall({
      method: API_METHODS.POST,
      url: ENDPOINT_USER_ONBOARDING_REGISTRATION,
      data,
    });
    console.log(response)
    return response?.data;
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

export const requestgetSessions = createAsyncThunk(
  "app/getSessions",
  async (params: ISessionUpdateProps, { getState }) => {
    try {
      // ✅ Get the token from Redux or fallback to localStorage
      const state = getState() as RootState;
      const token = state.app.accessToken || localStorage.getItem("authToken");
      console.log("ytokensan:",token)

      if (!token) {
        throw new Error("No  token found");
      }

      const response = await makeNetworkCall({
        method: API_METHODS.GET,
        url: ENDPOINT_SESSION,
        data: params,
        extraHeaders: {
          Authorization: `Bearer ${token}`,  // ✅ Include token in API request
        },
      });

      console.log("API Response:", response);
      return response?.data?.doctors;
    } catch (error) {
      console.error("Error fetching sessions:", error);
      throw error;
    }
  }
);



// Upload Document
// export const getAllUserDocuments = createAsyncThunk(
//   'app/getDocuments',
//   async (params: fileListRequestProps) => {
//     try {
//       const response = await makeNetworkCall({
//         method: API_METHODS.POST,
//         url: ENDPOINT_DOCUMENT_LIST,
//         data: params,
//       });
//       return response?.data?.data?.documents;
//     } catch (error) {
//       console.error('Error during fetching all documents in:', error);
//       throw error;
//     }
//   }
// );

// export const uploadPresignedUrl = createAsyncThunk(
//   'app/uploadDocument',
//   async (params: docUrlUpdateProps, { dispatch }): Promise<boolean | undefined> => {
//     try {
//       const response = await makeNetworkCall({
//         method: API_METHODS.POST,
//         url: ENDPOINT_DOCUMENT_CREATE,
//         data: [params],
//       });

//       const Files: any = await dispatch(requestSellerOnboardingStatus(params?.ownerId));
//       if (Files?.length > 0) {
//         return response?.data?.documentAdded;
//       }
//     } catch (error) {
//       console.error('Error during sending document-url in:', error);
//       throw error;
//     }
//   }
// );

// Document Update
// export const requestDocumentUpdate = createAsyncThunk(
//   'document/requestDocumentUpdate',
//   async (params: IDocumentUpdateProps, { dispatch }): Promise<boolean | undefined> => {
//     try {
//       const response = await makeNetworkCall({
//         method: API_METHODS.PATCH,
//         url: `${ENDPOINT_DOCUMENT_UPDATE}${params.id}`,
//         data: {
//           comment: params?.comment,
//           status: params?.status,
//           docName: params?.docName,
//           docSize: params?.docSize,
//           lock: params?.lock,
//         },
//       });
//       dispatch(requestSellerOnboardingStatus(params?.sellerId));
//       return response?.data?.data;
//     } catch (error) {
//       console.error('Error during sending document-url in:', error);
//       throw error;
//     }
//   }
// );

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
