import { createSlice } from '@reduxjs/toolkit';
import { basicInitialState, networkCallInitialState } from '../types';
import {
  addReportList,
  createAssigningReports,
  getReportList,
  requestDeleteStaffRoles,
  requestEditStaffRoles,
} from './reportThunk';

const initialState = {
  list: basicInitialState,
  create: networkCallInitialState,
  edit: networkCallInitialState,
  delete: networkCallInitialState,
  reportDetails:basicInitialState,
  assignWorkers: basicInitialState
};

export const reportReducer = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    setReportList: (state, action) => {
      state.list = action.payload;
    },
    setReportDetails: (state, action) => {
      state.reportDetails = action.payload;
    },
    setReportCreate: (state, action) => {
      state.create = action.payload;
    },
    setRolesEdit: (state, action) => {
      state.edit = action.payload;
    },
    setRolesDelete: (state, action) => {
      state.delete = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      // LIST
      .addCase(addReportList.fulfilled, (state, action) => {
        state.list.loading = false;
        if (action.payload?.isData) {
          state.list.data = action.payload;
        }
      })
      .addCase(addReportList.pending, (state) => {
        state.list.loading = true;
      })
      .addCase(addReportList.rejected, (state, action) => {
        state.list.loading = false;
        state.list.error = action.error;
      })


      // get
      .addCase(getReportList.fulfilled, (state, action) => {
        state.reportDetails.loading = false;
        // Extract the reportdata array from the payload
        state.reportDetails.data = action.payload.reportdata || [];
        console.log("Reports fetched:", action.payload.reportdata);
      })
      
      .addCase(getReportList.pending, (state) => {
        state.reportDetails.loading = true;
      })
      .addCase(getReportList.rejected, (state, action) => {
        state.reportDetails.loading = false;
        state.reportDetails.error = action.error;
      })

      //patch
      .addCase(createAssigningReports.fulfilled, (state, action) => {
        state.reportDetails.loading = false;
        // Extract the reportdata array from the payload
        state.assignWorkers.data = action.payload.reportdata || [];
        console.log("Reports fetched:", action.payload);
      })
      
      .addCase(createAssigningReports.pending, (state) => {
        state.assignWorkers.loading = true;
      })
      .addCase(createAssigningReports.rejected, (state, action) => {
        state.assignWorkers.loading = false;
        state.assignWorkers.error = action.error;
      })

      // EDIT
      .addCase(requestEditStaffRoles.fulfilled, (state, action) => {
        state.edit.loading = false;
        state.edit.data = action.payload;
        if (action.payload?.permissionUpdated) {
          state.list = basicInitialState;
        }
      })
      .addCase(requestEditStaffRoles.pending, (state) => {
        state.edit.loading = true;
      })
      .addCase(requestEditStaffRoles.rejected, (state, action) => {
        state.edit.loading = false;
        state.edit.error = action.error;
      })

      // DELETE
      .addCase(requestDeleteStaffRoles.fulfilled, (state, action) => {
        state.delete.loading = false;
        state.delete.data = action.payload;
        if (action.payload?.permissionDeleted) {
          state.list = basicInitialState;
        }
      })
      .addCase(requestDeleteStaffRoles.pending, (state) => {
        state.delete.loading = true;
      })
      .addCase(requestDeleteStaffRoles.rejected, (state, action) => {
        state.delete.loading = false;
        state.delete.error = action.error;
      });
  },
});

export const { setReportList, setReportDetails, setReportCreate, setRolesEdit, setRolesDelete } =
  reportReducer.actions;

export default reportReducer.reducer;
