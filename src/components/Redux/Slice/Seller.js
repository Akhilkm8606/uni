import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    seller :[]
}


const sellerSlice = createSlice({
    name: "seller",
    initialState,
    reducers: {
        sellerReducer: (state, action) => {
            state.seller = action.payload;
            
        },
        
          deleteProduct: (state, action) => {
            const productId = action.payload.productId;
            state.seller = state.seller.filter((product) => product._id !== productId);
          },
          
    }
});

export const { sellerReducer,deleteProduct } = sellerSlice.actions;
export default sellerSlice.reducer;