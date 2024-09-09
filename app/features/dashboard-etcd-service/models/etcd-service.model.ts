import { BaseError } from '~/common/apis/apis.model';
import { BaseResponse, BaseResponseList } from '~/features/models/common.model';

export const etcdServiceStatus = {
  /** 서비스가 시작 중인 상태입니다. 초기화 작업이 진행 중이며, 아직 요청을 처리할 준비가 되지 않은 상태입니다. */
  0: 'Pending',
  /** 서비스가 정상적으로 운영 중이며, 요청을 처리할 준비가 된 상태입니다. */
  1: 'Running',
  /** 서비스가 일시 중지 준비 중인 상태입니다. 현재 처리 중인 요청을 완료하고 새로운 요청을 받지 않는 상태입니다. */
  2: 'Pausing',
  /** 서비스가 종료 준비 중인 상태입니다. 현재 처리 중인 요청을 완료하고, 자원을 해제하는 상태입니다. */
  3: 'Terminatin',
  /** 서비스가 완전히 종료된 상태입니다. 모든 자원이 해제되고 더 이상 요청을 처리할 수 없는 상태입니다. */
  4: 'Terminated',
  /** 서비스가 장애로부터 복구 중인 상태입니다. 복구 작업이 진행 중이며, 정상 상태로 전환하기 위한 준비를 하고 있는 상태입니다. */
  5: 'Receiving',
  /** 서비스가 점검 중인 상태입니다. 주기적인 점검이나 긴급 점검을 위해 요청을 받지 않고 있는 상태입니다. */
  6: 'Maintenance',
  /** 서비스가 소프트웨어나 하드웨어 업그레이드를 진행 중인 상태입니다. 정상적으로 운영되기 위한 준비를 하고 있는 상태입니다. */
  7: 'Upgrading',
} as const;
export type EtcdServiceStatusTypes =
  (typeof etcdServiceStatus)[keyof typeof etcdServiceStatus];

export const etcdServiceName = {
  acs: 'acs',
  apiGateway: 'apiGateway',
  wsPrivateMgr: 'wsPrivateMgr',
  wsPrivateMgrBroker: 'wsPrivateMgrBroker',
  wsPrivate: 'wsPrivate',
  symbolMgr: 'symbolMgr',
  symbolMgrBroker: 'symbolMgrBroker',
  wsPublic: 'wsPublic',
  auth: 'auth',
  probit: 'probit',
  monitor: 'monitor',
  meTest: 'meTest',
  admin: 'admin',
  logKeeper: 'logKeeper',
  adl: 'adl',
  liq: 'liq',
  ffr: 'ffr',
  mmOb: 'mmOb',
  mm: 'mm',
  pos: 'pos',
  tpsl: 'tpsl',
  price: 'price',
} as const;
export type EtcdServiceNameTypes =
  (typeof etcdServiceName)[keyof typeof etcdServiceName];

export const etcdServiceActive = {
  yes: 'Y',
  no: 'N',
} as const;
export type EtcdServiceActiveTypes =
  (typeof etcdServiceActive)[keyof typeof etcdServiceActive];

export interface ServiceEndpoint {
  protocol: string;
  host: string;
  port: string;
}

export interface EtcdService {
  pod_name: string;
  service_name: EtcdServiceNameTypes;
  service_group: string;
  service_host: string;
  service_id: string;
  service_endpoints: ServiceEndpoint[] | null;
  service_status: EtcdServiceStatusTypes;
  service_version: string;
  created_at: Date;
  updated_at: Date;
  lease_id: string;
}

export interface EtcdServiceResponse extends BaseResponseList<EtcdService> {}

export interface EtcdServiceQueries {
  service_id?: string;
  service_name?: string;
  active?: EtcdServiceActiveTypes;
}

export interface EtcdServiceCombineProps {
  responseProps: EtcdServiceResponse;
  queriesProps: EtcdServiceQueries;
}

export interface EtcdServiceSearchValues extends EtcdServiceQueries {}

export interface EtcdServiceAcsPayload {
  worker_size: number;
  [key: string]: object | number;
}

export interface EtcdServiceAcsResponse
  extends BaseResponse<EtcdServiceAcsPayload> {}
