import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    
    getCart :(state, action) => {
      state.items = action.payload;
      },
    removeCart :(state, action) => {
      state.items = null;
      },  
  },
});

export const { getCart,removeCart } = cartSlice.actions;
export default cartSlice.reducer;
