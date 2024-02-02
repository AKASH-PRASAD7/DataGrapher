import React, { useEffect } from "react";
import "./App.css";
import { useGetProductsQuery } from "./Feautures/services/products";
import { useDispatch } from "react-redux";
import { getProducts, selectProduct } from "./Feautures/products/productSlice";
import Table from "./Components/Table";
import Chart from "./Components/Chart";
import Loader from "./Components/Loader";

const App = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetProductsQuery();

  const newProducts = data?.products.map((product) => ({
    id: product.id,
    Title: product.title,
    Category: product.category,
    Price: product.price,
    Stock: product.stock,
  }));

  // const selectedProducts = newProducts?.filter((item) => item.id < 6);

  useEffect(() => {
    if (newProducts) {
      dispatch(getProducts(newProducts));
    }
  }, [newProducts]);

  return (
    <>
      <h1 className="text-5xl text-center m-8  text-lime-500 italic text-shadow-xl  font-semibold ">
        Data Grapher
      </h1>
      <div>
        {error ? (
          <p className="text-2xl text-red-600">Oh no, there was an error</p>
        ) : isLoading ? (
          <Loader />
        ) : data ? (
          <>
            <Chart />
            <Table />
          </>
        ) : null}
      </div>
    </>
  );
};

export default App;
