import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/user"
const store =configureStore({
    reducer:{


auth : userSlice,
    },
});
export default store;