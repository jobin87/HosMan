import { createSlice } from '@reduxjs/toolkit';
import { basicInitialState } from '../types';
import {
  getAppointmentData,
} from './appointmentThunk';

const initialState = {
  appointmentData: basicInitialState,
  appointmentcount:basicInitialState
};

export const appointmentReducer = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    setAppointment: (state, action) => {
      state.appointmentData = action.payload;
    },
  
  },
  extraReducers(builder) {
    builder
     
      .addCase(getAppointmentData.fulfilled, (state, action) => {
        state.appointmentData.data = action.payload;
        console.log("dataaass:",action.payload)
        state.appointmentData.loading = false;
      })
      .addCase(getAppointmentData.rejected, (state, action) => {
        state.appointmentData.loading = false;
        state.appointmentData.error= action.error;
      })
      .addCase(getAppointmentData.pending, (state) => {
        state.appointmentData.loading = true;
      })

      // .addCase(requestCreateProductCategory.fulfilled, (state, action) => {
      //   state.category.loading = false;
      // })
      // .addCase(requestCreateProductCategory.rejected, (state, action) => {
      //   state.category.loading = false;
      // })

      // .addCase(requestProductBrandsList.pending, (state, action) => {
      //   state.brands.loading = true;
      // })
      // .addCase(requestProductBrandsList.fulfilled, (state, action) => {
      //   state.brands.data = action.payload;
      //   state.brands.loading = false;
      // })

      // .addCase(requestCreateProductBrand.pending, (state, action) => {
      //   state.brands.loading = true;
      // })
      // .addCase(requestCreateProductBrand.fulfilled, (state, action) => {
      //   state.brands.loading = false;
      // })

      // .addCase(requestProductBrandUpdate.pending, (state, action) => {
      //   state.brands.loading = true;
      // })
      // .addCase(requestProductBrandUpdate.fulfilled, (state, action) => {
      //   state.brands.loading = false;
      // });
  },
});

export const { setAppointment } = appointmentReducer.actions;

export default appointmentReducer.reducer;
