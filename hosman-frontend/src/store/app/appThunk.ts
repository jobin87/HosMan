import { createAsyncThunk } from '@reduxjs/toolkit';
// import {
//   API_METHODS,
// } from 'src/network';
// import type {
//   SignInParams,
//   SignUpParams,
// } from './types';
// import { makeNetworkCall } from 'src/network/networkcall';
// import { ENDPOINT_USER_LOGIN, ENDPOINT_USER_SIGNUP, ENDPOINT_USER_CHECK } from 'src/network/endpoints';
import { persistor } from '..';
import { paths } from 'src/routes/paths';

// Sign in action
// export const requestSignInWithPassword = createAsyncThunk(
//   'app/signInWithPassword',
//   async (params: SignInParams) => {
//     const response = await makeNetworkCall({
//       method: API_METHODS.POST,
//       url: ENDPOINT_USER_LOGIN,
//       data: params,
//     });
//     return response?.data;
//   }
// );

// Sign out action
export const requestSignOut = createAsyncThunk(
  'app/signOut',
  async (onClose: (() => void) | undefined = () => {}) => {
    await persistor.purge();
    onClose();
    window.location.href = paths.auth.signIn;
  }
);

// Sign up action
// export const requestSignUp = createAsyncThunk(
//   'app/signUp',
//   async (params: SignUpParams) => {
//     const response = await makeNetworkCall({
//       method: API_METHODS.POST,
//       url: ENDPOINT_USER_SIGNUP,
//       data: params,
//     });
//     console.log(response);
//     return response?.data?.data;
//   }
// );

// Check email existence action
// export const checkEmailExist = createAsyncThunk(
//   'app/checkEmailExist',
//   async (email:string) => {
//     const response = await makeNetworkCall({
//       method: API_METHODS.POST,
//       url: ENDPOINT_USER_CHECK, // Use a separate endpoint for checking email
//       data:{email},
//     });
//     console.log(response);
//     return response?.data;
//   }
// );
