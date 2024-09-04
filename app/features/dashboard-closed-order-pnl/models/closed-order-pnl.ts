import { BaseResponsePaging } from '~/features/models/common.model';

export interface ClosedOrderPnl {
  closed_pnl_order_id: string;
  order_id: string;
  client_order_id: string;
  account_id: string;
  category: string;
  base_asset: string;
  quote_asset: string;
  symbol: string;
  side: number;
  leverage: string;
  quantity: string;
  position_qty: string;
  exit_amount: string;
  entry_amount: string;
  avg_entry_price: string;
  avg_exit_price: string;
  closed_pnl: string;
  opening_fee: string;
  closing_fee: string;
  funding_fee: string;
  exec_type: number;
  is_close: boolean;
  ts_id: string;
  trade_ts: string;
}

export interface ClosedOrderPnlResponse
  extends BaseResponsePaging<ClosedOrderPnl> {}

export interface ClosedOrderPnlQueries {
  account_id: string;
  page: number;
  limit: number;
  category_key?: string;
  category_value?: string;
}

export interface ClosedOrderPnlCombinProps {
  responseProps: ClosedOrderPnlResponse;
  queriesProps: ClosedOrderPnlQueries;
}

export interface ClosedOrderPnlSearchValues {
  account_id: string;
  symbol: string;
  order_id: string;
  client_order_id: string;
  limit: number;
}
