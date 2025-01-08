import { createSlice } from '@reduxjs/toolkit';
import { basicInitialState, networkCallInitialState } from '../types';
import {
  requestCreateStaffRoles,
  requestDeleteStaffRoles,
  requestEditStaffRoles,
  requestStaffRolesDetails,
  requestStaffRolesList,
} from './rolesThunk';

const initialState = {
  list: basicInitialState,
  details: basicInitialState,
  create: networkCallInitialState,
  edit: networkCallInitialState,
  delete: networkCallInitialState,
};

export const rolesReducer = createSlice({
  name: 'roles',
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
      .addCase(requestStaffRolesList.fulfilled, (state, action) => {
        state.list.loading = false;
        if (action.payload?.isData) {
          state.list.data = action.payload;
        }
      })
      .addCase(requestStaffRolesList.pending, (state, action) => {
        state.list.loading = true;
      })
      .addCase(requestStaffRolesList.rejected, (state, action) => {
        state.list.loading = false;
        state.list.error = action.error;
      })

      // DETAILS
      .addCase(requestStaffRolesDetails.fulfilled, (state, action) => {
        state.details.loading = false;
        state.details.data = action.payload;
      })
      .addCase(requestStaffRolesDetails.pending, (state, action) => {
        state.details.loading = true;
      })
      .addCase(requestStaffRolesDetails.rejected, (state, action) => {
        state.details.loading = false;
        state.details.error = action.error;
      })

      // CREATE
      .addCase(requestCreateStaffRoles.fulfilled, (state, action) => {
        state.create.loading = false;
        state.create.data = action.payload;
        if (action.payload?.permissionAdded) {
          state.list = basicInitialState;
        }
      })
      .addCase(requestCreateStaffRoles.pending, (state, action) => {
        state.create.loading = true;
      })
      .addCase(requestCreateStaffRoles.rejected, (state, action) => {
        state.create.loading = false;
        state.create.error = action.error;
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
  rolesReducer.actions;

export default rolesReducer.reducer;
