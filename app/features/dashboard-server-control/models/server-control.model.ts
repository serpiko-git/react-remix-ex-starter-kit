import { NumbersSharp } from '@mui/icons-material';

export interface TraceFunction {
  trace_name: string;
  trace_group: string;
  url: string;
  params: URLSearchParams;
}

export interface TraceMeCoreResponse {
  c_cancel: number;
  c_cancel_err: number;
  c_edit: number;
  c_edit_err: number;
  c_settle: number;
  count: number;
  elapsed: number;
  id: string;
  n_cm_log_events: number;
  n_cm_log_obook: number;
  n_cm_log_snapshot: number;
  n_entry_buy: number;
  n_entry_sell: number;
  n_lmt_log_events: number;
  n_lmt_log_events_ref: number;
  n_lmt_log_obooks: number;
  n_lmt_log_orders: number;
  n_orders: number;
  n_orders_buys: number;
  n_orders_sell: number;
  num_total_processed: number;
  time_last: string;
  ts_last: number;
  ts_reset: string;
  v_cancel: number;
  v_cancel_err: number;
  v_edit: number;
  v_edit_err: number;
  v_settle: number;
  volume: number;
}

export interface TraceMeSnapshotResponse {
  pr_ask_set: string[];
  pr_bid_set: string[];
  qty_ask_set: string[];
  qty_bid_set: string[];
  ticker: string;
  ts_id: string;
  type: string;
}

export interface TraceMeOrderbookBResponse {
  pr_ask_set: string[];
  pr_bid_set: string[];
  qty_ask_set: string[];
  qty_bid_set: string[];
  ticker: string;
  ts_id: string;
  type: string;
}

export interface TraceMeResetResponse {}
export interface TraceReconResetResponse {}
export interface TraceMMserverResponse {
  // just text
}
