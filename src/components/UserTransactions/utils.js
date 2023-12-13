import { groupBy } from 'lodash-es'

const sumCurrency = (acc, item) => {
  let { currency, amount } = item;
  amount = Number(amount);
  if (isNaN(amount)) { throw new TypeError('Amount is not a number') }

  return {
    ...acc,
    [currency.toLowerCase()]: acc[currency.toLowerCase()] += parseInt(amount * 100)
  }
};

const sortByTimestamp = (a, b) => {
  return new Date(b.timestamp) - new Date(a.timestamp);
}

const currencyUnitFormatter = (number) => {
  return (number / 100);
};

/**
 * Process user transaction data
 *
 * @param {array} transactionData - Object representation of all transaction data to be processed
 * @returns {Object} transactionData - Processed user transaction data
 * @returns {string} transactionData.userId - The uuid associated with a user
 * @returns {string} transactionData.gbp - Final balance in GBP
 * @returns {string} transactionData.usd - Final balance in USD
 * @returns {string} transactionData.eur - Final balance in EUR
 * @returns {string} transactionData.lastActivity - ISO date of users last activity
 */
export const processUserTransactionData = (transactionData) => {
  return new Promise((resolve, reject) => {
    try {
      const processedUserTransactions = Object
        // group by user_id...
        .values(groupBy(transactionData, (item) => item.user_id))
        // sort by timestamp (desc)...
        .map((item) => item.sort(sortByTimestamp))
        // sum each currency and create the desired data structure...
        .map((group) => group.reduce(
          sumCurrency,
          {
            userId: group[0].user_id,
            gbp: 0,
            usd: 0,
            eur: 0,
            lastActivity: group[0].timestamp,
          }
        ))
        // format currency for display purposes...
        .map((transaction) => ({
          ...transaction,
          gbp: currencyUnitFormatter(transaction.gbp),
          usd: currencyUnitFormatter(transaction.usd),
          eur: currencyUnitFormatter(transaction.eur),
        }));

      // for simulation purposes...
      setTimeout(() => resolve(processedUserTransactions), 1000);
    }
    catch (error) {
      reject(error);
    }
  });
};


