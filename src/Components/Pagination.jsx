import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { nextPage, prevPage } from "../Feautures/products/productSlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const { page, total, searchedProducts } = useSelector(
    (state) => state.products
  );

  return (
    <>
      {searchedProducts.length === 0 && (
        <section className="m-4 flex justify-center items-center gap-4">
          <button
            onClick={() => dispatch(prevPage())}
            disabled={page === 0}
            className={`${
              page === 0
                ? "text-white bg-gray-500  p-2 rounded-xl font-semibold"
                : " text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-xl font-semibold"
            } `}
          >
            Prev
          </button>
          <button
            onClick={() => dispatch(nextPage())}
            disabled={page >= total - 10}
            className={`${
              page >= total - 10
                ? "text-white bg-gray-500  px-4 py-2 rounded-xl font-semibold"
                : "text-white bg-lime-500 hover:bg-lime-600 px-4 py-2 rounded-xl font-semibold"
            }`}
          >
            Next
          </button>
          <p className="text-xl font-semibold">{`${`${page / 10 + 1}`} out of ${
            total / 10
          }`}</p>
        </section>
      )}
    </>
  );
};

export default Pagination;
