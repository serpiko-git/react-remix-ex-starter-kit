import { apiAdminHost_v1 } from '~/consts';
import { BaseResponseList } from '~/features/models/common.model';

export interface EtcdService {
  name: string;
  service_name: string;
  service_group: string;
  service_host: string;
  service_id: string;
  service_endpoints: ServiceEndpoint[];
  service_status: number;
  service_version: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceEndpoint {
  protocol: string;
  host: string;
  port: string;
}

export interface EtcdServiceListResponse extends BaseResponseList<EtcdService>{
  account: string;
  page_no : number;
  page_size: number;
  total: number;
}

export interface EtcdServiceQueries {
  service_name: string;
  service_id: string;
  account: string;
  page_no : number;
  page_size: number;
}

export interface EtcdServiceListCombineProps {
  queriesProps: EtcdServiceQueries;
  responseProps: EtcdServiceListResponse;
}

export async function getEtcdServiceList(queries: EtcdServiceQueries): Promise<EtcdServiceListResponse> {
  const url = new URL(`${apiAdminHost_v1}/etcd/service/list`);
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
