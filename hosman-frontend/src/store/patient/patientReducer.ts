import { createSlice } from '@reduxjs/toolkit';
import { basicInitialArrayState, basicSellerStatusState, networkCallInitialState } from '../types';
import { requestAddPatientList, requestGetPatient } from './patientThunk';

const initialState = {
  patientlist:basicInitialArrayState,
  listCount: networkCallInitialState,
  details: networkCallInitialState,
  sellerStatus: basicSellerStatusState,
};

export const patientsReducer = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    setpatientList: (state, action) => {
      state.patientlist = action.payload;
    },
  },
  extraReducers(builder) {
    builder

      // LIST
      .addCase(requestAddPatientList.fulfilled, (state, action) => {
        state.patientlist.loading = false;
        state.patientlist.data = action.payload;
      })
      .addCase(requestAddPatientList.pending, (state) => {
        state.patientlist.loading = true;
      })
      .addCase(requestAddPatientList.rejected, (state, action) => {
        state.patientlist.loading = false;
        state.patientlist.error = action.error;
      })

      .addCase(requestGetPatient.pending, (state) => {
        state.patientlist.loading = true;
        state.patientlist.error = null;
      })
      .addCase(requestGetPatient.fulfilled, (state, action) => {
        state.patientlist.loading = false;
        state.patientlist.data = action.payload || [];  // Ensure payload is set
      })
      .addCase(requestGetPatient.rejected, (state, action) => {
        state.patientlist.loading = false;
        state.patientlist.error = action.error;
      });

      // // LIST COUNT
      // .addCase(requestSellersListCount.fulfilled, (state, action) => {
      //   state.listCount.loading = false;
      //   state.listCount.data = action.payload;
      // })
      // .addCase(requestSellersListCount.pending, (state, action) => {
      //   state.listCount.loading = true;
      // })
      // .addCase(requestSellersListCount.rejected, (state, action) => {
      //   state.listCount.loading = false;
      //   state.listCount.error = action.error;
      // })

      // // DETAILS
      // .addCase(requestSellersDetails.fulfilled, (state, action) => {
      //   state.details.loading = false;
      //   state.details.data = action.payload;
      // })
      // .addCase(requestSellersDetails.pending, (state, action) => {
      //   state.details.loading = true;
      // })
      // .addCase(requestSellersDetails.rejected, (state, action) => {
      //   state.details.loading = false;
      //   state.details.error = action.error;
      // })

      // // ONBOARDING STATUS
      // .addCase(requestSellerOnboardingStatus.fulfilled, (state, action) => {
      //   state.sellerStatus = action?.payload;
      // });
  },
});

export const { setpatientList } =
  patientsReducer.actions;

export default patientsReducer.reducer;
