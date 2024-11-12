import { BaseResponsePaging } from '~/features/models/common.model';

export const USER_PNL_USERTYPE_ALL = 'all';
export const USER_PNL_USERTYPE_USER = 'lvu';
export const USER_PNL_USERTYPE_MM = 'lvm';

export const USER_PNL_USERTYPE = {
  [USER_PNL_USERTYPE_ALL]: 0,
  [USER_PNL_USERTYPE_USER]: 1,
  [USER_PNL_USERTYPE_MM]: 2,
};

export const USER_PNL_SORT_COLUMN_SUM = 'pnl_sum';
export const USER_PNL_SORT_COLUMN_RE = 'realized_pnl';
export const USER_PNL_SORT_COLUMN_UN = 'unrealized_pnl';

export const USER_PNL_SORT_COLUMN = {
  [USER_PNL_SORT_COLUMN_SUM]: 0,
  [USER_PNL_SORT_COLUMN_RE]: 1,
  [USER_PNL_SORT_COLUMN_UN]: 2,
};

export interface UserPnl {
  ticker: string;
  worker_type: string;
  worker_id: string;
  re: string;
  un: string;
  sum: string;
}

export interface UserPnlResponse extends BaseResponsePaging<UserPnl> {}

export interface UserPnlQueries {
  ticker: string;
  worker_type: string;
  worker_id: string;
  page: string;
  limit: string;
}

export interface UserPnlCombineProps {
  responseProps: UserPnlResponse;
  queriesProps: UserPnlQueries;
}

export interface UserPnlSearchValues {
  ticker: string;
  worker_id: string;
  worker_type: number;
  sort_by: number;
  page: string;
  limit: string;
}
