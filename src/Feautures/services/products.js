import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/products",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (page) => `?limit=10&skip=${page}`,
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
