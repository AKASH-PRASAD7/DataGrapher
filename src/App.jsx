import React, { useEffect } from "react";
import { useGetProductsQuery } from "./Feautures/services/products";
import { useDispatch } from "react-redux";
import { getProducts } from "./Feautures/products/productSlice";
import Table from "./Components/Table";

const App = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetProductsQuery(100);

  const newProducts = data?.products.map((product) => ({
    id: product.id,
    selected: product.id < 6,
    Title: product.title,
    Category: product.category,
    Price: product.price,
    Stock: product.stock,
  }));

  useEffect(() => {
    if (newProducts) {
      dispatch(getProducts(newProducts));
    }
  }, [newProducts]);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Data Grapher</h1>
      <div>
        {error ? (
          <p className="text-2xl text-red-600">Oh no, there was an error</p>
        ) : isLoading ? (
          <>Loading...</>
        ) : data ? (
          <>
            <Table />
          </>
        ) : null}
      </div>
    </>
  );
};

export default App;
