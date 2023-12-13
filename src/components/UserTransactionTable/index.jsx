import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTable } from 'react-table';
import FlashMessage from '../common/FlashMessage';

export default function UserTransactionTable({ tableHeadings, tableData, isProcessing, isError }) {
  const columns = useMemo(() => tableHeadings, [tableHeadings]);
  const data = useMemo(() => tableData, [tableData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  if (isProcessing) return <FlashMessage type="success" message="Processing data..." instruction="Please wait." />;
  if (isError) return <FlashMessage type="error" message="Error fetching data." instruction="Please try reloading the page." />

  return (
    <React.Fragment>
      {tableData.length > 0
        ? (
          <div className="scrollbar-none overflow-x-auto">
            <table {...getTableProps()} className="min-w-full table-auto">
              <thead>
                {headerGroups.map((headerGroup, index) => (
                  <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, index) => (
                      <th key={index}
                        {...column.getHeaderProps()}
                        className="border border-gray-700 px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-white"
                      >
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row, index) => {
                  prepareRow(row)
                  return (
                    <tr key={index} {...row.getRowProps()}>
                      {row.cells.map((cell, index) => {
                        return (
                          <td key={index}
                            {...cell.getCellProps()}
                            className="border border-gray-700 px-6 py-4 font-medium whitespace-nowrap text-white text-sm bg-gray-900"
                          >
                            {cell.render('Cell')}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )
        : null
      }
    </React.Fragment>
  )
}

UserTransactionTable.propTypes = {
  tableHeadings: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  isProcessing: PropTypes.bool,
  isError: PropTypes.bool,
};
