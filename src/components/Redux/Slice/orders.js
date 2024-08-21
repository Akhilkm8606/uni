import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    getAllOrder: (state, action) => {
      state.orders = action.payload;
    },
    removeOrder: (state, action) => {
      const orderIdToRemove = action.payload;
      state.orders = state.orders.filter(order => order._id !== orderIdToRemove);
    },
    updateOrder: (state, action) => {
      const updatedOrder = action.payload;
      const index = state.orders.findIndex(order => order._id === updatedOrder._id);
      if (index !== -1) {
        state.orders[index] = updatedOrder;
      }
    },
  },
});

export const { getAllOrder, removeOrder,updateOrder } = orderSlice.actions;
export default orderSlice.reducer;
