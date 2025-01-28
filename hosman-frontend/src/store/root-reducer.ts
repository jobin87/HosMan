import { combineReducers } from '@reduxjs/toolkit';
import allStaffReducer from './all-staff/allStaffReducer';
import appReducer from './app/appReducer';
import  appointmentReducer  from './appointment/appointmentReducer';
import rolesReducer from './report/rolesReducer';
import patientsReducer from './patient/patientReducer';

export const rootReducer = combineReducers({
  app: appReducer,
  roles: rolesReducer,
  allstaff: allStaffReducer,
  patients: patientsReducer,
  appointment: appointmentReducer,
});
