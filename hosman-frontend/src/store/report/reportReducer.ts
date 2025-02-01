import { createSlice } from '@reduxjs/toolkit';
import { basicInitialState, networkCallInitialState } from '../types';
import {
  addReportList,
  getReportList,
  requestCreateStaffRoles,
  requestDeleteStaffRoles,
  requestEditStaffRoles,
  requestStaffRolesDetails,
} from './reportThunk';

const initialState = {
  list: basicInitialState,
  details: basicInitialState,
  create: networkCallInitialState,
  edit: networkCallInitialState,
  delete: networkCallInitialState,
  reportDetails:basicInitialState,
};

export const reportReducer = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    setReportList: (state, action) => {
      state.list = action.payload;
    },
    setReportDetails: (state, action) => {
      state.details = action.payload;
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

      // EDIT
      .addCase(requestEditStaffRoles.fulfilled, (state, action) => {
        state.edit.loading = false;
        state.edit.data = action.payload;
        if (action.payload?.permissionUpdated) {
          state.list = basicInitialState;
        }
      })
      .addCase(requestEditStaffRoles.pending, (state, action) => {
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
      .addCase(requestDeleteStaffRoles.pending, (state, action) => {
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
