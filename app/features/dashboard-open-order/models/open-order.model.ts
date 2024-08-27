import { BaseResponsePaging } from "~/features/models/common.model";
import {
  SideTypes,
  OrderTypes,
  CreateTypes,
  CancelTypes,
  StopOrderTypes,
  ContractTypes,
  OrderStatus,
  TimeInForceTypes,
  PositionModeTypes,
  FlagValue,
  TriggerByBaseTypes,
  TpslModeTypes,
} from '~/consts/consts';


export interface OpenOrder {
  order_id: string;
  parent_order_id: string;
  account_id: string;
  client_order_id: string;
  symbol: string;
  side: SideTypes;
  order_type: OrderTypes;
  create_type: CreateTypes;
  cancel_type: CancelTypes;
  stop_order_type: StopOrderTypes;
  contract_type: ContractTypes;
  is_cancel_amend: 0;
  order_status: OrderStatus;
  cxl_rej_reason_cd: 0;
  time_in_force: TimeInForceTypes;
  position_mode: PositionModeTypes;
  reduce_only: FlagValue;
  close_on_trigger: FlagValue;
  quantity: string;
  org_quantity: string;
  price: string;
  amount: string;
  trigger_price: string;
  trail_value: string;
  active_price: string;
  trigger_by: TriggerByBaseTypes;
  take_profit: string;
  stop_loss: string;
  tpsl_mode: TpslModeTypes;
  tp_order_type: OrderTypes;
  sl_order_type: OrderTypes;
  tp_limit: string;
  sl_limit: string;
  tp_trigger_by: TriggerByBaseTypes;
  sl_trigger_by: TriggerByBaseTypes;
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

export interface OpenOrderResponse extends BaseResponsePaging<OpenOrder> {}

export interface OpenOrderQueries {
  account_id: string;
  page: string;
  limit: string;
  category_key?: string;
  category_value?: string;
}

export interface OpenOrderCombineProps {
  responseProps: OpenOrderResponse;
  queriesProps: OpenOrderQueries;
}

export interface OpenOrderSearchValues {
  account_id: string;
  symbol: string;
  order_id: string;
  client_order_id: string;
  transaction_id: string;
  limit: string;
}
