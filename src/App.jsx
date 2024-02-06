import React, { useEffect, lazy, Suspense, useState } from "react";
import "./App.css";
import { useGetProductsQuery } from "./Feautures/services/products";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  setTotal,
  selectProduct,
} from "./Feautures/products/productSlice";

import Chart from "./Components/Chart";
import Loader from "./Components/Loader";

import Pagination from "./Components/Pagination";

const SearchTable = lazy(() => import("./Components/SearchTable"));

const Table1 = lazy(() => import("./Components/Table1"));

const App = () => {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.products);
  const { data, error, isLoading } = useGetProductsQuery(page || 0);

  const newProducts = data?.products.map((product) => ({
    id: product.id,
    Title: product.title,
    Category: product.category,
    Price: product.price,
    Stock: product.stock,
  }));

  useEffect(() => {
    if (newProducts) {
      dispatch(getProducts(newProducts));
      dispatch(setTotal(data.total));
    }
  }, [page, data]);

  return (
    <>
      <h1 className="text-5xl text-center m-8  text-lime-500 italic text-shadow-xl  font-semibold ">
        Data Grapher
      </h1>
      <Chart />

      <Suspense fallback={<Loader />}>
        <main>
          {error ? (
            <p className="text-2xl text-center font-semibold text-red-500">
              Oh no, there was an error fetching data.
            </p>
          ) : (
            <>
              <SearchTable />
              {isLoading ? <Loader /> : <Table1 />}
              <Pagination />
            </>
          )}
        </main>
      </Suspense>
    </>
  );
};

export default App;
