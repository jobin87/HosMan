import { createSlice } from "@reduxjs/toolkit";
import { basicInitialState, networkCallInitialState } from "../types";
import {
  requestaddDoctor,
  requestAllDoctorsList,
  requestAllStaffDetails,
  requestCreateAllStaff,
  requestDeleteAllStaff,
  requestEditAllStaff,
} from "./allStaffThunk";

const initialState = {
  list: basicInitialState,
  doctorsList: basicInitialState,
  details: basicInitialState,
  create: networkCallInitialState,
  edit: networkCallInitialState,
  delete: networkCallInitialState,
};

export const allStaffReducer = createSlice({
  name: "allstaff",
  initialState,
  reducers: {
    setAllStaffList: (state, action) => {
      state.list = action.payload;
    },
    setDoctorsList: (state, action) => {
      state.doctorsList = action.payload;
    },
    setAllStaffDetails: (state, action) => {
      state.details = action.payload;
    },
    setAllStaffCreate: (state, action) => {
      state.create = action.payload;
    },
    setAllStaffEdit: (state, action) => {
      state.edit = action.payload;
    },
    setAllStaffDelete: (state, action) => {
      state.delete = action.payload;
    },
  },
  extraReducers(builder) {
    builder

      //Doctors
      .addCase(requestaddDoctor.fulfilled, (state, action) => {
        state.doctorsList.loading = false;
        state.doctorsList.data = action.payload;
      })
      .addCase(requestaddDoctor.pending, (state) => {
        state.doctorsList.loading = true;
      })
      .addCase(requestaddDoctor.rejected, (state, action) => {
        state.doctorsList.loading = false;
        state.doctorsList.error = action.error;
      })
      .addCase(requestAllDoctorsList.fulfilled, (state, action) => {
        state.doctorsList.loading = false;
        state.doctorsList.data = action.payload;
      })
      .addCase(requestAllDoctorsList.pending, (state) => {
        state.doctorsList.loading = true;
      })
      .addCase(requestAllDoctorsList.rejected, (state, action) => {
        state.doctorsList.loading = false;
        state.doctorsList.error = action.error;
      })

      // DETAILS
      .addCase(requestAllStaffDetails.fulfilled, (state, action) => {
        state.details.loading = false;
        state.details.data = action.payload;
      })
      .addCase(requestAllStaffDetails.pending, (state, action) => {
        state.details.loading = true;
      })
      .addCase(requestAllStaffDetails.rejected, (state, action) => {
        state.details.loading = false;
        state.details.error = action.error;
      })

      // CREATE
      .addCase(requestCreateAllStaff.fulfilled, (state, action) => {
        state.create.loading = false;
        state.create.data = action.payload;
        if (action.payload?.staffCreated) {
          state.list = basicInitialState;
        }
      })
      .addCase(requestCreateAllStaff.pending, (state, action) => {
        state.create.loading = true;
      })
      .addCase(requestCreateAllStaff.rejected, (state, action) => {
        state.create.loading = false;
        state.create.error = action.error;
      })

      // EDIT
      .addCase(requestEditAllStaff.fulfilled, (state, action) => {
        state.edit.loading = false;
        state.edit.data = action.payload;
        if (action.payload?.staffUpdated || action.payload?.staffCreated) {
          state.list = basicInitialState;
        }
      })
      .addCase(requestEditAllStaff.pending, (state, action) => {
        state.edit.loading = true;
      })
      .addCase(requestEditAllStaff.rejected, (state, action) => {
        state.edit.loading = false;
        state.edit.error = action.error;
      })

      // DELETE
      .addCase(requestDeleteAllStaff.fulfilled, (state, action) => {
        state.delete.loading = false;
        state.delete.data = action.payload;
        if (action.payload?.staffDeleted) {
          state.list = basicInitialState;
        }
      })
      .addCase(requestDeleteAllStaff.pending, (state, action) => {
        state.delete.loading = true;
      })
      .addCase(requestDeleteAllStaff.rejected, (state, action) => {
        state.delete.loading = false;
        state.delete.error = action.error;
      });
  },
});

export const {
  setAllStaffList,
  setAllStaffDetails,
  setAllStaffCreate,
  setAllStaffEdit,
  setAllStaffDelete,
} = allStaffReducer.actions;

export default allStaffReducer.reducer;
