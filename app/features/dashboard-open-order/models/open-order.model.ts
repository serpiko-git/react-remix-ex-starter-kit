interface BaseResponse<T> {
  code: number;
  data: {
    list: T[];
    pagination: {
      total: 0;
      page_no: 1;
      page_size: 20;
    };
  };
  msg: string;
  time_now: string;
}

export const positionMode = {
  /** one-way mode */
  both: 0,
  /** hedge mode Buy/Long */
  buy: 1,
  /** hedge mode Sell/Short */
  sell: 2,
} as const;
export type PositionModeTypes =
  (typeof positionMode)[keyof typeof positionMode];
export const positionModeText = {
  0: 'both', // one-way mode
  1: 'buy', // hedge mode Buy/Long
  2: 'sell', // hedge mode Sell/Short
};

/** order side */
export const side = {
  /** Sell / Short */
  sell: 0,
  /** Buy / Long */
  buy: 1,
} as const;
export type SideTypes = (typeof side)[keyof typeof side];
export const sideText = {
  0: 'sell',
  1: 'buy',
};

export const orderType = {
  limit: 0,
  market: 1,
} as const;
export type OrderTypes = (typeof orderType)[keyof typeof orderType];
export const orderTypeText = {
  0: 'limit',
  1: 'market',
};
export const createType = {
  createByUser: '0',
  createByClosing: '1',
  createByAdminClosing: '2',
  createByStopOrder: '3',
  createByTakeProfit: '4',
  createByStopLoss: '5',
  createByTakeProfitPartial: '6',
  createByStopLossPartial: '7',
  createByTrailingStop: '8',
  createByLiq: '9',
  createByAdlPassThrough: '10',
  createByTakeOverPassThrough: '11',
} as const;
export type CreateTypes = (typeof createType)[keyof typeof createType];
export const createTypeText = {
  0: 'createByUser',
  1: 'createByClosing',
  2: 'createByAdminClosing',
  3: 'createByStopOrder',
  4: 'createByTakeProfit',
  5: 'createByStopLoss',
  6: 'createByTakeProfitPartial',
  7: 'createByStopLossPartial',
  8: 'createByTrailingStop',
  9: 'createByLiq',
  10: 'createByAdlPassThrough',
  11: 'createByTakeOverPassThrough',
  12: '12',
};
export const cancelType = {
  cancelByUser: '0',
  cancelByReduceOnly: '1',
  cancelByPrepareLiq: '2',
  cancelAllBeforeLiq: '3',
  cancelByPrepareAdl: '4',
  cancelAllBeforeAdl: '5',
  cancelByAdmin: '6',
  cancelByTpSlTsClear: '7',
  cancelByPzSideCh: '8',
  cancelByMePushError: '9',
  cancelByMePushReject: '10',
  cancelByMeCancelError: '11',
  cancelByMeEditError: '12',
  cancelByMeEditErrorSide: '13',
  cancelByMeEditErrorQty: '14',
  cancelByMePostonlyReject: '15',
  cancelByMeIcoReject: '16',
  cancelByMeFokReject: '17',
  cancelByMeEtc: '18',
} as const;
export type CancelTypes = (typeof cancelType)[keyof typeof cancelType];
export const cancelTypeText = {
  0: 'cancelByUser',
  1: 'cancelByReduceOnly',
  2: 'cancelByPrepareLiq',
  3: 'cancelAllBeforeLiq',
  4: 'cancelByPrepareAdl',
  5: 'cancelAllBeforeAdl',
  6: 'cancelByAdmin',
  7: 'cancelByTpSlTsClear',
  8: 'cancelByPzSideCh',
  9: 'cancelByMePushError',
  10: 'cancelByMePushReject',
  11: 'cancelByMeCancelError',
  12: 'cancelByMeEditError',
  13: 'cancelByMeEditErrorSide',
  14: 'cancelByMeEditErrorQty',
  15: 'cancelByMePostonlyReject',
  16: 'cancelByMeIcoReject',
  17: 'cancelByMeFokReject',
  18: 'cancelByMeEtc',
};
export const stopOrderType = {
  normal: 0,
  takeProfit: 1,
  stopLoss: 2,
  trailingStop: 3,
  stop: 4,
  partialTakeProfit: 5,
  partialStopLoss: 6,
} as const;
export type StopOrderTypes = (typeof stopOrderType)[keyof typeof stopOrderType];
export const stopOrderTypeText = {
  0: 'normal',
  1: 'takeProfit',
  2: 'stopLoss',
  3: 'trailingStop',
  4: 'stop',
  5: 'partialTakeProfit',
  6: 'partialStopLoss',
};

