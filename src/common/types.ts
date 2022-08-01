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
