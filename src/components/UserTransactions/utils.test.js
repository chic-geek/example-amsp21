import { describe, it, expect } from 'vitest';
import { processUserTransactionData } from "./utils";

describe('Processing incoming user transaction data', () => {
  it('should throw an error if the amount doesn\'t convert to a number', async () => {
    const mockData = [
      { "user_id": "1", "timestamp": "2020-05-29T16:59:39Z", "currency": "GBP", "amount": "Hello" },
      { "user_id": "2", "timestamp": "2019-12-05T18:28:13Z", "currency": "EUR", "amount": "-853.62" },
    ];

    await expect(processUserTransactionData(mockData)).rejects.toThrow(TypeError);
  });

  it('should sum up currency values of transactions for a user', async () => {
    const mockData = [
      { "user_id": "1", "timestamp": "2020-05-29T16:59:39Z", "currency": "GBP", "amount": "-10" },
      { "user_id": "1", "timestamp": "2020-07-29T16:59:39Z", "currency": "GBP", "amount": "-5" },
      { "user_id": "1", "timestamp": "2019-12-05T18:28:13Z", "currency": "GBP", "amount": "5" },
      { "user_id": "1", "timestamp": "2019-03-05T18:28:13Z", "currency": "USD", "amount": "15.01" },
    ];

    const output = await processUserTransactionData(mockData);
    expect(output[0].gbp).toEqual(-10);
    expect(output[0].usd).toEqual(15.01);
    expect(output[0].eur).toEqual(0);
  });

  it('should display the most recent date of activity', async () => {
    const now = new Date().toISOString();

    const mockData = [
      { "user_id": "1", "timestamp": now, "currency": "GBP", "amount": "10" },
      { "user_id": "1", "timestamp": "2021-01-01T16:00:00Z", "currency": "USD", "amount": "20" },
      { "user_id": "1", "timestamp": "2021-02-02T16:00:00Z", "currency": "EUR", "amount": "30" },
    ];

    const output = await processUserTransactionData(mockData);
    expect(output[0].lastActivity).toEqual(now);
  });
})
