import {
  BaseResponse,
  BaseResponsePaging,
} from '~/features/models/common.model';

export interface ExchangeBalance {
  symbol: string;
  'pnl_fee_total:lvm': string;
  'pnl_fee_total:lvu': string;
  'pnl_funding_fee_total:lvm': string;
  'pnl_funding_fee_total:lvu': string;
  'pnl_re_total:lvm': string;
  'pnl_re_total:lvu': string;
  'pnl_un_total:lvm': string;
  'pnl_un_total:lvu': string;

  'pnl_funding_fee_total:lvm_abs': number;
  'pnl_funding_fee_total:lvu_abs': number;
}

export interface ExchangeBalanceGroup {
  [symbol: string]: ExchangeBalance;
}

export interface ExchangeBalanceResponse
  extends BaseResponse<ExchangeBalanceGroup> {}

export interface ExchangeBalanceQueries {
  account_id: string;
  asset: string;
  page: number;
  limit: number;
}

export interface ExchangeBalanceCombineProps {
  responseProps: ExchangeBalanceResponse;
  queriesProps: ExchangeBalanceQueries;
}

export interface ExchangeBalanceSearchValues {
  ticker: string;
}
