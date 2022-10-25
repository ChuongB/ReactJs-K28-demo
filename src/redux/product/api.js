import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  // Tương tự tên Slice khi tạo Slice thông thường
  reducerPath: "api",

  // Cấu hình chung cho tất cả request
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3004/",
  }),

  // Các endpoints (lệnh gọi request)
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `products`,
    }),

    getProductDetails: builder.query({
      query: (id) => `products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = api;
