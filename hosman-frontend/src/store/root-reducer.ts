import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './app/appReducer';

export const rootReducer = combineReducers({
  app: appReducer,
});
