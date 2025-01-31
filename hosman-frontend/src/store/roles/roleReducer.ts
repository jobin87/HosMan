import { createSlice } from '@reduxjs/toolkit';
import { basicInitialState, networkCallInitialState } from '../types';
import {
  createRoomRoles,
  getRoomRoles,
  requestDeleteStaffRoles,
  requestEditStaffRoles,
} from './roleThunk';

const initialState = {
  list: basicInitialState,
  roomdetails: basicInitialState,
  create: networkCallInitialState,
  edit: networkCallInitialState,
  delete: networkCallInitialState,
  reportData:basicInitialState,
};

export const roleReducer = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    setRolesList: (state, action) => {
      state.list = action.payload;
    },
    setRolesDetails: (state, action) => {
      state.roomdetails = action.payload;
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
      .addCase(createRoomRoles.fulfilled, (state, action) => {
        state.list.loading = false;
        // if (action.payload) {
        //   state.list.data = action.payload;
        // }
      })
      .addCase(createRoomRoles.pending, (state) => {
        state.list.loading = true;
      })
      .addCase(createRoomRoles.rejected, (state, action) => {
        state.list.loading = false;
        state.list.error = action.error;
      })


      // get
      .addCase(getRoomRoles.fulfilled, (state, action) => {
        state.roomdetails.loading = false;
        // state.details.data = action.payload;
        if (action.payload) {
          state.roomdetails.data = action.payload
        }
      })
      .addCase(getRoomRoles.pending, (state) => {
        state.roomdetails.loading = true;
      })
      .addCase(getRoomRoles.rejected, (state, action) => {
        state.roomdetails.loading = false;
        state.roomdetails.error = action.error;
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

export const { setRolesList, setRolesDetails, setRolesCreate, setRolesEdit, setRolesDelete } =
  roleReducer.actions;

export default roleReducer.reducer;
