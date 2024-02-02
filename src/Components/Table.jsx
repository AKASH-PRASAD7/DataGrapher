import React, { useMemo, useEffect } from "react";
import { useTable, usePagination, useRowSelect } from "react-table";
import { useSelector, useDispatch } from "react-redux";
import { selectProduct } from "../Feautures/products/productSlice";
import TableFilter from "./FilterTable";

const columns1 = [
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

const PaginationTable = () => {
  const { products, filterProducts } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  // console.log(filterProducts);

  const columns = useMemo(() => columns1, []);
  const data = useMemo(
    () => (filterProducts.length > 0 ? filterProducts : products),
    [products, filterProducts]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,

    gotoPage,
    pageCount,
    selectedFlatRows,

    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },

    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <input
              type="checkbox"
              indeterminate={
                selectedFlatRows.length > 0 &&
                selectedFlatRows.length < products.length
              }
              {...getToggleAllRowsSelectedProps()}
            />
          ),
          Cell: ({ row }) => (
            <input
              type="checkbox"
              indeterminate={
                selectedFlatRows.length > 0 &&
                selectedFlatRows.length < products.length
              }
              {...row.getToggleRowSelectedProps()}
            />
          ),
        },
        ...columns,
      ]);
    }
  );

  useEffect(() => {
    dispatch(selectProduct(selectedFlatRows.map((row) => row.original)));
  }, [selectedFlatRows]);

  const { pageIndex } = state;
  // console.log(selectedFlatRows);

  return (
    <div className="flex justify-center items-center flex-col mx-auto p-4  ">
      <TableFilter className="mx-auto" />
      <table {...getTableProps()} className="w-3/5  ">
        <thead className="bg-black text-white ">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="py-2 px-4 ">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-blue-900" {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="border-b hover:bg-lime-500 hover:text-black text-base"
              >
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="py-2 text-center px-4"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-8 flex items-center gap-12 justify-between">
        <div>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className={`${
              !canPreviousPage
                ? "text-white bg-gray-500  p-2 rounded-xl font-semibold"
                : " text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-xl font-semibold"
            } `}
          >
            Previous
          </button>{" "}
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className={`${
              !canNextPage
                ? "text-white bg-gray-500  px-4 py-2 rounded-xl font-semibold"
                : "text-white bg-lime-500 hover:bg-lime-600 px-4 py-2 rounded-xl font-semibold"
            }`}
          >
            Next
          </button>{" "}
        </div>
        <div className="flex items-center">
          <span className="mr-2">
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaginationTable;
