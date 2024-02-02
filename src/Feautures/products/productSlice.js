import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  selectedProduct: [],
  filterProducts: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProducts: (state, action) => {
      state.products = [...action.payload];
    },
    selectProduct: (state, action) => {
      state.selectedProduct = [...action.payload];
    },
    filterProducts: (state, action) => {
      state.filterProducts = [...action.payload];
    },
  },
});

export const { getProducts, selectProduct, filterProducts } =
  productSlice.actions;

export default productSlice.reducer;
