import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_METHODS,


  ENDPOINT_APPOINTMENT_GET,


  ENDPOINT_APPOINTMENT_POST,


  makeNetworkCall,
} from 'src/network';
import {
  AppointmentTypes,

} from './types';

export const requestAppointmentSaved = createAsyncThunk(
  'appointment/requestAppointmentSaved',
  async (params:AppointmentTypes) => {
    try {
      const response = await makeNetworkCall({
        method: API_METHODS.POST,
        url: ENDPOINT_APPOINTMENT_POST,
        data: params,
      });
      console.log("appointment:",response)
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getAppointmentData = createAsyncThunk(
  'appointment/requestAppointmentSaved',
  async (params:AppointmentTypes) => {
    try {
      const response = await makeNetworkCall({
        method: API_METHODS.GET,
        url: ENDPOINT_APPOINTMENT_GET,
        data: params,
      });
      console.log("appointment:",response)
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);
