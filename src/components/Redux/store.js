// store.js
import { configureStore, } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import userSlice from './Slice/user';
import { productReducer, productDetailsReducer } from './Slice/Product';
import cartReducer from './Slice/cart';
import themeReducer from './Slice/themeSlice';
import categoryReducer from './Slice/category';
import { combineReducers } from 'redux'; // Import combineReducers

const persistConfig = {
  key: 'root',
  storage,
};

// Combine all reducers into a single rootReducer
const rootReducer = combineReducers({
  auth: userSlice,
  data: productReducer,
  product: productDetailsReducer,
  cart: cartReducer,
  cate: categoryReducer,
  
  theme: themeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

const persistor = persistStore(store); // Move persistor creation outside the configureStore

export { store, persistor }; // Export both store and persistor
