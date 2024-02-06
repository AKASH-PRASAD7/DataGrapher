import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "lodash";
import {
  searchProducts,
  selectProduct,
  setError,
  setLoading,
} from "../Feautures/products/productSlice";

const SearchTable = () => {
  const [value, setValue] = useState("");

  const dispatch = useDispatch();
  const { products, searchedProducts } = useSelector((state) => state.products);
  // console.log(searchedProducts);
  const [searchMessage, setSearchMessage] = useState(false);

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      setSearchMessage(false);
      if (query === "") {
        dispatch(setLoading(false));
        return;
      }
      const titleUrl = `https://dummyjson.com/products/search?q=${query}`;
      const categoryUrl = `https://dummyjson.com/products/category/${query}`;

      try {
        dispatch(setLoading(true));
        let res = await fetch(titleUrl);
        const data = await res.json();
        const newProducts = data?.products.map((product) => ({
          id: product.id,
          Title: product.title,
          Category: product.category,
          Price: product.price,
          Stock: product.stock,
        }));
        let data1;
        if (data.products.length === 0) {
          let res1 = await fetch(categoryUrl);
          data1 = await res1.json();
          const newProducts1 = data1?.products.map((product) => ({
            id: product.id,
            Title: product.title,
            Category: product.category,
            Price: product.price,
            Stock: product.stock,
          }));

          dispatch(searchProducts(newProducts1 || []));
        } else {
          dispatch(searchProducts(newProducts || []));
        }
        if (data.products.length === 0 && data1.products.length === 0) {
          setSearchMessage(true);
        }
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    }, 1000),
    []
  );

  const handleChange = (inputValue) => {
    setValue(inputValue);

    debouncedSearch.cancel();
    if (inputValue === "") {
      debouncedSearch.cancel();
      setSearchMessage(false);
      dispatch(searchProducts([]));
    } else {
      debouncedSearch(inputValue);
    }
  };
  return (
    <>
      <section className="flex justify-center items-center">
        <span className="text-2xl font-semibold">🔎</span>
        <input
          type="text"
          placeholder="Search products"
          className="bg-gray-800 outline-none shadow-xl text-white p-4 rounded-xl  my-4 w-1/3 "
          value={value || ""}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        />
        <button
          onClick={() => dispatch(selectProduct([]))}
          className="p-2 mx-4 rounded-full bg-cyan-500 hover:bg-cyan-600 font-bold shadow-xl"
        >
          Clear Selection
        </button>
      </section>
      {searchMessage && (
        <p className="text-center text-xl font-semibold p-2">
          No products found
        </p>
      )}
    </>
  );
};

export default SearchTable;
