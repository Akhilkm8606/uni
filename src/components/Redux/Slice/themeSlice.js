// themeSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'bright', // Initial theme mode
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    themeset: (state) => {
      state.theme = state.theme === 'dark' ? 'bright' : 'dark'; // Toggle between dark and bright modes
    },
  },
});

export const { themeset } = themeSlice.actions;

export default themeSlice.reducer;
