import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProduct } from "../Feautures/products/productSlice";

const columns1 = [
  {
    Header: "SELECT",
    accessor: "select",
  },
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "TITLE",
    accessor: "Title",
  },
  {
    Header: "CATEGORY",
    accessor: "Category",
  },
  {
    Header: "PRICE",
    accessor: "Price",
  },
  {
    Header: "STOCK",
    accessor: "Stock",
  },
];

const Table2 = () => {
  const { products, selectedProduct, searchedProducts } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  // console.log(searchedProducts);

  // console.log(products);

  const handleRowClick = (productId) => {
    const isSelected = selectedProduct.some(
      (selected) => selected.id === productId
    );

    // If the product is already selected, remove it from the selectedProduct array
    if (isSelected) {
      const updatedSelectedProduct = selectedProduct.filter(
        (selected) => selected.id !== productId
      );
      dispatch(selectProduct(updatedSelectedProduct));
    } else {
      // If the product is not selected, add it to the selectedProduct array
      const selectedProductItem = (
        searchedProducts.length > 0 ? searchedProducts : products
      ).find((product) => product.id === productId);

      dispatch(selectProduct([...selectedProduct, selectedProductItem]));
    }
  };

  const handleSelectAll = () => {
    // Check if all products are already selected
    const allSelected = selectedProduct.length === products.length;

    if (allSelected) {
      // If all selected, clear selection
      dispatch(selectProduct([]));
    } else {
      // If not all selected, select all
      dispatch(selectProduct([...products]));
    }
  };
  const [initialDispatchDone, setInitialDispatchDone] = useState(false);
  const defalutSelected = products?.filter((item) => item.id < 6);
  // console.log(defalutSelected);

  useEffect(() => {
    dispatch(selectProduct(defalutSelected));
    setInitialDispatchDone(true);
    console.log("hi");
  }, [initialDispatchDone]);

  return (
    <>
      <section className="flex justify-center items-center flex-col mx-auto p-4  ">
        <table className="w-3/5">
          <thead className="bg-black text-white">
            <tr>
              {columns1.map((column) => (
                <th key={column.accessor} className="py-2 px-4">
                  {column.Header === "SELECT" ? (
                    // Checkbox in header for "Select All"
                    <input
                      type="checkbox"
                      checked={selectedProduct.length === products.length}
                      onChange={handleSelectAll}
                    />
                  ) : (
                    // Other headers
                    column.Header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-blue-900 cursor-pointer">
            {(searchedProducts.length > 0 ? searchedProducts : products).map(
              (product) => (
                <tr
                  onClick={() => handleRowClick(product.id)}
                  key={product.id}
                  className={`${
                    selectedProduct.some(
                      (selected) => selected.id === product.id
                    )
                      ? "bg-lime-500 hover:bg-lime-700 border-b text-white" // Change to red if in selected products
                      : "border-b hover:bg-lime-700 hover:text-black text-base"
                  }`}
                >
                  {columns1.map((column, index) => (
                    <td
                      key={column.accessor}
                      className={`py-2 text-center px-4 ${
                        // Add a class for the checkbox column
                        index === 0 ? "text-white" : ""
                      }`}
                    >
                      {column.accessor === "select" ? (
                        // Checkbox in each row
                        <input
                          type="checkbox"
                          checked={selectedProduct.some(
                            (selected) => selected.id === product.id
                          )}
                          onChange={() => handleRowClick(product.id)}
                        />
                      ) : (
                        // Other columns
                        product[column.accessor]
                      )}
                    </td>
                  ))}
                </tr>
              )
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Table2;
