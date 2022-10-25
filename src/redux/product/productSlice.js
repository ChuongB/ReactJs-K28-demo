import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "./api";

export const getProducts = createAsyncThunk(
  // Tên action
  "product/getProducts",

  // Code async logic, tham số đầu tiên data là dữ liệu truyền vào khi gọi action
  async (data, { rejectWithValue }) => {
    // Gọi lên API backend
    const url = "http://localhost:3004/products";
    try {
      const res = await axios.get(url);
      if (res) {
        return res.data;
      } else {
        rejectWithValue("failed to get product");
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const initialState = {
  cart: [],
  loading: false,
  products: [],
  errorMessage: "",
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

      if (product && product.quantity === 1) {
        state.cart = state.cart.filter((item) => item.id !== product.id);
      } else {
        product.quantity--;
      }
    },
  },
  // Code logic xử lý async action
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action getProducts (Promise pending)
    builder.addCase(getProducts.pending, (state) => {
      // Bật trạng thái loading
      state.loading = true;
    });

    // Khi thực hiện action getProducts thành công (Promise fulfilled)
    builder.addCase(getProducts.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      state.loading = false;
      state.products = action.payload;
    });

    // Khi thực hiện action getProducts thất bại (Promise rejected)
    builder.addCase(getProducts.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.loading = false;
      state.errorMessage = action.payload.message;
    });

    builder.addMatcher(
      api.endpoints.getProducts.matchFulfilled,
      (state, action) => {
        // Lưu thông tin user vào state
        state.products = action.payload;
      }
    );
  },
});

export const { addToCart, incrementCartItem, decrementCartItem } =
  productSlice.actions;
export default productSlice.reducer;
