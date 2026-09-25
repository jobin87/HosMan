import { createSlice } from '@reduxjs/toolkit';
import { basicInitialState } from '../types';
import {
  requestSignInWithPassword,
  requestRegisterUser,
  requestUserDetails,
  requestGetTasks,
  requestCreateTask,
  requestUpdateTask,
  requestDeleteTask,
  requestGetAllUsers,
  requestApproveUser,
} from './appThunk';

const initialState = {
  auth: basicInitialState,
  accessToken: null,
  userLogged: false,
  tasks: [],
  tasksTotalCount: 0,
  tasksTotalPages: 1,
  usersList: [],
  tasksLoading: false,
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
      state.auth = basicInitialState;
      state.accessToken = null;
      state.userLogged = false;
      state.tasks = [];
      state.tasksTotalCount = 0;
      state.tasksTotalPages = 1;
      state.usersList = [];
    },
  },
  extraReducers(builder) {
    builder
      // Sign In
      .addCase(requestSignInWithPassword.fulfilled, (state, action) => {
        state.auth.loading = false;
        const resData = action.payload;
        if (resData?.accessToken) {
          state.accessToken = resData.accessToken;
          state.userLogged = true;
          state.auth.data = resData.user;
        }
      })
      .addCase(requestSignInWithPassword.pending, (state) => {
        state.auth.loading = true;
      })
      .addCase(requestSignInWithPassword.rejected, (state, action) => {
        state.auth.error = action.error;
        state.auth.loading = false;
      })

      // Register
      .addCase(requestRegisterUser.fulfilled, (state) => {
        state.auth.loading = false;
      })
      .addCase(requestRegisterUser.pending, (state) => {
        state.auth.loading = true;
      })
      .addCase(requestRegisterUser.rejected, (state, action) => {
        state.auth.error = action.error;
        state.auth.loading = false;
      })

      // User Details (Me)
      .addCase(requestUserDetails.fulfilled, (state, action) => {
        const user = action.payload?.user || action.payload;
        if (user) {
          state.auth.data = {
            ...state.auth.data,
            ...user,
          };
        }
      })

      // All Users (Admin)
      .addCase(requestGetAllUsers.fulfilled, (state, action) => {
        state.usersList = action.payload?.users || action.payload || [];
      })

      // Approve User
      .addCase(requestApproveUser.fulfilled, (state: any, action: any) => {
        const updatedUser = action.payload?.user || action.payload;
        if (updatedUser?.id) {
          const index = state.usersList.findIndex((u: any) => u.id === updatedUser.id);
          if (index !== -1) {
            state.usersList[index] = { ...state.usersList[index], ...updatedUser };
          }
        }
      })

      // Tasks List
      .addCase(requestGetTasks.pending, (state) => {
        state.tasksLoading = true;
      })
      .addCase(requestGetTasks.fulfilled, (state: any, action: any) => {
        state.tasksLoading = false;
        state.tasks = action.payload?.tasks || action.payload || [];
        state.tasksTotalCount = action.payload?.totalCount ?? action.payload?.count ?? (action.payload?.tasks?.length || 0);
        state.tasksTotalPages = action.payload?.totalPages || 1;
      })
      .addCase(requestGetTasks.rejected, (state) => {
        state.tasksLoading = false;
      })

      // Create Task
      .addCase(requestCreateTask.fulfilled, (state: any, action) => {
        const task = action.payload?.task || action.payload;
        if (task?.id) {
          state.tasks.unshift(task);
        }
      })

      // Update Task
      .addCase(requestUpdateTask.fulfilled, (state: any, action) => {
        const task = action.payload?.task || action.payload;
        if (task?.id) {
          const index = state.tasks.findIndex((t: any) => t.id === task.id);
          if (index !== -1) {
            state.tasks[index] = task;
          }
        }
      })

      // Delete Task
      .addCase(requestDeleteTask.fulfilled, (state: any, action: any) => {
        const deletedId = action.meta.arg;
        state.tasks = state.tasks.filter((t: any) => t.id !== deletedId);
      });
  },
});

export const {
  setLoading,
  setLogged,
  setAuthToken,
  setUserDetails,
  setUserLoggedOut,
} = appReducer.actions;

export default appReducer.reducer;