export const contractType = {
  inversePerpetual: 0,
  linearPerpetual: 1,
  inverseFutures: 2,
  linearFutures: 3,
  usdcPerpetual: 4,
} as const;
export type ContractTypes = (typeof contractType)[keyof typeof contractType];
export const contractTypeText = {
  0: 'inversePerpetual',
  1: 'linearPerpetual',
  2: 'inverseFutures',
  3: 'linearFutures',
  4: 'usdcPerpetual',
};

export const orderStatus = {
  /** 시스템 접수는 됐지만 매칭엔진으로 전달은 안된 상태 */
  created: 0,
  /** 매칭엔진에 전달이 완료된 상태 */
  new: 1,
  rejected: 2,
  /** 매칭엔진으로 취소를 보낸 상태이고 아직 완전한 취소가 아닌 상태 */
  partiallyFilled: 3,
  filled: 4,
  pendingCancel: 5,
  canceled: 6,
  /** 아직 트리거 발동이 되지 않은 상태 */
  untriggered: 7,
  /** 취소가 된 트리거 */
  deactivated: 8,
  /** 트리거 발동, 매칭엔진 등록 전 상태 */
  triggered: 9,
  /** 트기거 발동, 매칭엔진 등록 완료 상태 */
  active: 10,
  pendingRequest: 11,
  pendingDone: 12,
  pendingRequestCancel: 13,
} as const;
export type OrderStatus = (typeof orderStatus)[keyof typeof orderStatus];
export const orderStatusText = {
  0: 'Created',
  1: 'New',
  2: 'Rejected',
  3: 'Partially Filled',
  4: 'Filled',
  5: 'Pending Cancel',
  6: 'Canceled',
  7: 'Untriggered',
  8: 'Deactivated',
  9: 'Triggered',
  10: 'Active',
  11: 'Pending Request',
  12: 'Pending Done',
  13: 'Pending Request Cancel',
} as const;

export const timeInForce = {
  /** Good-Till-Canceled */
  GTC: 0,
  /** Immediate-Or-Cancel */
  IOC: 1,
  /** Fill-Or-Kill */
  FOK: 2,
  /** Post Only */
  POST_ONLY: 3,
} as const;
export type TimeInForceTypes = (typeof timeInForce)[keyof typeof timeInForce];
export const timeInForceText = {
  0: 'GTC', // Good-Till-Canceled
  1: 'IOC', // Immediate-Or-Cancel
  2: 'FOK', // Fill-Or-Kill
  3: 'POST_ONLY', // Post Only
};

export const placeOrderPositionMode = {
  oneway: 0,
  hedgeBuy: 1,
  hedgeSell: 2,
} as const;
export type PlaceOrderPositionModeTypes =
  (typeof positionMode)[keyof typeof positionMode];

export const flagValue = {
  /** flase / no */
  false: 0,
  /** true / yes */
  true: 1,
} as const;
export type FlagValue = (typeof flagValue)[keyof typeof flagValue];
export const flagValueText = {
  0: 'false',
  1: 'true',
};
export const triggerBy = {
  lastPrice: 0,
  indexPrice: 1,
  markPrice: 2,
  orderPrice: 3,
  triggerPrice: 4,
} as const;
export type TriggerByBaseTypes = (typeof triggerBy)[keyof typeof triggerBy];
export const triggerByText = {
  0: 'lastPrice',
  1: 'indexPrice',
  2: 'markPrice',
  3: 'orderPrice',
  4: 'triggerPrice',
};

export const tpslMode = {
  full: 0,
  partial: 1,
} as const;
export type TpslModeTypes = (typeof tpslMode)[keyof typeof tpslMode];
export const tpslModeText = {
  0: 'full',
  1: 'partial',
} as const;

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

export interface OpenOrderResponse extends BaseResponse<OpenOrder> {}

export interface OpenOrderQueries {
  account_id: string;
  page: number;
  limit: number;
  category_key?: string;
  category_value?: string;
}

export interface OpenOrderCombineProps {
  openOrderResponseProps: OpenOrderResponse;
  openOrderQueriesProps: OpenOrderQueries;
}

export interface OpenOrderSearchValues {
  account_id: string;
  symbol: string;
  order_id: string;
  client_order_id: string;
  transaction_id: string;
  limit: number;
}
