import { BaseResponsePaging } from '~/features/models/common.model';

export interface Transaction {
  transaction_id: string;
  account_id: string;
  symbol: string;
  BaseAsset: string;
  QuoteAsset: string;
  transaction_type: number;
  direction: string;
  qty: string;
  position_size: string;
  funding: string;
  fee: string;
  cash_flow: string;
  change: string;
  balance: string;
  exec_price: string;
  fee_rate: string;
  order_id: string;
  from_transfer_account_id: string;
  to_transfer_account_id: string;
  ts_id: string;
  created_ts: string;
  transaction_time: string;
}

export interface TransactionResponse extends BaseResponsePaging<Transaction> {}

export interface TransactionQueries {
  account_id: string;
  page: string;
  limit: string;
  category_key?: string;
  category_value?: string;
}

export interface TransactionCombineProps {
  responseProps: TransactionResponse;
  queriesProps: TransactionQueries;
}

export interface TransactionSearchValues {
  account_id: string;
  symbol: string;
  order_id: string;
  client_order_id: string;
  transaction_id: string;
  limit: string;
}
