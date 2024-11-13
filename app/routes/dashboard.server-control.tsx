import '~/common/libs/logger';
import {
  ActionFunction,
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
  json,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { apiHost_v1 } from '~/consts';
import {
  DashboardServerControl,
  EtcdServiceListResponse,
  serviceControlStopStatus,
} from '~/features/dashboard-server-control';

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  // active 파라미터가 없으면 기본값 'Y' 설정
  if (!searchParams.has('active')) {
    searchParams.set('active', 'Y');
  }

  const fetchUrl = `${apiHost_v1}/etcd/service/list?${searchParams.toString()}`;
  // console.log('fetchUrl', fetchUrl);
  const response = await fetch(fetchUrl);
  const responseProps: EtcdServiceListResponse = await response.json();
  if (responseProps.code === 0) {
    responseProps.method = 'GET';
    responseProps.data.list.splice(
      1,
      0,
      // 1
      {
        pod_name: 'acs',
        service_name: 'acs',
        service_group: `👉 ${Math.random().toString()}`,
        service_host: 'derivatives-acs-perp.derivatives.svc.cluster.local',
        service_id: 'acs-dummy-1',
        service_endpoints: [
          {
            protocol: 'grpc',
            host: 'derivatives-acs-perp.derivatives.svc.cluster.local',
            port: '8100',
          },
        ],
        service_status: 2,
        service_version: '0.0.4.bunt',
        build_time: '20241112002739',
        created_at: '2024-11-12T02:07:34.568127926Z',
        updated_at: '2024-11-12T02:07:34.568127926Z',
        lease_id: '7635170235525017138',
      },
      // 2
      {
        pod_name: 'acs',
        service_name: 'acs',
        service_group: `👉 ${Math.random().toString()}`,
        service_host: 'derivatives-acs-perp.derivatives.svc.cluster.local',
        service_id: 'acs-dummy-2',
        service_endpoints: [
          {
            protocol: 'grpc',
            host: 'derivatives-acs-perp.derivatives.svc.cluster.local',
            port: '8100',
          },
        ],
        service_status: 2,
        service_version: '0.0.4.bunt',
        build_time: '20241112002739',
        created_at: '2024-11-12T02:07:34.568127926Z',
        updated_at: '2024-11-12T02:07:34.568127926Z',
        lease_id: '7635170235525017138',
      },
      // 3
      {
        pod_name: 'acs',
        service_name: 'acs',
        service_group: `👉 ${Math.random().toString()}`,
        service_host: 'derivatives-acs-perp.derivatives.svc.cluster.local',
        service_id: 'acs-dummy-3',
        service_endpoints: [
          {
            protocol: 'grpc',
            host: 'derivatives-acs-perp.derivatives.svc.cluster.local',
            port: '8100',
          },
        ],
        service_status: 2,
        service_version: '0.0.4.bunt',
        build_time: '20241112002739',
        created_at: '2024-11-12T02:07:34.568127926Z',
        updated_at: '2024-11-12T02:07:34.568127926Z',
        lease_id: '7635170235525017138',
      },
    );
  }

  return json(responseProps);
};

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const serviceFetchActionType = formData.get('serviceFetchActionType');

  // eslint-disable-next-line no-restricted-syntax
  // for log
  // for (const [key, value] of formData.entries()) {
  //   console.log(`${key}: ${value}`);
  // }

  if (
    serviceFetchActionType === serviceControlStopStatus.SERVICE_STOP_ALL ||
    serviceFetchActionType === serviceControlStopStatus.SERVICE_STOP_EACH
  ) {
    const service_name = formData.get('service_name');
    const service_status = formData.get('service_status');

    // const fetchUrl = await fetch('https://jsonplaceholder.typicode.com/posts', { // mockup
    const fetchUrl = `${apiHost_v1}/etcd/service/all/update`;
    const response = await fetch(fetchUrl, {
      method: 'POST',
      body: JSON.stringify({
        // title: 'foo',
        // body: 'bar',
        // userId: '100',
        service_name,
        service_status,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    console.group();
    console.log('dashboard.server-control');
    console.log('fetchUrl', fetchUrl);
    console.log('serviceFetchActionType', serviceFetchActionType);
    console.log('service_name', service_name);
    console.log('service_status', service_status);
    console.groupEnd();

    const data = await response.json();

    return json(data);
  }
  if (serviceFetchActionType === serviceControlStopStatus.SERVER_STOP_FORCE) {
    const service_id = formData.get('service_id');
    const service_status = formData.get('service_status');

    // const fetchUrl = await fetch('https://jsonplaceholder.typicode.com/posts', { // mockup
    const fetchUrl = `${apiHost_v1}/etcd/service/all/update`;
    const response = await fetch(fetchUrl, {
      method: 'POST',
      body: JSON.stringify({
        // title: 'foo',
        // body: 'bar',
        // userId: '100',
        serviceFetchActionType,
        service_id,
        service_status,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    console.group();
    console.log('dashboard.server-control');
    console.log('fetchUrl', fetchUrl);
    console.log('serviceFetchActionType', serviceFetchActionType);
    console.log('service_id', service_id);
    console.log('service_status', service_status);
    console.groupEnd();

    const data = await response.json();

    return json(data);
  }

  return null;
};

export default function index() {
  const etcdServiceListResponse: EtcdServiceListResponse =
    useLoaderData<typeof loader>();
  return (
    <>
      <DashboardServerControl
        etcdServiceListResponse={etcdServiceListResponse}
      />
    </>
  );
}
