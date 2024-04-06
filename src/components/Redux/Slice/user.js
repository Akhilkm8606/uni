// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    users: [] // Add users array to store fetched users
};

const userSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        userAuthentic: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        userLogOut: (state, actions) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
        setAllUsers: (state, action) => {
            state.users = action.payload; // Update users array with fetched users
        },
        deleteUser :(state,action) =>{
            const userDelete = action.payload;
            state.users = state.users.filter(users => users._id !== userDelete);
      
          }
    }
});

export const { userAuthentic, userLogOut, setAllUsers,deleteUser } = userSlice.actions;
export default userSlice.reducer;
