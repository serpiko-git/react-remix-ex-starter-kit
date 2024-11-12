import { BaseResponse, BaseResponseList } from '~/features/models/common.model';

export type SequenceOptions = { key: string; value: number }[];

interface ServiceEndpoints {
  protocol: string;
  host: string;
  port: string;
}

type ISO_8601 =
  `${string}-${string}-${string}T${string}:${string}:${string}.${string}`;

export const etcdServerListServiceStatus = {
  0: 'Pending',
  1: 'Recovering',
  2: 'Running',
  3: 'Draining',
  4: 'Terminating',
  5: 'Terminated',
} as const;
export type EtcdServerListServiceStatusTypes =
  keyof typeof etcdServerListServiceStatus;

export const etcdServerListServiceStatusColor = {
  0: 'neutral',
  1: 'primary',
  2: 'success',
  3: 'warning',
  4: 'danger',
  5: 'neutral',
} as const;
export type EtcdServerListServiceStatusColorTypes =
  // eslint-disable-next-line max-len
  (typeof etcdServerListServiceStatusColor)[keyof typeof etcdServerListServiceStatusColor];

export interface EtcdServiceList {
  pod_name: string;
  service_name: string;
  service_group: string;
  service_host: string;
  service_id: string;
  service_endpoints?: ServiceEndpoints[];
  service_status: EtcdServerListServiceStatusTypes;
  service_version: string;
  build_time: string;
  created_at: ISO_8601;
  updated_at: ISO_8601;
  lease_id: string;
}

export interface EtcdServiceListResponse
  extends BaseResponseList<EtcdServiceList> {
  method: string;
}

export const serviceControlStopStatus = {
  /** 서비스 전체 중지 요청 */
  SERVICE_STOP_ALL: 'service_stop_all',
  /** 서비스 중지 요청 */
  SERVICE_STOP_EACH: 'service_stop_each',
  /** 서버 강제 중지 */
  SERVER_STOP_FORCE: 'server_stop_force',
} as const;

export type ServiceControlStopStatusTypes =
  (typeof serviceControlStopStatus)[keyof typeof serviceControlStopStatus];

export interface ServiceContolParams {
  /** 서비스 전체 중지 요청 */
  [serviceControlStopStatus.SERVICE_STOP_ALL]?: {
    service_name: 'all';
    service_status: 3;
  };
  /** 서비스 중지 요청 */
  [serviceControlStopStatus.SERVICE_STOP_EACH]?: {
    service_name: string;
    service_status: 3;
  };
  /** 서버 강제 중지 */
  [serviceControlStopStatus.SERVER_STOP_FORCE]?: {
    service_id: string;
    service_status: 5;
  };
}
