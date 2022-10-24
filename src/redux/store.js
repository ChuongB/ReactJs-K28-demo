import productReducer from "./product/productSlice";
import { configureStore } from "@reduxjs/toolkit";
import { api } from "./product/productApi.js";
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    product: productReducer, // Thêm vào
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
