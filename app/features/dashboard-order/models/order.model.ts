import { BaseResponseListPaging } from '../../models/common.model';

export interface IOpenOrdersRequest {
  symbol: string;
  start_time: number;
  end_time: number;
  limit: number;
  order_status: number;
  page: number;
  order_id: string;
}

export interface IOpenOrderInfo {
  order_id: string;
  parent_order_id: string;
  account_id: string;
  client_order_id: string;
  symbol: string;
  side: number;
  order_type: number;
  create_type: number;
  cancel_type: number;
  stop_order_type: number;
  contract_type: number;
  is_cancel_amend: number;
  order_status: number;
  cxl_rej_reason_cd: number;
  time_in_force: number;
  position_mode: number;
  reduce_only: number;
  close_on_trigger: number;
  quantity: string;
  org_quantity: string;
  price: string;
  amount: string;
  trigger_price: string;
  trail_value: string;
  active_price: string;
  trigger_by: number;
  take_profit: string;
  stop_loss: string;
  tpsl_mode: number;
  tp_order_type: number;
  sl_order_type: number;
  tp_limit: string;
  sl_limit: string;
  tp_trigger_by: number;
  sl_trigger_by: number;
  last_exec_price: string;
  cum_exec_qty: string;
  cum_exec_open_qty: string;
  cum_exec_close_qty: string;
  cum_exec_amount: string;
  cum_exec_open_amount: string;
  cum_exec_close_amount: string;
  cum_exec_fee: string;
  cum_close_pos_open_fee: string;
  cum_close_pos_close_fee: string;
  cum_open_pnl: string;
  cum_close_pnl: string;
  cum_entry_amount: string;
  i_margin: string;
  margin: string;
  bkrc_price: string;
  liq_price: string;
  updated_at: string;
  created_at: string;
  asset: string;
  ts_id: string;
  created_ts: string;
}

export interface OpenOrdersResponse extends BaseResponseListPaging<IOpenOrderInfo> {}
