import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_METHODS,
  ENDPOINT_PRODUCT_BRAND_CREATE,
  ENDPOINT_PRODUCT_BRAND_DELETE,
  ENDPOINT_PRODUCT_BRAND_LIST,
  ENDPOINT_PRODUCT_BRAND_UPDATE,
  ENDPOINT_PRODUCT_CATEGORY_CREATE,
  ENDPOINT_PRODUCT_CATEGORY_DELETE,
  ENDPOINT_PRODUCT_CATEGORY_DETAILS,
  ENDPOINT_PRODUCT_CATEGORY_LIST,
  ENDPOINT_PRODUCT_CATEGORY_UPDATE,
  makeNetworkCall,
} from 'src/network';
import {
  deleteBrandProps,
  newBrandProps,
  newCategoryProps,
  updateBrandProps,
  updateCategoryProps,
} from './types';

export const requestProductCategoryList = createAsyncThunk(
  'products/getProductCategoriesList',
  async (parentId: string | null) => {
    try {
      const response = await makeNetworkCall({
        method: API_METHODS.POST,
        url: ENDPOINT_PRODUCT_CATEGORY_LIST,
        data: { categoryParent: parentId },
      });
      return response?.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const requestCreateProductCategory = createAsyncThunk(
  'products/addProductCategory',
  async (params: newCategoryProps, { dispatch }) => {
    try {
      const response = await makeNetworkCall({
        method: API_METHODS.POST,
        url: ENDPOINT_PRODUCT_CATEGORY_CREATE,
        data: params,
      });

      if (response?.data.data?.categoryAdded) dispatch(requestProductCategoryList(null));
      return response?.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const requestUpdateProductCategory = createAsyncThunk(
  'products/updateProductCategory',
  async (params: updateCategoryProps, { dispatch }) => {
    console.log(params);
    try {
      const response = await makeNetworkCall({
        method: API_METHODS.PATCH,
        url: `${ENDPOINT_PRODUCT_CATEGORY_UPDATE}${params.categoryId}`,
        data: {
          categoryImage: params.categoryImage,
          categoryParent: params.categoryParent,
        },
      });
      if (response?.data.data?.categoryUpdated)
        dispatch(requestProductCategoryList(params.categoryParent || null));
      return response?.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const requestDetailsProductCategory = async (id: string) => {
  try {
    const response = await makeNetworkCall({
      method: API_METHODS.GET,
      url: `${ENDPOINT_PRODUCT_CATEGORY_DETAILS}${id}`,
    });
    return response?.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const requestDeleteProductCategory = createAsyncThunk(
  'products/updateProductCategory',
  async (params: deleteBrandProps, { dispatch }) => {
    try {
      const response = await makeNetworkCall({
        method: API_METHODS.DELETE,
        url: `${ENDPOINT_PRODUCT_CATEGORY_DELETE}${params.id}`,
      });
      if (response?.data.data?.categoryDeleted)
        dispatch(requestProductCategoryList(params.parentId || null));
      return response?.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// Brands

export const requestProductBrandsList = createAsyncThunk('products/getBrandsList', async () => {
  try {
    const response = await makeNetworkCall({
      method: API_METHODS.GET,
      url: ENDPOINT_PRODUCT_BRAND_LIST,
    });
    return response?.data.data;
  } catch (error) {
    console.log(error);
  }
});

export const requestCreateProductBrand = createAsyncThunk(
  'products/newProductBrand',
  async (params: newBrandProps, { dispatch }) => {
    try {
      const response = await makeNetworkCall({
        method: API_METHODS.POST,
        url: ENDPOINT_PRODUCT_BRAND_CREATE,
        data: params,
      });
      if (response?.data.data?.brandAdded) {
        dispatch(requestProductBrandsList());
      }
      return response?.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const requestProductBrandDelete = createAsyncThunk(
  'products/deleteProductBrand',
  async (brandId: string, { dispatch }) => {
    try {
      const response = await makeNetworkCall({
        method: API_METHODS.DELETE,
        url: `${ENDPOINT_PRODUCT_BRAND_DELETE}${brandId}`,
        data: { brandId },
      });
      if (response?.data.data?.brandDeleted) {
        dispatch(requestProductBrandsList());
      }
      return response?.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const requestProductBrandUpdate = createAsyncThunk(
  'products/updateProductBrand',
  async (params: updateBrandProps, { dispatch }) => {
    try {
      const response = await makeNetworkCall({
        method: API_METHODS.PATCH,
        url: `${ENDPOINT_PRODUCT_BRAND_UPDATE}${params.brandId}`,
        data: {
          brandLogo: params.brandLogo,
          brandDescription: params.brandDescription,
          brandWebsite: params.brandWebsite,
        },
      });
      if (response?.data.data?.brandUpdated) {
        dispatch(requestProductBrandsList());
      }
      return response?.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);
