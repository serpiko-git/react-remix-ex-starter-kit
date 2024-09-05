import { BaseResponsePaging } from '~/features/models/common.model';

export interface Trade {
  trade_id: number;
  order_id: number;
  client_order_id: number;
  account_id: number;
  category: string;
  base_asset: string;
  quote_asset: string;
  symbol: string;
  side: number;
  order_type: number;
  exec_type: string;
  leverage: number;
  quantity: number;
  org_quantity: number;
  price: number;
  exec_price: number;
  fee_rate: number;
  opening_fee: number;
  closing_fee: number;
  funding_fee: number;
  is_isolated: boolean;
  is_maker: boolean;
  transaction_id: number;
}

export interface TradeResponse extends BaseResponsePaging<Trade> {}

export interface TradeQueries {
  account_id: number;
  order_id: number;
  page_size: number;
  page_no: number;
}

export interface TradeCombineProps {
  responseProps: TradeResponse;
  queriesProps: TradeQueries;
}

export interface TradeSearchValues {
  account_id: number;
  order_id: number;
  client_order_id: number;
  trade_id: number;
  page_size: number;
}
