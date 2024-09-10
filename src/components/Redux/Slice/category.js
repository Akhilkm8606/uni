import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    getCategory: (state, action) => {
      state.category = action.payload;
    },
      addCategory: (state, action) => {
        state.category.push(action.payload); // Assuming the payload is the new category object
      },
    removeCategory :(state,action) =>{
      const categoryIdToRemove = action.payload;
      state.category = state.category.filter(category => category._id !== categoryIdToRemove);

    }
  },
});

export const { getCategory,addCategory,removeCategory } = categorySlice.actions;
export default categorySlice.reducer;
