import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    
    getCategory:(state, action) => {
      state.category = action.payload;
      },
      addCategory: (state, action) => {
        state.category.push(action.payload); // Assuming the payload is the new category object
      },
    
  },
});

export const { getCategory,addCategory } = categorySlice.actions;
export default categorySlice.reducer;
