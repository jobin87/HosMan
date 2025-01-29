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
  reportData:basicInitialState,
};

export const reportReducer = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    setRolesList: (state, action) => {
      state.list = action.payload;
    },
    setRolesDetails: (state, action) => {
      state.details = action.payload;
    },
    setRolesCreate: (state, action) => {
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
        state.details.loading = false;
        // state.details.data = action.payload;
        if (action.payload) {
          state.details.data = action.payload
        }
      })
      .addCase(getReportList.pending, (state) => {
        state.details.loading = true;
      })
      .addCase(getReportList.rejected, (state, action) => {
        state.details.loading = false;
        state.details.error = action.error;
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

export const { setRolesList, setRolesDetails, setRolesCreate, setRolesEdit, setRolesDelete } =
  reportReducer.actions;

export default reportReducer.reducer;
