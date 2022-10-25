import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./product/productSlice";
import { api } from "./product/api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    product: ProductReducer, // Thêm vào
  },
  // Thêm cấu hình middleware để dùng được các chức năng của RTK Query như caching, invalidation, polling, ...
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
