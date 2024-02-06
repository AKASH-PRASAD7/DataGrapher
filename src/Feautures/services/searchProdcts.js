import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const searchProductsApi = createApi({
  reducerPath: "searchProductsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/products/search",
  }),
  endpoints: (builder) => ({
    searchProducts: builder.query({
      query: (searchString) => `?q${searchString}`,
    }),
  }),
});

export const { useSearchProductsQuery } = searchProductsApi;
