import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {thunk} from 'redux-thunk';
import userSlice from './Slice/user';
import { productReducer,productDetailsReducer } from './Slice/Product';

const store = configureStore({
  reducer: {
    auth: userSlice,
    data: productReducer,
    product: productDetailsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export default store;
