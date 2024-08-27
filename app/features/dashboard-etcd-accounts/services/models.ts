import { apiAdminHost_v1 } from '~/consts';
import { BaseResponseList } from '~/features/models/common.model';

export interface EtcdAccount {
  name: string;
  service_name: string;
  service_group: string;
  service_host: string;
  service_id: string;
  service_status: number;
  service_version: string;
  created_at: string;
  updated_at: string;
}


export interface EtcAccountListResponse extends BaseResponseList<EtcdAccount>{
  account: string;
  page_no : number;
  page_size: number;
  total: number;
}

export interface EtcdAccountQueries {
  service_name: string;
  service_id: string;
  account: string;
  page_no : number;
  page_size: number;
}

export interface EtcdServiceListCombineProps {
  queriesProps: EtcdAccountQueries;
  responseProps: EtcAccountListResponse;
}

export async function getEtcdAccountList(queries: EtcdAccountQueries): Promise<EtcAccountListResponse> {
  const url = new URL(`${apiAdminHost_v1}/etcd/account/list`);
  const params = new URLSearchParams(
    {
      service_name: queries.service_name,
      service_id: queries.service_id,
      account: queries.account,
      page_no : queries.page_no.toString(),
      page_size: queries.page_size.toString(),
    })

  url.search = params.toString();
  const response = await fetch(url.toString());
  const data = await response.json();
  return data;
}
