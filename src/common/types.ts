export type Error = {
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

export interface ScheduledTask {
  ammId: string;
  fundingPeriod: number;
  lastPayment: number;
}
