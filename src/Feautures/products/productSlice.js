import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  selectedProduct: [],
  searchedProducts: [],
  page: 0,
  total: null,
  loading: false,
  error: null,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload;
    },
    selectProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    searchProducts: (state, action) => {
      state.searchedProducts = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },

    nextPage: (state) => {
      if (state.page < state.total) {
        state.page = state.page + 10;
      }
    },
    prevPage: (state) => {
      if (state.page > 0) {
        state.page = state.page - 10;
      }
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  getProducts,
  selectProduct,
  searchProducts,
  setTotal,
  nextPage,
  prevPage,
  setError,
  setLoading,
} = productSlice.actions;

export default productSlice.reducer;
