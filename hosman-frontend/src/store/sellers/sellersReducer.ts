import { createSlice } from '@reduxjs/toolkit';
import { basicInitialState, basicSellerStatusState, networkCallInitialState } from '../types';
import {
  requestSellerOnboardingStatus,
  requestSellersDetails,
  requestSellersList,
  requestSellersListCount,
} from './sellersThunk';

const initialState = {
  list: basicInitialState,
  listCount: networkCallInitialState,
  details: networkCallInitialState,
  sellerStatus: basicSellerStatusState,
};

export const sellersReducer = createSlice({
  name: 'sellers',
  initialState,
  reducers: {
    setSellersList: (state, action) => {
      state.list = action.payload;
    },
    setSellersListCount: (state, action) => {
      state.listCount = action.payload;
    },
    setSellersDetails: (state, action) => {
      state.details = action.payload;
    },
    setSellersStatus: (state, action) => {
      state.sellerStatus = action.payload;
    },
  },
  extraReducers(builder) {
    builder

      // LIST
      .addCase(requestSellersList.fulfilled, (state, action) => {
        state.list.loading = false;
        state.list.data = action.payload;
      })
      .addCase(requestSellersList.pending, (state, action) => {
        state.list.loading = true;
      })
      .addCase(requestSellersList.rejected, (state, action) => {
        state.list.loading = false;
        state.list.error = action.error;
      })

      // LIST COUNT
      .addCase(requestSellersListCount.fulfilled, (state, action) => {
        state.listCount.loading = false;
        state.listCount.data = action.payload;
      })
      .addCase(requestSellersListCount.pending, (state, action) => {
        state.listCount.loading = true;
      })
      .addCase(requestSellersListCount.rejected, (state, action) => {
        state.listCount.loading = false;
        state.listCount.error = action.error;
      })

      // DETAILS
      .addCase(requestSellersDetails.fulfilled, (state, action) => {
        state.details.loading = false;
        state.details.data = action.payload;
      })
      .addCase(requestSellersDetails.pending, (state, action) => {
        state.details.loading = true;
      })
      .addCase(requestSellersDetails.rejected, (state, action) => {
        state.details.loading = false;
        state.details.error = action.error;
      })

      // ONBOARDING STATUS
      .addCase(requestSellerOnboardingStatus.fulfilled, (state, action) => {
        state.sellerStatus = action?.payload;
      });
  },
});

export const { setSellersList, setSellersListCount, setSellersDetails, setSellersStatus } =
  sellersReducer.actions;

export default sellersReducer.reducer;
