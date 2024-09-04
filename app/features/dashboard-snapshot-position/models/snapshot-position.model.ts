import { BaseResponsePaging } from '~/features/models/common.model';

export interface SnapshotPosition {
  account_id: number;
  category: string;
  symbol: string;
  prpl: number;
  qtypl: number;
  prps: number;
  qtyps: number;
  rate_funding_feel: number;
  rate_funding_fees: number;
  created_at: string;
  updated_at: string;
  transaction_id: number;
  ts_id: string;
  ts_ff: number;
  prpl0: number;
  qtypl0: number;
  prps0: number;
  qtyps0: number;
  created_ts: number;
  transaction_id0: number;
}

export interface SnapshotPositionResponse
  extends BaseResponsePaging<SnapshotPosition> {}

export interface SnapshotPositionQueries {
  account_id: string;
  page: string;
  limit: string;
  category_key?: string;
  category_value?: string;
}

export interface SnapshotPositionCombineProps {
  responseProps: SnapshotPositionResponse;
  queriesProps: SnapshotPositionQueries;
}

export interface SnaphotPositionSearchValues {
  account_id: string;
  transaction_id: string;
  page_no: number;
  page_size: number;
  start_time: number;
  end_time: number;
}
