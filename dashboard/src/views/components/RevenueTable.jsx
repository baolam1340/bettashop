// RevenueTable.js
import React, { useMemo } from "react";
import { useTable, useSortBy } from "react-table";

const RevenueTable = ({ tableData }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Ngày",
        accessor: "_id", // Đặt tên accessors là _id để tận dụng các giá trị ngày trong mảng của bạn
      },
      {
        Header: "Doanh Thu",
        accessor: "totalAmount",
        Cell: ({ value }) => (
          <span>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(value)}
          </span>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => tableData, [tableData]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <table {...getTableProps()} className="w-full table-auto text-white">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            className="bg-gray-800 text-white"
          >
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                className="py-2 px-4 border-b border-gray-600 text-left text-sm"
              >
                {column.render("Header")}
                <span className="ml-1">
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </span>
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
              {...row.getRowProps()}
              className={index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}
            >
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  className="py-2 px-4 border-b border-gray-600 text-left text-sm"
                >
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default RevenueTable;
