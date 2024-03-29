// reviewSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reviews: [],
  status: 'idle',
  error: null,
};

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReviews(state, action) {
      state.reviews.push(...action.payload);
    },
    // Other reducers if needed
  },
});

export const { addReviews } = reviewSlice.actions;

export default reviewSlice.reducer;
