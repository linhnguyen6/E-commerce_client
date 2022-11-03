import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  carts: [],
};

const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    increaseCart: (state, action) => {
      state.carts.find((item) => item.id === action.payload).quantity++;
    },
    decreaseCart: (state, action) => {
      state.carts.find((item) => item.id === action.payload.id).quantity--;
    },
    addToCart: (state, action) => {
      const existProduct = state.carts.find(
        (product) => product.id === action.payload.id
      );
      if (existProduct) {
        existProduct.quantity += action.payload.quantity;
      } else {
        state.carts.push(action.payload);
      }
    },
    removeCart: (state, { payload }) => {
      state.carts = state.carts.filter((product) => product.id !== payload);
    },
    clearCart: (state) => {
      state.carts = [];
    },
  },
});

export default cartSlice;
