import { createAsyncThunk } from '@reduxjs/toolkit';
import { STORAGE_KEY } from 'src/guard/permissions';
import {
  API_METHODS,
  ENDPOINT_AUTH_LOGIN,
  ENDPOINT_AUTH_REGISTER,
  ENDPOINT_USERS_ME,
  ENDPOINT_USERS_GET_ALL,
  ENDPOINT_USERS_DELETE,
  ENDPOINT_TASKS_CREATE,
  ENDPOINT_TASKS_GET_ALL,
  ENDPOINT_TASKS_UPDATE,
  ENDPOINT_TASKS_DELETE,
  makeNetworkCall,
} from 'src/network';
import { persistor } from 'src/store';
import { setUserLoggedOut } from './appReducer';

// Sign in thunk
export const requestSignInWithPassword = createAsyncThunk(
  'app/signInWithPassword',
  async (params: { userEmail?: string; email?: string; password: string }) => {
    const response = await makeNetworkCall({
      method: API_METHODS.POST,
      url: ENDPOINT_AUTH_LOGIN,
      data: {
        userEmail: params.userEmail || params.email,
        password: params.password,
      },
    });
    return response?.data;
  }
);

// Register user thunk
export const requestRegisterUser = createAsyncThunk(
  'app/registerUser',
  async (data: { userName: string; userEmail: string; password: string; role?: string }) => {
    const response = await makeNetworkCall({
      method: API_METHODS.POST,
      url: ENDPOINT_AUTH_REGISTER,
      data: {
        userName: data.userName,
        userEmail: data.userEmail,
        password: data.password,
        role: data.role || 'user',
      },
    });
    return response?.data;
  }
);

// Sign out thunk
export const requestSignOut = createAsyncThunk(
  'app/signOut',
  async (_, { dispatch }) => {
    dispatch(setUserLoggedOut());
    await persistor.purge();
    sessionStorage.removeItem(STORAGE_KEY);
  }
);

// User Profile thunk (GET /users/me)
export const requestUserDetails = createAsyncThunk(
  'user/requestUserDetails',
  async () => {
    const response = await makeNetworkCall({
      method: API_METHODS.GET,
      url: ENDPOINT_USERS_ME,
    });
    return response?.data;
  }
);

// All Users thunk (Admin only GET /users)
export const requestGetAllUsers = createAsyncThunk(
  'user/requestGetAllUsers',
  async (_, { rejectWithValue }) => {
    const response = await makeNetworkCall({
      method: API_METHODS.GET,
      url: ENDPOINT_USERS_GET_ALL,
    });
    if (response?.status !== 200 && response?.status !== 201) {
      return rejectWithValue(response?.data);
    }
    return response?.data;
  }
);

// Delete User thunk (Admin only DELETE /users/:id)
export const requestDeleteUser = createAsyncThunk(
  'user/requestDeleteUser',
  async (id: string, { rejectWithValue }) => {
    const response = await makeNetworkCall({
      method: API_METHODS.DELETE,
      url: `${ENDPOINT_USERS_DELETE}${id}`,
    });
    if (response?.status !== 200 && response?.status !== 201) {
      return rejectWithValue(response?.data);
    }
    return response?.data;
  }
);

// Approve User thunk (Admin only PATCH /users/:id/approve)
export const requestApproveUser = createAsyncThunk(
  'user/requestApproveUser',
  async (params: { id?: string; userId?: string; isApproved: boolean }, { rejectWithValue }) => {
    const targetId = params.id || params.userId;
    const response = await makeNetworkCall({
      method: API_METHODS.PATCH,
      url: `/users/${targetId}/approve`,
      data: { isApproved: params.isApproved },
    });
    if (response?.status !== 200 && response?.status !== 201) {
      return rejectWithValue(response?.data);
    }
    return response?.data;
  }
);

// Get Tasks thunk (GET /tasks)
export const requestGetTasks = createAsyncThunk(
  'tasks/requestGetTasks',
  async (params: { page?: number; limit?: number; status?: string; scope?: string; search?: string } | undefined, { rejectWithValue }) => {
    const queryParts: string[] = [];
    if (params?.page !== undefined) queryParts.push(`page=${params.page}`);
    if (params?.limit !== undefined) queryParts.push(`limit=${params.limit}`);
    if (params?.status) queryParts.push(`status=${encodeURIComponent(params.status)}`);
    if (params?.scope) queryParts.push(`scope=${encodeURIComponent(params.scope)}`);
    if (params?.search) queryParts.push(`search=${encodeURIComponent(params.search)}`);

    const queryString = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
    const response = await makeNetworkCall({
      method: API_METHODS.GET,
      url: `${ENDPOINT_TASKS_GET_ALL}${queryString}`,
    });
    if (response?.status !== 200 && response?.status !== 201) {
      return rejectWithValue(response?.data);
    }
    return response?.data;
  }
);

// Create Task thunk (POST /tasks)
export const requestCreateTask = createAsyncThunk(
  'tasks/requestCreateTask',
  async (data: { title: string; description?: string; status?: string; userId?: string }) => {
    const response = await makeNetworkCall({
      method: API_METHODS.POST,
      url: ENDPOINT_TASKS_CREATE,
      data,
    });
    return response?.data;
  }
);

// Update Task thunk (PUT /tasks/:id)
export const requestUpdateTask = createAsyncThunk(
  'tasks/requestUpdateTask',
  async (params: { id: string; title?: string; description?: string; status?: string; userId?: string }) => {
    const response = await makeNetworkCall({
      method: API_METHODS.PUT,
      url: `${ENDPOINT_TASKS_UPDATE}${params.id}`,
      data: {
        ...(params.title !== undefined && { title: params.title }),
        ...(params.description !== undefined && { description: params.description }),
        ...(params.status !== undefined && { status: params.status }),
        ...(params.userId !== undefined && { userId: params.userId }),
      },
    });
    return response?.data;
  }
);

// Delete Task thunk (DELETE /tasks/:id)
export const requestDeleteTask = createAsyncThunk(
  'tasks/requestDeleteTask',
  async (id: string) => {
    const response = await makeNetworkCall({
      method: API_METHODS.DELETE,
      url: `${ENDPOINT_TASKS_DELETE}${id}`,
    });
    return response?.data;
  }
);
