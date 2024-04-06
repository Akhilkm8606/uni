import axios from "axios";
import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAILURE,
  CLEAR_PRODUCTS,

  PRODUCTS_DETAILS_REQUEST,
  PRODUCTS_DETAILS_SUCCESS,
  PRODUCTS_DETAILS_FAILURE,


  CLEAR_ERRORS,
} from "../Constants/ProductConstants";
export const clearProducts = () => ({
  type: CLEAR_PRODUCTS
});

export const getProducts = (keyword) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS_REQUEST });
    const url = keyword ? `http://localhost:5000/products?keyword=${keyword}` : 'http://localhost:5000/products';

    const response = await axios.get(url);
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
export const getProductDetails = (id) => async (dispatch) =>{
  try {
    dispatch({
      type: PRODUCTS_DETAILS_REQUEST
    });

    const response = await axios.get(`http://localhost:5000/product/${id}`);
    dispatch({
      type: PRODUCTS_DETAILS_SUCCESS,
      payload: response.data.product
    
    });
    
    
  } catch (error) {
    dispatch({
      type: PRODUCTS_DETAILS_FAILURE,
      payload: {
        error: {
          message: error.message,
          status: error.status,
        }}
    });
  }
}



export const clearError = () => async (dispatch) =>{
  dispatch({
    type: CLEAR_ERRORS
  });
}

