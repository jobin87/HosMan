import { createSlice } from '@reduxjs/toolkit';
import { basicInitialState } from '../types';
import {
  requestCreateProductBrand,
  requestCreateProductCategory,
  requestProductBrandsList,
  requestProductBrandUpdate,
  requestProductCategoryList,
} from './productThunk';

const initialState = {
  category: basicInitialState,
  brands: basicInitialState,
};

export const productReducer = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setBrands: (state, action) => {
      state.brands = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(requestProductCategoryList.pending, (state, action) => {
        state.category.loading = true;
      })
      .addCase(requestProductCategoryList.fulfilled, (state, action) => {
        state.category.data = action.payload;
        state.category.loading = false;
      })

      .addCase(requestCreateProductCategory.pending, (state, action) => {
        state.category.loading = true;
      })
      .addCase(requestCreateProductCategory.fulfilled, (state, action) => {
        state.category.loading = false;
      })
      .addCase(requestCreateProductCategory.rejected, (state, action) => {
        state.category.loading = false;
      })

      .addCase(requestProductBrandsList.pending, (state, action) => {
        state.brands.loading = true;
      })
      .addCase(requestProductBrandsList.fulfilled, (state, action) => {
        state.brands.data = action.payload;
        state.brands.loading = false;
      })

      .addCase(requestCreateProductBrand.pending, (state, action) => {
        state.brands.loading = true;
      })
      .addCase(requestCreateProductBrand.fulfilled, (state, action) => {
        state.brands.loading = false;
      })

      .addCase(requestProductBrandUpdate.pending, (state, action) => {
        state.brands.loading = true;
      })
      .addCase(requestProductBrandUpdate.fulfilled, (state, action) => {
        state.brands.loading = false;
      });
  },
});

export const { setCategory, setBrands } = productReducer.actions;

export default productReducer.reducer;
