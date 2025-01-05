import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './app/appReducer';
// import  movieReducer  from './movie/movieReducer';


export const rootReducer = combineReducers({
  app: appReducer,
  // movie: movieReducer
 
});
