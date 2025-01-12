import axios from 'axios';
import toast from 'react-hot-toast';

import { CONFIG } from 'src/config-global';
import { default as defaultStore, default as store } from 'src/store';
import { requestSignOut } from 'src/store/app/appThunk';

interface INetworkCallConfig {
  method: string;
  url: string;
  data?: any;
  extraHeaders?: object;
  extraHeadersOnly?: boolean;
}

export const BASE_URL = CONFIG.baseUrl;

export const API_METHODS = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
};

export const makeNetworkCall = async (config: INetworkCallConfig) => {
  try {
    const { app } = defaultStore.getState();
    const { method = API_METHODS.GET, extraHeaders = {}, extraHeadersOnly = false } = config;
    const authKey = app.auth?.data?.accessToken;

    const commonHeaders = {
      ...(authKey !== undefined && { Authorization: `Bearer ${authKey}` }),
      'Content-Type': 'application/json',
      withCredentials: false,
    };

    const headers = extraHeadersOnly
      ? { ...extraHeaders }
      : {
          ...commonHeaders,
          ...extraHeaders,
        };

    const call = await axios({
      method,
      baseURL: BASE_URL,
      url: config.url,
      data: config.data,
      headers,
      validateStatus: () => true,
      withCredentials: false,
    });

    if (call.status === 401) {
      store.dispatch(requestSignOut());
    }
    if (call.status !== 200 && call.status !== 201) {
      toast?.error(call?.data?.data?.message || call?.data?.message || 'Something went wrong');
    }

    if (call.data.statusCode === 406) {
      toast?.error(call?.data?.data?.message || call?.data?.message || 'Something went wrong');
    }

    return call;
  } catch (error:any) {
    toast?.error(error?.response?.data?.message || error?.message || 'Something went wrong');
    return null;
  }
};
