import { BaseResponsePaging } from '~/features/models/common.model';

export interface ClosedPositionPnl {
  closed_pnl_position_id: string;
  account_id: string;
  symbol: string;
  category: string;
  base_asset: string;
  quote_asset: string;
  position_idx: number;
  side: number;
  leverage: string;
  quantity: string;
  position_qty: string;
  entry_amount: string;
  exit_amount: string;
  avg_entry_price: string;
  avg_exit_price: string;
  closed_pnl: string;
  opening_fee: string;
  closing_fee: string;
  funding_fee: string;
  open_ts: string;
  open_time: string;
  close_time: string;
  open_duration: string;
  balance: string;
  is_close: boolean;
  ts_id: string;
  trade_ts: string;
}

export interface ClosedPositionPnlResponse
  extends BaseResponsePaging<ClosedPositionPnl> {}

export interface ClosedPositionPnlQueries {
  account_id: string;
  page: number;
  limit: number;
  category_key?: string;
  category_value?: string;
}

export interface ClosedPositionPnlCombineProps {
  responseProps: ClosedPositionPnlResponse;
  queriesProps: ClosedPositionPnlQueries;
}

export interface ClosedPositionPnlSearchValues {
  account_id: string;
  category_key: string;
  category_value: string;
  limit: number;
}
