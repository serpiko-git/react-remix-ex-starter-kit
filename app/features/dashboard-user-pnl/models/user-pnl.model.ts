import { BaseResponsePaging } from '~/features/models/common.model';

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
  page: string;
  limit: string;
}

export interface UserPnlCombineProps {
  responseProps: UserPnlResponse;
  queriesProps: UserPnlQueries;
}

export interface UserPnlSearchValues {
  worker_id: string;
  ticker: string;
  limit: string;
}
