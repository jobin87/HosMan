import { combineReducers } from '@reduxjs/toolkit';
import allStaffReducer from './all-staff/allStaffReducer';
import appReducer from './app/appReducer';
import  appointmentReducer  from './appointment/appointmentReducer';
import reportReducer from './report/reportReducer';
import patientsReducer from './patient/patientReducer';

export const rootReducer = combineReducers({
  app: appReducer,
  report: reportReducer,
  allstaff: allStaffReducer,
  patients: patientsReducer,
  appointment: appointmentReducer,
});
