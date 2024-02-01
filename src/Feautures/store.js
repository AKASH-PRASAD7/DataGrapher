import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../Feautures/counter/counterSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsApi } from "../Feautures/services/products";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

setupListeners(store.dispatch);
export default store;
