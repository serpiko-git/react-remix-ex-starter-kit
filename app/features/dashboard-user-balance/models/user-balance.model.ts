import { BaseResponsePaging } from '~/features/models/common.model';

export interface UserBalance {
  account_id: string;
  asset: string;
  total: string;
  available: string;
  locked: string;
  bonus: string;
  cum_realised_pnl: string;
  fee_lvl_id: string;
  rate_fee_maker: string;
  rate_fee_taker: string;
  updated_at: string;
  created_at: string;
  ts_id: string;
}

export interface UserBalanceResponse extends BaseResponsePaging<UserBalance> {}
export interface UserBalanceQueries {
  account_id: string;
  asset: string;
  page: number;
  limit: number;
}

export interface UserBalanceCombineProps {
  responseProps: UserBalanceResponse;
  queriesProps: UserBalanceQueries;
}

export interface UserBalanceSearchValues {
  account_id: string;
  asset: string;
  page: number;
  limit: number;
}
