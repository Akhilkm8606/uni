// src/reducers/ProductReducer.js

import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAILURE,
  PRODUCTS_DETAILS_REQUEST,
  PRODUCTS_DETAILS_SUCCESS,
  PRODUCTS_DETAILS_FAILURE,
  CLEAR_PRODUCTS,
  CLEAR_ERRORS,
  DELETE_PRODUCT,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
} from "../../../Constants/ProductConstants";

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
    case FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: state.products.map(product =>
          product._id === action.payload._id ? action.payload : product
        ),
      };
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: state.products.map(product =>
          product._id === action.payload._id ? action.payload : product
        ),
      };
    case UPDATE_PRODUCT_FAILURE:
    case FETCH_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
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
        product: action.payload,
      };
    case PRODUCTS_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
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
