import { createSlice } from "@reduxjs/toolkit";
const  initialState = {
    user : null,
    token : null,
    isAuthenticated : false,
}

const userSlice = createSlice({
    name :"userAuth",
    initialState,
    reducers : {
        userAuthentic : (state,action) =>{
            state.user = action.payload.user,
            state.token = action.payload.token,
            state.isAuthenticated = true
        },
        userLogOut : (state,actions) =>{
            state.user = null,
            state.token = null,
            state.isAuthenticated = false
        }
    }

})

export const { userAuthentic ,userLogOut} = userSlice.actions;
export default userSlice.reducer;