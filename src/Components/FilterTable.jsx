import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterProducts } from "../Feautures/products/productSlice";

const FilterTable = () => {
  const [value, setValue] = useState("");

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const handleChange = (inputValue) => {
    setValue(inputValue);

    setTimeout(() => {
      if (inputValue !== "") {
        let filteredProducts = products.filter((product) =>
          product.Title.toLowerCase().includes(inputValue.toLowerCase())
        );
        // console.log(filteredProducts);
        dispatch(filterProducts(filteredProducts));
      } else {
        dispatch(filterProducts([]));
      }
    }, 1000);
  };

  return (
    <>
      <section>
        <span className="text-2xl font-semibold">🔎</span>
        <input
          type="text"
          placeholder="Search products"
          className="bg-gray-800 outline-none shadow-xl text-white p-4 rounded-xl  my-4 w-96"
          value={value || ""}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        />
      </section>
    </>
  );
};

export default FilterTable;
