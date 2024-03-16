import { createSlice } from '@reduxjs/toolkit';
import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAILURE,
  PRODUCTS_DETAILS_REQUEST,
  PRODUCTS_DETAILS_SUCCESS,
  PRODUCTS_DETAILS_FAILURE,

  CLEAR_ERRORS
} from "../../../Constants/ProductConstants";



export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products, // Correct the spelling of payload
        productCount: action.payload.productCount,
      };
    case ALL_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload // Correct the spelling of payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCTS_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCTS_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload, // Correct the spelling of payload
      };
    case PRODUCTS_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload // Correct the spelling of payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

