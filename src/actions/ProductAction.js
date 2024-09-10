import axios from "axios";
import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAILURE,
  CLEAR_PRODUCTS,

  PRODUCTS_DETAILS_REQUEST,
  PRODUCTS_DETAILS_SUCCESS,
  PRODUCTS_DETAILS_FAILURE,

  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,

  CLEAR_ERRORS,
} from "../Constants/ProductConstants";
import instance from '../Instance/axios';

// Action to clear products from state
export const clearProducts = () => ({
  type: CLEAR_PRODUCTS
});

// Action to get products
export const getProducts = (keyword) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS_REQUEST });
    const url = keyword ? `/api/v1/products?keyword=${keyword}` : '/api/v1/products';

    const response = await instance.get(url);
    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAILURE,
      payload: {
        message: error.message,
        status: error.response,
      },
    });
  }
};

// Action to get product details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_DETAILS_REQUEST });

    const response = await instance.get(`/api/v1/product/${id}`);
    dispatch({
      type: PRODUCTS_DETAILS_SUCCESS,
      payload: response.data.product,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAILURE,
      payload: {
        error: {
          message: error.message,
          status: error.status,
        },
      },
    });
  }
};

// Action to clear errors
export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};


export const updateProduct = (productId, formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    // Make the API request
    const response = await axios.post(`/api/v1/product/edit/${productId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Action to clear errors
