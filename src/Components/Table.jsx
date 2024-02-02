import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable, useSortBy } from "react-table";

const columns = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "SELECTED",
    accessor: "Selected",
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

const Table = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  console.log(products);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: products,
      },
      useSortBy
    );

  return (
    <>
      <section className="flex justify-center">
        <table
          {...getTableProps()}
          className="max-w-11/12 bg-gray-800 text-white border border-gray-700"
        >
          <thead>
            {headerGroups.map((header, index) => (
              <tr
                key={index}
                {...header.getHeaderGroupProps()}
                className="bg-gray-700"
              >
                {header.headers.map((column, i) => (
                  <th
                    key={i}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="p-2 text-left"
                  >
                    {column.render("Header")}
                    {column.isSorted ? " 🔽" : " ⬆️"}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr
                  key={index}
                  {...row.getRowProps()}
                  className={index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}
                >
                  {row.cells.map((cell, i) => (
                    <td
                      key={i}
                      {...cell.getCellProps()}
                      className="p-2 border-t border-gray-700"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Table;
