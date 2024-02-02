import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./products/productSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsApi } from "../Feautures/services/products";

const store = configureStore({
  reducer: {
    products: productReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

setupListeners(store.dispatch);
export default store;
