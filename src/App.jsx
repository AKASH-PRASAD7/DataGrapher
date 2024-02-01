import React from "react";
import Counter from "./Components/Counter";
import { useGetProductsQuery } from "./Feautures/services/products";

const App = () => {
  const { data, error, isLoading } = useGetProductsQuery("products");
  console.log(data);
  return (
    <>
      <h1 className="text-3xl font-bold underline">Data Grapher</h1>
      <Counter />
      <div>
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data ? (
          <>
            {/* <p>{data.products}</p> */}
            <p>{data.total}</p>
            <p>{data.limit}</p>
          </>
        ) : null}
      </div>
    </>
  );
};

export default App;
