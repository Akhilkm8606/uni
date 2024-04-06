import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAILURE,
  PRODUCTS_DETAILS_REQUEST,
  PRODUCTS_DETAILS_SUCCESS,
  PRODUCTS_DETAILS_FAILURE,
  CLEAR_PRODUCTS, // Add import for CLEAR_PRODUCTS
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
        products: action.payload.products,
        productCount: action.payload.productCount,
      };
    case ALL_PRODUCTS_FAILURE:
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
    case CLEAR_PRODUCTS:
      return {
        ...state,
        products: [] // Clear the products array
      };
      case 'DELETE_PRODUCT':
      // Filter out the deleted product from the products array
      return {
        ...state,
        products: state.products.filter(product => product._id !== action.payload)
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
        product: action.payload, // Correct the spelling of payload
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
  