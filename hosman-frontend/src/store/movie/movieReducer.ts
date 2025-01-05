// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { getmoviedata } from './movieThunk';
// import {  MovieStateProps,} from '../types';



// const initialState: MovieStateProps = {
//   data:{
//     movies:[],
//     series:[],
//     anime:[]
//   },
//   loading: false,
//   error:null
// };

// const movieReducer = createSlice({
//   name: 'movie',
//   initialState,
//   reducers: {
//     setmoviesfetched: (state,action)=>{
//       state.data= action.payload
//     },
   
//   },
//   extraReducers: (builder) => {
//     builder
//       // .addCase(getmoviedata.pending, (state) => {
//       //   state.loading = true;
//       //   state.error= null;
//       // })
//       .addCase(getmoviedata.fulfilled, (state, action: PayloadAction<MovieStateProps['data']>) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       // .addCase(getmoviedata.rejected, (state, action) => {
//       //   state.loading = false;
//       //   state.error = action.payload as any; // Assuming payload contains the error message
//       // });
//   },
// });
// export const{
//   setmoviesfetched

// }= movieReducer.actions
// export default movieReducer.reducer;
