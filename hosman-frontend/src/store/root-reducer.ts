import { combineReducers } from '@reduxjs/toolkit';
import allStaffReducer from './all-staff/allStaffReducer';
import appReducer from './app/appReducer';
import productReducer from './products/productReducer';
import rolesReducer from './roles/rolesReducer';
import sellersReducer from './sellers/sellersReducer';

export const rootReducer = combineReducers({
  app: appReducer,
  roles: rolesReducer,
  allstaff: allStaffReducer,
  sellers: sellersReducer,
  products: productReducer,
});
