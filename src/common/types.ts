export type Error = {
  service: string;
  message: string;
  details?: string;
};

export type Response = {
  statusCode: number;
  headers: Record<string, unknown>;
  body: string;
};

export type TransactionResponse = {
  status: number;
  txHash: string;
  cumulativeGasUsed: string;
};

export type Amm = {
  id: string;
  fundingPeriod: number;
};
