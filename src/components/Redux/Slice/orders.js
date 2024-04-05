import { createSlice } from "@reduxjs/toolkit";

const initialState  ={
    orders :[]


}


const orderSlice = createSlice({
    name:'orders',
    initialState,
    reducers:{
        getAllOrder :(state,action) =>{
            state.orders=action.payload            
        } 
    }
})

export const {getAllOrder} = orderSlice.actions;
export default orderSlice.reducer