import { BigNumber } from 'bignumber.js';

/**
 * Converts big number to the selected format
 * @param [rawAmt] Amount to be converted
 * @param [decimals] Decimals for conversion
 * @returns {BigNumber} Calculated token value
 */
export const toBaseUnitBN = (rawAmt: string | number | BigNumber, decimals: number): BigNumber => {
  const raw = new BigNumber(rawAmt);
  const base = new BigNumber(10);
  const decimalsBN = new BigNumber(decimals);

  return raw.times(base.pow(decimalsBN)).integerValue();
};

/**
 * Gets current timestamp in seconds
 * @returns {number} Timestamp in seconds
 */
export const getTimestampInSeconds = (): number => {
  return Math.floor(Date.now() / 1000);
};
