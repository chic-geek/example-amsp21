import React, { useState } from "react";
import { processUserTransactionData } from "./utils";
import Fluctuation from "../common/Fluctuation";
import Timestamp from "../common/Timestamp";
import Button from '../common/Button';
import FlashMessage from "../common/FlashMessage";
import UserTransactionTable from "../UserTransactionTable";

/* eslint-disable react/prop-types */
const TABLE_HEADINGS = [
  { Header: 'User ID', accessor: 'userId' },
  { Header: 'GBP', accessor: 'gbp', Cell: ({ cell: { value } }) => <Fluctuation value={value} /> },
  { Header: 'USD', accessor: 'usd', Cell: ({ cell: { value } }) => <Fluctuation value={value} /> },
  { Header: 'EUR', accessor: 'eur', Cell: ({ cell: { value } }) => <Fluctuation value={value} /> },
  { Header: 'Last activity', accessor: 'lastActivity', Cell: ({ cell: { value } }) => <Timestamp dateString={value} /> }
];
/* eslint-enable react/prop-types */

export default function UserTransactions() {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  async function fetchData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setIsProcessing(true);
      setData(await processUserTransactionData(data));
      setIsProcessing(false);
    } catch (err) {
      setIsProcessing(false);
      setIsError(true);
      setErrorMessage(err.message);
      console.log(err);
    }
  }

  function handleButtonClick(fetchUrl) { fetchData(fetchUrl) }

  if (isError) return <FlashMessage type="error" message="Error processing data." instruction={errorMessage} />

  return (
    <React.Fragment>
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <h2 className="text-white font-bold text-xl md:text-2xl">Card transactions by user</h2>
        <div className="mt-4 sm:mt-0">
          <Button handleClick={() => handleButtonClick('./assets/transactions-small.json')}>Fetch data (sm)</Button>
          <Button handleClick={() => handleButtonClick('./assets/transactions-medium.json')}>Fetch data (md)</Button>
          <Button handleClick={() => handleButtonClick('./assets/transactions-large.json')}>Fetch data (lg)</Button>
        </div>
      </div>

      <UserTransactionTable
        tableHeadings={TABLE_HEADINGS}
        tableData={data}
        isProcessing={isProcessing}
        isError={isError}
      />
    </React.Fragment>
  );
}

