import { createSlice } from '@reduxjs/toolkit';
import { basicInitialState, MovieState, networkCallInitialState } from '../types';
// import { checkEmailExist, requestSignInWithPassword, requestSignUp } from './appThunk';

const initialState = {
  auth: basicInitialState, // user data, loading, error states
  usersSignedUp: basicInitialState,
  accessToken: null, // Authentication token
  userLogged: false, // Whether the user is logged in
  forgetpassword: networkCallInitialState, // Network state for forget password
  resetpassword: networkCallInitialState, // Network state for reset password
  userDocuments: [], // Documents associated with the user
  movies: { ...MovieState }, // Movies related data

  onboarding: {
    steps: {
      step: 6, // Current step in onboarding
      enabled: false, // Whether onboarding is enabled
    },
  },
};

export const appReducer = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.auth.data = action.payload;
    },
    setUsersignup: (state, action) => {
      state.usersSignedUp = action.payload;
    },
    setLogged: (state, action) => {
      state.userLogged = action.payload;
    },
    setAuthToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setUserDetails: (state, action) => {
      state.auth.data = action.payload;
    },
    setUserLoggedOut: (state) => {
      state.auth = basicInitialState;
      state.accessToken = null;
      state.userLogged = false;
    },
    setForgetPassword: (state, action) => {
      state.forgetpassword = action.payload;
    },
    setResetPassword: (state, action) => {
      state.resetpassword = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // // Sign In
      // .addCase(requestSignInWithPassword.fulfilled, (state, action) => {
      //   if (action.payload?.user) {
      //     state.auth.data = action.payload;
      //     state.accessToken = action.payload.token;
      //     state.userLogged = true;
      //   }
      //   state.auth.loading = false;
      // })
      // .addCase(requestSignInWithPassword.pending, (state) => {
      //   state.auth.loading = true;
      // })
      // .addCase(requestSignInWithPassword.rejected, (state, action) => {
      //   state.auth.error = action.error;
      //   state.auth.loading = false;
      // })
      // // Sign Up
      // .addCase(requestSignUp.fulfilled, (state, action) => {
      //   state.auth.data = action.payload;
      //   state.auth.loading = false;
      // })
      // .addCase(requestSignUp.pending, (state) => {
      //   state.auth.loading = true;
      // })
      // .addCase(requestSignUp.rejected, (state, action) => {
      //   state.auth.error = action.error;
      //   state.auth.loading = false;
      // })
      // // Check Email Existence
      // .addCase(checkEmailExist.fulfilled, (state, action) => {
      //   state.usersSignedUp.data = action.payload;
      //   state.usersSignedUp.loading = false;
      // })
      // .addCase(checkEmailExist.pending, (state) => {
      //   state.auth.loading = true;
      // })
      // .addCase(checkEmailExist.rejected, (state, action) => {
      //   state.auth.error = action.error;
      //   state.auth.loading = false;
      // });
  },
});

export const {
  setLoading,
  setLogged,
  setAuthToken,
  setUserDetails,
  setForgetPassword,
  setResetPassword,
  setUserLoggedOut,
} = appReducer.actions;

export default appReducer.reducer;
