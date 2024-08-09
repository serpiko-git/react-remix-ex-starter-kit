interface BaseResponse<T> {
  code: number;
  data: T[];
  msg: string;
  time_now: string;
}

// TODO: 추후 언더스코어로 변경될 예정
// interface SymbolResponseData {
//   symbol_id: string;
//   symbol_alias: string;
//   symbol_name: string;
//   status: number;
//   base_asset: string;
//   quote_asset: string;
//   updated_at: string;
//   created_at: string;
//   contract_type: number;
// }

export interface ISymbolTickInfo {
  tick: string;
  interval: number;
  depth: number;
}

/**
 * @see{@link https://tomatojuice.atlassian.net/wiki/spaces/WRSEQ/pages/213352819/Enums#Types-of-order}
 */
export const symbolOrderType = {
  LIMIT: 0,
  MARKET: 1,
  'STOP-LIMIT': 2,
  'STOP-MARKET': 3,
  'TRAILING-STOP-ORDER': 4,
  'Post Only': 5,
} as const;

export type SymbolOrderType =
  (typeof symbolOrderType)[keyof typeof symbolOrderType];

export interface ISymbol {
  SymbolId: string;
  SymbolAlias: string;
  SymbolName: string;
  Status: number;
  BaseAsset: string;
  QuoteAsset: string;
  AllowTrade: number;
  FundingInterval: number;
  TimeInForce: number[];
  OrderType: SymbolOrderType[];
  ContractType: number;
  PricePrecision: number;
  QuantityPrecision: number;
  BaseAssetPrecision: number;
  QuoteAssetPrecision: number;
  Filters: {
    Price: {
      min_price: string;
      max_price: string;
      tick_size: string;
    };
    LotSize: {
      min_qty: string;
      max_qty: string;
      step_size: string;
      post_only_max_order_qty: string;
    };
    MaxNumOrders: {
      max_num_orders: number;
    };
    PercentPriceBySide: {
      bid_multiplier_up: string;
      bid_multiplier_down: string;
      ask_multiplier_up: string;
      ask_multiplier_down: string;
      avg_price_mins: number;
    };
    Tick: {
      standard_price: string;
      minimum_unit_tick: string;
      price_rounding_digit: string;
      qty_rounding_digit: string;
      info: ISymbolTickInfo[];
      tick: string[];
    };
  };
  UpdatedAt: string;
  CreatedAt: string;
}

export interface SymbolResponse extends BaseResponse<ISymbol> {}
