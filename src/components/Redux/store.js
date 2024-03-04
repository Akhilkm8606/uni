import { configureStore } from "@reduxjs/toolkit";
import userSlice from './Slice/user'
 const store = configureStore({
    reducer:{
        auth:userSlice
    }
 })
 export default store;