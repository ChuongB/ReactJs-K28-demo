import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: "",
  cart: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = state.cart.find((item) => item.id === action.payload.id);
      if (product) {
        product.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementCartItem: (state, action) => {
      const product = state.cart.find((item) => item.id === action.payload.id);
      if (product) {
        product.quantity++;
      }
    },
    decrementCartItem: (state, action) => {
      const product = state.cart.find((item) => item.id === action.payload.id);
      if (product.quantity === 1) {
        state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      } else {
        product.quantity--;
      }
    },
  },
});

export const { addToCart, incrementCartItem, decrementCartItem } =
  productSlice.actions;
export default productSlice.reducer;
