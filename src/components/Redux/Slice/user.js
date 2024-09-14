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
      
          },
          updateUser: (state, action) => {
            state.user = action.payload; // Update the single user object
          },
          updateUsers: (state, action) => {
            const updatedUser = action.payload;
            const index = state.users.findIndex(user => user._id === updatedUser._id);
            if (index !== -1) {
              state.users[index] = updatedUser; // Update the user in the list
            }
          },
          
          
    }
});

export const { userAuthentic, userLogOut, setAllUsers,deleteUser,updateUsers,updateUser } = userSlice.actions;
export default userSlice.reducer;
