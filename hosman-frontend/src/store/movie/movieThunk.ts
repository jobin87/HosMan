
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import {
//   API_METHODS,
  
// } from 'src/network';
// import { makeNetworkCall } from 'src/network/networkcall';
// // import { ENDPOINT_MOVIES} from 'src/network/endpoints';

// // Sign in action
// export const getmoviedata = createAsyncThunk(
//   'movies/getmovies',
//   async () => {
//     try{
//     const response = await makeNetworkCall({
//       method: API_METHODS.GET,
//       url: ENDPOINT_MOVIES,
//     });
//       return response?.data
    
//   }
//   catch (error: any) {
//     // Handle any errors that may occur
//     console.error('Error fetching movies:', error.response?.data || error.message);
//     throw new Error( 'Something went wrong!');
//   }
// }

// );
// // export const getseriesdata = createAsyncThunk(
// //   'movies/getseries',
// //   async () => {
// //     try{
// //     const response = await makeNetworkCall({
// //       method: API_METHODS.GET,
// //       url: ENDPOINT_MOVIES,
// //     });
// //     console.log("response:",response)
  
// //     return response?.data?.series
    
// //   }
// //   catch (error: any) {
// //     // Handle any errors that may occur
// //     console.error('Error fetching movies:', error.response?.data || error.message);
// //     throw new Error( 'Something went wrong!');
// //   }
// // }

// // );
// // console.log(getmoviedata)



