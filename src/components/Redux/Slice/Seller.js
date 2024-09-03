import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    seller: [],
    products: [],  // Add products to initial state
    orders: []     // Add orders to initial state
};

const sellerSlice = createSlice({
    name: "seller",
    initialState,
    reducers: {
        // Reducer to set seller data
        sellerReducer: (state, action) => {
            state.seller = action.payload;
        },
        
        // Reducer to delete a product by id
        deleteProduct: (state, action) => {
            const productId = action.payload.productId;
            state.products = state.products.filter((product) => product._id !== productId);
        },

        // Reducer to add a product
        addProduct: (state, action) => {
            state.products.push(action.payload);
        },

        // Reducer to set products
        setProducts: (state, action) => {
            state.products = action.payload;
        },

        // Reducer to set orders
        setOrders: (state, action) => {
            state.orders = action.payload;
        },

        // Reducer to delete an order by id
        deleteOrder: (state, action) => {
            const orderId = action.payload.orderId;
            state.orders = state.orders.filter((order) => order._id !== orderId);
        },

        // Reducer to add an order
        addOrder: (state, action) => {
            state.orders.push(action.payload);
        },

        // Reducer to update an order
        updateOrder: (state, action) => {
            const { orderId, updatedOrder } = action.payload;
            state.orders = state.orders.map((order) =>
                order._id === orderId ? updatedOrder : order
            );
        },

        // Reducer to update a product
        updateProduct: (state, action) => {
            const { productId, updatedProduct } = action.payload;
            state.products = state.products.map((product) =>
                product._id === productId ? updatedProduct : product
            );
        }
    }
});

export const { 
    sellerReducer,
    deleteProduct,
    addProduct,
    setProducts,
    setOrders,
    deleteOrder,
    addOrder,
    updateOrder,
    updateProduct
} = sellerSlice.actions;

export default sellerSlice.reducer;
