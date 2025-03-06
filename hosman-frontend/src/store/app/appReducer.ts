import { createSlice } from '@reduxjs/toolkit';

import {  basicInitialArrayState, basicInitialState, networkCallInitialState } from '../types';
import {
  changeDefaultPassword,
  requestgetSessions,
  requestProfilePhoto,
  // requestForgetPassword,
  requestResetPassword,
  requestSignInWithPassword,
  requestUserDetails,
  // requestUserRegistration,
} from './appThunk';

const initialState = {
  auth: {
    ...basicInitialState,role:null,
  },
  accessToken: null,
  userLogged: false,
  forgetpassword: networkCallInitialState,
  resetpassword: networkCallInitialState,
  sessiondetails: basicInitialArrayState,
  profilePhoto: basicInitialState,

  // ---------------------------------------
  onboarding: {
    steps: {
      step: 6,
      enabled: false,
    },
  },
};

export const appReducer = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.auth.loading = action.payload;
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
      state.auth.data = basicInitialState;
      state.accessToken = null;
      state.userLogged = false;
    },
    setForgetPassword: (state, action) => {
      state.forgetpassword = action.payload;
    },
    setResetPassword: (state, action) => {
      state.resetpassword = action.payload;
    },
    setOnboardingSteps: (state, action) => {
      state.onboarding.steps = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      // Sign In
      .addCase(requestSignInWithPassword.fulfilled, (state, action) => {
        state.auth.loading = false;
        state.auth.data = action.payload;

        const { userLogged, accessToken,role } = action.payload;

        if (userLogged) {
          state.auth.role = role
          state.accessToken = accessToken;
          state.userLogged = true;
        }
        localStorage.setItem("token", accessToken);
        console.log(accessToken)
      })
      .addCase(requestSignInWithPassword.pending, (state) => {
        state.auth.loading = true;
      })
      .addCase(requestSignInWithPassword.rejected, (state, action) => {
        state.auth.error = action.error;
        state.auth.loading = false;
      })



      .addCase(requestProfilePhoto.fulfilled, (state, action) => {
        state.profilePhoto.loading = false;
        state.profilePhoto.data = action.payload;

        const { data} = action.payload;

        if (data.photoURL) {
          console.log("hejuuyto hoto")
        }
      })
      .addCase(requestProfilePhoto.pending, (state) => {
        state.profilePhoto.loading = true;
      })
      .addCase(requestProfilePhoto.rejected, (state, action) => {
        state.profilePhoto.error = action.error;
        state.profilePhoto.loading = false;
      })

      // Seller Registration
      // .addCase(requestUserRegistration.fulfilled, (state, action) => {
      //   state.auth.loading = true;
      // })
      // .addCase(requestUserRegistration.pending, (state, action) => {
      //   state.auth.loading = true;
      // })
      // .addCase(requestUserRegistration.rejected, (state, action) => {
      //   state.auth.error = action.error;
      //   state.auth.loading = false;
      // })

      // Forget Password
      // .addCase(requestForgetPassword.fulfilled, (state, action) => {
      //   state.forgetpassword.loading = false;
      //   state.forgetpassword.data = action.payload;
      // })
      // .addCase(requestForgetPassword.pending, (state, action) => {
      //   state.forgetpassword.loading = true;
      // })
      // .addCase(requestForgetPassword.rejected, (state, action) => {
      //   state.forgetpassword.error = action.error;
      //   state.forgetpassword.loading = false;
      // })

      // Reset Password
      .addCase(requestResetPassword.fulfilled, (state, action) => {
        state.forgetpassword.loading = false;
        state.forgetpassword.data = action.payload;
      })
      .addCase(requestResetPassword.pending, (state) => {
        state.forgetpassword.loading = true;
      })
      .addCase(requestResetPassword.rejected, (state, action) => {
        state.forgetpassword.error = action.error;
        state.forgetpassword.loading = false;
      })

      // -------------------------------------------------------------------------------------

      // User Details
      .addCase(requestUserDetails.fulfilled, (state, action) => {
        state.auth.data = {
          ...state.auth.data,
          ...action.payload,
        };
      })

      //sessions
      .addCase(requestgetSessions.fulfilled, (state, action) => {
        state.sessiondetails.loading = false;
        state.sessiondetails.data= action.payload;
      })
      .addCase(requestgetSessions.pending, (state) => {
        state.sessiondetails.loading = true;
      })
      .addCase(requestgetSessions.rejected, (state, action) => {
        state.sessiondetails.error = action.error;
        state.sessiondetails.loading = false;
      })

      // Change Default Password
      .addCase(changeDefaultPassword.fulfilled, (state, action) => {
        console.log('action.payload.defaultPasswordUpdated', action.payload, state);
        if (action.payload) {
          state.auth.data.defaultPassword = false;
        }
      })
      // .addCase(getAllUserDocuments.fulfilled, (state, action) => {
      //   console.log('action.payload.documents', action.payload, state);
      //   if (action.payload) {
      //     state.userDocuments = action.payload;
      //   }
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
  setOnboardingSteps,
} = appReducer.actions;

export default appReducer.reducer;
